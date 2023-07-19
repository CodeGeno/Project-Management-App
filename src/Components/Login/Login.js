import React, { useState, useContext, useEffect } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { db } from '../../firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { LoginContext } from '../../Hooks/LoginContext'
import { UserContext } from '../../Hooks/UserContext'
import { useNavigate } from 'react-router-dom'
import Wrapper from './LoginWrapper'
import Alerts from '../../Alerts'

initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE))
const auth = getAuth()

function Login() {
  const navigate = useNavigate()
  const [login, setLogin] = useState([
    { email: 'JohnDoe@gmail.com', pwd: 'john1234' },
  ])
  const [showCreateAccount, setShowCreateAccount] = useState(false)
  const { setLoggedIn } = useContext(LoginContext)
  const { setUserDetail } = useContext(UserContext)
  const [message, setMessage] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertType, setAlertType] = useState('')
  const rightsRef = collection(db, 'admin')
  const [userList, setUserList] = useState([])
  const [nom, setNom] = useState('')

  const getUserList = async () => {
    const data = await getDocs(rightsRef)
    setUserList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }
  const fetchUserList = async () => {
    await getUserList()
  }
  useEffect(() => {
    fetchUserList()
  }, [])
  const addRights = async () => {
    await addDoc(rightsRef, {
      email: login[0].email,
      admin: false,
      nom: nom,
    })
  }

  const checkRights = async () => {
    console.log('check')
    var cptr = 0
    for (const user of userList) {
      if (user.email === login[0].email) {
        cptr += 1
      }
    }
    if (cptr === 0) await addRights()
  }

  const accountLogIn = async () => {
    const email = login[0].email
    const password = login[0].pwd
    let cred = await signInWithEmailAndPassword(auth, email, password)
    let userDetail = { email: cred.user.email, uid: cred.user.uid, name: nom }
    setUserDetail([{ ...userDetail }])
    isAdmin(userDetail)
  }

  const isAdmin = (userDetail) => {
    userList.map((user) => {
      let temp
      if (
        user.email.toLowerCase() === userDetail.email.toLowerCase() &&
        user.admin
      ) {
        temp = { online: true, admin: true, name: user.nom }
        setLoggedIn([temp])
      }
      if (
        user.email.toLowerCase() === userDetail.email.toLowerCase() &&
        user.admin === false
      ) {
        temp = { online: true, admin: false, name: user.nom }
        setLoggedIn([temp])
      }
    })
  }

  const accountCreation = async () => {
    const email = login[0].email
    const password = login[0].pwd
    await createUserWithEmailAndPassword(auth, email, password).then(
      async (cred) => {
        setUserDetail([{ email: cred.user.email, uid: cred.user.uid }])
        await checkRights()
      }
    )
  }

  const handleLoginInput = (e, ind) => {
    const value = e.target.value
    var log = [...login]
    log[0][ind] = value
    setLogin(log)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (showCreateAccount) {
      try {
        await accountCreation()
        AlertMessage('Account created', 'success')
      } catch (error) {
        AlertMessage('Error creating account', 'danger')
      }
    } else {
      try {
        await accountLogIn()
        navigate('/menu')
      } catch (error) {
        AlertMessage('Error Logging in', 'danger')
      }
    }
  }
  const AlertMessage = (message, type) => {
    setMessage(message)
    setShowAlert(true)
    setAlertType(type)

    setTimeout(() => {
      setMessage('')
      setShowAlert(false)
      setAlertType('')
    }, 3000)
  }
  return (
    <>
      <Wrapper>
        <section className='login-page'>
          <div className='login-form'>
            <form className='form' onSubmit={handleSubmit}>
              <h1>{showCreateAccount ? 'Create your account:' : 'Login'}</h1>
              <Alerts show={showAlert} message={message} type={alertType} />
              {showCreateAccount && (
                <div className='login'>
                  <label htmlFor='email' className='form-label'>
                    Name:
                  </label>
                  <input
                    className='form-input'
                    type='Nom'
                    value={nom}
                    onChange={(e) => {
                      setNom(e.target.value)
                    }}
                  />
                </div>
              )}
              <div className='login'>
                <label className='form-label' htmlFor='email'>
                  Email:
                </label>
                <input
                  className='form-input'
                  type='text'
                  value={login[0].email}
                  onChange={(e) => {
                    handleLoginInput(e, 'email')
                  }}
                />
              </div>
              <div className='login'>
                <label htmlFor='pwd' className='form-label'>
                  Password:
                </label>
                <input
                  className='form-input'
                  type='password'
                  value={login[0].pwd}
                  onChange={(e) => {
                    handleLoginInput(e, 'pwd')
                  }}
                ></input>
              </div>

              <div className='btn-login'>
                <button className='btn' type='submit'>
                  {showCreateAccount ? 'Create' : 'Login'}
                </button>
                <button
                  type='button'
                  className='btn'
                  onClick={() => {
                    setShowCreateAccount(!showCreateAccount)
                  }}
                >
                  {showCreateAccount ? 'Return' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </Wrapper>
    </>
  )
}

export default Login

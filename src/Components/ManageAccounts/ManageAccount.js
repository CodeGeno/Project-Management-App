import React, { useState, useEffect } from 'react'
import { db } from '../../firebase'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import Wrapper from './ManageAccountWrapper'
import Navigation from '../Navigation'

function ManageAccount() {
  const [userList, setUserList] = useState([])
  const adminRef = collection(db, 'admin')
  const [searchUser, setSearchUser] = useState('')
  const getUsers = async () => {
    const data = await getDocs(adminRef)
    setUserList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }
  useEffect(() => {
    getUsers()
  }, [])
  const updateAdmin = async (id, field, value) => {
    const adminDoc = doc(db, 'admin', id)
    const updatedUser = { admin: value }
    await updateDoc(adminDoc, updatedUser)
    getUsers()
  }
  return (
    <Wrapper className='form'>
      <div className='return-section'>
        <Navigation location='/menu' content='Return' />
      </div>
      <div>Users List</div>
      <div className='search-section'>
        <label htmlFor='recherche' className='form-label'>
          Search:
        </label>
        <input
          className='form-input'
          type='text'
          onChange={(e) => {
            setSearchUser(e.target.value)
          }}
        />
      </div>

      {userList.map((user) => {
        const { admin, email, id } = user
        if (email.toLowerCase().includes(searchUser.toLowerCase())) {
          return (
            <div className='user' key={id}>
              <div>{email}</div>
              <div className='btn-container'>
                <button
                  className={admin ? 'btn' : 'unselected btn'}
                  onClick={() => {
                    updateAdmin(id, admin, true)
                  }}
                >
                  Admin
                </button>
                <button
                  className={admin ? 'unselected btn' : 'btn'}
                  onClick={() => {
                    updateAdmin(id, admin, false)
                  }}
                >
                  User
                </button>
              </div>
            </div>
          )
        }
        return undefined
      })}
    </Wrapper>
  )
}
export default ManageAccount

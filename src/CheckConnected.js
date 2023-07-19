import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from './Hooks/LoginContext'

function CheckConnected({ children }) {
  const navigate = useNavigate()
  const { loggedIn } = useContext(LoginContext)
  const checkConnected = () => {
    console.log(loggedIn)
    if (loggedIn[0].online == false) {
      navigate('/')
    }
  }
  useEffect(() => {
    setTimeout(() => {
      checkConnected()
    }, 1000)
  }, [])

  return <>{children}</>
}
export default CheckConnected

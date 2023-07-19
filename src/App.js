import React, { useState } from 'react'
import Login from './Components/Login/Login'
import Menu from './Components/Menu/Menu'
import { UserContext } from './Hooks/UserContext'
import { LoginContext } from './Hooks/LoginContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddingProject from './Components/AddingProject/AddingProject'
import ProjectList from './Components/ProjectList/ProjectList'
import ManageAccount from './Components/ManageAccounts/ManageAccount'
import MyProjects from './Components/MyProjects/MyProjects'
import { useNavigate } from 'react-router-dom'
import CheckConnected from './CheckConnected'
function App() {
  const [loggedIn, setLoggedIn] = useState([{ online: false, admin: false }])
  const [userDetail, setUserDetail] = useState('')

  return (
    <>
      <UserContext.Provider value={{ userDetail, setUserDetail }}>
        <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route
                path='/menu'
                element={
                  <CheckConnected>
                    <Menu />
                  </CheckConnected>
                }
              />
              <Route
                path='/addProject'
                element={
                  <CheckConnected>
                    <AddingProject />
                  </CheckConnected>
                }
              />
              <Route
                path='/projectList'
                element={
                  <CheckConnected>
                    <ProjectList />
                  </CheckConnected>
                }
              />
              <Route
                path='/manageAccounts'
                element={
                  <CheckConnected>
                    <ManageAccount />
                  </CheckConnected>
                }
              />
              <Route
                path='/myProjects'
                element={
                  <CheckConnected>
                    <MyProjects />
                  </CheckConnected>
                }
              />
              <Route
                path='/*'
                element={
                  <CheckConnected>
                    <Login />
                  </CheckConnected>
                }
              />
            </Routes>
          </BrowserRouter>
        </LoginContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App

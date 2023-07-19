import React, { useContext } from 'react'
import { LoginContext } from '../../Hooks/LoginContext'
import { NavLink } from 'react-router-dom'
import Wrapper from './MenuWrapper'
import Return from '../Navigation'

function Menu() {
  const { loggedIn } = useContext(LoginContext)

  return (
    <>
      {loggedIn[0].online && (
        <Wrapper>
          <Return location='/' content='Disconnect' />
          <section>
            <div className='menu-title'>Menu</div>
            <div className='menu-container'>
              <div className='nav-link-container'>
                <NavLink className='button-container btn' to='/addProject'>
                  <div className='btn-text'>
                    <p>Add a project</p>
                  </div>
                </NavLink>
              </div>
              {loggedIn[0].admin && (
                <div className='nav-link-container'>
                  <NavLink className='button-container btn' to='/projectList'>
                    <div className='btn-text'>
                      <p>All Projects</p>
                    </div>
                  </NavLink>
                </div>
              )}
              {loggedIn[0].admin && (
                <div className='nav-link-container'>
                  <NavLink
                    className='button-container btn'
                    to='/manageAccounts'
                  >
                    <div className='btn-text'>
                      <p>Manage Accounts</p>
                    </div>
                  </NavLink>
                </div>
              )}
              <div className='nav-link-container'>
                <NavLink to='/myProjects' className='button-container btn'>
                  <div className='btn-text'>
                    <p> My Projects</p>
                  </div>
                </NavLink>
              </div>
            </div>
          </section>
        </Wrapper>
      )}
    </>
  )
}
export default Menu

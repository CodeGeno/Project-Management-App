import React, { useState, useEffect, useContext } from 'react'
import Images from '../Images'
import { db } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { UserContext } from '../../Hooks/UserContext'
import Remove from '../Remove'
import Wrapper from './MyProjectsWrapper'
import Navigation from '../Navigation'

function MyProjects() {
  const [projects, setProjects] = useState([])
  const { userDetail } = useContext(UserContext)
  const projectsRef = collection(db, 'projets')
  const getProjects = async () => {
    const data = await getDocs(projectsRef)
    setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }
  useEffect(() => {
    getProjects()
  }, [])
  // const updateProject = async (id, field, value) => {
  //   const projectDoc = doc(db, 'projets', id)
  //   const updatedProject = { field: value }
  //   await updateDoc(projectDoc, updatedProject)
  // }

  return (
    <>
      <Wrapper>
        <div className='app-container'>
          <Navigation location='/menu' content='return' />
          <div className='project-list'>
            <div className='title-container'>
              <h1 className='banner'> My Projects</h1>
            </div>
            {projects.map((proj, index) => {
              const { projet, email, temps, accepted, commentaire, reponse } =
                proj
              if (userDetail[0]?.email === email) {
                return (
                  <div className='form' key={index}>
                    <div className='project-top-section'>
                      <div
                        className={
                          (accepted === null && 'pending') ||
                          (accepted && 'valide pending') ||
                          (accepted === false && 'refus pending')
                        }
                      >
                        {(accepted === null && <>Status: Pending</>) ||
                          (accepted && <>Status: Accepted</>) ||
                          (!accepted && <>Status: Declined</>)}
                      </div>
                      <Remove proj={proj} />
                    </div>
                    <div className='project-title'>Project Name:</div>
                    <div className='proj-text'>{projet}</div>
                    <div>
                      <div>
                        <div className='project-text'>Required Time:</div>
                        <p>{temps} heures</p>
                      </div>

                      <div>
                        <div className='project-text'>Comment:</div>
                        <p>{commentaire}</p>
                      </div>
                    </div>
                    {reponse.length > 0 && (
                      <div>
                        <div className='project-text'>Answer:</div>
                        <p>{reponse}</p>
                      </div>
                    )}

                    <Images proj={proj} />
                  </div>
                )
              } else return undefined
            })}
          </div>
        </div>
      </Wrapper>
    </>
  )
}
export default MyProjects

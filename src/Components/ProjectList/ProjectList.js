import React, { useState, useEffect } from 'react'
import Images from '../Images'
import Valider from '../Valider'
import { ProjectsContext } from '../../Hooks/ProjectsContext'
import { db } from '../../firebase'
import Remove from '../Remove'
import { collection, getDocs } from 'firebase/firestore'
import Wrapper from './ProjectListWrapper'
import Navigation from '../Navigation'

function ProjectList() {
  const [projects, setProjects] = useState([])
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
          <Navigation location='/menu' content='Return' />
          <div className='project-list'>
            <div className='title-container'>
              <h1 className='banner'> Liste des projets</h1>
            </div>
            {projects.map((proj, index) => {
              const { projet, temps, demandeur, accepted, commentaire } = proj

              return (
                <div className='form'>
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
                    <ProjectsContext.Provider value={{ projects, setProjects }}>
                      <Remove proj={proj} key={index} />
                    </ProjectsContext.Provider>
                  </div>
                  <div className='project-title'>Project Name:</div>
                  <div className='proj-text'>{projet}</div>
                  <div>
                    <div>
                      <div className='project-text'>Requested By:</div>
                      <p>{demandeur}</p>
                    </div>
                    <div>
                      <div className='project-text'>Required Time:</div>
                      <p>
                        {temps > 1
                          ? `${temps} Hours
                      `
                          : `${temps} Hour`}
                      </p>
                    </div>

                    <div>
                      <div className='project-text'>Comment:</div>
                      <p>{commentaire}</p>
                    </div>
                  </div>
                  <Images proj={proj} />
                  <ProjectsContext.Provider value={{ projects, setProjects }}>
                    <Valider proj={proj} key={index} />
                  </ProjectsContext.Provider>
                </div>
              )
            })}
          </div>
        </div>
      </Wrapper>
    </>
  )
}
export default ProjectList

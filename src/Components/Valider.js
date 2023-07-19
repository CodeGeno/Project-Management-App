import React, { useState, useContext } from 'react'
import { db } from '../firebase'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { ProjectsContext } from '../Hooks/ProjectsContext'

function Valider({ proj }) {
  const [showCommentaire, setShowCommentaire] = useState(false)
  const projectsRef = collection(db, 'projets')
  const getProjects = async () => {
    const data = await getDocs(projectsRef)
    setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  const updateProject = async (id, accepted, value) => {
    const projectDoc = doc(db, 'projets', id)
    const updatedProject = { accepted: value }
    await updateDoc(projectDoc, updatedProject)
    getProjects()
  }
  const updateComment = async (id, commentaire, value) => {
    const projectDoc = doc(db, 'projets', id)
    const updatedProject = { reponse: value }
    await updateDoc(projectDoc, updatedProject)
  }

  const { setProjects } = useContext(ProjectsContext)
  const { accepted, id, reponse } = proj

  const [rep, setRep] = useState(reponse)
  return (
    <>
      <div className='validation'>
        <button
          className='btn'
          onClick={() => {
            setShowCommentaire(!showCommentaire)
          }}
        >
          Valider le projet
        </button>
        {showCommentaire && (
          <>
            <textarea
              className='textproj'
              type='text'
              value={rep}
              onChange={(e) => {
                setRep(e.target.value)
              }}
            />
            <div className='btn-container'>
              <button
                className='btn'
                onClick={() => {
                  updateComment(id, reponse, rep)
                  updateProject(id, accepted, true)
                }}
              >
                Oui
              </button>
              <button
                className='btn'
                onClick={() => {
                  updateComment(id, reponse, rep)
                  updateProject(id, accepted, false)
                }}
              >
                Non
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
export default Valider

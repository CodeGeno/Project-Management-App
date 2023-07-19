import React, { useState, useContext, useEffect } from 'react'
import { LoginContext } from '../../Hooks/LoginContext'
import { storage, db } from '../../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import emailjs from 'emailjs-com'
import { UserContext } from '../../Hooks/UserContext'
import { IconButton } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'
import Wrapper from './AddingProjectWrapper'
import Navigation from '../Navigation'

function AddingProject() {
  const { loggedIn } = useContext(LoginContext)

  const [imagesNames, setImagesNames] = useState('')
  const date = new Date()
  const unique = `${date.getMonth() + 1}${date.getDate()}`
  const { userDetail } = useContext(UserContext)
  const projectsRef = collection(db, 'projets')
  const sendEmail = (e) => {
    e.preventDefault()
    emailjs
      .sendForm(
        'service_opht6io',
        'template_z2fig0n',
        e.target,
        '0asS03f9GTPAyUJMe'
      )
      .then((res) => {})
      .catch((err) => {})
  }

  const initialValue = [
    {
      uid: '',
      date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
      projet: '',
      demandeur: '',
      demande: '',
      commentaire: '',
      temps: '',
      accepted: false,
      email: userDetail[0]?.email,
      reponse: '',
    },
  ]

  const addProject = async () => {
    await addDoc(projectsRef, {
      email: userDetail[0].email,
      commentaire: formulaire[0].commentaire,
      UniqueId: unique,
      demandeur: loggedIn[0].name,
      demande: formulaire[0].demande,
      projet: formulaire[0].projet,
      temps: formulaire[0].temps,
      accepted: null,
      reponse: '',
    })
  }

  const [image, setImage] = useState([])
  const [formulaire, setFormulaire] = useState([
    {
      date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
      projet: '',
      demandeur: '',
      demande: '',
      commentaire: '',
      temps: '',
      accepted: false,
      reponse: '',
    },
  ])

  const imageUpload = () => {
    if (image.length === 0) {
    } else {
      for (let i = 0; i < image.length; i++) {
        const imageRef = ref(
          storage,
          `${loggedIn[0].name}-${formulaire[0].projet}${unique}/${image[i].name}`
        )
        uploadBytes(imageRef, image[i])
      }
    }
  }

  const handleFormularInputs = (e, index) => {
    const value = e.target.value
    const result = [...formulaire]
    result[0][index] = value
    setFormulaire(result)
  }
  useEffect(() => {
    let imgResult = []
    if (image.length > 0) {
      Array.from(image).forEach((img) => {
        imgResult.push(img.name)
      })
      setImagesNames(imgResult)
    }
  }, [image])

  return (
    <Wrapper className='form'>
      <div className='app-container'>
        <Navigation location='/menu' content='Return' className='btn' />

        <section>
          <div className='addproject-section'>
            <form
              className='addproject-container'
              onSubmit={(e) => {
                sendEmail(e)
              }}
            >
              <h1>Add A Task</h1>
              <label htmlFor='Nom du projet' className='form-label'>
                Project Name
              </label>
              <input
                className='form-input'
                type='text'
                value={formulaire[0].projet}
                name='projet'
                onChange={(e) => handleFormularInputs(e, 'projet')}
              />
              <label htmlFor='Temps nécessaire' className='form-label'>
                Required Time
              </label>
              <input
                className='form-input'
                type='number'
                placeholder='Required Time(hours)'
                value={formulaire[0].temps}
                name='temps'
                onChange={(e) => handleFormularInputs(e, 'temps')}
              />
              <label htmlFor='Commentaire' className='form-label'>
                Comment
              </label>
              <textarea
                className='text-area'
                type='text'
                name='commentaire'
                value={formulaire[0].commentaire}
                onChange={(e) => handleFormularInputs(e, 'commentaire')}
              />
              <div>
                <label htmlFor='Commentaire' className='form-label'>
                  Pictures
                </label>
                <div>
                  {imagesNames.length > 0 &&
                    imagesNames.map((img, index) => (
                      <p key={index * index}>{img}</p>
                    ))}
                </div>
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='label'
                >
                  <input
                    multiple
                    onChange={(e) => {
                      setImage(e.target.files)
                    }}
                    hidden
                    accept='image/*'
                    type='file'
                  />
                  <PhotoCamera sx={{ fontSize: '48px' }} />
                </IconButton>
              </div>

              <button
                className='btn'
                type='submit'
                onClick={() => {
                  addProject()
                  imageUpload()
                  setFormulaire(initialValue)
                }}
              >
                Envoyer
              </button>
            </form>
          </div>
        </section>
      </div>
    </Wrapper>
  )
}
export default AddingProject

import React, { useState } from 'react'

import { db, storage } from '../firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import { listAll } from 'firebase/storage'
function Remove({ proj }) {
  const { projet, demandeur, id, UniqueId } = proj

  const [removeCheck, setRemoveCheck] = useState(false)
  const deleteProject = async (id) => {
    if (removeCheck) {
      const projectDoc = doc(db, 'projets', id)
      await deleteDoc(projectDoc)
    } else {
      setRemoveCheck(true)
    }
  }
  const removeImages = (var1, var2, UnId) => {
    if (removeCheck) {
      const imageListRef = ref(
        storage,
        `${var1}-${var2}${UnId !== undefined ? `{UnId}` : ''}/`
      )
      listAll(imageListRef).then((images) => {
        images.items.map((image) => {
          const deleteImgRef = ref(storage, `${image._location.path}`)
          deleteObject(deleteImgRef)
            .then(() => {
              console.log('success')
            })
            .catch((error) => {
              console.log(error)
            })
        })
      })
    }
  }
  return (
    <button
      className='btn'
      onClick={() => {
        deleteProject(id)
        removeImages(demandeur, projet, UniqueId)
      }}
    >
      {removeCheck ? 'Confirm' : 'Delete project'}
    </button>
  )
}
export default Remove

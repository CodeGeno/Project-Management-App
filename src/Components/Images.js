import React, { useState, useEffect } from 'react'
import { storage } from '../firebase'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
function Images({ proj }) {
  const [showImages, setShowImages] = useState(false)
  const [imageList, setImageList] = useState([])
  const imageListRef = ref(
    storage,
    `${proj.demandeur}-${proj.projet}${
      proj.UniqueId !== undefined ? `${proj.UniqueId}` : ''
    }/`
  )
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url])
        })
      })
    })
  }, [])

  return (
    <>
      <div className='validation'>
        {imageList.length > 0 && (
          <button
            className='btn'
            onClick={() => {
              setShowImages(!showImages)
            }}
          >
            {showImages ? (
              'Hide Images'
            ) : (
              <>{imageList?.length > 1 ? 'Display images' : `Display image`}</>
            )}
          </button>
        )}
        <div className='project-img-box'>
          {showImages &&
            imageList.length > 0 &&
            imageList.map((image, ind) => {
              return (
                <div key={ind} className='project-img'>
                  <a href={image} target='_blank'>
                    <img className='img' src={image} />
                  </a>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}
export default Images

import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from '@firebase/firestore'
const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE)

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)

export const db = getFirestore(app)

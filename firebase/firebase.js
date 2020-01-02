import { firebaseConfig } from './config'
import firebase from 'firebase'
import 'firebase/firestore' // Required for side-effects

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.firestore()

import { firebaseConfig } from './config'
import firebase from 'firebase'

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.firestore()

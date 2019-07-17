import * as ActionTypes from './ActionTypes'
import { auth } from '../firebase/firebase'

// export const getCheckins = () => (dispatch) => {
//   dispatch(getCheckinsRequestedAction())
//
//   return firestore.collection('checkins').get()
//     .then(
//       snapshot => {
//         let checkins = []
//         snapshot.forEach(
//           doc => {
//             const data = doc.data()
//             const _id = doc.id
//             checkins.push({ _id, ...data })
//           }
//         )
//         return checkins
//       }
//     )
//     .then(checkins => dispatch(getCheckinsFulfilledAction(checkins)))
//     .catch(error => dispatch(getCheckinsRejectedAction(error.message)))
// }
//
// export const getCheckinsRequestedAction = () => (
//   {
//     type: ActionTypes.GET_CHECKINS_REQUESTED
//   }
// )
//
// export const getCheckinsRejectedAction = (errmess) => (
//   {
//     type: ActionTypes.GET_CHECKINS_REJECTED,
//     payload: errmess
//   }
// )
//
// export const getCheckinsFulfilledAction = (checkins) => (
//   {
//     type: ActionTypes.GET_CHECKINS_FULFILLED,
//     payload: checkins
//   }
// )

export const loginUser = (creds) => (dispatch) => {
  dispatch(loginRequestedAction(creds))

  return auth.signInWithEmailAndPassword(creds.username, creds.password)
    .then(
      () => {
        var user = auth.currentUser
        dispatch(loginFulfilledAction(user))
      }
    )
    .catch(error => dispatch(loginRejectedAction(error.message)))
}

export const loginRequestedAction = () => {
  return {
    type: ActionTypes.LOGIN_REQUESTED
  }
}

export const loginRejectedAction = (message) => {
  return {
    type: ActionTypes.LOGIN_REJECTED,
    payload: message
  }
}

export const loginFulfilledAction = (user) => {
  return {
    type: ActionTypes.LOGIN_FULFILLED,
    payload: user
  }
}

export const logoutUser = () => (dispatch) => {
  dispatch(logoutRequestedAction())

  auth.signOut()
    .then(
      () => {
        dispatch(logoutFulfilledAction())
      }
    )
    .catch((error) => { logoutRejectedAction(error.message) })
}

export const logoutRequestedAction = () => {
  return {
    type: ActionTypes.LOGOUT_REQUESTED
  }
}

export const logoutRejectedAction = (message) => {
  return {
    type: ActionTypes.LOGOUT_REJECTED,
    payload: message
  }
}

export const logoutFulfilledAction = () => {
  return {
    type: ActionTypes.LOGOUT_FULFILLED
  }
}

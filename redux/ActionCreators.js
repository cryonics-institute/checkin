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
//     type: ActionTypes.GetCheckinsRequested
//   }
// )
//
// export const getCheckinsRejectedAction = (errmess) => (
//   {
//     type: ActionTypes.GetCheckinsRejected,
//     payload: errmess
//   }
// )
//
// export const getCheckinsFulfilledAction = (checkins) => (
//   {
//     type: ActionTypes.GetCheckinsFulfilled,
//     payload: checkins
//   }
// )

export const loginUser = (creds) => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API
  dispatch(loginRequestedAction(creds))

  return auth.signInWithEmailAndPassword(creds.username, creds.password)
    .then(
      () => {
        var user = auth.currentUser
        // localStorage.setItem('user', JSON.stringify(user))
        // Dispatch the success action
        dispatch(loginFulfilledAction(user))
      }
    )
    .catch(error => dispatch(loginRejectedAction(error.message)))
}

export const loginRequestedAction = () => {
  return {
    type: ActionTypes.LoginRequested
  }
}

export const loginRejectedAction = (message) => {
  return {
    type: ActionTypes.LoginRejected,
    message
  }
}

export const loginFulfilledAction = (user) => {
  return {
    type: ActionTypes.LoginFulfilled,
    user
  }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
  dispatch(logoutRequestedAction())

  auth.signOut()
    .then(() => {}) // Sign-out successful.
    .catch((error) => { logoutRejectedAction(error.message) })
  localStorage.removeItem('user')
  dispatch(logoutFulfilledAction())
}

export const logoutRequestedAction = () => {
  return {
    type: ActionTypes.LogoutRequested
  }
}

export const logoutRejectedAction = (message) => {
  return {
    type: ActionTypes.LogoutRejected,
    message
  }
}

export const logoutFulfilledAction = () => {
  return {
    type: ActionTypes.LogoutFulfilled
  }
}

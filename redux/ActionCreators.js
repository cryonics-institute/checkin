import * as ActionTypes from './ActionTypes'
import { auth } from '../firebase/firebase'
import NavigationService from '../services/NavigationService'

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
      },
      error => {
        var errmess = new Error(error.message)
        throw errmess
      }
    )
    .then(
      () => {
        NavigationService.navigate('App')
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
      },
      error => {
        var errmess = new Error(error.message)
        throw errmess
      }
    )
    .then(
      () => {
        NavigationService.navigate('Auth')
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

export const registerUser = (creds) => (dispatch) => {
  dispatch(registrationRequestedAction(creds))

  return auth.createUserWithEmailAndPassword(creds.username, creds.password)
    .then(
      () => {
        dispatch(registrationFulfilledAction())
        return auth.signInWithEmailAndPassword(creds.username, creds.password)
      },
      error => {
        var errmess = new Error(error.message)
        throw errmess
      }
    )
    .then(
      () => {
        var user = auth.currentUser
        dispatch(loginFulfilledAction(user))
      },
      error => {
        var errmess = new Error(error.message)
        throw errmess
      }
    )
    .then(
      () => {
        NavigationService.navigate('App')
      }
    )
    .catch(error => dispatch(registrationRejectedAction(error.message)))
}

export const registrationRequestedAction = () => {
  return {
    type: ActionTypes.REGISTRATION_REQUESTED
  }
}

export const registrationRejectedAction = (message) => {
  return {
    type: ActionTypes.REGISTRATION_REJECTED,
    payload: message
  }
}

export const registrationFulfilledAction = () => {
  return {
    type: ActionTypes.REGISTRATION_FULFILLED
  }
}

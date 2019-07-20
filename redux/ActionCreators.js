import * as ActionTypes from './ActionTypes'
import { auth, db, firestore } from '../firebase/firebase'
import NavigationService from '../services/NavigationService'

export const addUser = () => (dispatch) => {
  dispatch(addUserRequestedAction())

  return auth.currentUser.getIdToken()
    .then(
      (userToken) => {
        return db.collection('users').doc(userToken).set(
          {
            signinTime: firestore.Timestamp.now()
          }
        )
      },
      error => {
        var errmess = new Error(error.message)
        throw errmess
      }
    )
    .then(
      () => {
        dispatch(addUserFulfilledAction())
      }
    )
    .catch(error => dispatch(addUserRejectedAction(error.message)))
}

export const addUserRequestedAction = () => (
  {
    type: ActionTypes.ADD_USER_REQUESTED
  }
)

export const addUserRejectedAction = (errmess) => (
  {
    type: ActionTypes.ADD_USER_REJECTED,
    payload: errmess
  }
)

export const addUserFulfilledAction = () => (
  {
    type: ActionTypes.ADD_USER_FULFILLED
  }
)

export const checkin = () => (dispatch) => {
  dispatch(checkinRequestedAction())

  return auth.currentUser.getIdToken()
    .then(
      (userToken) => {
        return db.collection('users').doc(userToken).update(
          {
            checkinTime: firestore.Timestamp.now()
          }
        )
      },
      error => {
        var errmess = new Error(error.message)
        throw errmess
      }
    )
    .then(
      () => {
        dispatch(checkinFulfilledAction())
      }
    )
    .catch(error => dispatch(checkinRejectedAction(error.message)))
}

export const checkinRequestedAction = () => (
  {
    type: ActionTypes.CHECKIN_REQUESTED
  }
)

export const checkinRejectedAction = (errmess) => (
  {
    type: ActionTypes.CHECKIN_REJECTED,
    payload: errmess
  }
)

export const checkinFulfilledAction = () => (
  {
    type: ActionTypes.CHECKIN_FULFILLED
  }
)

export const removeUser = (userToken) => (dispatch) => {
  dispatch(removeUserRequestedAction())

  return db.collection('users').doc(userToken).delete()
    .then(
      () => {
        dispatch(removeUserFulfilledAction())
      }
    )
    .catch(error => dispatch(removeUserRejectedAction(error.message)))
}

export const removeUserRequestedAction = () => (
  {
    type: ActionTypes.REMOVE_USER_REQUESTED
  }
)

export const removeUserRejectedAction = (errmess) => (
  {
    type: ActionTypes.REMOVE_USER_REJECTED,
    payload: errmess
  }
)

export const removeUserFulfilledAction = () => (
  {
    type: ActionTypes.REMOVE_USER_FULFILLED
  }
)

export const signinUser = (creds) => (dispatch) => {
  dispatch(signinRequestedAction(creds))

  return auth.signInWithEmailAndPassword(creds.username, creds.password)
    .then(
      () => {
        var user = auth.currentUser
        dispatch(signinFulfilledAction(user))
      }
    )
    .then(
      () => {
        dispatch(addUser())
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
    .catch(error => dispatch(signinRejectedAction(error.message)))
}

export const signinRequestedAction = () => {
  return {
    type: ActionTypes.SIGNIN_REQUESTED
  }
}

export const signinRejectedAction = (message) => {
  return {
    type: ActionTypes.SIGNIN_REJECTED,
    payload: message
  }
}

export const signinFulfilledAction = (user) => {
  return {
    type: ActionTypes.SIGNIN_FULFILLED,
    payload: user
  }
}

export const signoutUser = () => (dispatch) => {
  dispatch(signoutRequestedAction())

  return auth.currentUser.getIdToken()
    .then(
      (userToken) => {
        dispatch(removeUser(userToken))
      },
      error => {
        var errmess = new Error(error.message)
        throw errmess
      }
    )
    .then(
      () => {
        auth.signOut()
      },
      error => {
        var errmess = new Error(error.message)
        throw errmess
      }
    )
    .then(
      () => {
        dispatch(signoutFulfilledAction())
      }
    )
    .then(
      () => {
        NavigationService.navigate('Auth')
      }
    )
    .catch((error) => { signoutRejectedAction(error.message) })
}

export const signoutRequestedAction = () => {
  return {
    type: ActionTypes.SIGNOUT_REQUESTED
  }
}

export const signoutRejectedAction = (message) => {
  return {
    type: ActionTypes.SIGNOUT_REJECTED,
    payload: message
  }
}

export const signoutFulfilledAction = () => {
  return {
    type: ActionTypes.SIGNOUT_FULFILLED
  }
}

export const registerUser = (creds) => (dispatch) => {
  dispatch(registrationRequestedAction(creds))

  return auth.createUserWithEmailAndPassword(creds.username, creds.password)
    .then(
      () => {
        dispatch(registrationFulfilledAction())
      }
    )
    .then(
      () => {
        dispatch(signinUser(creds))
      },
      error => {
        var errmess = new Error(error.message)
        throw errmess
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

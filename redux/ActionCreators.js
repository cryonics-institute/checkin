import * as ActionTypes from './ActionTypes'
import { auth, db, firestore } from '../firebase/firebase'
import NavigationService from '../services/NavigationService'

export const addUser = () => (dispatch) => {
  dispatch(addUserRequestedAction())

  return auth.currentUser.getIdToken()
    .then(
      userToken => {
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
        dispatch(setTimerRequestedAction())

        return setTimeout(
          () => { console.log('000000000000000000000') },
          10000
        )
      },
      error => {
        var errmess = new Error(error.message)
        dispatch(setTimerRejectedAction(errmess))
        throw errmess
      }
    )
    .then(
      (newTimer) => {
        dispatch(setTimerFulfilledAction(newTimer))
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
      userToken => {
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
        dispatch(setTimerRequestedAction())

        return setTimeout(() => { console.log('TIMEOUT SET') }, 5000)
      },
      error => {
        var errmess = new Error(error.message)
        dispatch(setTimerRejectedAction(errmess))
        throw errmess
      }
    )
    .then(
      (newTimer) => {
        dispatch(setTimerFulfilledAction(newTimer))
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

export const clearTimerFulfilledAction = () => (
  {
    type: ActionTypes.CLEAR_TIMER_FULFILLED
  }
)

export const registerUser = (creds) => (dispatch) => {
  dispatch(registrationRequestedAction())

  return auth.createUserWithEmailAndPassword(creds.username, creds.password)
    .then(
      () => {
        dispatch(registrationFulfilledAction())
        dispatch(signinUser(creds))
      },
      error => {
        var errmess = new Error(error.message)
        throw errmess
      }
    )
    .catch(error => dispatch(registrationRejectedAction(error.message)))
}

export const registrationRequestedAction = () => (
  {
    type: ActionTypes.REGISTRATION_REQUESTED
  }
)

export const registrationRejectedAction = (message) => (
  {
    type: ActionTypes.REGISTRATION_REJECTED,
    payload: message
  }
)

export const registrationFulfilledAction = () => (
  {
    type: ActionTypes.REGISTRATION_FULFILLED
  }
)

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

export const setTimerRequestedAction = () => (
  {
    type: ActionTypes.SET_TIMER_REQUESTED
  }
)

export const setTimerRejectedAction = (message) => (
  {
    type: ActionTypes.SET_TIMER_REJECTED,
    payload: message
  }
)

export const setTimerFulfilledAction = (timer) => (
  {
    type: ActionTypes.SET_TIMER_FULFILLED,
    payload: timer
  }
)

export const signinUser = (creds) => (dispatch) => {
  dispatch(signinRequestedAction(creds))

  return auth.signInWithEmailAndPassword(creds.username, creds.password)
    .then(
      () => {
        NavigationService.navigate('App')
        var user = auth.currentUser
        dispatch(signinFulfilledAction(user))
        dispatch(addUser())
      },
      error => {
        var errmess = new Error(error.message)
        throw errmess
      }
    )
    .catch(error => dispatch(signinRejectedAction(error.message)))
}

export const signinRequestedAction = () => (
  {
    type: ActionTypes.SIGNIN_REQUESTED
  }
)

export const signinRejectedAction = (message) => (
  {
    type: ActionTypes.SIGNIN_REJECTED,
    payload: message
  }
)

export const signinFulfilledAction = (user) => (
  {
    type: ActionTypes.SIGNIN_FULFILLED,
    payload: user
  }
)

export const signoutUser = (oldTimer) => (dispatch) => {
  dispatch(signoutRequestedAction())

  return auth.currentUser.getIdToken()
    .then(
      userToken => {
        dispatch(removeUserRequestedAction())
        return db.collection('users').doc(userToken).delete()
      },
      error => {
        var errmess = new Error(error.message)
        dispatch(removeUserRejectedAction(errmess))
        throw errmess
      }
    )
    .then(
      () => {
        auth.signOut()
        clearTimeout(oldTimer.id)
        NavigationService.navigate('Auth')
        dispatch(clearTimerFulfilledAction())
        dispatch(removeUserFulfilledAction())
        dispatch(signoutFulfilledAction())
      },
      error => {
        var errmess = new Error(error.message)
        throw errmess
      }
    )
    .catch((error) => { signoutRejectedAction(error.message) })
}

export const signoutRequestedAction = () => (
  {
    type: ActionTypes.SIGNOUT_REQUESTED
  }
)

export const signoutRejectedAction = (message) => (
  {
    type: ActionTypes.SIGNOUT_REJECTED,
    payload: message
  }
)

export const signoutFulfilledAction = () => (
  {
    type: ActionTypes.SIGNOUT_FULFILLED
  }
)

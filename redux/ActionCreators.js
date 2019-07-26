import { Alert } from 'react-native'
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
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      () => {
        dispatch(addUserFulfilledAction())
        dispatch(setTimer())
      }
    )
    .catch(error => dispatch(addUserRejectedAction(error.message)))
}

export const addUserRequestedAction = () => (
  {
    type: ActionTypes.ADD_USER_REQUESTED
  }
)

export const addUserRejectedAction = (errorMessage) => (
  {
    type: ActionTypes.ADD_USER_REJECTED,
    payload: errorMessage
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
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      () => {
        dispatch(checkinFulfilledAction())
        dispatch(setTimer())
      }
    )
    .catch(error => dispatch(checkinRejectedAction(error.message)))
}

export const checkinRequestedAction = () => (
  {
    type: ActionTypes.CHECKIN_REQUESTED
  }
)

export const checkinRejectedAction = (errorMessage) => (
  {
    type: ActionTypes.CHECKIN_REJECTED,
    payload: errorMessage
  }
)

export const checkinFulfilledAction = () => (
  {
    type: ActionTypes.CHECKIN_FULFILLED
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
        var errorMessage = new Error(error.message)
        throw errorMessage
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

export const setTimer = () => (dispatch, getState) => {
  const checkinAlert = () => {
    if (getState().timer.interval !== 0) {
      Alert.alert(
        'Check In?',
        'Your standby team will be alerted if not.',
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed')
              dispatch(checkin())
            }
          },
          {
            text: 'Cancel',
            onPress: () => {
              console.log('Cancel Pressed')
              dispatch(setTimerFulfilledAction(0))
            },
            style: 'cancel'
          }
        ],
        { cancelable: false }
      )
    }
  }

  const later = (delay) => {
    return new Promise(
      (resolve) => {
        resolve(
          setTimeout(
            () => {
              checkinAlert()
            },
            delay
          )
        )
      }
    )
  }

  dispatch(setTimerRequestedAction())

  // const interval = getState().timer.interval
  const interval = 10000
  return later(interval)
    .then(
      () => { dispatch(setTimerFulfilledAction(interval)) },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => dispatch(setTimerRejectedAction(error.message)))
}

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

export const setTimerFulfilledAction = (interval) => (
  {
    type: ActionTypes.SET_TIMER_FULFILLED,
    payload: interval
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
        var errorMessage = new Error(error.message)
        throw errorMessage
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
    type: ActionTypes.SIGNIN_FULFILLED
  }
)

export const signoutUser = () => (dispatch) => {
  dispatch(signoutRequestedAction())
  dispatch(setTimerRequestedAction())

  return auth.currentUser.getIdToken()
    .then(
      userToken => {
        return db.collection('users').doc(userToken).delete()
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      () => {
        dispatch(setTimerFulfilledAction(0))
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      () => {
        auth.signOut()
        dispatch(signoutFulfilledAction())
        NavigationService.navigate('Auth')
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(
      (error) => {
        signoutRejectedAction(error.message)
        setTimerRejectedAction(error.message)
      }
    )
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

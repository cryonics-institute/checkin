import { Alert } from 'react-native'
import * as ActionTypes from './ActionTypes'
import { auth, db, firestore } from '../firebase/firebase'
import NavigationService from '../services/NavigationService'

export const getDocument = () => (dispatch) => {
  dispatch(getDocumentRequestedAction())

  return db.collection('users').doc('a@a.aa').get()
    .then(
      doc => {
        if (doc.exists) {
          const signinTime = doc.data().signinTime.toDate()
          const checkinTime = doc.data().checkinTime.toDate()

          return [signinTime, checkinTime]
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
      }
    )
    .then(
      (data) => {
        dispatch(getDocumentFulfilledAction(data))
      }
    )
    .catch(error => dispatch(getDocumentRejectedAction(error.message)))
}

export const getDocumentRequestedAction = () => (
  {
    type: ActionTypes.GET_DOCUMENT_REQUESTED
  }
)

export const getDocumentRejectedAction = (errorMessage) => (
  {
    type: ActionTypes.GET_DOCUMENT_REJECTED,
    payload: errorMessage
  }
)

export const getDocumentFulfilledAction = (data) => (
  {
    type: ActionTypes.GET_DOCUMENT_FULFILLED,
    payload: data
  }
)

export const addDocument = () => (dispatch, getState) => {
  dispatch(addDocumentRequestedAction())

  return db.collection('users').doc(getState().auth.user.email).set(
    {
      signinTime: firestore.Timestamp.now()
    }
  )
    .then(
      () => {
        dispatch(addDocumentFulfilledAction())
        dispatch(setTimer(5000))
        NavigationService.navigate('App')
      }
    )
    .catch(error => dispatch(addDocumentRejectedAction(error.message)))
}

export const addDocumentRequestedAction = () => (
  {
    type: ActionTypes.ADD_DOCUMENT_REQUESTED
  }
)

export const addDocumentRejectedAction = (errorMessage) => (
  {
    type: ActionTypes.ADD_DOCUMENT_REJECTED,
    payload: errorMessage
  }
)

export const addDocumentFulfilledAction = () => (
  {
    type: ActionTypes.ADD_DOCUMENT_FULFILLED
  }
)

export const checkin = () => (dispatch, getState) => {
  dispatch(checkinRequestedAction())

  return db.collection('users').doc(getState().auth.user.email).update(
    {
      checkinTime: firestore.Timestamp.now()
    }
  )
    .then(
      () => {
        dispatch(checkinFulfilledAction())
        dispatch(setTimer(getState().timer.interval))
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

export const registerPatient = (creds) => (dispatch) => {
  dispatch(registrationRequestedAction())

  return auth.createUserWithEmailAndPassword(creds.username, creds.password)
    .then(
      (userCredential) => {
        dispatch(registrationFulfilledAction(userCredential.user))
        dispatch(addDocument())
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => dispatch(registrationRejectedAction(error.message)))
}

export const registerStandby = (creds) => (dispatch) => {
  dispatch(registrationRequestedAction())

  return auth.createUserWithEmailAndPassword(creds.username, creds.password)
    .then(
      (userCredential) => {
        dispatch(registrationFulfilledAction(userCredential.user))
        NavigationService.navigate('App')
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

export const registrationFulfilledAction = (user) => (
  {
    type: ActionTypes.REGISTRATION_FULFILLED,
    payload: user
  }
)

export const removeTimer = (timer) => (dispatch, getState) => {
  clearTimeout(timer)

  const timers = getState().timer.timers
  const index = timers.indexOf(timer)
  if (index > -1) {
    timers.splice(index, 1)
  }

  dispatch(removeTimerAction(timers))
}

export const removeTimerAction = (newTimers) => (
  {
    type: ActionTypes.REMOVE_TIMER,
    payload: newTimers
  }
)

export const removeTimers = () => (dispatch, getState) => {
  getState().timer.timers.forEach(timer => clearTimeout(timer))
  dispatch(removeTimersAction())
}

export const removeTimersAction = () => (
  {
    type: ActionTypes.REMOVE_TIMERS
  }
)

export const selectStatus = (isPatient) => (dispatch) => {
  dispatch(selectStatusAction(isPatient))
}

export const selectStatusAction = (isPatient) => (
  {
    type: ActionTypes.SELECT_STATUS,
    payload: isPatient
  }
)

export const setTimerInterval = (interval) => (dispatch, getState) => {
  dispatch(setTimerIntervalAction(interval))
}

export const setTimerIntervalAction = (interval) => (
  {
    type: ActionTypes.SET_TIMER_INTERVAL,
    payload: interval
  }
)

export const setTimer = (interval) => (dispatch, getState) => {
  const checkinAlert = () => {
    const timers = getState().timer.timers
    if (typeof timers !== 'undefined' && timers.length > 0) {
      Alert.alert(
        'Check In?',
        'Your standby team will be alerted if not.',
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed')
              dispatch(removeTimers())
              dispatch(checkin())
            }
          },
          {
            text: 'Cancel',
            onPress: () => {
              console.log('Cancel Pressed')
              dispatch(removeTimers())
            },
            style: 'cancel'
          }
        ],
        { cancelable: false }
      )
    }
  }

  dispatch(setTimerRequestedAction())
  dispatch(setTimerInterval(interval))

  return Promise.resolve(
    setTimeout(
      () => { checkinAlert() },
      getState().timer.interval
    )
  )
    .then(
      (timer) => {
        dispatch(setTimerFulfilledAction(timer))
      },
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

export const setTimerFulfilledAction = (timer) => (
  {
    type: ActionTypes.SET_TIMER_FULFILLED,
    payload: timer
  }
)

export const signinPatient = (creds) => (dispatch) => {
  dispatch(signinRequestedAction(creds))

  return auth.signInWithEmailAndPassword(creds.username, creds.password)
    .then(
      (userCredential) => {
        dispatch(signinFulfilledAction(userCredential.user))
        dispatch(addDocument())
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => dispatch(signinRejectedAction(error.message)))
}

export const signinStandby = (creds) => (dispatch) => {
  dispatch(signinRequestedAction(creds))

  return auth.signInWithEmailAndPassword(creds.username, creds.password)
    .then(
      (userCredential) => {
        dispatch(signinFulfilledAction(userCredential.user))
        NavigationService.navigate('App')
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
    type: ActionTypes.SIGNIN_FULFILLED,
    payload: user
  }
)

export const signoutPatient = () => (dispatch, getState) => {
  dispatch(signoutRequestedAction())

  return db.collection('users').doc(getState().auth.user.email).delete()
    .then(
      () => {
        auth.signOut()
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      () => {
        dispatch(removeTimers())
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
      }
    )
}

export const signoutStandby = () => (dispatch, getState) => {
  dispatch(signoutRequestedAction())

  return auth.signOut()
    .then(
      () => {
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

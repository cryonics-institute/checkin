/**
 * Redux store for the project, Check-In.
 *
 * @author Michael David Gill <michaelgill1969@gmail.com>
 * @license
 * Copyright 2019 Cryonics Institute
 *
 * This file is part of Check-In.
 *
 * Check-In is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * Check-In is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Check-In.  If not, see <https://www.gnu.org/licenses/>.
 */

// @flow
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import createSensitiveStorage from 'redux-persist-sensitive-storage'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import AsyncStorage from '@react-native-community/async-storage'
import { Auth } from './authReducer'
import { Buddy } from './buddyReducer'
import { Device } from './deviceReducer'
import { Inputs } from './inputsReducer'
import { Listener } from './listenerReducer'
import { Timer } from './timerReducer'
import { Token } from './tokenReducer'
import { User } from './userReducer'

type StateGetter = () => {
  auth: {
    +errorMessage: string,
    +user: Object
  },
  buddy: {
    +alertTimes: Array<{| id: string, time: string, validity: boolean |}>,
    checkinInterval: ?number,
    +checkinTime: string,
    +email: string,
    +errorMessage: string,
    isAdded: ?boolean,
    +lastAlertTime: string,
    +snooze: number
  },
  device: {
    +errorMessage: string,
    +token: string
  },
  inputs: {
    +alertTimes: Array<{| id: string, time: string, validity: boolean |}>,
    +errorMessage: string,
    +height: number,
    +showTip: boolean
  },
  listener: {
    +errorMessage: string,
    +interval: number,
    +listeners: Array<number>
  },
  timer: {
    +errorMessage: string,
    +interval: number,
    +timers: Array<number>
  },
  token: {
    +errorMessage: string,
    +username: string,
    +password: string
  },
  user: {
    checkinInterval: ?number,
    +checkinTime: string,
    +errorMessage: string,
    isSignedIn: ?boolean,
    +lastAlertTime: string,
    +longestSnooze: number,
    +shortestInterval: number,
    +snooze: number
  }
}

type Persistor = {
  +dispatch: (() => void) => void,
  +flush: (any) => void,
  +getState: StateGetter,
  +pause: (any) => void,
  +persist: (any) => void,
  +purge: (any) => void,
  +replaceReducer: (any) => void,
  +subscribe: (() => void) => () => void
}

type Store = {
  +dispatch: (() => void) => void,
  +getState: StateGetter,
  +replaceReducer: (any) => void,
  +subscribe: (() => void) => () => void
}

const sensitiveStorage = createSensitiveStorage(
  {
    keychainService: 'keychain',
    sharedPreferencesName: 'sharedPrefs'
  }
)

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage
}

const buddyPersistConfig = {
  key: 'buddy',
  storage: AsyncStorage
}

const devicePersistConfig = {
  key: 'device',
  storage: AsyncStorage
}

const inputsPersistConfig = {
  key: 'inputs',
  storage: AsyncStorage
}

const listenerPersistConfig = {
  key: 'listener',
  storage: AsyncStorage
}

const timerPersistConfig = {
  key: 'timer',
  storage: AsyncStorage
}

const tokenPersistConfig = {
  key: 'token',
  storage: sensitiveStorage
}

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage
}

const rootReducer = combineReducers(
  {
    auth: persistReducer(authPersistConfig, Auth),
    buddy: persistReducer(buddyPersistConfig, Buddy),
    device: persistReducer(devicePersistConfig, Device),
    inputs: persistReducer(inputsPersistConfig, Inputs),
    listener: persistReducer(listenerPersistConfig, Listener),
    timer: persistReducer(timerPersistConfig, Timer),
    token: persistReducer(tokenPersistConfig, Token),
    user: persistReducer(userPersistConfig, User)
  }
)

export const ConfigureStore = () => {
  const store: Store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
  )
  const persistor: Persistor = persistStore(store)

  return { store, persistor }
}

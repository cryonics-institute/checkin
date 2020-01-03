/**
 * Redux store for the project, Cryonics Check-In.
 *
 * @author Michael David Gill <michaelgill1969@gmail.com>
 * @license
 * Copyright 2019 Cryonics Institute
 *
 * This file is part of Cryonics Check-In.
 *
 * Cryonics Check-In is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * Cryonics Check-In is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Cryonics Check-In.  If not, see <https://www.gnu.org/licenses/>.
 */

import AsyncStorage from '@react-native-community/async-storage'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import createSensitiveStorage from 'redux-persist-sensitive-storage'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'remote-redux-devtools' // TODO: Remove before compiling to production.
import { Auth } from './authReducer'
import { Inputs } from './inputsReducer'
import { Patient } from './patientReducer'
import { Timer } from './timerReducer'
import { Token } from './tokenReducer'

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

const inputsPersistConfig = {
  key: 'inputs',
  storage: AsyncStorage
}

const patientPersistConfig = {
  key: 'patient',
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

const rootReducer = combineReducers(
  {
    auth: persistReducer(authPersistConfig, Auth),
    inputs: persistReducer(inputsPersistConfig, Inputs),
    patient: persistReducer(patientPersistConfig, Patient),
    timer: persistReducer(timerPersistConfig, Timer),
    token: persistReducer(tokenPersistConfig, Token)
  }
)

export const ConfigureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, logger))
  )
  const persistor = persistStore(store)

  return { store, persistor }
}

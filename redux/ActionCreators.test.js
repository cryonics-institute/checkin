/**
 * Tests for Redux action-creators for the project, Cryonics Check-In.
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

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import * as Actions from './ActionCreators'
import * as ActionTypes from './ActionTypes'

const middlewares = [thunk, logger]
const mockStore = configureStore(middlewares)

describe(
  'selectAvatar',
  () => {
    test(
      'setListener',
      async () => {
        beforeEach(
          () => { // Runs before each test in the suite
            store.clearActions()
          }
        )

        const expectedActions = {
          type: ActionTypes.SET_LISTENER_REQUESTED
        }
        const store = mockStore(
          {
            patient: {
              alertTimes: [
                {
                  id: 'RiK-fQFj',
                  time: '1970-01-01T06:00:00.000Z',
                  validity: true
                },
                {
                  id: 'vgsRueN0',
                  time: '1970-01-01T12:00:00.000Z',
                  validity: true
                },
                {
                  id: 'IUIPqCHx',
                  time: '1970-01-01T18:00:00.000Z',
                  validity: true
                },
                {
                  id: 'SakR1lCV',
                  time: '1970-01-02T00:00:00.000Z',
                  validity: true
                }
              ],
              checkinInterval: 5000,
              checkinTime: '2019-10-31T22:47:02.340Z',
              email: 'a@a.aa',
              errMess: null,
              isSignedIn: true,
              listeners: [],
              signinTime: '2019-10-31T22:45:35.794Z',
              snooze: 9
            }
          }
        )

        await store.dispatch(Actions.setListener('a@a.aa'))
        // await expect(store.getState().patient.isSignedIn).toBeTruthy()
        await expect(store.getActions()).toContainEqual(expectedActions)
      }
    )
  }
)


// [
//   {"type": "SET_LISTENER_REQUESTED"},
//   {"type": "GET_DOCUMENT_REQUESTED"},
//   {"payload": "Missing or insufficient permissions.", "type": "GET_DOCUMENT_REJECTED"},
//   {"type": "REMOVE_LISTENERS"},
//   {
//     "payload": {
//       "_called": false,
//       "_destroyed": false,
//       "_idleNext": {
//         "_idleNext": [Circular],
//         "_idlePrev": [Circular],
//         "_timer": {"_list": [Circular]},
//         "_unrefed": false,
//         "msecs": 60000
//       },
//       "_idlePrev": {
//         "_idleNext": [Circular],
//         "_idlePrev": [Circular],
//         "_timer": {"_list": [Circular]},
//         "_unrefed": false,
//         "msecs": 60000
//       },
//       "_idleStart": 6983,
//       "_idleTimeout": 60000,
//       "_onTimeout": [Function anonymous],
//       "_repeat": null,
//       "_timerArgs": undefined,
//       Symbol(unrefed): false,
//       Symbol(asyncId): 180,
//       Symbol(triggerId): 177
//     },
//     "type": "SET_LISTENER_FULFILLED"
//   }
// ]

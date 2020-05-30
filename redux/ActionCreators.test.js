// /**
//  * Tests for Redux action-creators for the project, Cryonics Check-In.
//  *
//  * @author Michael David Gill <michaelgill1969@gmail.com>
//  * @license
//  * Copyright 2019 Cryonics Institute
//  *
//  * This file is part of Cryonics Check-In.
//  *
//  * Cryonics Check-In is free software: you can redistribute it and/or modify it
//  * under the terms of the GNU General Public License as published by the Free
//  * Software Foundation, either version 3 of the License, or (at your option) any
//  * later version.
//  *
//  * Cryonics Check-In is distributed in the hope that it will be useful, but
//  * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
//  * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
//  * more details.
//  *
//  * You should have received a copy of the GNU General Public License along with
//  * Cryonics Check-In.  If not, see <https://www.gnu.org/licenses/>.
//  */
//
// import moment from 'moment'
// import configureStore from 'redux-mock-store'
// import thunk from 'redux-thunk'
// import logger from 'redux-logger'
// import * as Actions from './ActionCreators'
// import * as ActionTypes from './ActionTypes'
//
// const middlewares = [thunk, logger]
// const mockStore = configureStore(middlewares)
//
// /**
//  * Returns a random integer between two values, inclusive.  Both, the maximum
//  * and the minimum are inclusive.
//  * @param {Integer}   min Minimum end of range.
//  * @param {Integer}   max Maximum end of range.
//  * @return {Integer}      Random integer.
//  * @see Mozilla. (2019). Math.random() [Software documentation]. Retrieved from {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random}
//  */
// function getRandomIntInclusive (min, max) {
//   min = Math.ceil(min)
//   max = Math.floor(max)
//   return parseInt(Math.floor(Math.random() * (max - min + 1)) + min)
// }
//
// jest.useFakeTimers()
//
// describe(
//   'setTimerInterval',
//   () => {
//     for (const i = 0; i < 100; i++) {
//       beforeEach(
//         () => { // Runs before each test in the suite
//           store.clearActions()
//         }
//       )
//
//       const today = (new Date())
//       const now = (
//         new Date(
//           today.getFullYear(),
//           today.getMonth(),
//           today.getDate(),
//           getRandomIntInclusive(0, 23),
//           getRandomIntInclusive(0, 59)
//         )
//       ).toISOString()
//       const checkinTime = moment(now).subtract(
//         getRandomIntInclusive(0, 14400), 'minutes'
//       ).toISOString()
//       const alertTimes = []
//       const length = getRandomIntInclusive(1, 10)
//       for (const j = 0; j < length; j++) {
//         const time = (
//           new Date(
//             1970,
//             0,
//             1,
//             getRandomIntInclusive(0, 11),
//             getRandomIntInclusive(0, 59)
//           )
//         ).toISOString()
//         // console.log('TIME ADDED TO ARRAY: ' + time)
//         alertTimes.push(
//           {
//             id: '',
//             time: time,
//             validity: true
//           }
//         )
//       }
//       const store = mockStore(
//         {
//           user: {
//             alertTimes: alertTimes,
//             checkinInterval: 5000,
//             checkinTime: checkinTime,
//             email: 'a@a.aa',
//             errMess: null,
//             isSignedIn: true,
//             lastAlertTime: null,
//             listeners: [],
//             snooze: 9
//           }
//         }
//       )
//
//       test(
//         'fulfills',
//         async () => {
//           await store.dispatch(
//             Actions.setTimerInterval(
//               alertTimes,
//               store.getState().user.checkinTime,
//               now,
//               true
//             )
//           )
//
//           // console.log(store.getActions())
//           const actionTypes = store.getActions().map(action => action.type)
//           // console.log('ACTION TYPES: ' + actionTypes)
//           await expect(actionTypes).toContain(
//             ActionTypes.SET_TIMER_INTERVAL_FULFILLED
//           )
//         }
//       )
//
//       test(
//         'returns defined value',
//         async () => {
//           await store.dispatch(
//             Actions.setTimerInterval(
//               alertTimes,
//               store.getState().user.checkinTime,
//               now,
//               true
//             )
//           )
//
//           const actionPayload = store.getActions().find(
//             action => action.type === 'SET_TIMER_INTERVAL_FULFILLED'
//           ).payload
//           // console.log('PAYLOAD: ' + actionPayload)
//           await expect(actionPayload).toBeDefined()
//         }
//       )
//
//       test(
//         'returns integer',
//         async () => {
//           await store.dispatch(
//             Actions.setTimerInterval(
//               alertTimes,
//               store.getState().user.checkinTime,
//               now,
//               true
//             )
//           )
//
//           const actionPayload = store.getActions().find(
//             action => action.type === 'SET_TIMER_INTERVAL_FULFILLED'
//           ).payload
//           // console.log('PAYLOAD: ' + actionPayload)
//           await expect(Number.isInteger(actionPayload)).toBe(true)
//         }
//       )
//
//       test(
//         'returns positive number',
//         async () => {
//           await store.dispatch(
//             Actions.setTimerInterval(
//               alertTimes,
//               store.getState().user.checkinTime,
//               now,
//               true
//             )
//           )
//
//           const actionPayload = store.getActions().find(
//             action => action.type === 'SET_TIMER_INTERVAL_FULFILLED'
//           ).payload
//           // console.log('PAYLOAD: ' + actionPayload)
//           await expect(actionPayload).toBeGreaterThanOrEqual(0)
//         }
//       )
//
//       test(
//         'returns value signifying less than a day',
//         async () => {
//           await store.dispatch(
//             Actions.setTimerInterval(
//               alertTimes,
//               store.getState().user.checkinTime,
//               now,
//               true
//             )
//           )
//
//           const actionPayload = store.getActions().find(
//             action => action.type === 'SET_TIMER_INTERVAL_FULFILLED'
//           ).payload
//           // console.log('PAYLOAD: ' + actionPayload)
//           await expect(actionPayload).toBeLessThanOrEqual(86400000)
//         }
//       )
//     }
//   }
// )
//
// describe(
//   'setListener',
//   () => {
//     for (const i = 0; i < 100; i++) {
//       beforeEach(
//         () => { // Runs before each test in the suite
//           store.clearActions()
//         }
//       )
//
//       const today = (new Date())
//       const now = (
//         new Date(
//           today.getFullYear(),
//           today.getMonth(),
//           today.getDate(),
//           getRandomIntInclusive(0, 23),
//           getRandomIntInclusive(0, 59)
//         )
//       ).toISOString()
//       const checkinTime = moment(now).subtract(
//         getRandomIntInclusive(0, 14400), 'minutes'
//       ).toISOString()
//       const alertTimes = []
//       const length = getRandomIntInclusive(1, 10)
//       for (const j = 0; j < length; j++) {
//         const time = (
//           new Date(
//             1970,
//             0,
//             1,
//             getRandomIntInclusive(0, 11),
//             getRandomIntInclusive(0, 59)
//           )
//         ).toISOString()
//         // console.log('TIME ADDED TO ARRAY: ' + time)
//         alertTimes.push(
//           {
//             id: '',
//             time: time,
//             validity: true
//           }
//         )
//       }
//       const store = mockStore(
//         {
//           user: {
//             alertTimes: alertTimes,
//             checkinInterval: 5000,
//             checkinTime: checkinTime,
//             email: 'a@a.aa',
//             errMess: null,
//             isSignedIn: true,
//             lastAlertTime: null,
//             listeners: [],
//             snooze: 9
//           }
//         }
//       )
//
//       test(
//         'fulfills',
//         async () => {
//           await store.dispatch(
//             Actions.setListener(
//               store.getState().user.alertTimes,
//               store.getState().user.checkinTime,
//               store.getState().user.email,
//               store.getState().user.isSignedIn,
//               now,
//               store.getState().user.snooze,
//               true
//             )
//           )
//
//           // console.log(store.getActions())
//           const actionTypes = store.getActions().map(action => action.type)
//           // console.log('ACTION TYPES: ' + actionTypes)
//           await expect(actionTypes).toContain(ActionTypes.SET_LISTENER_FULFILLED)
//         }
//       )
//
//       test(
//         'returns defined value',
//         async () => {
//           await store.dispatch(
//             Actions.setListener(
//               store.getState().user.alertTimes,
//               store.getState().user.checkinTime,
//               store.getState().user.email,
//               store.getState().user.isSignedIn,
//               now,
//               store.getState().user.snooze,
//               true
//             )
//           )
//
//           const actionPayload = store.getActions().find(
//             action => action.type === 'SET_LISTENER_FULFILLED'
//           ).payload
//           // console.log('PAYLOAD: ' + actionPayload)
//           await expect(actionPayload).toBeDefined()
//         }
//       )
//
//       test(
//         'returns integer',
//         async () => {
//           await store.dispatch(
//             Actions.setListener(
//               store.getState().user.alertTimes,
//               store.getState().user.checkinTime,
//               store.getState().user.email,
//               store.getState().user.isSignedIn,
//               now,
//               store.getState().user.snooze,
//               true
//             )
//           )
//
//           const actionPayload = store.getActions().find(
//             action => action.type === 'SET_LISTENER_FULFILLED'
//           ).payload
//           // console.log('PAYLOAD: ' + actionPayload)
//           await expect(Number.isInteger(actionPayload)).toBe(true)
//         }
//       )
//
//       test(
//         'returns positive number',
//         async () => {
//           await store.dispatch(
//             Actions.setListener(
//               store.getState().user.alertTimes,
//               store.getState().user.checkinTime,
//               store.getState().user.email,
//               store.getState().user.isSignedIn,
//               now,
//               store.getState().user.snooze,
//               true
//             )
//           )
//
//           const actionPayload = store.getActions().find(
//             action => action.type === 'SET_LISTENER_FULFILLED'
//           ).payload
//           // console.log('PAYLOAD: ' + actionPayload)
//           await expect(actionPayload).toBeGreaterThanOrEqual(0)
//         }
//       )
//
//       test(
//         'returns value signifying less than a day',
//         async () => {
//           await store.dispatch(
//             Actions.setListener(
//               store.getState().user.alertTimes,
//               store.getState().user.checkinTime,
//               store.getState().user.email,
//               store.getState().user.isSignedIn,
//               now,
//               store.getState().user.snooze,
//               true
//             )
//           )
//
//           const actionPayload = store.getActions().find(
//             action => action.type === 'SET_LISTENER_FULFILLED'
//           ).payload
//           // console.log('PAYLOAD: ' + actionPayload)
//           await expect(actionPayload).toBeLessThanOrEqual(86400000)
//         }
//       )
//     }
//   }
// )

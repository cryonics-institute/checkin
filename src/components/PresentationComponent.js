import React from 'react'
import 'react-impressjs/styles/react-impressjs.css'
import alfredFeelsPoorly from '../images/alfred_feels_poorly.svg'
import patientAlert from '../images/patient_alert.png'
import patientHome from '../images/patient_home.png'
import splash from '../images/splash.png'
import standbyAlert from '../images/standby_alert.png'

const presentation = [
  {
    id: 'slide1',
    className: 'step',
    data: {
      scale: 4
    },
    content: [
      <div key = 'slide1'>
        <img
          src = { alfredFeelsPoorly }
          alt = 'Alfred feels poorly.'
          className = 'centerImage'
          height = '50%'
          width = '50%'
        />
        <h3 className = 'centerText'>Feelin&#39; kinda poorly?</h3>
      </div>
    ]
  },
  {
    id: 'slide2',
    className: 'step',
    data: {
      x: 0,
      y: 5000,
      rotateZ: 90,
      scale: 3
    },
    content: [
      <div key = 'slide2'>
        <h4 className = 'centerText'>Try our new app</h4>
        <img
          src = { splash }
          alt = 'Splash Screen'
          className = 'centerImage moveAround'
          height = '40%'
          width = '40%'
        />
        <h3 className = 'centerText'>Cryonics Check-In</h3>
      </div>
    ]
  },
  {
    id: 'slide3',
    className: 'step',
    data: {
      x: 5000,
      y: 5000,
      rotateZ: 180,
      scale: 5
    },
    content: [
      <div key = 'slide3'>
        <p className = 'centerText'>
          With Check-In,<br/>
          you can let a <b>buddy</b> know<br/>
          if you&#39;re <b>sick</b> or <b>injured</b>
        </p>
      </div>
    ]
  },
  {
    id: 'slide4',
    className: 'step',
    data: {
      x: 5000,
      y: 5000,
      z: -5000,
      rotateZ: 270,
      scale: 1
    },
    content: [
      <div key = 'slide4'>
        <p className = 'centerText'>
          <b className='rotating'>unconscious</b>
        </p>
      </div>
    ]
  },
  {
    id: 'slide5',
    className: 'step',
    data: {
      x: 5000,
      y: 5000,
      z: -10000,
      rotateZ: 90,
      scale: 1
    },
    content: [
      <div key = 'slide5'>
        <p className = 'centerText'>
          and <b>unable</b> to call for <b>help!</b>
        </p>
      </div>
    ]
  },
  {
    id: 'slide6',
    className: 'step',
    data: {
      x: 10000,
      y: 10000,
      scale: 6
    },
    content: [
      <div key = 'slide6'>
        <img
          src = { patientAlert }
          alt = 'Patient-Alert Screen'
          className = 'centerImage moveAround'
          height = '40%'
          width = '40%'
        />
        <p className = 'centerText'>Just set an interval ...</p>
      </div>
    ]
  },
  {
    id: 'slide7',
    className: 'step',
    data: {
      x: 10000,
      y: 15000,
      rotateZ: 20,
      scale: 5
    },
    content: [
      <div key = 'slide7'>
        <img
          src = { patientAlert }
          alt = 'Patient-Alert Screen'
          className = 'centerImage moveAround'
          height = '40%'
          width = '40%'
        />
        <p className = 'centerText'>
          ... and your phone will alert you<br/>
          when it&#39;s time to check in.
        </p>
      </div>
    ]
  },
  {
    id: 'slide8',
    className: 'step',
    data: {
      x: 10000,
      y: 20000,
      rotateZ: 0,
      scale: 4
    },
    content: [
      <div key = 'slide8'>
        <p className = 'centerText'>If you miss your check-in,</p>
        <img
          src = { standbyAlert }
          alt = 'Standby-Alert Screen'
          className = 'centerImage moveAround'
          height = '40%'
          width = '40%'
        />
        <p className = 'centerText'>
          your buddy will get an alert on her phone<br/>
          letting her know you might need help!
        </p>
      </div>
    ]
  },
  {
    id: 'slide9',
    className: 'step',
    data: {
      x: 10000,
      y: 25000,
      rotateZ: 20,
      scale: 3
    },
    content: [
      <div key = 'slide9'>
        <p className = 'centerText'>Look for us on</p>
        <p className = 'centerText'>the Apple App Store and Google Play</p>
        <p className = 'centerText'>coming soon ...</p>
      </div>
    ]
  },
  {
    id: 'slide10',
    className: 'step',
    data: {
      x: 10000,
      y: 30000,
      scale: 2
    },
    content: [
      <div key = 'slide10'>
        <p className = 'centerText'>... but first ...</p>
      </div>
    ]
  },
  {
    id: 'slide11',
    className: 'step',
    data: {
      x: 15000,
      y: 30000,
      z: 4000,
      rotateX: 0,
      scale: 3
    },
    content: [
      <div key = 'slide11'>
        <h3 className = 'centerText'><b>ATTENTION:</b></h3>
        <p className = 'centerText'>We need beta-testers!</p>
        <p className = 'centerText'>We&#39;d like to invite you to</p>
        <p className = 'centerText'>try our upcoming beta version</p>
        <p className = 'centerText'>and send us your feedback.</p>
      </div>
    ]
  },
  {
    id: 'slide12',
    className: 'step',
    data: {
      x: 15000,
      y: 30000,
      z: 4000,
      rotateY: 90,
      scale: 3
    },
    content: [
      <div key = 'slide12'>
        <h3 className = 'centerText'>Please sign-up today!</h3>
        <p className = 'centerText'>Just grab a card by our poster</p>
        <p className = 'centerText'>and send us an e-mail</p>
        <p className = 'centerText'>at the address on the card!</p>
      </div>
    ]
  },
  {
    id: 'slide13',
    className: 'step',
    data: {
      x: 15000,
      y: 30000,
      z: 4000,
      rotateX: 90,
      scale: 3
    },
    content: [
      <div key = 'slide13'>
        <h3 className = 'centerText'>Can you code?</h3>
        <p className = 'centerText'>We work in <b>React!</b></p>
        <p className = 'centerText'>Fork a project at:</p>
        <p className = 'centerText'>
          <a href = 'https://github.com/cryonics-institute'>
            https://github.com/cryonics-institute
          </a>
        </p>
      </div>
    ]
  }
]

export default presentation

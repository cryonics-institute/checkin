import React from 'react'
import alfredFeelsPoorly from '../images/alfred_feels_poorly.svg'
import patientAlert from '../images/patient_alert.png'
import patientHome from '../images/patient_home.png'
import splash from '../images/splash.png'
import standbyAlert from '../images/standby_alert.png'

const presentation = [
  {
    id: 'slide',
    className: 'step',
    data: {
      scale: 3
    },
    content: [
      <div key = 'slide'></div>
    ]
  },
  {
    id: 'slide1',
    className: 'step',
    data: {
      scale: 3
    },
    content: [
      <div key = 'slide1'>
        <h4 className = 'center'>Presenting Cryonics Check-In</h4>
      </div>
    ]
  },
  {
    id: 'slide2',
    className: 'step',
    data: {
      x: -800,
      y: 400,
      scale: 1
    },
    content: [
      <div key = 'slide2'>
        <p className = 'center'>Feelin&#39; kinda poorly?</p>
        <div className = 'center'>
          <img
            src = { alfredFeelsPoorly }
            alt = 'Alfred feels poorly.'
            className = 'center'
            height = '50%'
            width = '50%'
          />
        </div>
      </div>
    ]
  },
  {
    id: 'slide3',
    className: 'step',
    data: {
      x: -800,
      y: 1200,
      rotateZ: 90,
      scale: 1
    },
    content: [
      <div key = 'slide3'>
        <p className = 'center'>Try our new app</p>
        <div className = 'center'>
          <img
            src = { splash }
            alt = 'Splash Screen'
            className = 'center moveAround'
            height = '40%'
            width = '40%'
          />
        </div>
        <p className = 'center'><b>Cryonics Check-In</b></p>
      </div>
    ]
  },
  {
    id: 'slide4',
    className: 'step',
    data: {
      x: 0,
      y: 1245,
      scale: 1
    },
    content: [
      <div key = 'slide4'>
        <p className = 'center'>
          With Check-In,<br/>
          you can let a <b>buddy</b> know<br/>
          if you&#39;re <b>sick</b> or <b>injured</b>
        </p>
      </div>
    ]
  },
  {
    id: 'slide5',
    className: 'step',
    data: {
      x: 0,
      y: 1245,
      z: 5000,
      rotateZ: 270,
      scale: 1
    },
    content: [
      <div key = 'slide5'>
        <p className = 'center'>
          <b className='rotating'>unconscious</b>
        </p>
      </div>
    ]
  },
  {
    id: 'slide6',
    className: 'step',
    data: {
      x: 0,
      y: 1245,
      z: 10000,
      rotateZ: 0,
      scale: 1
    },
    content: [
      <div key = 'slide6'>
        <p className = 'center'>
          and <b>unable</b> to call for <b>help!</b>
        </p>
      </div>
    ]
  },
  {
    id: 'slide7',
    className: 'step',
    data: {
      x: 0,
      y: 445,
      scale: 1
    },
    content: [
      <div key = 'slide7'>
        <p className = 'center'>Just set an interval ...</p>
        <div className = 'center crop'>
          <img
            src = { patientHome }
            alt = 'Patient-Alert Screen'
            className = 'center crop moveAround'
            height = '40%'
            width = '40%'
          />
        </div>
      </div>
    ]
  },
  {
    id: 'slide8',
    className: 'step',
    data: {
      x: 800,
      y: 480,
      scale: 1
    },
    content: [
      <div key = 'slide8'>
        <p className = 'center'>
          ... and your phone will alert you
        </p>
        <div className = 'center crop'>
          <img
            src = { patientAlert }
            alt = 'Patient-Alert Screen'
            className = 'center crop moveAround'
            height = '40%'
            width = '40%'
          />
        </div>
        <p className = 'center'>
          when it&#39;s time to check in.
        </p>
      </div>
    ]
  },
  {
    id: 'slide9',
    className: 'step',
    data: {
      x: 800,
      y: 1280,
      rotateZ: 90,
      scale: 1
    },
    content: [
      <div key = 'slide9'>
        <p className = 'center'>If you miss your check-in,</p>
        <div className = 'center crop'>
          <img
            src = { standbyAlert }
            alt = 'Standby-Alert Screen'
            className = 'center crop moveAround'
            height = '40%'
            width = '40%'
          />
        </div>
        <p className = 'center'>
          your buddy will get an alert on her phone<br/>
          letting her know you might need help!
        </p>
      </div>
    ]
  },
  {
    id: 'slide10',
    className: 'step',
    data: {
      x: 800,
      y: 2080,
      rotateZ: 180,
      scale: 1
    },
    content: [
      <div key = 'slide10'>
        <p className = 'center'>Look for us on</p>
        <p className = 'center'>Apple&#39;s <b>App Store</b></p>
        <p className = 'center'>and <b>Google Play</b>,</p>
        <p className = 'center'>coming soon ...</p>
      </div>
    ]
  },
  {
    id: 'slide11',
    className: 'step',
    data: {
      x: 0,
      y: 2045,
      scale: 1
    },
    content: [
      <div key = 'slide11'>
        <p className = 'center'>... but first ...</p>
      </div>
    ]
  },
  {
    id: 'slide12',
    className: 'step',
    data: {
      x: -800,
      y: 2045,
      rotateX: 0,
      scale: 1
    },
    content: [
      <div key = 'slide12'>
        <h3 className = 'center'><b>ATTENTION:</b></h3>
        <p className = 'center'>We need beta-testers!</p>
        <p className = 'center'>We&#39;d like to invite you to</p>
        <p className = 'center'>try our upcoming beta version</p>
        <p className = 'center'>and send us your feedback.</p>
      </div>
    ]
  },
  {
    id: 'slide13',
    className: 'step',
    data: {
      x: -800,
      y: 2045,
      rotateY: 90,
      scale: 1
    },
    content: [
      <div key = 'slide13'>
        <h3 className = 'center'>Please sign-up today!</h3>
        <p className = 'center'>Just grab a card by our poster</p>
        <p className = 'center'>and send us an e-mail</p>
        <p className = 'center'>at the address on the card!</p>
      </div>
    ]
  },
  {
    id: 'slide14',
    className: 'step',
    data: {
      x: -800,
      y: 2045,
      rotateX: 90,
      scale: 1
    },
    content: [
      <div key = 'slide14'>
        <h3 className = 'center'>Can you code?</h3>
        <p className = 'center'>We work in <b>React!</b></p>
        <p className = 'center'>Fork a project at:</p>
        <p className = 'center'>
          <a href = 'https://github.com/cryonics-institute'>
            https://github.com/cryonics-institute
          </a>
        </p>
      </div>
    ]
  }
]

export default presentation

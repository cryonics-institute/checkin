import React from 'react'
import alfredFeelsPoorly from '../images/alfred_feels_poorly.svg'

const presentation = [
  {
    id: 'slide1',
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
    data: {
      x: 850,
      y: 3000,
      rotateZ: 90,
      scale: 3
    },
    content: [
      <div key = 'slide2'>
        <h4 className = 'centerText'>Grim Reaper gotcha down?</h4>
      </div>
    ]
  },
  {
    id: 'slide3',
    data: {
      x: 3000,
      y: 3000,
      rotateZ: 180,
      scale: 5
    },
    content: [
      <div key = 'slide3'>
        <p className = 'centerText'>
          Miss your<br/>
          standby<br/>
          <b>sorely</b>?
        </p>
      </div>
    ]
  },
  {
    id: 'slide4',
    data: {
      x: 3000,
      y: 3000,
      z: -3000,
      rotateZ: 300,
      scale: 1
    },
    content: [
      <div key = 'slide4'>
        <p className = 'centerText'>
          but he has gone to <b>town?</b>
        </p>
      </div>
    ]
  },
  {
    id: 'slide5',
    data: {
      x: 3500,
      y: -850,
      rotateZ: 270,
      scale: 6
    },
    content: [
      <div key = 'slide5'>
        <p className = 'centerText'><b className="positioning">Never</b> fear, just <b className="rotating">check-in</b>,  <b className="scaling">dear</b>!</p>
      </div>
    ]
  },
  {
    id: 'slide6',
    data: {
      x: 6700,
      y: -300,
      scale: 6
    },
    content: [
      <div key = 'slide6'>
        <p className = 'centerText'>Then, when you&#39;re feeling tired,</p>
      </div>
    ]
  },
  {
    id: 'slide7',
    data: {
      x: 6300,
      y: 2000,
      rotateZ: 20,
      scale: 4
    },
    content: [
      <div key = 'slide7'>
        <p className = 'centerText'>if you miss your check-in time,</p>
      </div>
    ]
  },
  {
    id: 'slide8',
    data: {
      x: 6000,
      y: 4000,
      scale: 2
    },
    content: [
      <div key = 'slide8'>
        <p className = 'centerText'>your Standby will be wired.</p>
      </div>
    ]
  },
  {
    id: 'slide9',
    data: {
      x: 8000,
      y: 5000,
      z: -100,
      rotateX: -40,
      rotateY: 10,
      scale: 2
    },
    content: [
      <div key = 'slide9'>
        <p className = 'centerText'><span className="have">&quot;Pish!</span> <span className="you">&#39;Tis</span> <span className="noticed">but a</span> <span className="its">dream!&quot;</span></p>
        <p className = 'centerText'>I hear you say?</p>
        <p className = 'centerText'>&quot;Who&#39;d make up such a thing?&quot;</p>
      </div>
    ]
  },
  {
    id: 'slide10',
    data: {
      x: 3000,
      y: 6000,
      z: 4000,
      rotateX: -70,
      rotateY: 30,
      scale: 10
    },
    content: [
      <div key = 'slide10'>
        <p className = 'centerText'>Volunteers!</p>
        <p className = 'centerText'>... on <b className="rotating">GitHub</b>,  <b className="scaling">(yay!)</b>!</p>
        <p className = 'centerText'>Yea! Open-Source doth ring!</p>
      </div>
    ]
  }
]
export default presentation

// in the corner of this room
// a poster you will find
// it can tell you where to go
// to learn how to be kind

// please give to us your e-mail
// so we can send a letter
// inviting you to try our App
// so we can make it better

// If you can code in Javascript
// in Redux and React
// We need you on our GitHub team
// so this app can be a fact

// standing strong as volunteers
// Death to Hell shall go
// his scythe shoved up his arse, my dear
// so he'll reap what he sows

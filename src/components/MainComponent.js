import React from 'react'
import { Impress, Step } from 'react-impressjs'
import 'react-impressjs/styles/react-impressjs.css'
import '../App.css'
import alfredFeelsPoorly from '../images/alfred_feels_poorly.svg'

class Main extends React.Component {
  render () {
    return (
      <Impress
        progress = { true }
        fallbackMessage = {
          <p>
            Sorry, your <b>device or browser</b> does not support impress.js.
          </p>
        }
      >
        <Step id = { 'overview' }/>
        <Step id = { 'any_id' } className = { 'class_name' }/>
        <Step className = { 'without_id_is_ok' }
          data = {
            {
              x: 100,
              y: -100,
              scale: 2
            }
          }
        />
        <Step duration = { 1500 }>
          <img
            src = { alfredFeelsPoorly }
            alt = 'Alfred feels poorly.'
            className = 'Image-Center'
            height = '50%'
            width = '50%'
          />
          <hr/>
          <h3 className = 'Text-Center'>Feelin' kinda poorly?</h3>
        </Step>
      </Impress>
    )
  }
}

export default Main

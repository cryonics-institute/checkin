import React from 'react'
import { Impress, Step } from 'react-impressjs';
// styles of react-impressjs
import 'react-impressjs/styles/react-impressjs.css';

class Main extends React.Component {
  render () {
    return (
      <Impress
        progress = { true }
        fallbackMessage = {
          <p>Sorry, your <b>device or browser</b> couldn't support well.</p>
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
          <h1>Any Element write in Step!</h1>
          <hr />
          <p>Made by your <b>Creativity</b> !!</p>
        </Step>
      </Impress>
    )
  }
}

export default Main

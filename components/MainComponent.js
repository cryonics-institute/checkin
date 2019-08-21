import React from 'react'
import { Impress, Step } from 'react-impressjs'
import 'react-impressjs/styles/react-impressjs.css'
import '../App.css'
// import alfredFeelsPoorly from '../images/alfred_feels_poorly.svg'
import presentation from './PresentationComponent'

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
        {
          presentation.map(
            (d, index) => {
              return (
                React.createElement(
                  Step,
                  {
                    id: d.id,
                    className: d.className,
                    data: d.data,
                    key: index
                  },
                  d.content.map(
                    (child, index) => {
                      return (
                        React.cloneElement(
                          child,
                          {
                            id: child.id,
                            className: child.className,
                            key: index
                          }
                        )
                      )
                    }
                  )
                )
              )
            }
          )
        }
      </Impress>
    )
  }
}

export default Main

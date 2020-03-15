import React from 'react'
import { View } from 'react-native'
import { Button, Image } from 'react-native-elements'
import { connect } from 'react-redux'
import { BLUE_LOGO } from '../assets'
import { selectStatus } from '../redux/ActionCreators'
import { styles } from '../styles/Styles'

const mapStateToProps = state => {
  return {
    // Nothing in state is relevant here.
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    selectStatus: (isPatient) => dispatch(selectStatus(isPatient))
  }
)

class Welcome extends React.Component {
  constructor (props) {
    super(props)

    this.handlePatient = this.handlePatient.bind(this)
    this.handleStandby = this.handleStandby.bind(this)
  }

  handlePatient () {
    this.props.selectStatus(true)
    this.props.navigation.navigate('PatientAuth')
  }

  handleStandby () {
    this.props.selectStatus(false)
    this.props.navigation.navigate('StandbyAuth')
  }

  render () {
    return (
      <View style = { styles.containerSpaced }>
        <Image
          resizeMode = 'contain'
          source = { BLUE_LOGO }
          style = { styles.image }
        />
        <View>
          <Button
            buttonStyle = { styles.button }
            onPress = { () => this.handlePatient() }
            title = 'I&#39;m a Member'
          />
          <Button
            buttonStyle = { styles.button }
            onPress = { () => this.handleStandby() }
            title = 'I&#39;m a Buddy'
          />
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)

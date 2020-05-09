import React from 'react'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { signOut } from '../redux/ActionCreators'
import { styles } from '../styles/Styles'

const mapStateToProps = state => {
  return {
    // Nothing in state is relevant here.
  }
}

const mapDispatchToProps = dispatch => (
  {
    signOut: () => dispatch(signOut())
  }
)

class SignOut extends React.Component {
  render () {
    return (
      <Button
        onPress = { () => this.props.signOut() }
        title = 'Sign Out'
        titleStyle = { styles.buttonTitleColorLight }
        type = 'clear'
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOut)

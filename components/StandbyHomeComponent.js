import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { signoutStandby } from '../redux/ActionCreators'

const mapStateToProps = state => {
  return {
    // Nothing in state is relevant here.
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    signoutStandby: () => dispatch(signoutStandby())
  }
)

class StandbyHome extends React.Component {
  render () {
    return (
      <View style = { styles.container }>
        <Button
          onPress = { () => this.props.signoutStandby() }
          title = "Sign Out"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    container: {
      alignItems: 'center',
      backgroundColor: '#fff',
      flex: 1,
      justifyContent: 'center',
      padding: 20
    },
    slider: {
      width: 100
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold'
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(StandbyHome)

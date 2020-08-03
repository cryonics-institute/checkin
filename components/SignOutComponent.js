// TODO: This component should be rolled into a preferences screen.

/**
 * Sign-out component for the project, Check-In, that presents the view with
 * which the user signs out.
 *
 * @author Michael David Gill <michaelgill1969@gmail.com>
 * @license
 * Copyright 2019 Cryonics Institute
 *
 * This file is part of Check-In.
 *
 * Check-In is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * Check-In is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Check-In.  If not, see <https://www.gnu.org/licenses/>.
 */

// @flow
import * as React from 'react'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { signOut } from '../redux/ActionThunks'
import { styles } from '../styles/Styles'

type ComponentProps = {
  signOut: () => void
}

const mapDispatchToProps = dispatch => (
  { signOut: () => dispatch(signOut()) }
)

class SignOut extends React.Component<ComponentProps> {
  handleSignOut (): void {
    this.props.signOut()
  }

  render () {
    return (
      <Button
        onPress = { this.handleSignOut.bind(this) }
        title = 'Sign Out'
        titleStyle = { styles.buttonTitleColorLight }
        type = 'clear'
      />
    )
  }
}

export default connect(null, mapDispatchToProps)(SignOut)

import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from '../utils/styles'

export default Button = ({ label, onPress, disabled, style}) => (
    <TouchableOpacity style={[ styles.button, style ]} onPress={ onPress } disabled={ disabled }>
        <Text style={ styles.buttonText } >{ label }</Text>
    </TouchableOpacity>
)

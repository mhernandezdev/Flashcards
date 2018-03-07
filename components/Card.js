import React, { Component } from 'react'
import { View } from 'react-native'
import styles from '../utils/styles'

export default Card = (props) => (
     <View style={[ styles.card, props.style ]}>
        { props.children }
    </View>
)
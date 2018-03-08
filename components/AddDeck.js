import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Keyboard, KeyboardAvoidingView, View, Text, TextInput, Alert } from 'react-native'
import Button from './Button'
import { addDeck } from '../actions/index'
import styles from '../utils/styles'

class AddDeck extends Component {

    state = {
        title:''
    }

    handleTextChange = (input) => {
        this.setState({ title:input });
    }

    submitDeck = () => {
       const { title } = this.state;

       if(title===''){
            Alert.alert('Submit Error', 'Deck title must be entered', [{text: 'OK'}], { cancelable:false });

        }else{
            const key = `deck${Math.random().toString(36).substr(-8)}`;
            const data = { title, key, questions:[], timestamp:Date.now() };
            this.props.addDeck({ key, data });

            // clear the state then return to myDecks List
            Keyboard.dismiss();
            this.setState({ title:'' });
            this.props.navigation.navigate('Decks');
            this.props.navigation.navigate('Deck', { key, title });
        }
    }

    render() {
        const { title } = this.state;

        return (
            <KeyboardAvoidingView style={[ styles.appBackground, styles.container, styles.center ]} behavior="padding">

                <Text style={styles.title}> Add Deck </Text>

                <View style={styles.stretchSelf}>
                    <TextInput
                    style={ styles.input }
                    maxLength={ 50 }
                    placeholder={ 'Enter a deck title' }
                    value={ title }
                    onChangeText={ this.handleTextChange }
                     />
                </View>

                <Button label="Submit deck" onPress={ this.submitDeck } />

            </KeyboardAvoidingView>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addDeck }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddDeck);


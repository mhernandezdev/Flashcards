import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Keyboard, KeyboardAvoidingView, View, Text, TextInput, Alert } from 'react-native'
import Button from './Button'
import { addCard } from '../actions/index'
import styles from '../utils/styles'

class AddCard extends Component {
    state = {
        question:'',
        questionFail:false,
        answer:'',
        answerFail:false
    }

    handleQuestionChange = (input) => {
        this.setState({ question: input });
    }

    handleAnswerChange = (input) => {
        this.setState({ answer:input });
    }

    submitCard = () => {
        const { question, answer } = this.state;
        if(question==='' || answer===''){
            Alert.alert('Submit Error', 'Question and answer must be entered', [{text: 'OK'}], { cancelable:false });

        }else{
            const { decks, navigation } = this.props;
            const { key } = navigation.state.params;
            const questions = decks[key].questions;
            const data = {key, questions, question, answer};
            this.props.addCard({ data });

            // clear the state then return to myDecks List
            Keyboard.dismiss();
            this.setState({ question:'', answer:'' });
            this.props.navigation.goBack();
        }
    }

    render() {
        const { question, answer } = this.state;

        return (
            <KeyboardAvoidingView style={[ styles.appBackground, styles.container, styles.center ]} behavior="padding">
                <Text style={styles.title}> Add Card </Text>

                <View style={ styles.stretchSelf }>
                    <TextInput
                    style={ styles.input }
                    placeholder={ 'Enter a question' }
                    value={ question }
                    multiline={ true }
                    onChangeText={ this.handleQuestionChange } />

                    <TextInput
                    style={ styles.input }
                    placeholder={ 'Enter a Answer' }
                    value={ answer }
                    multiline={ true }
                    onChangeText={ this.handleAnswerChange } />
                </View>

                <Button label="Submit card" onPress={ this.submitCard } />

            </KeyboardAvoidingView>
        )
    }
}

function mapStateToProps ({ decks }) {
    return { decks };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addCard }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);



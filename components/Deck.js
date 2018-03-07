import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { View, Text, Alert } from 'react-native'
import Button from './Button'
import Card from './Card'
import styles from '../utils/styles'
import { deleteDeck } from '../actions/index'
import { clearLocalNotification, setLocalNotification } from '../utils/notifications'

class Deck extends Component {

    startBtnPressed = () =>  {
        clearLocalNotification()
        .then(setLocalNotification);

        const { decks, navigation } = this.props;
        const key = navigation.state.params.key;
        const deck = decks[key];
        this.props.navigation.navigate('Quiz', { key, deck });
    }

    addBtnPressed = () => {
        const key = this.props.navigation.state.params.key;
        this.props.navigation.navigate('AddCard', { key });
    }

    deleteBtnPressed = () => {
        Alert.alert(
            'Delete Deck',
            'Are you sure you want to delete this deck.',
            [
                {text: 'Yes',  onPress:this.deleteDeck },
                {text: 'Cancel'}
            ],
            { cancelable:false }
        );
    }

    deleteDeck = () => {
        const { navigation } = this.props;
        const { key } = navigation.state.params;
        this.props.navigation.goBack();
        this.props.deleteDeck({ key });
    }

    render() {
        const { decks, navigation } = this.props;
        const { key } = navigation.state.params

        const deck = decks[key];
        const noCards = deck && deck.questions.length===0;

        return (
            <View style={[styles.appBackground, styles.container ]}>
                {deck &&
                    <View style={ {flex:1} }>
                        <Card style={[ styles.stretchSelf, styles.marginBottom, {flex:1} ]}>
                            <View style={[ styles.center, {flex:1} ]}>
                                <Text style={[ styles.cardTxt, styles.marginBottom ]}>{ deck.title }</Text>
                                <Text style={[ styles.cardCnt, styles.marginBottom ]}> {`${deck.questions && deck.questions.length} cards`} </Text>

                                {noCards && <Text style={[ styles.callout, styles.marginBottom ]}>You need to add a card before you can start this quiz.</Text> ||
                                <Button label="Start Quiz" style={[ noCards ? styles.buttonDisabled : '', styles.marginTop]} onPress={ this.startBtnPressed } disabled={ noCards } />
                                }

                            </View>
                        </Card>

                        <View style={[ styles.center, styles.flexRow, {justifyContent:'space-around'} ]}>
                            <Button label="Delete Deck" onPress={ this.deleteBtnPressed } />

                            <Button label="Add Card" onPress={ this.addBtnPressed } />
                        </View>
                    </View>
                }
            </View>
        )
    }
}

function mapStateToProps ({ decks }) {
    return { decks };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ deleteDeck }, dispatch);
}

export default connect( mapStateToProps, mapDispatchToProps )( Deck )
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import Card from './Card'
import styles from '../utils/styles'


class Decks extends Component {

    deckBtnPressed = (key, title) => {
        this.props.navigation.navigate('Deck', { key, title });
    }

    renderListItem = ({ item }) => {
        const deck = item;
        return (
            <TouchableOpacity style={ {paddingBottom:20} } onPress={() => this.deckBtnPressed(deck.key, deck.title) }
                key={ deck.key }
                title={ deck.title }
                style={ styles.decksListItem }
            >
                <Card>
                    <Text style={ [styles.cardTxt, styles.marginBottom] }>{ deck.title }</Text>
                    <Text style={ styles.cardCnt }> {`${deck.questions && deck.questions.length} cards`} </Text>
                </Card>
            </TouchableOpacity>
        )
    }

    render() {
        const { decks } = this.props;
        const decksArray = decks && Object.values(decks).sort((a, b) => b.timestamp > a.timestamp) || [];

        // sort on title // date added // times reviewed
        // add a picker


        return (
            <View style={[ styles.appBackground, styles.container ]}>
                { decksArray.length===0 &&
                    <View style={[ styles.center, {flex:1} ]}>
                        <Text style={[ styles.callout, {fontSize:24} ]}>
                            <Text style={styles.bold}>Welcome!</Text> Select Add Deck to begin.
                        </Text>
                    </View> ||

                    <FlatList
                    data={ decksArray }
                    renderItem={ this.renderListItem }
                    />
                }
            </View>
      )
    }
}

function mapStateToProps ({ decks }) {
    return { decks };
}

export default connect( mapStateToProps )( Decks )
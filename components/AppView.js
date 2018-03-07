import React, { Component } from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getDecks } from '../actions/index'

import AddDeck from './AddDeck'
import Decks from './Decks'
import Deck from './Deck'
import Quiz from './Quiz'
import AddCard from './AddCard'

import { TabNavigator, StackNavigator } from 'react-navigation'

import { orange, white, lightgray } from '../utils/styles'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Constants, AppLoading } from 'expo'

import { setLocalNotification } from '../utils/notifications'



function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: 'My Decks',
        headerTitle: 'My Decks',
        tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
      },
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        headerTitle: 'Add Deck',
        tabBarIcon: ({ tintColor }) => <Ionicons name='md-add' size={24} color={tintColor} />
      },
    }
  }, {
    navigationOptions: {
        headerTintColor: orange,
        headerStyle: {
            backgroundColor: white
        },
        header:null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? orange : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : orange,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
      labelStyle: {
          fontSize:18
      }
    }
})

const stackNavOps = {
    headerTintColor: white,
    headerStyle: {
        backgroundColor: orange
    }
}
const AppNavigator = StackNavigator({
    Home: {
        screen: Tabs
    },
    Deck: {
        screen: Deck,
        navigationOptions: ({ navigation }) => ({
            title: navigation.state.params.title,
            ...stackNavOps
        })
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            headerTitle: 'Quiz',
            ...stackNavOps
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            headerTitle: 'Add Card',
            ...stackNavOps
        }
    }
})

class AppView extends Component {

    componentDidMount() {
        this.props.getDecks();

        setLocalNotification()
    }

    render() {
        const { loading } = this.props;
        return (
            <View style={ {flex: 1} }>
                <AppStatusBar backgroundColor={ orange } barStyle="light-content" />
                {
                    !loading.completed &&
                    <AppLoading /> ||
                    <AppNavigator />
                }
            </View>
        )
    }

}

function mapStateToProps ({ loading }) {
    return { loading };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getDecks }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppView)

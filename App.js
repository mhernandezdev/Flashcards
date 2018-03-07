import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import AppView from './components/AppView'


const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppView />
            </Provider>
        )
    }
}

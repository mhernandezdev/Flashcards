import { AsyncStorage } from 'react-native'

export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const CLEAR_DECKS = 'CLEAR_DECKS'
export const ADD_CARD = 'ADD_CARD'

const CARDS_STORAGE_KEY = 'Flashcards:decks'

export function getDecks () {
    return dispatch => AsyncStorage.getItem(CARDS_STORAGE_KEY)
    .then(data => {
        dispatch({
            type:GET_DECKS,
            data:JSON.parse(data || '{}')
        })
    })
}
export function addDeck({ key, data }){
    return dispatch => AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({[key]: data}))
    .then(() => {
        dispatch({
            type:ADD_DECK,
            data:{[key]: data}
        })
    })
}

export function deleteDeck(data){
    const { key } = data;
    return dispatch => AsyncStorage.getItem(CARDS_STORAGE_KEY)
    .then((results) => {
        const resultsObj = JSON.parse(results)
        resultsObj[key] = undefined
        delete resultsObj[key]
        AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(resultsObj))
        .then(() => {
            dispatch({
                type:DELETE_DECK,
                data
            })
        })
    })
}

export function addCard({ data }){
    const {key, questions, question, answer} = data;
    return dispatch => AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
        [key]:{ questions:[...questions, {question, answer}] }
    })).then(() => {
        dispatch({
            type:ADD_CARD,
            data
        })
    })
}

export function clearDecks(){
    return dispatch => AsyncStorage.removeItem(CARDS_STORAGE_KEY)
    .then(data => {
        dispatch({
            type:CLEAR_DECKS,
            data:{}
        })
    })
}






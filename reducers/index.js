import { combineReducers } from 'redux'
import { GET_DECKS, ADD_DECK, DELETE_DECK, CLEAR_DECKS, ADD_CARD } from '../actions'

/* // sample state structure
{
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    }
}*/

export function decks (state = {}, {type, data}) {
    //console.log(type, 'data', data)
    switch (type) {
        case GET_DECKS :
            return { ...state, ...data }

        case ADD_DECK :
            return { ...state, ...data }

        case DELETE_DECK: {
            const { [data.key]:value, ...newState } = state
            return newState
        }
        case CLEAR_DECKS :
            return data

        case ADD_CARD :
            return { ...state,
                [data.key]:{
                    ...state[data.key],
                    questions:[
                        ...state[data.key].questions,
                        {question:data.question, answer:data.answer}
                    ]
                }
            }

        default :
          return state
      }
}

export default combineReducers({
    decks
})

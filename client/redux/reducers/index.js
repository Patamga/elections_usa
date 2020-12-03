import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import votesMap from './votesMap'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    votesMap
  })

export default createRootReducer

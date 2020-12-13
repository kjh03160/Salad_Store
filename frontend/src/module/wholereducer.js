import {combineReducers} from 'redux'
import { persistReducer } from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import storageSession from 'redux-persist/lib/storage/session'

import order from './order'
import dataSet from './dataSet'

const persistConfig ={
    key:'root',
    storage: storageSession,
    whitelist:['auth']
}
const rootReducer = combineReducers(
    {

        order,
        dataSet
    }
)
export default persistReducer(persistConfig, rootReducer)



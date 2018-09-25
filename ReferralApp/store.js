import React , {
    Component
} from 'react'
import NavigationReducer from './App/Components/Reducers/NavigationReducer'
import {createStore,combineReducers} from 'redux'

const AppReducer = combineReducers({
    NavigationReducer
});

const store = createStore(AppReducer);

export default store;
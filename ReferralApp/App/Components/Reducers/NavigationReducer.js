import { combineReducers } from "redux";
import { NavigationActions } from 'react-navigation';
import { LoginNavigationStack } from "../Navigation/NavigationStack";

const initialState = LoginNavigationStack.router.getStateForAction(NavigationActions.init())

const NavigationReducer = (state = initialState , action)=>{
    const newState = LoginNavigationStack.router.getStateForAction(action,state)
    
    return newState || state;
}
export default NavigationReducer;
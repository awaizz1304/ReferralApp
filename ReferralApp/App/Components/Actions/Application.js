import {AppScreens} from '../Common/Constants'

const ScreenChanged = (screen) =>{
    return {
        type : AppScreens,
        data : screen,
    }
}

export default{
    ScreenChanged,
}
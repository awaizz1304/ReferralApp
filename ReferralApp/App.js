/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';
import Login from './App/Screens/Login';
import ClientLayer from './App/Components/Layers/ClientLayer'
import appActions from './App/Components/Actions/Application';
import {bindActionCreators} from 'redux'
import { HomeNavigationStack, LoginNavigationStack } from './App/Components/Navigation/NavigationStack';


type Props = {};

// Select which screen to show depending on stored session
function StartScreen(props) {
  const isLoggedIn = props.isLoggedIn;
  if(!isLoggedIn){
    return <HomeNavigationStack/>
  }
  else{
    return <LoginNavigationStack/>
  }
}

class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      initialzed : false,
      isLoggedIn : false,
    };
  }

  componentDidMount () {
    console.log("componentDidMount")
    this.Initialize();
    this.setState({initialzed : true})
  }

  Initialize(){
    ClientLayer.createInstance();
    ClientLayer.getInstance().InitializeWithCallBack(()=>{
      //Initialization Success
      let session = null;
      ClientLayer.getInstance().getSharedPreferences().GetValueForKey("Session",(value)=>{
        session = value;
        this.setState({isLoggedIn : session != null});
      });
      
      
    },()=>{
      //Initialization Failure
    })
  }

  render() {
    const { navigationState, dispatch } = this.props;
    return (
      <StartScreen isLoggedIn = {this.state.isLoggedIn} />
      // <LoginNavigationStack
      //     navigation = {{
      //         dispatch,
      //         state : navigationState,
      //     }}
      // />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

// is called when the store value is changed i.e. when state is updated
const mapStateToProps = state => {
  return {
    navigationState: state.NavigationReducer
  };
};
// connects the app with required actions
const mapDispatchToProps = dispatch =>bindActionCreators(
  {
    appActions,
  },
  dispatch,
)

export default connect(mapStateToProps)(App)
// export default App
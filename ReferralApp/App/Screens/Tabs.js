'use strict'

import React, { Component } from 'react';
import{
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
export default class Tabs extends Component {

  state = {
    activeTab : 1
  }
  // Pull children out of props passed from App component
  render ({children} = this.props) {
    return(
      <View style = {styles.container}>
          <View style = {styles.tabsContainer}>
            {/*Populate all tabs and get their title*/}
            {children.map(({ props: { title } }, index) => 
              <TouchableOpacity
                style = {[
                  styles.tabContainer,
                  // merge default style with active tab style
                  index === this.state.activeTab ? styles.activeTabContainer : []
                ]}
                onPress = {() => this.setState({activeTab : index})}
                key = {index}
              >
                <Text style = {this.state.activeTab == index ? styles.tabTextActive : styles.tabTextInActive}> {title} </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style = {styles.contentContainer}>
                {children[this.state.activeTab]}
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
  },
  tabsContainer : {
    flexDirection : 'row',
    width : window.width * 0.9,
  },
  tabContainer : {
    flex : 1,
    paddingVertical : 15,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTabContainer : {
    borderBottomColor: '#0070B4',
  },
  tabTextActive: {
    color: '#36677D',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize : 15,
  },
  tabTextInActive: {
    color: '#C8D5DB',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize : 15,
  },
  contentContainer: {
    flex: 1,                           
  },
});



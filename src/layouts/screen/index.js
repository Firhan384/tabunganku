import React, {Component} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';

class ScreenLayout extends Component {
  state = {
      isLoading : true
  }
  componentDidMount() {
    setTimeout(()=> {
        this.setState({
            isLoading: false
        })
    },300)
  }
  render() {
    if(this.state.isLoading) {
        return (
            <ActivityIndicator size="large" color="#00ff00" />
        )
    }
    return (
        <View>
            <Text>Screen</Text>
        </View>
    )
  }
}

export default ScreenLayout;

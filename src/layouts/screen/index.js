import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import SessionHelper from '../../core/helpers/session_helpers';

class ScreenLayout extends Component {
    constructor(props){
        super(props);
        this.state = {
            keySession: ''
        }
    }
    componentWillUnmount(){}
    render() {
        const nas = new SessionHelper;
        nas.getItemByKey('@current_position',(cb) => {
            this.setState({
                keySession:cb 
            })
        });
        // console.log(key);
        return (
            <View>
                <TextInput value={this.state.keySession}></TextInput>
                <Text>{this.state.keySession}</Text>
            </View>
        )
    }
}

export default ScreenLayout

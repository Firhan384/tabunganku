import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class LoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      isUsername: '',
      isPassword: ''
    };
  }

  _onPressLogin = () => {
    const {isUsername, isPassword} = this.state;
    if(isUsername == '' || isPassword == ''){
        Alert.alert('Username Atau Password Kosong...');
    } else if(isUsername == 'firhan' && isPassword == 'firhan'){
        Actions.home();
        Alert.alert('work');
    } else {
        Alert.alert('Username Atau Password Salah...');
    }
  };
  render() {
    const {isUsername, isPassword} = this.state;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.containerLogin}>
            <Text style={styles.titleFormText}>Login</Text>
            <TextInput
              placeholder="Username ..."
              style={styles.inputForm}
              onChangeText={(username) => {
                  this.setState({
                    isUsername:username
                  })
              }}
            />
            <TextInput
              placeholder="Password ..."
              style={styles.inputForm}
              secureTextEntry
              onChangeText={(password) => {
                this.setState({
                    isPassword:password
                })
            }}
            />
            <View style={{width: 100}}>
              <Button title="Login" onPress={this._onPressLogin} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

export default LoginLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  containerLogin: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  inputForm: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  titleFormText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
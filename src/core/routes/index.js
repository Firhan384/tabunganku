import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {
  Scene,
  Router,
  Actions,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';
import {LoginLayout, HomeLayout, ScreenLayout} from '../../layouts/index';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene
            key="home"
            component={HomeLayout}
            title="Home"
            hideNavBar={true}
          />
          <Scene
            key="screen"
            component={ScreenLayout}
            hideNavBar={true}
          />
        </Stack>
      </Router>
    );
  }
}

export default Routes;

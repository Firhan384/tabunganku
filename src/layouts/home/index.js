import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  PermissionsAndroid,
  Image,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SessionHelper from '../../core/helpers/session_helpers';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMinutes: 0,
      isSecond: 0,
    };
  }
  async componentDidMount() {
    // setInterval(() => {
    //   this.setState((prevMinute) => ({
    //     isMinutes: prevMinute.isMinutes + 1,
    //   }));
    // }, 1000);
  }
  async componentWillUnmount() {
    clearInterval(this.state.isMinutes);
  }
  render() {
    const { isMinutes } = this.state;
    return (
      <View style={styles.topBar}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRightWidth: 1,
              borderColor: 'white',
            }}>
            <Text style={{ fontSize: 30, color: 'white' }}>
              {this.props.km} Km
            </Text>
          </View>
          <View style={{ flex: 1, borderLeftWidth: 1, borderColor: 'white' }}>
            <Text>{isMinutes}</Text>
          </View>
        </View>
      </View>
    );
  }
}

class BottomBar extends Component {
  constructor(props) {
    super(props);
    this._helperSession = new SessionHelper();
    this.state = {
      isStart: true,
    };
  }

  render() {
    const { isStart } = this.state;
    console.log(isStart);
    return (
      <View style={styles.bottomBar}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            flexDirection: 'row',
          }}>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  isStart: !isStart,
                });
              }}
              style={{
                height: 80,
                width: 80,
                backgroundColor: 'tomato',
                borderRadius: 50,
                borderColor: '#fff',
                borderWidth: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: 'white' }}>
                {isStart == true ? 'Start' : 'Stop'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

class HomeLayout extends Component {
  constructor(props) {
    MapboxGL.setAccessToken(
      'pk.eyJ1IjoiZmlyaGFuIiwiYSI6ImNraXIzbnN5dTFqM3Yyd284N2htdG9yZHIifQ.Z9YZ9GEjvcHsF9ZCA_jx_g',
    );
    super(props);
    this.startPoint = [106.74840614673072, -6.234813322985887];
    this.finishedPoint = [106.70264345, -6.16676574];
    this.state = {
      isCount: 0,
      isStart: true,
      isGranted: false,
      isLongtitude: 0,
      isLatitude: 0,
      isStartPoint: [],
      route: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                this.startPoint, //point A "current" ~ From
                this.finishedPoint, //Point B ~ to
              ],
            },
            style: {
              fill: 'red',
              strokeWidth: '5',
              fillOpacity: 0.6,
            },
            paint: {
              'fill-color': '#088',
              'fill-opacity': 0.8,
            },
          },
        ],
      },
    };
  }
  async componentDidMount() {
    const isGranted = await MapboxGL.requestAndroidLocationPermissions();
    this.setState({
      isGranted: true,
    });
    console.log('did mount');
    this.isSetLocation();
  }
  
  getStartPoint = async () => {
    return this.state.isStartPoint;
  }

  isSetLocation = () => {
    const { isGranted } = this.state;
    if (isGranted) {
      return Geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            isLongtitude: position.coords.longitude,
            isLatitude: position.coords.latitude,
            isStartPoint: [position.coords.longitude, position.coords.latitude],
          });
        },
        (error) => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  };
  getDistanceBetween = (lat1, lng1, lat2, lng2) => {
    const a = 6378.137; // equitorial radius in km
    const b = 6356.752; // polar radius in km

    var sq = (x) => x * x;
    var sqr = (x) => Math.sqrt(x);
    var cos = (x) => Math.cos(x);
    var sin = (x) => Math.sin(x);
    var radius = (lat) =>
      sqr(
        (sq(a * a * cos(lat)) + sq(b * b * sin(lat))) /
        (sq(a * cos(lat)) + sq(b * sin(lat))),
      );

    lat1 = (lat1 * Math.PI) / 180;
    lng1 = (lng1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;
    lng2 = (lng2 * Math.PI) / 180;

    var R1 = radius(lat1);
    var x1 = R1 * cos(lat1) * cos(lng1);
    var y1 = R1 * cos(lat1) * sin(lng1);
    var z1 = R1 * sin(lat1);

    var R2 = radius(lat2);
    var x2 = R2 * cos(lat2) * cos(lng2);
    var y2 = R2 * cos(lat2) * sin(lng2);
    var z2 = R2 * sin(lat2);

    return sqr(sq(x1 - x2) + sq(y1 - y2) + sq(z1 - z2));
  };
  isCurrentLocation = () => {
    return (
      <View>
        <MapboxGL.Camera
          zoomLevel={5}
          centerCoordinate={[isAltitude, isLatitude]}
        />
      </View>
    );
  };

  //106.74840614673072, -6.234813322985887
  //106.74900190353225, -6.232977323857476
  render() {
    const { isLongtitude, isLatitude, isStartPoint } = this.state;
    console.log(isStartPoint);
    const setDistanceKm = this.getDistanceBetween(
      -6.234813322985887,
      106.74840614673072,
      -6.232977323857476,
      106.74900190353225,
    );
    // console.log(setDistanceKm.toFixed(2));
    return (
      <View style={styles.container}>
        <TopBar
          km={setDistanceKm.toFixed(2)}
          isStartCallback={this.state.isCount}
        />
        <View style={styles.wrapMap}>
          <MapboxGL.MapView
            styleURL={MapboxGL.StyleURL.Street}
            // ref={c => console.log(c)}
            zoomEnabled={true}
            style={{ flex: 1 }}
            // onDidFinishLoadingMap={(e) => console.log(e)}
            centerCoordinate={[isLongtitude, isLatitude]}
            logoEnabled={false}>
            {/* camera current user */}
            <MapboxGL.Camera zoomLevel={5} centerCoordinate={[isLongtitude, isLatitude]} animationMode={'flyTo'}
              animationDuration={0}>
            </MapboxGL.Camera>
             {/* draw point Current Position */}
            <MapboxGL.PointAnnotation
              id="userCurrentPoint"
              coordinate={[isLongtitude, isLatitude]}>
              <View
                style={{
                  height: 20,
                  width: 20,
                  backgroundColor: '#00cccc',
                  borderRadius: 50,
                  borderColor: '#fff',
                  borderWidth: 3,
                }}
              />
            </MapboxGL.PointAnnotation>

            {/* draw End Point Location */}
            <MapboxGL.PointAnnotation
              key="key2"
              id="id2"
              coordinate={this.finishedPoint}>
              <View
                style={{
                  height: 20,
                  width: 20,
                  backgroundColor: 'red',
                  borderRadius: 50,
                  borderColor: '#fff',
                  borderWidth: 3,
                }}
              />
            </MapboxGL.PointAnnotation>
            {/*draw  Line Start to end */}
            <MapboxGL.ShapeSource id="line1" shape={this.state.route}>
              <MapboxGL.LineLayer
                id="linelayer1"
                style={{
                  lineColor: 'red',
                  lineWidth: 10,
                  lineCap: 'round',
                }}
              />
            </MapboxGL.ShapeSource>
          </MapboxGL.MapView>
        </View>
        <BottomBar />
      </View>
    );
  }
}

export default HomeLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  wrapMap: {
    flex: 1,
  },
  topBar: {
    height: 50,
    backgroundColor: 'tomato',
  },
  bottomBar: {
    height: 100,
    backgroundColor: 'white',
  },
});

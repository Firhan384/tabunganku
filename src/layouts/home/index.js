import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  PermissionsAndroid,
  Image,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SessionHelper from '../../core/helpers/session_helpers';
import {lineString as makeLineString} from '@turf/helpers';
import moment from 'moment';

class HomeLayout extends Component {
  constructor(props) {
    MapboxGL.setAccessToken(
      'pk.eyJ1IjoiZmlyaGFuIiwiYSI6ImNraXIzbnN5dTFqM3Yyd284N2htdG9yZHIifQ.Z9YZ9GEjvcHsF9ZCA_jx_g',
    );
    super(props);
    this.testArray = [
      [106.7320708, -6.1376039],
      [106.7320708, -6.1376039],
      [106.7320642, -6.1375962],
      [106.7320641, -6.1375957],
      [106.7320658, -6.1376006],
      [106.7320658, -6.1376006],
      [106.7320658, -6.1376006],
      [106.7320713, -6.137612],
      [106.7320713, -6.137612],
      [106.7320725, -6.1376102],
      [106.7320725, -6.1376102],
      [106.7320874, -6.1376216],
      [106.7320874, -6.1376216],
      [106.7320739, -6.1376042],
      [106.7320739, -6.1376042],
      [106.7320702, -6.1375982],
      [106.7320687, -6.1375995],
      [106.7320682, -6.1376007],
      [106.7320682, -6.1376007],
      [106.7320691, -6.1376013],
      [106.7320691, -6.1376013],
      [106.7320562, -6.137592],
      [106.7320548, -6.1375759],
      [106.7320627, -6.1375023],
      [106.7320845, -6.1374581],
      [106.7321181, -6.1374094],
      [106.7320874, -6.1374576],
      [106.7320998, -6.1373085],
      [106.7320472, -6.1372709],
      [106.7320152, -6.1372662],
      [106.7320352, -6.1372329],
      [106.7320149, -6.1372174],
      [106.7320178, -6.1371713],
      [106.7320295, -6.1371399],
      [106.732026, -6.1370743],
      [106.7319898, -6.1369977],
      [106.7319809, -6.1369872],
      [106.7318904, -6.1369673],
      [106.7318438, -6.1369667],
      [106.7316556, -6.1372401],
      [106.7316324, -6.1372837],
      [106.7316231, -6.1373369],
      [106.7316078, -6.1373895],
      [106.7315914, -6.1374434],
      [106.7315784, -6.1374942],
      [106.7315695, -6.1375653],
      [106.7315692, -6.1376146],
      [106.7315612, -6.1376748],
      [106.7315569, -6.1377249],
      [106.7315827, -6.1377734],
      [106.7316247, -6.1377733],
      [106.7316617, -6.1377874],
      [106.731671, -6.1377933],
      [106.7320304, -6.1376451],
      [106.7320304, -6.1376451],
      [106.7320689, -6.1376085],
      [106.7320704, -6.1376052],
      [106.7320704, -6.1376052],
      [106.7320699, -6.1376053],
      [106.7320666, -6.1376157],
      [106.7320666, -6.1376157],
      [106.7320808, -6.1376238],
      [106.7320882, -6.1376262],
      [106.7320882, -6.1376262],
      [106.7320874, -6.1376224],
      [106.7320874, -6.1376224],
      [106.7320815, -6.1376178],
      [106.7320826, -6.1376214],
      [106.7320834, -6.1376223],
      [106.7320834, -6.1376223],
      [106.7320848, -6.1376243],
      [106.7320859, -6.1376279],
      [106.7320859, -6.1376279],
      [106.7320856, -6.1376301],
      [106.7320856, -6.1376301],
      [106.7320832, -6.1376264],
      [106.7320832, -6.1376264],
      [106.732085, -6.1376205],
      [106.7320776, -6.1376134],
      [106.7320684, -6.1376054],
      [106.7320684, -6.1376054],
      [106.7320722, -6.1376093],
      [106.7320722, -6.1376093],
      [106.7320828, -6.1376155],
      [106.7320831, -6.1376152],
      [106.7320828, -6.137617],
      [106.7320825, -6.1376172],
      [106.7320825, -6.1376172],
      [106.7320825, -6.1376172],
      [106.732083, -6.1376278],
      [106.732083, -6.1376278],
      [106.7320838, -6.1376262],
      [106.7320838, -6.1376262],
      [106.7320534, -6.1375909],
      [106.7320534, -6.1375909],
      [106.7320716, -6.1376042],
      [106.7320716, -6.1376042],
      [106.7320809, -6.1376133],
      [106.7320809, -6.1376133],
      [106.7320834, -6.1376176],
      [106.732085, -6.137618],
      [106.732085, -6.137618],
    ];
    this.startPoint = [106.74840614673072, -6.234813322985887];
    this.finishedPoint = [106.70264345, -6.16676574];
    this.state = {
      started: true,
      loading: true,
      isGranted: false,
      myTimerService: '00:00:00',
      isStartLongtitude: 0,
      isStartLatitude: 0,
      isCurrentLocation: {},
      isStartPoint: [],
      route: null,
      coor: {
        myCoor: [0, 0],
        currentCoor: [],
      },
    };
  }
  async componentDidMount() {
    const isGranted = await MapboxGL.requestAndroidLocationPermissions();
    this.setState({
      isGranted: true,
    });

    console.log('componentDidMount');
    this.isSetLocation();

    // send to session to update location
    // setInterval(() => {
    //   this.isUpdateLocation();
    // }, 5000);

    //start time
    // if(this.state.started !== false){
    //   await AsyncStorage.setItem('@timer:running','00:00:00');
    //   // await SessionHelper.asyncSetItem('timer', 'running', '00:00:00');
    // }
    // this._renderNewTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  isUpdateLocation = async () => {
    const isRouteAvailable = await AsyncStorage.getItem('@current_position');
    let newRoutes = JSON.parse(isRouteAvailable);
    if (!isRouteAvailable) {
      newRoutes = [];
    }
    newRoutes.push(this.state.coor.currentCoor);
    // console.log(JSON.stringify(this.state.coor.currentCoor));
    await AsyncStorage.setItem('@current_position', JSON.stringify(newRoutes));
  };

  isSetLocation = async () => {
    const {isGranted} = this.state;
    if (isGranted) {
      return Geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            isStartLongtitude: position.coords.longitude,
            isStartLatitude: position.coords.latitude,
            isStartPoint: [position.coords.longitude, position.coords.latitude],
          });
        },
        (error) => {
          console.warn(error);
        },
      );
    }
  };

  _setNewLocation = async (newUserLocation) => {
    this.setState({
      coor: {
        currentCoor: [
          newUserLocation.coords.longitude,
          newUserLocation.coords.latitude,
        ],
      },
    });
  };

  _renderNewTimer() {
    let {myTimerService} = this.state;
    console.log('TIMERERER==========>', myTimerService);
    if (myTimerService !== null) {
      const splitTimer = myTimerService.split(':');

      var countFrom = new Date(
        0,
        0,
        0,
        parseInt(splitTimer[0]),
        parseInt(splitTimer[1]),
        parseInt(splitTimer[2]),
      );

      var hour = parseInt(splitTimer[0]);
      var minute = parseInt(splitTimer[1]);
      var second = parseInt(splitTimer[2]);
      if (this.state.started !== false) {
        if (hour === 0 || minute === 0 || second === 0) {
          console.log(hour);
          let i = 0;
          this.timer = setInterval(() => {
            i++;
            const timestamp = new Date(countFrom.getTime() + i * 1000);
            const mytime = moment(timestamp).format('HH:mm:ss');
            console.log(mytime);
            this.setState({myTimerService: mytime});
          }, 1000);
        } else {
          console.log('wkwkw');
        }
      }
    }
  }

  renderAnnotation(counter) {
    const id = `pointAnnotation${counter}`;
    const coordinate = this.testArray[counter];
    const newRoute = makeLineString(this.testArray);
    // console.log(sessionRoute.length);
    return (
      <MapboxGL.PointAnnotation
        key={id}
        id={id}
        title="Test"
        coordinate={coordinate}>
        <View
          style={{
            height: 30,
            width: 30,
            backgroundColor: '#00cccc',
            borderRadius: 50,
            borderColor: '#fff',
            borderWidth: 3,
          }}
        />
      </MapboxGL.PointAnnotation>
    );
  }

  renderAnnotations() {
    const items = [];
    for (let i = 0; i < this.testArray.length; i++) {
      items.push(this.renderAnnotation(i));
    }

    return items;
  }

  renderRoute = () => {
    const newRoute = makeLineString(this.testArray);

    return this.testArray ? (
      <MapboxGL.ShapeSource id="routeSource" shape={newRoute}>
        <MapboxGL.LineLayer
          id="routeFill"
          style={layerStyles.route}
          layerIndex={100}
        />
      </MapboxGL.ShapeSource>
    ) : null;
  };

  renderStart = () => {
    const {isStartLongtitude, isStartLatitude} = this.state;
    // console.log(isStartLongtitude, isStartLatitude);
    return this.state.started ? (
      <MapboxGL.PointAnnotation
        id="start"
        title="start location"
        coordinate={[isStartLongtitude, isStartLatitude]}>
        <View style={styles.circle}>
          <View style={styles.innerCircle}>
            <View style={styles.dotCircle} />
          </View>
        </View>
      </MapboxGL.PointAnnotation>
    ) : null;
  };

  renderBottom = () => {
    const {started} = this.state;
    return (
      <View style={styles.bottomBar}>
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
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  started: !started,
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
              <Text style={{color: 'white'}}>{started ? 'Start' : 'Stop'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Actions.screen();
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
              <Text style={{color: 'white'}}>Show Data</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  renderTopBar = () => {
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
            <Text style={{fontSize: 30, color: 'white'}}>Km</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderLeftWidth: 1,
              borderColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 30, color: 'white'}}>
              {this.state.myTimerService}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {loading} = this.state;
    const nas = new SessionHelper();
    const {isStartLongtitude, isStartLatitude, isStartPoint} = this.state;
    // nas.getItemByKey('@current_position',(cb) => {
    //   console.group(cb.length);
    //  });
    return (
      <>
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="tomato" />
          </View>
        )}
        <View style={styles.container}>
          {this.renderTopBar()}
          <View style={styles.wrapMap}>
            <MapboxGL.MapView
              styleURL={MapboxGL.StyleURL.Street}
              zoomEnabled={true}
              style={{flex: 1}}
              onDidFinishRenderingMapFully={() =>
                this.setState({
                  loading: false,
                })
              }
              logoEnabled={false}>
              {/* camera current user */}
              <MapboxGL.Camera
                zoomLevel={14}
                centerCoordinate={[isStartLongtitude, isStartLatitude]}
                animationMode={'flyTo'}
                animationDuration={0}
                defaultSettings={{
                  centerCoordinate: [isStartLongtitude, isStartLatitude],
                  followUserLocation: true,
                  followUserMode: 'normal',
                }}
              />

              <MapboxGL.UserLocation
                animated={true}
                visible={true}
                onUpdate={(newUserLocation) =>
                  this._setNewLocation(newUserLocation)
                }
              />
              {this.renderRoute()}
              {/* {this.renderAnnotations()} */}
              {this.renderStart()}
            </MapboxGL.MapView>
          </View>
          {this.renderBottom()}
        </View>
      </>
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
  loader: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0, .5)',
    height: '100%',
    width: '100%',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(68, 154, 235, .4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#1D1D1D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(68, 154, 235, 1)',
  },
});

const layerStyles = {
  route: {
    lineColor: '#00cccc', //1D1D1D
    lineCap: MapboxGL.LineJoin.Round,
    lineJoin: MapboxGL.LineJoin.Round,
    lineOpacity: 0.7,
    lineWidth: 8,
    lineOpacity: 0.84,
  },
};

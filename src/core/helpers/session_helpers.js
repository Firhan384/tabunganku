import AsyncStorage from '@react-native-async-storage/async-storage';

class SessionHelper {
  getItemByKey(tablekey, cb) {
    AsyncStorage.getItem(tablekey)
      .then((e) => {
        // console.log('NAS NORMAL!', tablekey);
        cb(e);
      })
      .catch((e) => {
        console.log('NAS AB_NORMAL!', tablekey, e);
        cb(null);
      });
  }
  _setItems = async (key, value) => {
    return await AsyncStorage.setItem(key, value);
  };

  static asyncSetItem(table, key, value) {
    return new Promise((resolv) => {
      NewAsyncStorage.setItem(table, key, value, resolv);
    });
  }

  _setItemRouteNavigationLine = async (startPoint, FinishPoint) => {
    const isRouteAvailable = await AsyncStorage.getItem('routes');
    let newRoutes = JSON.parse(isRouteAvailable);
    let setValue = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [[`${startPoint}`], [`${FinishPoint}`]],
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
    };
    if (!isRouteAvailable) {
      newRoutes = [];
    }
    newRoutes.push(setValue);

    this._setItems('routes', JSON.stringify(newRoutes));
  };
}

export default SessionHelper;

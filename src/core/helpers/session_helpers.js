import AsyncStorage from '@react-native-async-storage/async-storage';

class SessionHelper {

    _getItems = async (key) => {
        return await AsyncStorage.getItem(key).then((result) => {return result}).catch((error)=>{console.log(error)});
    }
    _setItems = async (key,value) => {
        return await AsyncStorage.setItem(key,value);
    }

    _setItemRouteNavigationLine = async (startPoint,FinishPoint) => {
        const isRouteAvailable = await AsyncStorage.getItem('routes');
        let newRoutes = JSON.parse(isRouteAvailable);
        let setValue = {
            type: 'FeatureCollection',
            features: [
              {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                  'type': 'LineString',
                  'coordinates': [
                    [`${startPoint}`], 
                    [`${FinishPoint}`],
                  ],
                },
                'style': {
                  'fill': 'red',
                  'strokeWidth': '5',
                  'fillOpacity': 0.6,
                },
                'paint': {
                  'fill-color': '#088',
                  'fill-opacity': 0.8,
                },
              },
            ],
          };
          if(!isRouteAvailable){
            newRoutes = [];
          }
          newRoutes.push(setValue);

         this._setItems('routes',JSON.stringify(newRoutes));
    }

}



export default SessionHelper;
import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import province from './listProvince';
import vietnam from './mapsGEOJSON/vietnam';
import {bacninh, langson, bacgiang, hanoi} from './mapsGEOJSON/province';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiaGFpYW5oMjMwNzk3IiwiYSI6ImNrdTJ1aDJlYzB0cHczMHFoMno1Y3B1NmUifQ.wUHUquOEVnPaa2D_PGLLAw',
);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});

const styles2 = {
  lineLayer: {
    lineColor: 'blue',
    lineWidth: 1,
  },
};

styles.matchParent = {
  flex: 1,
};

export default class App extends Component {
  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map}>
            <MapboxGL.Camera
              centerCoordinate={[105.517598, 15.872831]}
              zoomLevel={5}
            />
            <MapboxGL.ShapeSource
              id={'vietnam'}
              lineMetrics={true}
              shape={vietnam}>
              <MapboxGL.LineLayer id={'vietnam'} style={styles2.lineLayer} />
            </MapboxGL.ShapeSource>
          </MapboxGL.MapView>
        </View>
      </View>
    );
  }
}

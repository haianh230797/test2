import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Touchable,
} from 'react-native';
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
  dropDownBox: {
    height: 50,
    width: 300,
    borderWidth: 0.5,
    position: 'absolute',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },
  dropDownText: {
    alignSelf: 'center',
    fontSize: 20,
    marginLeft: 10,
  },
  listProvince: {
    height: 600,
    width: 300,
    marginTop: 70,
    alignSelf: 'center',
    borderWidth: 0.5,
    position: 'absolute',
    backgroundColor: 'white',
  },
  itemProvince: {
    borderWidth: 1,
    padding: 10,
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

const App = () => {
  const [showListProvince, setShowListProvince] = useState(false);
  const [provinceDisplay, setProvinceDisplay] = useState({});
  const [provinceMode, setProvinceMode] = useState(false);
  const [coordinate, setCoordinate] = useState({
    x: 105.517598,
    y: 15.872831,
  });
  const [zoomLevels, setZoomLevels] = useState(5);
  useEffect(() => {
    if (Object.keys(provinceDisplay).length === 0) {
      setProvinceMode(false);
    } else {
      setProvinceMode(true);
    }
  }, [provinceDisplay]);

  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
  }, []);

  const renderItem = ({item}) => <Item item={item} />;

  const Item = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemProvince}
        onPress={() => {
          setProvinceDisplay(item);
          setCoordinate({x: item.x, y: item.y});
          setShowListProvince(false);
          setZoomLevels(7.8)
        }}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera
            centerCoordinate={[coordinate.x, coordinate.y]}
            zoomLevel={zoomLevels}
          />
          <MapboxGL.ShapeSource
            id={'vietnam'}
            lineMetrics={true}
            shape={!provinceMode ? vietnam : provinceDisplay.shape}>
            <MapboxGL.LineLayer id={'vietnam'} style={styles2.lineLayer} />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
      </View>
      <TouchableOpacity
        style={styles.dropDownBox}
        onPress={() => {
          setShowListProvince(!showListProvince);
        }}>
        <Text style={styles.dropDownText}>{provinceDisplay.name}</Text>
      </TouchableOpacity>
      {showListProvince === true ? (
        <View style={styles.listProvince}>
          <FlatList
            contentContainerStyle={{paddingBottom: 30}}
            data={province}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export default App;

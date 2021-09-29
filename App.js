import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Text, TouchableOpacity} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import province from './listProvince';
import vietnam from './mapsGEOJSON/vietnam';
import {styles} from './mapStyle';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiaGFpYW5oMjMwNzk3IiwiYSI6ImNrdTJ1aDJlYzB0cHczMHFoMno1Y3B1NmUifQ.wUHUquOEVnPaa2D_PGLLAw',
);

const stylesProvince = {
  lineLayer: {
    lineColor: '#6195ED',
    lineWidth: 2,
    lineCap: 'round',
    lineJoin: 'round',
  },
};
const stylesProvinceIsChoice = {
  lineLayer: {
    lineColor: 'red',
    lineWidth: 4,
  },
};

const App = () => {
  const [showListProvince, setShowListProvince] = useState(false);
  const [provinceDisplay, setProvinceDisplay] = useState({});
  const [provinceMode, setProvinceMode] = useState(false);
  const [coordinate, setCoordinate] = useState({
    x: 105.517598,
    y: 16.902831,
  });
  const [zoomLevels, setZoomLevels] = useState(4.8);
  const [disableSwipe, setDisableSwipe] = useState('auto');

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
          setShowListProvince(false);
          setCoordinate({x: item.x, y: item.y});
          setZoomLevels(7);
          setDisableSwipe('none');
        }}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.page}>
      <View style={styles.container} pointerEvents={disableSwipe}>
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera
            centerCoordinate={[coordinate.x, coordinate.y]}
            zoomLevel={zoomLevels}
          />
          {provinceDisplay && provinceDisplay.shape ? (
            <>
              <MapboxGL.ShapeSource
                id={'vietnam'}
                lineMetrics={true}
                shape={vietnam}>
                <MapboxGL.LineLayer
                  id={'vietnam'}
                  style={stylesProvince.lineLayer}
                />
              </MapboxGL.ShapeSource>
              <MapboxGL.ShapeSource
                id={provinceDisplay.id.toString()}
                lineMetrics={true}
                shape={provinceDisplay.shape}>
                <MapboxGL.LineLayer
                  id={provinceDisplay.id.toString()}
                  style={stylesProvinceIsChoice.lineLayer}
                />
              </MapboxGL.ShapeSource>
            </>
          ) : (
            <MapboxGL.ShapeSource
              id={'vietnam'}
              lineMetrics={true}
              shape={vietnam}>
              <MapboxGL.LineLayer
                id={'vietnam'}
                style={stylesProvince.lineLayer}
              />
            </MapboxGL.ShapeSource>
          )}
        </MapboxGL.MapView>
      </View>
      <View style={styles.dropDownBox}>
        <TouchableOpacity
          style={styles.dropDownTitle}
          onPress={() => {
            setShowListProvince(!showListProvince);
          }}>
          <Text style={styles.dropDownText}>
            {provinceMode ? provinceDisplay.name : 'Choice province'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dropDownClose}
          onPress={() => {
            setZoomLevels(5);
            setCoordinate({x: 105.517598, y: 15.872831});
            setShowListProvince(false);
            setProvinceDisplay({});
            setDisableSwipe('auto');
          }}>
          <Text style={styles.closeWatchProvince}>X</Text>
        </TouchableOpacity>
      </View>

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

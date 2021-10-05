import React, {Component} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showListProvince: false,
      provinceDisplay: {},
      provinceMode: false,
      coordinate: {
        x: 105.517598,
        y: 16.902831,
      },
      zoomLevels: 4.8,
      disableSwipe: 'auto',
    };
  }
  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
    if (Object.keys(this.state.provinceDisplay).length === 0) {
      this.setState({...this.state, provinceMode: false});
    } else {
      this.setState({...this.state, provinceMode: true});
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.provinceDisplay !== this.state.provinceDisplay) {
      if (Object.keys(this.state.provinceDisplay).length === 0) {
        this.setState({...this.state, provinceMode: false});
      } else {
        this.setState({...this.state, provinceMode: true});
      }
    }
  }

  render() {
    const renderItem = ({item}) => <Item item={item} />;

    const Item = ({item}) => {
      return (
        <TouchableOpacity
          style={styles.itemProvince}
          onPress={() => {
            this.setState({
              ...this.state,
              provinceDisplay: item,
              showListProvince: false,
              coordinate: {x: item.x, y: item.y},
              zoomLevels: 7,
              disableSwipe: 'none',
            });
          }}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.page}>
        <View style={styles.container} pointerEvents={this.state.disableSwipe}>
          <MapboxGL.MapView style={styles.map}>
            <MapboxGL.Camera
              centerCoordinate={[
                this.state.coordinate.x,
                this.state.coordinate.y,
              ]}
              zoomLevel={this.state.zoomLevels}
            />
            {this.state.provinceDisplay && this.state.provinceDisplay.shape ? (
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
                  id={this.state.provinceDisplay.id.toString()}
                  lineMetrics={true}
                  shape={this.state.provinceDisplay.shape}>
                  <MapboxGL.LineLayer
                    id={this.state.provinceDisplay.id.toString()}
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
              this.setState({
                ...this.state,
                showListProvince: !this.state.showListProvince,
              });
            }}>
            <Text style={styles.dropDownText}>
              {this.state.provinceMode
                ? this.state.provinceDisplay.name
                : 'Choice province'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dropDownClose}
            onPress={() => {
              this.setState({
                ...this.state,
                provinceDisplay: {},
                showListProvince: false,
                coordinate: {x: 105.517598, y: 15.872831},
                zoomLevels: 5,
                disableSwipe: 'auto',
              });
            }}>
            <Text style={styles.closeWatchProvince}>X</Text>
          </TouchableOpacity>
        </View>

        {this.state.showListProvince === true ? (
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
  }
}

export default App;

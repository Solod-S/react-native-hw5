import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 50.5182951,
          longitude: 30.7849204,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          key={new Date()}
          coordinate={{ latitude: 50.5182951, longitude: 30.7849204 }}
          title="photo"
          // description={marker.description}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

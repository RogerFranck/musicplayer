import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PlayListInterface } from "../redux/context/playListSlice";
import { PRIMARY_TEXT } from "../const/color";
import { formatTime, secondsToMinutes } from "../utils/time";
import { IMG_MUSIC } from "../const/image";

interface CardInterface extends PlayListInterface {
  onPress: Function;
}

export default function CardMusic({
  mbid,
  name,
  image,
  artist,
  listeners,
  duration,
  onPress,
}: CardInterface) {
  const listenersView = Number(listeners) / 1000000;
  const durationView = formatTime(Number(duration));

  return (
    <>
      <TouchableOpacity
        onPress={() =>
          onPress({ name, image, artist, listeners, duration, mbid })
        }
      >
        <View style={styles.container}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: image[1]["#text"],
            }}
          />
          <View style={styles.bodyCard}>
            <Text style={styles.tertiaryText}>{listenersView.toFixed(2)}M</Text>
            <Text style={styles.primaryText}>{name}</Text>
            <View style={styles.flex}>
              <Text style={styles.secondaryText}> {artist.name} </Text>
              <Text style={styles.secondaryText}> {durationView} m </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    gap: 10,
    borderRadius: 10,
  },
  bodyCard: {
    gap: 5,
    flex: 1,
  },
  primaryText: {
    fontWeight: "bold",
    fontSize: 20,
    color: PRIMARY_TEXT,
  },
  secondaryText: {
    color: "gray",
  },
  tertiaryText: {
    color: "gray",
    fontSize: 12,
  },
  tinyLogo: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

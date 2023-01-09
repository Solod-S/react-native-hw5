import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";

const mapPin = require("../../assets/icon/map-pin.png");

export default function Post({
  navigation,
  title,
  image,
  comments,
  location,
  region,
}) {
  return (
    <View style={styles.post}>
      <Image
        source={{ uri: image, height: 300, width: "100%" }}
        style={styles.postImg}
      />

      <Text style={styles.postTitle}>{title}</Text>
      <View style={styles.postFooter}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate("CommentsScreen", { image })}
        >
          <View style={styles.postCommentThmb}>
            {/* <Image style={styles.postCommentIcon} source={commentPin} /> */}
            <FontAwesome5
              style={styles.postCommentIcon}
              name="comment"
              size={18}
              color={comments > 0 ? "orange" : "grey"}
              // color="orange"
            />
            <Text style={styles.postCommentNumber}>{comments}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate("MapScreen", region)}
        >
          <View style={styles.postLocationThmb}>
            <Feather
              name="map-pin"
              style={styles.postLocationIcon}
              size={18}
              color="black"
            />
            <Text style={styles.postLocationTitle}>{location}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    marginBottom: 32,
  },
  postImg: {
    width: "100%",
    borderRadius: 8,
    marginBottom: 8,
  },
  postTitle: {
    marginBottom: 9,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
    color: "#212121",
    fontFamily: "Roboto-Regular",
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postCommentThmb: {
    flexDirection: "row",
  },
  postCommentIcon: {
    marginRight: 9,
  },
  postCommentNumber: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
  },

  postLocationThmb: {
    flexDirection: "row",
  },
  postLocationIcon: {
    marginRight: 9,
  },
  postLocationTitle: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
    color: "#212121",
    fontFamily: "Roboto-Regular",
    textDecoration: "underlin",
  },
});

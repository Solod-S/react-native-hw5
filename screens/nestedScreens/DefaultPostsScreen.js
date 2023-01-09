import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from "react-native";

const profile = {
  name: "Nataliaa Romanova",
  email: "email@example.com",
};

//components
import Post from "../../components/Post/Post";

//images
const ava = require("../../assets/images/avatar.png");

export default function DefaultPostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const { name, email } = profile;
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;

      setdimensions(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => {
      dimensionsHandler.remove();
    };
  }, [route.params]);

  return (
    <View style={{ ...styles.container, width: dimensions + 16 * 2 }}>
      <View style={styles.userThmb}>
        <Image style={styles.avatar} source={ava} />
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      {posts && (
        <FlatList
          data={posts}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => {
            const { id, image, title, comments, location, region } = item;
            return (
              <Post
                navigation={navigation}
                key={id}
                title={title}
                image={image}
                comments={comments}
                location={location}
                region={region}
              />
            );
          }}
        />
      )}
      {/* <ScrollView showsVerticalScrollIndicator={false}>
        {posts &&
          posts.map(({ id, image, title, comments, location }) => (
            <Post
              navigation={navigation}
              key={id}
              title={title}
              image={image}
              comments={comments}
              location={location}
            />
          ))}
      </ScrollView> */}
    </View>
  );
}

//styles
const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: "flex-start",
    // alignItems: "flex-start",
  },
  userThmb: {
    flexDirection: "row",
    marginBottom: 32,
  },
  name: {
    fontSize: 15,
    lineHeight: 19,
    color: "#212121",
    fontFamily: "Roboto-Bold",
  },
  email: {
    fontSize: 11,
    lineHeight: 19,
    color: "#212121",
    fontFamily: "Roboto-Regular",
  },
  avatar: {
    marginRight: 8,
    width: 60,
    height: 60,
    borderRadius: 16,
  },
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

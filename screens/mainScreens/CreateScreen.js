import { useState, useEffect } from "react";
import { MaterialIcons, Foundation, FontAwesome } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Platform,
  Button,
  ScrollView,
  ImageBackground,
} from "react-native";

//stateSchema
const initialState = {
  title: "",
  location: "",
};

export default function CreateScreen({ navigation }) {
  //location
  const [location, setLocation] = useState({});
  const [permission, requestPermission] = Camera.useCameraPermissions();

  //camera
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const isFocused = useIsFocused();
  const [type, setType] = useState(CameraType.front);

  //other
  const [post, setPost] = useState(initialState);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );
  const redyToPost = photo && post.location && post.title;
  const redyToDell = photo || post.location || post.title;
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
    requestPermission;
    const onChangeDimension = () => {
      const width = Dimensions.get("window").width - 20 * 2;
      setdimensions(width);
    };

    const dimensionsHandler = Dimensions.addEventListener(
      "change",
      onChangeDimension
    );

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      dimensionsHandler.remove();
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [photo]);

  const keyboardHide = () => {
    setKeyboardVisible(false);
    Keyboard.dismiss();
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePicture = async () => {
    try {
      let { uri } = await camera.takePictureAsync();
      let location = await Location.getCurrentPositionAsync({});
      setPhoto(uri);
      setLocation(location.coords);
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = () => {
    navigation.navigate("DefaultPostsScreen", {
      id: "1",
      image: photo,
      title: post.title,
      comments: 8,
      location: post.location,
      locationCords: location,
      like: 0,
    });

    setPhoto(null);
    setLocation(null);
    setPost(initialState);
  };

  const onDell = () => {
    setPhoto(null);
    setLocation(null);
    setPost(initialState);
    navigation.navigate("DefaultPostsScreen");
  };

  if (!permission) {
    // Camera permissions are still loading
    return null;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.permissionContainer}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={{ ...styles.container, width: dimensions + 16 * 2 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginBottom: 8 }}>
            {!isKeyboardVisible && (
              <>
                {isFocused && (
                  <>
                    {!photo ? (
                      <Camera
                        skipProcessing={true}
                        type={type}
                        onCameraReady={onCameraReady}
                        onMountError={(error) => {
                          154;
                          console.log("cammera error", error);
                          155;
                        }}
                        ratio="1:1"
                        ref={setCamera}
                        style={styles.camera}
                      >
                        <TouchableOpacity
                          activeOpacity={0.6}
                          style={styles.takePhotoBtn}
                          onPress={takePicture}
                        >
                          <FontAwesome name="camera" size={20} color="grey" />
                        </TouchableOpacity>
                      </Camera>
                    ) : (
                      <View style={{ position: "relative" }}>
                        <ImageBackground
                          source={{ uri: photo }}
                          style={styles.imageView}
                        >
                          <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.dellPhotoBtn}
                            onPress={() => setPhoto(null)}
                          >
                            <Foundation name="trash" size={20} color="grey" />
                          </TouchableOpacity>
                        </ImageBackground>
                      </View>
                    )}
                  </>
                )}
                <View>
                  <Text style={styles.addTitile}>
                    {photo ? "Удалить фото" : "Сделать фото"}
                  </Text>
                </View>
              </>
            )}
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <View
              style={{
                paddingBottom: isKeyboardVisible ? 10 : 0,
              }}
            >
              <View style={{ marginBottom: 16 }}>
                <TextInput
                  placeholder="Название..."
                  value={post.title}
                  style={styles.input}
                  textAlign={"left"}
                  onFocus={() => setKeyboardVisible(true)}
                  onChangeText={(value) =>
                    setPost((prevState) => ({ ...prevState, title: value }))
                  }
                />
              </View>
              <View style={{ marginBottom: 32, position: "relative" }}>
                <TextInput
                  placeholder="Местность..."
                  value={post.location}
                  style={styles.input}
                  textAlign={"left"}
                  onFocus={() => setKeyboardVisible(true)}
                  onChangeText={(value) =>
                    setPost((prevState) => ({
                      ...prevState,
                      location: value,
                    }))
                  }
                />
              </View>
            </View>
          </KeyboardAvoidingView>
          {!isKeyboardVisible && (
            <>
              <TouchableOpacity
                disabled={redyToPost ? false : true}
                activeOpacity={0.6}
                style={{
                  ...styles.subBtn,
                  // borderColor: redyToPost? "transparent" : ,
                  backgroundColor: redyToPost ? "#FF6C00" : "#F6F6F6",
                }}
                onPress={() => submitForm()}
              >
                <Text
                  style={{
                    ...styles.btnTitle,
                    color: redyToPost ? "#FFFFFF" : "#BDBDBD",
                  }}
                >
                  Опубликовать
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={redyToDell ? false : true}
                activeOpacity={0.6}
                style={{
                  ...styles.dellBtn,
                  backgroundColor: redyToDell ? "#FF6C00" : "#F6F6F6",
                }}
                onPress={() => onDell()}
              >
                <MaterialIcons
                  name="delete-outline"
                  size={24}
                  color={redyToDell ? "#FFFFFF" : "#DADADA"}
                />
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

//styles
const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  camera: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8E8E8",
    height: 340,
  },
  takePhotoBtn: {
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  imageView: {
    height: 340,
    justifyContent: "center",
    alignItems: "center",
  },
  dellPhotoBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 50,
  },
  addTitile: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "400",
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    marginBottom: 30,
  },
  input: {
    paddingBottom: 16,
    paddingTop: 16,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "400",
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  subBtn: {
    marginBottom: 16,
    paddingBottom: 16,
    paddingTop: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 1,
    fontFamily: "Roboto-Regular",
    backgroundColor: "#F6F6F6",
    ...Platform.select({
      ios: {
        borderColor: "#FF6C00",
        backgroundColor: "transparent",
      },
      android: {
        borderColor: "transparent",
        backgroundColor: "#F6F6F6",
      },
      default: {
        borderColor: "transparent",
        backgroundColor: "#F6F6F6",
      },
    }),
  },
  btnTitle: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
    ...Platform.select({
      ios: {
        color: "#1B4371",
      },
      android: {
        color: "#BDBDBD",
      },
      default: {
        color: "#BDBDBD",
      },
    }),
  },
  dellBtn: {
    marginTop: "auto",
    padding: 12,
    width: 70,
    height: 50,
    marginRight: "auto",
    marginLeft: "auto",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});

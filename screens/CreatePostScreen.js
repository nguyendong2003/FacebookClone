import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  Image,
  Pressable,
  Button,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";

import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Feather,
  Ionicons,
  Fontisto,
  Entypo,
} from "@expo/vector-icons";

import { Dropdown } from "react-native-element-dropdown";

// Upload image
import * as ImagePicker from "expo-image-picker";
// Camera
import { Camera, CameraType } from "expo-camera/legacy";

import { useState, useEffect, useRef, useCallback, useContext } from "react";

import { useFocusEffect } from "@react-navigation/native";
import { Context as PostContext } from "../context/PostContext";
import { Context as AccountContext } from "../context/AccountContext";
import { LogBox } from 'react-native';

export default function CreatePostScreen({ navigation, route }) {
  const [textPost, setTextPost] = useState("");
  const [imagePostList, setImagePostList] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const { createPost } = useContext(PostContext);
  const { state } = useContext(AccountContext);

  // chọn chế độ bài viết
  const [value, setValue] = useState("1");

  const data = [
    { label: "Public", value: "1" },
    { label: "Private", value: "2" },
  ];

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  
  const submitPost = async () => {
    if (textPost.trim().length > 0 || imagePostList?.length > 0) {
      await createPost({
        content: textPost,
        images: imagePostList,
        view_mode: value,
      });
      if (route?.params?.onFetchPost)
        route.params.onFetchPost();

      setTextPost("");
      setImagePostList(null);
      setPhoto(null);
      setIsSubmit(false);
      navigation.goBack();
    }
  };
  // pick multiple image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      let imageList = [];
      result.assets.forEach((image) => {
        imageList.push(image.uri);
      });
      if (imagePostList === null) {
        setImagePostList(imageList);
      } else {
        setImagePostList((prevImageList) => [...prevImageList, ...imageList]);
        // setImagePostList([...imagePostList, ...imageList]);
      }

      // console.log(imagePostList);
    }
  };

  // Click remove image
  const removeImage = (index) => {
    if (imagePostList?.length > 0) {
      setImagePostList((prevImageList) => {
        const updatedImageList = [...prevImageList];
        updatedImageList.splice(index, 1);
        return updatedImageList;
      });
    } else if (imagePostList?.length === 0) {
      setImagePostList(null);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setIsSubmit(false);
  };

  //
  useEffect(() => {
    if (textPost.trim().length > 0 || imagePostList?.length > 0 || photo) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  }, [textPost, imagePostList, photo]);

  const [dimensions, setDimensions] = useState({
    window: Dimensions.get("window"),
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions({ window });
    });
    return () => subscription?.remove();
  });

  const { window } = dimensions;
  const windowWidth = window.width;
  const windowHeight = window.height;
  // Camera
  const [photo, setPhoto] = useState(null);
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    async function requestCameraPermission() {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    }

    requestCameraPermission();
  });

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({ headerShown: !showCamera });
    }, [navigation, showCamera])
  );

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  let takePicture = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setShowCamera(false);
    setPhoto(newPhoto.uri);
    setIsSubmit(true);
    console.log(newPhoto.uri);
    // setImage(null);
  };
  let openCamera = async () => {
    // const cameraPermission = await Camera.requestCameraPermissionsAsync();
    // setHasCameraPermission(cameraPermission.status === 'granted');
    setShowCamera(true);
  };

  if (showCamera) {
    return (
      <View style={{ flex: 1 }}>
        <Camera
          // style={{ flex: 1 }}
          type={type}
          ref={cameraRef}
          ratio="16:9"
          style={{
            flex: 1,
            height: Math.round((windowWidth * 16) / 9),
            width: "100%",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 30,
            }}
          >
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "transparent",
              }}
              // onPress={()=>this.pickImage()}
            >
              {/* <Ionicons
                name="ios-photos"
                style={{ color: '#fff', fontSize: 40 }}
              /> */}
              <MaterialIcons
                name="add-photo-alternate"
                size={40}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "transparent",
              }}
              onPress={() => takePicture()}
            >
              <FontAwesome
                name="camera"
                style={{ color: "#fff", fontSize: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "transparent",
              }}
              onPress={() => toggleCameraType()}
            >
              <MaterialCommunityIcons
                name="camera-switch"
                style={{ color: "#fff", fontSize: 40 }}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }

  //

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // https://stackoverflow.com/questions/29685421/hide-keyboard-in-react-native
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 12,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={state.account.avatar == null ? require("../assets/defaultProfilePicture.jpg") : { uri: state.account.avatar }}
                style={{ width: 60, height: 60, borderRadius: 100 }}
              />
              <View style={{ marginLeft: 8 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {state.account.profile_name}
                </Text>
                <Dropdown
                  style={styles.dropdown}
                  selectedTextStyle={styles.selectedTextStyle}
                  search={false}
                  iconStyle={styles.iconStyle}
                  data={data}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={false}
                  value={value}
                  onChange={(item) => {
                    setValue(item.value);
                  }}
                  renderLeftIcon={() => (
                    <Ionicons
                      style={styles.icon}
                      name={value === "1" ? "earth-sharp" : "lock-closed"}
                      size={20}
                      color="#0866ff"
                    />
                  )}
                  renderRightIcon={() => (
                    <Entypo
                      style={styles.icon}
                      name="triangle-down"
                      size={20}
                      color="#0866ff"
                    />
                  )}
                  renderItem={(item) => (
                    <View style={styles.item}>
                      <Text
                        style={[
                          styles.textItem,
                          {
                            color: item.value === value ? "#0866ff" : "#050505",
                          },
                        ]}
                      >
                        {item.label}
                      </Text>
                      {item.value === value && (
                        <AntDesign
                          style={styles.icon}
                          color="#0866ff"
                          name="Safety"
                          size={20}
                        />
                      )}
                    </View>
                  )}
                />
              </View>
            </View>

            <View>
              <Button
                title="Post"
                color="#0866ff"
                disabled={!isSubmit}
                onPress={submitPost}
              />
            </View>
          </View>
          <View style={{ marginTop: 16, padding: 12 }}>
            <TextInput
              style={{
                color: "#050505",
                textAlignVertical: "top",
                fontSize: 18,
                // minHeight: imagePostList ? 100 : 0,
              }}
              value={textPost}
              onChangeText={setTextPost}
              blurOnSubmit={true}
              autoFocus={true}
              multiline
              // numberOfLines={!imagePostList && 5}
              placeholder="What are you thinking?"
            />
          </View>

          <View
            style={{
              marginTop: 8,
              marginBottom: 8,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {photo && (
              <View>
                <Image
                  // source={{ uri: 'data:image/jpg;base64,' + photo.base64 }}
                  source={{ uri: photo }}
                  style={{
                    width: windowWidth,
                    height: windowWidth,
                    alignContent: "center",
                  }}
                  resizeMode="cover"
                />
                <Entypo
                  style={{ position: "absolute", left: "88%", top: 10 }}
                  name="circle-with-cross"
                  size={36}
                  color="#ccc"
                  onPress={() => {
                    removePhoto();
                  }}
                />
              </View>
            )}
            {imagePostList &&
              imagePostList.map((image, index) => (
                <View key={index}>
                  <Image
                    // key={index}
                    source={{ uri: image }}
                    style={{
                      // marginLeft: 8,
                      marginTop: 4,
                      borderRadius: 20,
                    }}
                    width={windowWidth / 2}
                    height={windowWidth / 2}
                    resizeMode="cover"
                  />
                  <Entypo
                    style={{ position: "absolute", left: "80%", top: 8 }}
                    name="circle-with-cross"
                    size={36}
                    color="#ccc"
                    onPress={() => {
                      removeImage(index);
                    }}
                  />
                </View>
              ))}
          </View>
          <View>
            <TouchableOpacity
              style={styles.optionButtonContainer}
              onPress={() => {
                pickImage();
              }}
            >
              <FontAwesome6 name="image" size={24} color="#45bd62" />
              <Text style={styles.textOptionButton}>Image</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.optionButtonContainer}
              onPress={() => {}}
            > */}
              {/* <Ionicons name="person-add" size={24} color="#0866ff" />
              <Text style={styles.textOptionButton}>Tag other people</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButtonContainer}
              onPress={() => {}}
            >
              <MaterialIcons name="add-reaction" size={24} color="#f7bb2d" />
              <Text style={styles.textOptionButton}>Reaction</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButtonContainer}
              onPress={() => {}}
            >
              <Ionicons name="text" size={24} color="#2abba7" />
              <Text style={styles.textOptionButton}>Background Color</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButtonContainer}
              onPress={() => openCamera()}
            >
              <Entypo name="camera" size={24} color="#0866ff" />
              <Text style={styles.textOptionButton}>Camera</Text>
            </TouchableOpacity> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: "white",
    // paddingTop: StatusBar.currentHeight,
  },
  scrollContainer: {
    flexGrow: 1,
    // alignItems: 'center',
    backgroundColor: "white",
    // padding: 16,
    // padding: 4,
    paddingBottom: 8,
  },
  //
  optionButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "#e2e4e7",
    borderTopWidth: 1,
    padding: 12,
  },
  textOptionButton: {
    color: "#65676b",
    fontSize: 18,
    fontWeight: "400",
    marginLeft: 12,
  },

  // Dropdown
  dropdown: {
    // margin: 16,
    marginTop: 4,
    minWidth: 130,
    height: 36,
    backgroundColor: "#ebf5ff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#0866FF",
    fontWeight: "500",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

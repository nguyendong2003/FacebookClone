import {
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Button,
  Pressable,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import FriendProfile from "../components/FriendProfile";
import Post from "../components/Post";
import * as ImagePicker from "expo-image-picker";
// const listFriend =[]
import { DeviceEventEmitter } from "react-native";
import { useState, useContext, useEffect } from "react";

import { Context as FriendContext } from "../context/FriendContext";
import { Context as AccountContext } from "../context/AccountContext";
import { Context as UserPostContext } from "../context/UserPostContext";
import { getUserPosts, getPostById } from "../service/PostService";
import { getAccountById } from "../service/AccountService";
import {
  createNotification,
  deleteNotification,
  getSendNotificationFromFriendRequest,
  getReceiveNotificationFromFriendRequest,
} from "../service/NotificationService";
import {
  getFriendsByAccountId,
  getProfileStatus,
  removeFriend,
} from "../service/FriendService";
import { updateAvatar, updateCoverImage } from "../service/AccountService";

export default function ProfileScreen({ navigation, route }) {
  // stranger, waitAccept, realFriend, personalPage
  const { isPersonalPage, statusFriend, listFriend } = route.params;
  const { state, getAccount } = useContext(AccountContext);
  const {
    sendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
  } = useContext(FriendContext);
  const [userPost, setUserPost] = useState([]);
  const [isFriend, setIsFriend] = useState(statusFriend);
  const [isVisible, setIsVisible] = useState(isPersonalPage);
  const [user, setUser] = useState({});
  const [friendList, setFriendList] = useState([]);
  const [status, setStatus] = useState(null);
  const [imageCover, setImageCover] = useState(null);
  const [imageAvatar, setImageAvatar] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [notificationId, setNotificationId] = useState(null);
  const [isLoadingCover, setIsLoadingCover] = useState(false);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);

  const fetchUserPost = async () => {
    const data = await getUserPosts(route.params.accountId);
    setUserPost(data);
  };

  const fetchProfileStatus = async () => {
    const data = await getProfileStatus(route.params.accountId);

    if (data == "PERSONAL") {
      setIsVisible(true);
    }
    setStatus(data);
  };

  const fetchUser = async () => {
    const user = await getAccountById(route.params.accountId);
    setUser(user);
  };

  const fetchUserData = async () => {
    fetchUser();
    fetchProfileStatus();
    fetchUserPost();

    const friendsData = await getFriendsByAccountId(route.params.accountId);
    setFriendList(friendsData);
    setIsLoadingAvatar(false);
    setIsLoadingCover(false);
  };

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      "fetchProfile",
      fetchUser
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    fetchUserData();
    const subscription = DeviceEventEmitter.addListener(
      "fetchPost",
      fetchUserPost
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (notificationId == null) {
      if (status == "IN_REQUEST_SENDER") {
        handleGetSendNotification(route.params.accountId);
      } else if (status == "IN_REQUEST_RECEIVER") {
        handleGetReceiveNotification(route.params.accountId);
      }
    }
  }, [status]);

  const updatePostById = async (postId) => {
    const update_post = await getPostById(postId);

    list_update = userPost.map((post) =>
      post.id === postId ? update_post : post
    );
    setUserPost(list_update);
  };

  useEffect(() => {
    const updatePostById = async (postId) => {
      const update_post = await getPostById(postId);

      const list_update = userPost.map((post) =>
        post.id === postId ? update_post : post
      );
      setUserPost(list_update);
    };

    const subscription = DeviceEventEmitter.addListener(
      "reloadProfileScreenPost",
      updatePostById
    );

    return () => {
      subscription.remove();
    };
  }, [userPost]);

  const pickImage = async (type) => {
    // Hỏi quyền truy cập thư viện ảnh
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // Mở thư viện ảnh để người dùng chọn ảnh
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (type == "cover") {
      if (!result.canceled) {
        setIsLoadingCover(true);
        await updateCoverImage(result.assets[0].uri);
        fetchUserData();
        // setIsLoadingCover(false)
      }
    } else {
      if (!result.canceled) {
        setIsLoadingAvatar(true);
        await updateAvatar(result.assets[0].uri);
        fetchUserData();
        getAccount();
        // setIsLoadingAvatar(false)
      }
    }
    // console.log(image)
  };

  const handleCreateNotification = async (to_account_id, notify_type) => {
    try {
      const response = await createNotification({
        from_account_id: state.account.id,
        to_account_id,
        to_post_id: null,
        to_comment_post_id: null,
        notify_type,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetSendNotification = async (receiverId) => {
    try {
      const response = await getSendNotificationFromFriendRequest(receiverId);
      setNotificationId(response.id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetReceiveNotification = async (senderId) => {
    try {
      const response = await getReceiveNotificationFromFriendRequest(senderId);
      setNotificationId(response.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteNotification = async () => {
    try {
      const response = await deleteNotification(notificationId);
    } catch (error) {
      console.log(error);
    }
  };

  const sendRequestHandler = async () => {
    await sendRequest(route.params.accountId);
    getProfileStatus(route.params.accountId).then((data) => {
      setStatus(data);
    });
    handleCreateNotification(route.params.accountId, "friend_request");
  };

  const cancelRequestHandler = async () => {
    await cancelFriendRequest(route.params.accountId);
    await handleDeleteNotification();
    fetchProfileStatus();
  };

  const rejectRequestHandler = async () => {
    await rejectFriendRequest(route.params.accountId);
    await handleDeleteNotification();
    fetchProfileStatus();
  };

  const acceptRequestHandler = async () => {
    await acceptFriendRequest(route.params.accountId);
    await handleDeleteNotification();
    fetchProfileStatus();
  };

  const renderCreatePost = () => {
    return isVisible ? (
      <TouchableOpacity
        style={styles.headerPost}
        onPress={() => navigation.navigate("CreatePost", { inProfile: true })}
      >
        <Image
          source={
            user.avatar == null
              ? require("../assets/defaultProfilePicture.jpg")
              : { uri: user.avatar }
          }
          style={[
            styles.avatar,
            { margin: 10, width: 40, height: 40, borderWidth: 1 },
          ]}
        />
        <Text style={{ marginLeft: 10 }}>What are you thinking?</Text>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginRight: 15,
          }}
        >
          <FontAwesome5 name="images" size={24} color="green" />
        </View>
      </TouchableOpacity>
    ) : null;
  };

  const renderStateFriend = () => {
    switch (status) {
      case "STRANGER":
        return (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.Button, { backgroundColor: "#3366CC", flex: 1 }]}
              onPress={() => sendRequestHandler()}
            >
              <Ionicons name="person-add" size={20} color="white" />
              <Text style={{ marginLeft: 10, fontSize: 15, color: "white" }}>
                Add friend
              </Text>
            </TouchableOpacity>
          </View>
        );
        break;
      case "IN_REQUEST_RECEIVER":
        return (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.Button, { backgroundColor: "#3366CC", flex: 1 }]}
              onPress={acceptRequestHandler}
            >
              <AntDesign name="check" size={13} color="white" />
              <Text style={{ marginLeft: 10, fontSize: 15, color: "white" }}>
                Accept
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.Button, { backgroundColor: "#CFECEC", flex: 1 }]}
              onPress={() => {
                rejectRequestHandler();
              }}
            >
              <AntDesign name="close" size={13} color="black" />
              <Text style={{ marginLeft: 10, fontSize: 15, color: "black" }}>
                Decline
              </Text>
            </TouchableOpacity>
          </View>
        );
        break;
      case "IN_REQUEST_SENDER":
        return (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.Button, { backgroundColor: "#3366CC", flex: 1 }]}
              onPress={() => cancelRequestHandler()}
            >
              <AntDesign name="check" size={13} color="white" />
              <Text style={{ marginLeft: 10, fontSize: 15, color: "white" }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        );
        break;
      case "IS_FRIEND":
        return (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.Button, { backgroundColor: "#CFECEC", flex: 1 }]}
              onPress={() => setIsShowModal(true)}
            >
              <Ionicons name="person" size={13} color="black" />
              <Text style={{ marginLeft: 10, fontSize: 15, color: "black" }}>
                Friend
              </Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isShowModal}
              onRequestClose={() => {
                // Alert.alert('Modal has been closed.');
                // setIsPressingMore(!isPressingMore);
                setIsShowModal(!isShowModal);
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "center",
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              >
                <Pressable
                  style={{
                    height: "90%",
                    width: "100%",
                  }}
                  onPress={() => setIsShowModal(false)}
                />
                <View
                  style={{
                    height: "10%",
                    width: "100%",
                    backgroundColor: "white",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    padding: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      setIsShowModal(false);
                      Alert.alert(
                        "Confirmation",
                        "Are you sure?",
                        [
                          {
                            text: "No",
                            onPress: () => console.log("No pressed"),
                            style: "cancel",
                          },
                          {
                            text: "Yes",
                            onPress: () => {
                              removeFriend(route.params.accountId);
                              fetchUserData();
                              setIsShowModal(false);
                            },
                          },
                        ],
                        { cancelable: false }
                      );
                    }}
                  >
                    <MaterialIcons
                      style={{
                        backgroundColor: "#dcdfe3",
                        borderRadius: 30,
                        padding: 5,
                      }}
                      name="person-off"
                      size={24}
                      color="black"
                    />
                    <Text
                      style={{
                        fontSize: 15,
                        color: "#050505",
                        fontWeight: "bold",
                        marginLeft: 12,
                      }}
                    >
                      Unfriend
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        );
        break;
      default:
        return (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.Button, { backgroundColor: "#CFECEC", flex: 1 }]}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <FontAwesome5
                style={{ marginRight: 10 }}
                name="pen"
                size={13}
                color="black"
              />
              <Text style={{ fontSize: 15 }}>Edit personal page</Text>
            </TouchableOpacity>
          </View>
        );
        break;
    }
  };

  const renderAllFriend = () => {
    return friendList.length > 0 ? (
      <TouchableOpacity
        style={[styles.Button, { margin: 13 }]}
        onPress={() => {
          navigation.navigate("ListAllFriend", { listFriend: friendList });
        }}
      >
        <Text style={{ fontSize: 15 }}>All Friend</Text>
      </TouchableOpacity>
    ) : null;
  };

  const renderCameraCover = (status) => {
    return status == "PERSONAL" ? (
      <Pressable
        style={[styles.cameraContainer, { top: "80%", right: "3%", zIndex: 3 }]}
        onPress={() => pickImage("cover")}
      >
        <Ionicons style={styles.camera} name="camera" size={20} color="black" />
      </Pressable>
    ) : null;
  };
  const renderCameraAvatar = (status) => {
    return status == "PERSONAL" ? (
      <Pressable
        style={[styles.cameraContainer, { bottom: "3%", right: "3%" }]}
        onPress={() => pickImage("avatar")}
      >
        <Ionicons style={styles.camera} name="camera" size={20} color="black" />
      </Pressable>
    ) : null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{
          alignSelf: "flex-start",
          minWidth: "100%",
        }}
        data={userPost}
        renderItem={({ item }) => (
          <Post item={item} navigation={navigation} postType="POST" />
        )}
        keyExtractor={(item, index) => item.id.toString()}
        ItemSeparatorComponent={
          <View style={{ height: 4, backgroundColor: "#ccc" }}></View>
        }
        ListEmptyComponent={
          <Text
            style={{
              color: "red",
              fontSize: 24,
              flex: 1,
              textAlign: "center",
            }}
          >
            No post found
          </Text>
        }
        ListHeaderComponent={
          <View style={styles.headerProfile}>
            {/* Cover Photo */}

            <View style={styles.coverPhotoContainer}>
              {/* <Image
                style={styles.coverPhoto}
                source={
                  user.cover_image != null
                    ? { uri: user.cover_image }
                    : require("../assets/coverPhoto.jpg")
                }
              /> */}
              {isLoadingCover ? (
                <View
                  style={[
                    styles.coverPhoto,
                    {
                      backgroundColor: "#e3d8d8",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  ]}
                >
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              ) : (
                <Image
                  style={styles.coverPhoto}
                  source={
                    user.cover_image != null
                      ? { uri: user.cover_image }
                      : require("../assets/coverPhoto.jpg")
                  }
                />
              )}
              {renderCameraCover(status)}
            </View>

            {/* CoverPhoto */}

            <View
              style={[styles.contentContainer, { alignItems: "flex-start" }]}
            >
              {/* Avatar */}
              <View style={styles.avatarContainer}>
                {isLoadingAvatar ? (
                  <View
                    style={[
                      styles.avatar,
                      {
                        backgroundColor: "#e3d8d8",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <ActivityIndicator size="large" color="#0000ff" />
                  </View>
                ) : (
                  <Image
                    style={styles.avatar}
                    source={
                      imageAvatar == null
                        ? user?.avatar == null
                          ? require("../assets/defaultProfilePicture.jpg")
                          : { uri: user.avatar }
                        : { uri: imageAvatar }
                    }
                  />
                )}
                {renderCameraAvatar(status)}
              </View>
              {/* Avatar */}
              {/* name */}
              <View style={[styles.nameContainer, {}]}>
                <Text style={styles.name}>{user.profile_name}</Text>
              </View>
              {/* name */}

              {/* total friend */}
              <View style={styles.totalFriendContainer}>
                <Text style={{ fontWeight: "bold" }}>{user.total_friend}</Text>
                <Text> friends</Text>
              </View>
              {/* total friend */}

              {/* description */}
              <View style={styles.descriptionContainer}>
                <Text style={{ fontSize: 15 }}>{user.description}</Text>
              </View>
              {/* description */}
            </View>

            {/* Button modify */}
            {renderStateFriend()}
            {/* Button modify */}

            {/* View seperate */}
            <View style={styles.seperate} />
            {/* View seperate */}

            {/* Information */}
            <View style={styles.informationContainer}>
              <Text style={{ fontWeight: "bold", fontSize: 18, margin: 10 }}>
                Details
              </Text>
              <View style={styles.rowInformation}>
                <Ionicons name="location-sharp" size={20} color="black" />
                <Text style={[styles.textInformation, { marginLeft: 10 }]}>
                  Lived at{" "}
                  <Text
                    style={[styles.textInformation, { fontWeight: "bold" }]}
                  >
                    {user.live_at}
                  </Text>
                </Text>
              </View>
              <View style={styles.rowInformation}>
                <FontAwesome name="home" size={20} color="black" />
                <Text style={[styles.textInformation, { marginLeft: 10 }]}>
                  Home at{" "}
                  <Text
                    style={[styles.textInformation, { fontWeight: "bold" }]}
                  >
                    {user.come_from}
                  </Text>
                </Text>
              </View>
              <View style={styles.rowInformation}>
                <FontAwesome name="birthday-cake" size={20} color="black" />
                <Text style={[styles.textInformation, { marginLeft: 10 }]}>
                  Birthday on{" "}
                  <Text
                    style={[styles.textInformation, { fontWeight: "bold" }]}
                  >
                    {moment(user.birth_date, "YYYY-MM-DD ").format(
                      "DD/MM/yyyy"
                    )}
                  </Text>
                </Text>
              </View>
              <View style={styles.rowInformation}>
                <FontAwesome5 name="clock" size={20} color="black" />
                <Text style={[styles.textInformation, { marginLeft: 10 }]}>
                  Participate on{" "}
                  <Text
                    style={[styles.textInformation, { fontWeight: "bold" }]}
                  >
                    {moment(user.create_time, "YYYY-MM-DD ").format(
                      "DD/MM/yyyy"
                    )}
                  </Text>
                </Text>
              </View>
            </View>
            {/* Information */}
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              Friend
            </Text>
            <Text style={{ marginLeft: 10, fontSize: 13 }}>
              {user.total_friend + " friends"}
            </Text>

            <FlatList
              style={{ marginTop: 10 }}
              data={friendList.slice(0, 6)}
              numColumns={3}
              renderItem={({ item }) => (
                <View style={styles.itemContainer} key={item.id}>
                  <FriendProfile navigation={navigation} item={item} />
                </View>
              )}
            />
            {renderAllFriend()}

            <View style={styles.seperate} />

            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                margin: 5,
                marginLeft: 10,
              }}
            >
              Post
            </Text>
            {renderCreatePost()}
            <View style={styles.seperate}></View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerPost: {
    flexDirection: "row",
    alignItems: "center",
  },
  listFriendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  itemContainer: {
    width: "33.33%",
    height: 130,
    // marginTop: 10,
    marginBottom: 25,
    // alignItems:"stretch"
  },
  textInformation: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 16,
  },
  informationContainer: {
    flexDirection: "column",
  },
  rowInformation: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 15,
  },
  seperate: {
    width: "100%",
    height: 6,
    backgroundColor: "#CFCFCF",
  },
  buttonContainer: {
    margin: 13,
    flexDirection: "row",
  },
  Button: {
    flexDirection: "row",
    backgroundColor: "#E8E8E8",
    marginRight: 8,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    fontSize: 15,
    // fontWeight: "bold",
  },
  coverPhoto: {
    width: "100%",
    height: 210,
    // resizeMode: "contain"
  },
  headerProfile: {
    // flex: 1,
    // width:"100%",
    // height: 500,
    backgroundColor: "white",
  },
  contentContainer: {
    flexDirection: "column",
    // alignItems: "flex-start",
    marginLeft: 10,
    marginTop: 100, // Điều chỉnh khoảng cách từ đỉnh đến avatarContainer
    position: "relative",
    alignSelf: "flex-start",
  },
  avatar: {
    width: 150,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "white",
    height: 150,
  },
  avatarContainer: {
    zIndex: 2,
    alignSelf: "flex-start",
  },
  coverPhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  cameraContainer: {
    backgroundColor: "#D3D3D3",
    width: 35,
    height: 35,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  nameContainer: {
    // flex:1,
    // alignItems: "center",
    // justifyContent: "center",
    marginTop: 5,
    marginLeft: 5,

    // backgroundColor:"plum"
  },
  name: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 23,
  },
  totalFriendContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    marginLeft: 5,
    marginTop: 3,
  },
  descriptionContainer: {
    marginLeft: 5,
    alignSelf: "flex-start",
    marginTop: 5,
  },
});

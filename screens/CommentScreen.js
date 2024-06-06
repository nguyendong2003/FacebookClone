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
  Modal,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from "react-native";

import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Feather,
  Ionicons,
  Fontisto,
  Entypo,
} from "@expo/vector-icons";

import { useState, useEffect, useRef, useContext } from "react";
import { getPostById } from "../service/PostService";

import Comment from "../components/Comment";
import Post from "../components/Post";

// import commentList from '../data/comment.json';
import {
  getCommentsByPostId,
  createComment,
  editComment,
} from "../service/CommentService";
import { createNotification } from "../service/NotificationService";
import { Context as AccountContext } from "../context/AccountContext";
import { Context as PostContext } from "../context/PostContext";
// Upload image
import * as ImagePicker from "expo-image-picker";
import { LogBox } from "react-native";
import { DeviceEventEmitter } from "react-native";

export default function CommentScreen({ route, navigation }) {
  // const [typeCommentScreen, setTypeCommentScreen] = useState(route?.params?.typeCommentScreen);
  // const stickyHeaderIndices = typeCommentScreen === "POST" ? [0] : null;
  // const [userPost, setUserPost] = useState([]);
  // const [stickyHeader, setStickHeader] = useState();
  // typeCommentScreen == "POST" ? setStickHeader(0) : setStickHeader(1);
  const icons = {
    like: require("../iconfb/like.png"),
    love: require("../iconfb/love.png"),
    care: require("../iconfb/care.png"),
    haha: require("../iconfb/haha.png"),
    wow: require("../iconfb/wow.png"),
    sad: require("../iconfb/sad.png"),
    angry: require("../iconfb/angry.png"),
  };

  const [isLoading, setIsLoading] = useState(false);

  const [commentText, setCommentText] = useState("");
  const [commentImage, setCommentImage] = useState(null);
  const [isCommentTextFocus, setIsCommentTextFocus] = useState(false);
  const [isSelectImage, setIsSelectImage] = useState(false);
  const [isCommentValid, setIsCommentValid] = useState(false);
  //
  const [isReplying, setIsReplying] = useState(false);
  const [commentIdReplying, setCommentIdReplying] = useState(null);
  const [nameReplying, setNameReplying] = useState("");
  const [idUserReplying, setIdUserReplying] = useState("");
  const [commentList, setCommentList] = useState([]);
  //
  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [commentIdEditing, setCommentIdEditing] = useState(null);
  // focus vào TextInput để viết comment khi isReplying là true
  const commentInputRef = useRef(null);
  const { state } = useContext(AccountContext);
  const { getPosts } = useContext(PostContext);
  const [postId, setPostID] = useState(route?.params?.postId);
  const [loading, setLoading] = useState(true); // Add loading state
  const [post, setPost] = useState(null);
  const [reactions, setReactions] = useState([]);

  const fetchPost = async () => {
    const post = await getPostById(postId);
    setPost(post);
    // setLoading(false); // Set loading to false after data is fetched
  };

  useEffect(() => {
    setReactions(route?.params?.reactions);
    fetchPost();
  }, [postId]);

  useEffect(() => {
    if (isReplying || isCommentTextFocus || isCommentEditing) {
      // Kiểm tra xem ref có tồn tại không trước khi gọi focus()
      if (commentInputRef.current) {
        commentInputRef.current.focus();
      } else {
        commentInputRef.current.blur();
      }
    }
  }, [isReplying, isCommentTextFocus, isCommentEditing]);

  const fetchComments = async () => {
    const response = await getCommentsByPostId(route?.params?.postId);
    setCommentList(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const pickImage = async () => {
    // no permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setCommentImage(result.assets[0].uri);
    }
    setIsSelectImage(false);
  };

  useEffect(() => {
    if (isSelectImage) {
      pickImage();
    }
  }, [isSelectImage]);

  useEffect(() => {
    if (commentText || commentImage) {
      setIsCommentValid(true);
    } else {
      setIsCommentValid(false);
    }
  }, [commentText, commentImage]);

  // Scroll to comment when reply
  const [coords, setCoords] = useState({});
  const flatListRef = useRef(null);
  const scrollToComment = (commentId) => {
    flatListRef?.current?.scrollToOffset({
      offset: coords[commentId] - 40,
      animated: true,
    });
    // console.log(coords[commentId]);
  };

  //
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get("window"),
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions({ window });
    });
    return () => subscription?.remove();
  });

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  const { window } = dimensions;
  const windowWidth = window.width;
  const windowHeight = window.height;

  // const updatePostById = async (postId) => {
  //   const update_post = await getPostById(postId);
  //   setUserPost(
  //     userPost.map((post) => (post.id === postId ? update_post : post))
  //   );
  // };

  const submitComment = async () => {
    setIsLoading(true);
    if (isCommentValid) {
      formData = new FormData();

      formData.append("id_account", state.account.id);
      if (commentIdReplying) {
        formData.append("to_comment_id", commentIdReplying);
      } else {
        formData.append("id_post", route?.params?.postId);
      }

      formData.append("content", commentText);

      if (commentImage) {
        formData.append("image", {
          name: "image.jpg",
          type: "image/jpeg",
          uri: commentImage,
        });
      }

      let response = null;

      if (!isCommentEditing) response = await createComment(formData);
      else await editComment(commentIdEditing, commentText);

      if (!isCommentEditing) {
        if (commentIdReplying) {
          notificationHandler(
            idUserReplying,
            route?.params?.postId,
            commentIdReplying,
            response.id
          );
        } else {
          notificationHandler(
            post.user.id,
            route?.params?.postId,
            null,
            response.id
          );
        }
      } else {
        setCommentIdEditing(null);
        setIsCommentEditing(false);
      }

      setCommentText("");
      setIsReplying(false);
      setCommentIdReplying(null);
      setCommentImage(null);
      // getPosts();
      fetchComments();

      if (route?.params?.inProfile == false)
        DeviceEventEmitter.emit("reloadHomeScreenPost", route?.params?.postId);
      else
        DeviceEventEmitter.emit(
          "reloadProfileScreenPost",
          route?.params?.postId
        );
    } else {
      alert("Invalid comment");
    }
    setIsLoading(false);
  };

  const notificationHandler = async (
    to_account_id,
    to_post_id,
    to_comment_post_id,
    send_comment_id
  ) => {
    try {
      const response = await createNotification({
        from_account_id: state.account.id,
        to_account_id,
        to_post_id,
        to_comment_post_id,
        send_comment_id,
        notify_type: "comment",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        {/* <View style={styles.scrollContainer}> */}
        <FlatList
          ref={flatListRef}
          keyboardShouldPersistTaps="handled"
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          ListFooterComponentStyle={{ flex: 1, justifyContent: "flex-end" }}
          style={{
            alignSelf: "flex-start",
            minWidth: "100%",
          }}
          data={commentList}
          renderItem={({ item, index }) => (
            <Comment
              navigation={navigation}
              item={item}
              fetchComments={fetchComments}
              setIsReplying={setIsReplying}
              inProfile={route?.params?.inProfile}
              setCommentIdReplying={setCommentIdReplying}
              setNameReplying={setNameReplying}
              setIdUserReplying={setIdUserReplying}
              setCommentText={setCommentText}
              commentIdReplying={commentIdReplying}
              setIsCommentTextFocus={setIsCommentTextFocus}
              setIsCommentEditing={setIsCommentEditing}
              commentIdEditing={commentIdEditing}
              setCommentIdEditing={setCommentIdEditing}
              setCommentImage={setCommentImage}
              scrollToComment={scrollToComment}
              coords={coords}
              setCoords={setCoords}
            />
          )}
          keyExtractor={(item, index) => item.id.toString()}
          // ItemSeparatorComponent={
          //   <View style={{ height: 4, backgroundColor: '#ccc' }}></View>
          // }
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  marginBottom: 16,
                  backgroundColor: "white",
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate("Reaction", {
                      postId: route?.params?.postId,
                      reactions: reactions,
                    })
                  }
                >
                  {reactions.slice(1, 4).map(
                    (reaction, index) =>
                      reaction.number > 0 && (
                        <Image
                          key={index}
                          source={icons[reaction.type]}
                          style={{
                            width: 20,
                            height: 20,
                            marginLeft: index > 0 ? 2 : 0,
                            marginRight: 2,
                          }}
                        />
                      )
                  )}
                  <Text
                    numberOfLines={1}
                    style={{
                      alignSelf: "flex-start",
                      marginLeft: 4,
                      fontSize: 16,
                    }}
                  >
                    {reactions[0].number}
                  </Text>
                  <Entypo name="chevron-small-right" size={24} color="black" />
                </TouchableOpacity>
                <AntDesign
                  name="like2"
                  size={24}
                  color="black"
                  onPress={() => {
                    // route?.params.setValueReaction(1);
                  }}
                />
              </View>
            );
          }}
        />
        <View
          style={{
            backgroundColor: "white",
            paddingVertical: 4,
            paddingHorizontal: 12,
            borderTopColor: "#ccc",
            borderTopWidth: 1,
          }}
        >
          {isReplying && (
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#65676B", fontSize: 15 }}>Replying</Text>

              <TouchableOpacity>
                <Text
                  style={{
                    marginLeft: 4,
                    color: "#65676B",
                    fontWeight: "500",
                    fontSize: 15,
                  }}
                >
                  {nameReplying}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setIsCommentTextFocus(true);
                  setIsReplying(false);
                  setCommentText("");
                  setCommentIdReplying(null);
                  setCommentImage(null);
                }}
              >
                <Text
                  style={{
                    marginLeft: 16,
                    fontWeight: "bold",
                    color: "#65676B",
                    fontSize: 15,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {isCommentEditing && (
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#65676B", fontSize: 15 }}>
                Editing comment
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setIsCommentTextFocus(true);
                  setIsCommentEditing(false);
                  setCommentIdEditing(null);
                  setCommentText("");
                  setCommentImage(null);
                }}
              >
                <Text
                  style={{
                    marginLeft: 16,
                    fontWeight: "bold",
                    color: "#65676B",
                    fontSize: 15,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <TextInput
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              backgroundColor: "#f0f2f5",
              borderRadius: 24,
              color: "#050505",
              fontSize: 16,
              maxHeight: 148,
            }}
            multiline={true}
            placeholder="Enter your comment"
            value={commentText}
            onChangeText={(text) => {
              setCommentText(text);
            }}
            onFocus={() => {
              setIsCommentTextFocus(true);
            }}
            onBlur={() => {
              setIsCommentTextFocus(false);

              // setIsReplying(false);
              // setCommentIdReplying(null);
            }}
            ref={commentInputRef}
            autoFocus={route?.params?.initialCommentFocus}
          />
          {isCommentTextFocus || isReplying || isCommentEditing ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 4,
              }}
            >
              {!commentImage && (
                <Ionicons
                  name={isSelectImage ? "camera" : "camera-outline"}
                  size={24}
                  color={isSelectImage ? "black" : "#65676B"}
                  onPress={() => {
                    setIsSelectImage(!isSelectImage);
                  }}
                />
              )}

              {commentImage && (
                <View>
                  <Image
                    source={{ uri: commentImage }}
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: "cover",
                      borderRadius: 20,
                    }}
                  />
                  <Entypo
                    style={{ position: "absolute", left: "100%" }}
                    name="circle-with-cross"
                    size={24}
                    color="#ccc"
                    onPress={() => {
                      setIsSelectImage(false);
                      setCommentImage(null);
                    }}
                  />
                </View>
              )}

              {isLoading ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <FontAwesome
                  name={isCommentValid ? "send" : "send-o"}
                  size={24}
                  color={isCommentValid ? "#0866ff" : "#65676B"}
                  onPress={() => {
                    submitComment(); ////
                  }}
                />
              )}
            </View>
          ) : null}
        </View>
        {/* </View> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
    // marginTop: StatusBar.currentHeight,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    padding: 16,
    paddingBottom: 8,
  },
  topContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  //
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    margin: 4,
  },
  cardText: {
    // marginTop: 8,
    marginLeft: 10,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  //
  inputSearch: {
    marginLeft: 8,
    fontSize: 22,
    width: "90%",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",

    height: 40,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  // Dropdown
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
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

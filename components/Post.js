import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  Image,
  TouchableOpacity,
  Pressable,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  PanResponder,
  Animated,
  DeviceEventEmitter,
} from "react-native";

import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Feather,
  Ionicons,
  Fontisto,
  Entypo,
} from "@expo/vector-icons";

import { useState, useEffect, useContext, useRef } from "react";
import moment from "moment";
import { getReactionsOfPost } from "../service/PostService";

import postList from "../data/post.json";
import commentList from "../data/comment.json";

import Comment from "./Comment";

import {
  getReactionToPost,
  reaction,
  getPostById,
} from "../service/PostService";

import { createNotification } from "../service/NotificationService";
import { getAccountById } from "../service/AccountService";
import { Context as AccountContext } from "../context/AccountContext";
import { Context as UserPostContext } from "../context/UserPostContext";
import React from "react";
import { deletePost } from "../service/PostService";

const Post = ({
  item,
  navigation,
  onUpdatePost,
  postType,
  onLayout = () => {},
}) => {
  // Get height of post to scroll in PostDetailScreen
  const postRef = useRef(null);

  // Reaction
  const [isPressingLike, setIsPressingLike] = useState(false);
  const [valueReaction, setValueReaction] = useState(0);
  const [nameReaction, setNameReaction] = useState(null);
  const [sizeReaction, setSizeReaction] = useState(null);
  const [sourceReaction, setSourceReaction] = useState(null);
  const [colorReaction, setColorReaction] = useState("#65676B");
  // press more in post
  const [isPressingMore, setIsPressingMore] = useState(false);
  //
  const [reactionCount, setReactionCount] = useState(item?.reaction_quantity);
  const [commentCount, setCommentCount] = useState(item?.comment_quantity);
  const [user, setUser] = useState({});
  const [statusPost, setStausPost] = useState(postType);
  const [reactions, setReactions] = useState([
    { type: "All", number: 0, users: [] },
  ]);

  const { state } = useContext(AccountContext);
  const { reloadPost } = useContext(UserPostContext);
  //
  useEffect(() => {
    switch (valueReaction) {
      case 1:
        setColorReaction("#0866FF");
        setNameReaction("Like");
        setSizeReaction(24);
        setSourceReaction(require("../iconfb/like.png"));

        break;
      case 2:
        setColorReaction("#F33E58");
        setNameReaction("Love");
        setSizeReaction(24);
        setSourceReaction(require("../iconfb/love.png"));
        break;
      case 3:
        setColorReaction("#F7B125");
        setNameReaction("Care");
        setSizeReaction(24);
        setSourceReaction(require("../iconfb/care.png"));
        break;
      case 4:
        setColorReaction("#F7B125");
        setNameReaction("Haha");
        setSizeReaction(24);
        setSourceReaction(require("../iconfb/haha.png"));
        break;
      case 5:
        setColorReaction("#F7B125");
        setNameReaction("Wow");
        setSizeReaction(24);
        setSourceReaction(require("../iconfb/wow.png"));
        break;
      case 6:
        setColorReaction("#E9710F");
        setNameReaction("Sad");
        setSizeReaction(24);
        setSourceReaction(require("../iconfb/sad.png"));
        break;
      case 7:
        setColorReaction("#E9710F");
        setNameReaction("Angry");
        setSizeReaction(24);
        setSourceReaction(require("../iconfb/angry.png"));
        break;

      default:
        setColorReaction("#65676B"); // Màu mặc định
        setNameReaction("Like");
        setSourceReaction(null);
    }
  }, [valueReaction]);

  const convertReactionValue = (value) => {
    switch (value) {
      case "LIKE":
        return 1;
      case "LOVE":
        return 2;
      case "CARE":
        return 3;
      case "HAHA":
        return 4;
      case "WOW":
        return 5;
      case "SAD":
        return 6;
      case "ANGRY":
        return 7;
      default:
        return 0;
    }
  };

  const deletePostHandler = async (postId) => {
    await deletePost(postId);
    DeviceEventEmitter.emit("fetchPost");
    setIsPressingMore(false);
  };
  const updatePostHandler = async (postId) => {
    console.log("update post");
    await onUpdatePost(postId);
  };

  const fetchReactions = async () => {
    const response = await getReactionsOfPost(item?.id);

    let reactions_arr = Object.keys(response).map((key) => ({
      type: key,
      number: response[key] ? response[key].length : null,
      users: response[key],
    }));

    const total_reaction = reactions_arr.reduce(
      (sum, reaction) => sum + (reaction.number || 0),
      0
    );

    const users = reactions_arr.reduce(
      (sum, reaction) => sum.concat(reaction.users || []),
      []
    );
    reactions_arr = [
      { type: "All", number: total_reaction, users: users },
      ...reactions_arr,
    ];
    setReactions(reactions_arr.sort((a, b) => b.number - a.number));
  };

  const icons = {
    like: require("../iconfb/like.png"),
    love: require("../iconfb/love.png"),
    care: require("../iconfb/care.png"),
    haha: require("../iconfb/haha.png"),
    wow: require("../iconfb/wow.png"),
    sad: require("../iconfb/sad.png"),
    angry: require("../iconfb/angry.png"),
  };

  useEffect(() => {
    fetchReactions();
  }, []);

  const [dimensions, setDimensions] = useState({
    window: Dimensions.get("window"),
  });

  const renderPostReaction = () => {
    return statusPost == "POST" ? (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          // padding: 4,
          paddingVertical: 4,
          paddingHorizontal: 12,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("Reaction", {
              postId: item?.id,
              reactions: reactions,
            });
          }}
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
                  }}
                />
              )
          )}
          {item?.reaction_quantity > 0 && (
            <Text
              style={{
                marginLeft: 3,
                fontSize: 15,
                color: "#65676B",
              }}
            >
              {item?.reaction_quantity}
            </Text>
          )}
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{ padding: 4 }}
            onPress={() => {
              navigation.navigate("Comment", {
                postId: item?.id,
                reactions: reactions,
                inProfile: state.account.id === item.user.id,
                typeCommentScreen: "POST",
              });
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: 400 }}>
              {item?.comment_quantity + " comments"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginLeft: 4, padding: 4 }}
            onPress={() => {}}
          >
            <Text style={{ fontSize: 12, fontWeight: 400 }}>
              {item?.share_quantity + " shares"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : null;
  };

  const renderPostDetailReaction = () => {
    return statusPost == "POST_DETAIL" ? (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          // padding: 4,
          paddingVertical: 4,
          paddingHorizontal: 12,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() =>
            navigation.navigate("Reaction", {
              postId: item.id,
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
                  }}
                />
              )
          )}
          {item?.reaction_quantity > 0 && (
            <Text
              style={{
                marginLeft: 3,
                fontSize: 14,
                color: "#65676B",
              }}
            >
              {item?.reaction_quantity}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    ) : null;
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions({ window });
    });
    return () => subscription?.remove();
  });

  const { window } = dimensions;
  const windowWidth = window.width;
  const windowHeight = window.height;

  const fetchReaction = async () => {
    const response = await getReactionToPost(item?.id);
    setValueReaction(convertReactionValue(response.type));
  };

  useEffect(() => {
    fetchReaction();
  }, [item?.id, item?.user_id]);

  const reactionHandler = async (postId, reaction_type) => {
    try {
      const response = await reaction({
        id_account: state.account.id,
        postId,
        reaction_type,
      });
      setValueReaction(convertReactionValue(response.type));

      if (statusPost == "POST") {
        DeviceEventEmitter.emit("reloadProfileScreenPost", postId);
        DeviceEventEmitter.emit("reloadHomeScreenPost", postId);
      } else if (statusPost == "POST_DETAIL") {
        DeviceEventEmitter.emit("reloadPostDetailScreenPost", postId);
      }

      fetchReactions();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setReactionCount(item?.reaction_quantity);
      setCommentCount(item?.comment_quantity);
    }, 800);
  }, [item?.reaction_quantity, item?.comment_quantity]);

  const notificationHandler = async (notify_type) => {
    try {
      const response = await createNotification({
        from_account_id: state.account.id,
        to_account_id: item?.user.id,
        to_post_id: item?.id,
        to_comment_post_id: null,
        notify_type,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        onLayout(height);
      }}
      ref={postRef}
    >
      <View style={styles.card} key={item.id}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 12,
              paddingBottom: 0,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.push("Profile", {
                  accountId: item.user.id,
                  isPersonalPage: false,
                });
              }}
            >
              <Image
                source={
                  item.user.avatar == null
                    ? require("../assets/defaultProfilePicture.jpg")
                    : { uri: item.user.avatar }
                }
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>

            <View style={{ marginLeft: 8 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.push("Profile", {
                    accountId: item.user.id,
                    isPersonalPage: false,
                  });
                }}
              >
                <Text
                  style={{
                    color: "#050505",
                    fontSize: 15,
                    fontWeight: "600",
                  }}
                >
                  {item.user.profile_name}
                </Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: "#65676B",
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  {moment(item.create_time, "YYYY-MM-DD HH:mm:ss").format(
                    "DD/MM/yyyy HH:mm"
                  )}
                </Text>
                <Ionicons
                  style={{ marginLeft: 12 }}
                  name={
                    item.view_mode === "public"
                      ? "earth-sharp"
                      : item.view_mode === "friend"
                      ? "people-sharp"
                      : "lock-closed"
                  }
                  size={14}
                  color="#050505"
                />
              </View>
            </View>
          </View>
          {state.account.id === item.user.id && (
            <TouchableOpacity
              style={{
                padding: 8,
              }}
              onPress={() => setIsPressingMore(!isPressingMore)}
            >
              <MaterialIcons name="more-vert" size={24} color="#65676B" />
            </TouchableOpacity>
          )}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isPressingMore}
            onRequestClose={() => {
              // Alert.alert('Modal has been closed.');
              setIsPressingMore(!isPressingMore);
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
                  height: "80%",
                  width: "100%",
                }}
                onPress={() => setIsPressingMore(false)}
              />
              <View
                style={{
                  height: "20%",
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
                    padding: 12,
                  }}
                  onPress={() => {
                    setIsPressingMore(false);
                    navigation.navigate("EditPost", {
                      item: item,
                      statusPost: statusPost,
                    });
                  }}
                >
                  <MaterialIcons name="mode-edit" size={24} color="#050505" />
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#050505",
                      fontWeight: "bold",
                      marginLeft: 12,
                    }}
                  >
                    Edit this post
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 12,
                    borderTopColor: "#ccc",
                    borderTopWidth: 1,
                  }}
                  onPress={() => {
                    deletePostHandler(item?.id);
                  }}
                >
                  <Feather name="trash-2" size={24} color="#050505" />
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#050505",
                      fontWeight: "bold",
                      marginLeft: 12,
                    }}
                  >
                    Delete this post
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <View>
          <Text
            style={{
              marginTop: 8,
              fontSize: 17,
              fontWeight: "400",

              paddingHorizontal: 12,
              paddingVertical: 0,
            }}
          >
            {item?.content}
          </Text>
          {item.hasOwnProperty("postImages") ? (
            <View
              style={{
                marginTop: 8,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {item?.postImages.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image.image }}
                  style={{
                    marginHorizontal: 2,
                    marginTop: 4,
                    // borderRadius: 20,
                  }}
                  width={
                    item?.postImages.length % 2 === 1 && index === 0
                      ? windowWidth - 4
                      : windowWidth / 2 - 4
                  }
                  height={
                    item?.postImages.length % 2 === 1 && index === 0
                      ? windowWidth - 4
                      : windowWidth / 2 - 4
                  }
                  resizeMode="cover"
                />
              ))}
            </View>
          ) : (
            <></>
          )}
        </View>
        {/* Hiện bài post được chia sẻ */}
        {item.share_post != null && (
          <View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderBottomWidth: 0,
                marginHorizontal: 8,
                paddingBottom: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 12,
                  paddingBottom: 0,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.push("Profile", {
                      accountId: item.share_post.user.id,
                      isPersonalPage: false,
                    });
                  }}
                >
                  <Image
                    source={
                      item.share_post.user.avatar == null
                        ? require("../assets/defaultProfilePicture.jpg")
                        : { uri: item.share_post.user.avatar }
                    }
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 100,
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>

                <View style={{ marginLeft: 8 }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push("Profile", {
                        accountId: item.share_post.user.id,
                        isPersonalPage: false,
                      });
                    }}
                  >
                    <Text
                      style={{
                        color: "#050505",
                        fontSize: 15,
                        fontWeight: "600",
                      }}
                    >
                      {item.share_post.user.profile_name}
                    </Text>
                  </TouchableOpacity>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        color: "#65676B",
                        fontSize: 14,
                        fontWeight: 400,
                      }}
                    >
                      {moment(
                        item.share_post.create_time,
                        "YYYY-MM-DD HH:mm:ss"
                      ).format("DD/MM/yyy HH:mm")}
                    </Text>
                    <Ionicons
                      style={{ marginLeft: 12 }}
                      name={
                        item.share_post.view_mode === "public"
                          ? "earth-sharp"
                          : item.share_post.view_mode === "friend"
                          ? "people-sharp"
                          : "lock-closed"
                      }
                      size={14}
                      color="#050505"
                    />
                  </View>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    marginTop: 8,
                    fontSize: 17,
                    fontWeight: "400",

                    paddingHorizontal: 12,
                    paddingVertical: 0,
                  }}
                >
                  {item?.share_post.content}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {item?.share_post.postImages.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image.image }}
                  style={{
                    marginHorizontal: 2,
                    marginTop: 4,
                    // borderRadius: 20,
                  }}
                  width={
                    item?.share_post.postImages.length % 2 === 1 && index === 0
                      ? windowWidth - 4
                      : windowWidth / 2 - 4
                  }
                  height={
                    item?.share_post.postImages.length % 2 === 1 && index === 0
                      ? windowWidth - 4
                      : windowWidth / 2 - 4
                  }
                  resizeMode="cover"
                />
              ))}
            </View>
          </View>
        )}
        {/*  */}
        {renderPostReaction()}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 8,
            paddingTop: 2,
            paddingBottom: 10,
            paddingHorizontal: 4,
          }}
        >
          <TouchableOpacity
            style={[styles.buttonBottomPost, { width: 54, height: 24 }]}
            onPress={() => {
              setIsPressingLike(false);
              if (valueReaction > 0) {
                reactionHandler(item?.id, "NONE");
              } else {
                reactionHandler(item?.id, "LIKE");
                notificationHandler("LIKE");
              }
            }}
            onLongPress={() => setIsPressingLike(!isPressingLike)}
            delayLongPress={200}
          >
            {sourceReaction && (
              <Image
                source={sourceReaction}
                style={{
                  width: sizeReaction,
                  height: sizeReaction,
                }}
              />
            )}

            {!sourceReaction && (
              <AntDesign name="like2" size={24} color="#65676B" />
            )}

            {/* <Text style={styles.textBottomPost}>Like</Text> */}
            <Text style={[styles.textBottomPost, { color: colorReaction }]}>
              {/* Like */}
              {nameReaction ? nameReaction : "Like"}
            </Text>

            {isPressingLike && (
              <View
                style={{
                  position: "absolute",
                  top: -84,
                  left: -14,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "white",
                  padding: 8,
                  borderRadius: 50,

                  shadowColor: "black",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setIsPressingLike(false);
                    reactionHandler(item?.id, "LIKE");
                    notificationHandler("LIKE");
                  }}
                >
                  <Image
                    source={require("../iconfb/like.png")}
                    style={{ width: 36, height: 36, marginLeft: 4 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsPressingLike(false);
                    reactionHandler(item?.id, "LOVE");
                    notificationHandler("LOVE");
                  }}
                >
                  <Image
                    source={require("../iconfb/love.png")}
                    style={{ width: 36, height: 36, marginLeft: 4 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsPressingLike(false);
                    reactionHandler(item?.id, "CARE");
                    notificationHandler("CARE");
                  }}
                >
                  <Image
                    source={require("../iconfb/care.png")}
                    style={{ width: 36, height: 36, marginLeft: 4 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsPressingLike(false);
                    reactionHandler(item?.id, "HAHA");
                    notificationHandler("HAHA");
                  }}
                >
                  <Image
                    source={require("../iconfb/haha.png")}
                    style={{ width: 36, height: 36, marginLeft: 4 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsPressingLike(false);
                    reactionHandler(item?.id, "WOW");
                    notificationHandler("WOW");
                  }}
                >
                  <Image
                    source={require("../iconfb/wow.png")}
                    style={{ width: 36, height: 36, marginLeft: 4 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsPressingLike(false);
                    reactionHandler(item?.id, "SAD");
                    notificationHandler("SAD");
                  }}
                >
                  <Image
                    source={require("../iconfb/sad.png")}
                    style={{ width: 36, height: 36, marginLeft: 4 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsPressingLike(false);
                    reactionHandler(item?.id, "ANGRY");
                    notificationHandler("ANGRY");
                  }}
                >
                  <Image
                    source={require("../iconfb/angry.png")}
                    style={{
                      width: 36,
                      height: 36,
                      marginLeft: 4,
                      marginRight: 4,
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonBottomPost}
            onPress={() => {
              navigation.navigate("Comment", {
                initialCommentFocus: true,
                postId: item?.id,
                inProfile: state.account.id === item.user.id,
                reactions: reactions,
              });
            }}
          >
            <FontAwesome5 name="comment" size={24} color="#65676B" />
            <Text style={styles.textBottomPost}>Comment</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonBottomPost}
            onPress={() =>
              navigation.navigate("SharePost", {
                item: item,
              })
            }
          >
            <FontAwesome name="share" size={24} color="#65676B" />
            <Text style={styles.textBottomPost}>Share</Text>
          </TouchableOpacity>
        </View>
        {renderPostDetailReaction()}
      </View>
    </View>
  );
};

export default React.memo(Post);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "white",
    // padding: 16,
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
    // padding: 12,
    borderRadius: 8,
    // marginTop: 4,

    // borderWidth: 1,

    // margin: 4,
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
  //button bottom post
  buttonBottomPost: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // padding: 4,
  },
  textBottomPost: {
    fontSize: 12,
    marginLeft: 8,
    fontWeight: "500",
    color: "#65676B",
  },
});

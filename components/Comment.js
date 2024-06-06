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
} from "react-native";

import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Feather,
  MaterialIcons,
  Ionicons,
  Fontisto,
  Entypo,
} from "@expo/vector-icons";

import React from "react";
import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { createNotification } from "../service/NotificationService";
import {
  deleteComment,
  getPostOfComment,
  getReactionsOfComment,
} from "../service/CommentService";
import { Context as AccountContext } from "../context/AccountContext";
import moment from "moment";
import { reaction } from "../service/CommentService";
import { DeviceEventEmitter } from "react-native";

const Comment = ({
  navigation,
  item,
  setIsReplying,
  commentIdReplying,
  setCommentIdReplying,
  setNameReplying,
  setIdUserReplying,
  setCommentText,
  setIsCommentTextFocus,
  setIsCommentEditing,
  commentIdEditing,
  setCommentIdEditing,
  setCommentImage,
  scrollToComment,
  coords,
  setCoords,
  fetchComments,
  fetchPost,
  inProfile,
}) => {
  const [isPressingLike, setIsPressingLike] = useState(false);
  const [valueReaction, setValueReaction] = useState(0);
  const [nameReaction, setNameReaction] = useState(null);
  const [countReaction, setCountReaction] = useState(item?.reaction_quantity);
  const [colorReaction, setColorReaction] = useState("#65676B");
  const { state: accountState } = useContext(AccountContext);
  const [reactions, setReactions] = useState([
    { type: "All", number: 0, users: [] },
  ]);

  const fetchReactions = async () => {
    const response = await getReactionsOfComment(item?.id);

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

  useEffect(() => {
    fetchReactions();
  }, []);

  const icons = {
    like: require("../iconfb/like.png"),
    love: require("../iconfb/love.png"),
    care: require("../iconfb/care.png"),
    haha: require("../iconfb/haha.png"),
    wow: require("../iconfb/wow.png"),
    sad: require("../iconfb/sad.png"),
    angry: require("../iconfb/angry.png"),
  };

  //
  const [isPressingComment, setIsPressingComment] = useState(false);
  //
  useEffect(() => {
    switch (valueReaction) {
      case 1:
        setColorReaction("#0866FF");
        setNameReaction("Like");

        break;
      case 2:
        setColorReaction("#F33E58");
        setNameReaction("Love");

        break;
      case 3:
        setColorReaction("#F7B125");
        setNameReaction("Care");

        break;
      case 4:
        setColorReaction("#F7B125");
        setNameReaction("Haha");

        break;
      case 5:
        setColorReaction("#F7B125");
        setNameReaction("Wow");

        break;
      case 6:
        setColorReaction("#E9710F");
        setNameReaction("Sad");
        break;
      case 7:
        setColorReaction("#E9710F");
        setNameReaction("Angry");
        break;

      default:
        setColorReaction("#65676B"); // Màu mặc định
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

  useEffect(() => {
    setValueReaction(convertReactionValue(item?.reaction));
  }, []);

  const reactionHandler = async (type) => {
    await reaction({
      id_account: accountState.account.id,
      id_comment: item.id,
      reaction_type: type,
    });
    if (type == "NONE") setCountReaction((count) => count - 1);
    else setCountReaction((count) => count + 1);
    setValueReaction(convertReactionValue(type));
    fetchReactions();
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

  const { window } = dimensions;
  const windowWidth = window.width;
  const windowHeight = window.height;

  const [post, setPost] = useState(null);
  const getPostOfCommentHandler = async () => {
    try {
      const responsse = await getPostOfComment(item?.id);
      setPost(responsse);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostOfCommentHandler();
  }, []);

  const ref = useRef();
  const notificationHandler = async (notify_type) => {
    try {
      const response = await createNotification({
        from_account_id: accountState.account.id,
        to_account_id: item?.account_user.id,
        to_post_id: post.id,
        to_comment_post_id: item?.id,
        notify_type,
      });
    } catch (error) {
      console.log(error);
    }
  };

  scrollToComment(commentIdReplying);
  return (
    <View>
      <View
        ref={ref}
        onLayout={(event) => {
          const { x, y, width, height } = event.nativeEvent.layout;
          // console.log(x, y, width, height);
          if (Object.keys(coords).length === 0) {
            coords[item.id] = y;
          } else {
            const previousKey =
              Object.keys(coords)[Object.keys(coords).length - 1];
            const previousValue = coords[previousKey];
            coords[item.id] = previousValue + height;
          }
          // console.log(coords);
        }}
        style={{
          flexDirection: "row",
          padding: 8,
          // marginLeft: marginLeftValue,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile", { accountId: item.account_user.id });
          }}
        >
          <Image
            source={
              item?.account_user?.avatar == null
                ? require("../assets/defaultProfilePicture.jpg")
                : { uri: item?.account_user?.avatar }
            }
            style={{ width: 40, height: 40, borderRadius: 100 }}
          />
        </TouchableOpacity>

        <View style={{ maxWidth: "86%" }}>
          <Pressable
            style={{
              alignSelf: "flex-start",
              marginHorizontal: 8,
              borderRadius: 20,
              padding: 5,
              paddingLeft: 12,
              paddingRight: 12,
              backgroundColor:
                item.id === commentIdReplying || item.id === commentIdEditing
                  ? "#ccc"
                  : "#f0f2f5",
            }}
            onLongPress={() =>
              setIsPressingComment(
                accountState.account.id === item.account_user.id ? true : false
              )
            }
            delayLongPress={200}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Profile", {
                  accountId: item.account_user.id,
                });
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: "#050505",
                  fontWeight: "bold",
                }}
              >
                {item.account_user.profile_name}
              </Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 15, color: "#050505" }}>
              {item?.content}
            </Text>
          </Pressable>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isPressingComment}
            onRequestClose={() => {
              setIsPressingComment(!isPressingComment);
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
                onPress={() => setIsPressingComment(false)}
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
                    setIsPressingComment(false);

                    // Remove Reply comment
                    setIsReplying(false);
                    setCommentIdReplying(null);
                    setNameReplying(null);
                    setIdUserReplying(null);

                    // Edit comment
                    setIsCommentTextFocus(true);
                    setIsCommentEditing(true);
                    setCommentIdEditing(item?.id);
                    setCommentText(item?.content);
                    setCommentImage(item?.image);

                    //

                    scrollToComment(item?.id);
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
                    Edit this comment
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
                  onPress={async () => {
                    await deleteComment(item?.id);

                    if (inProfile == false)
                      DeviceEventEmitter.emit("reloadHomeScreenPost", post.id);
                    else
                      DeviceEventEmitter.emit(
                        "reloadProfileScreenPost",
                        post.id
                      );

                    fetchComments();
                    setIsPressingComment(false);
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
                    Delete this comment
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              marginTop: 4,
              // paddingBottom: 12,
            }}
          >
            {item?.image && (
              <Image
                source={{ uri: item?.image }}
                style={{
                  marginLeft: 8,
                  borderRadius: 20,
                  // width: 200,
                  height: 200,
                  width: "95%",
                  resizeMode: "cover",
                  // marginTop: 8,
                  marginBottom: 6,
                }}
              />
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  marginLeft: 16,
                  fontSize: 12,
                  color: "#65676B",
                  fontWeight: "500",
                }}
              >
                {moment(item?.create_time).fromNow()}
              </Text>

              <TouchableOpacity
                style={{ marginLeft: 8 }}
                onPress={() => {
                  setIsPressingLike(false);
                  if (valueReaction > 0) {
                    reactionHandler("NONE");
                    setNameReaction(null);
                  } else {
                    reactionHandler("LIKE");
                    setValueReaction(1);
                    notificationHandler("LIKE");
                  }
                }}
                onLongPress={() => setIsPressingLike(!isPressingLike)}
                delayLongPress={200}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: colorReaction,
                    fontWeight: "500",
                  }}
                >
                  {nameReaction ? nameReaction : "Like"}
                </Text>
                {isPressingLike && (
                  <View
                    style={{
                      position: "absolute",
                      top: -80,
                      left: -100,
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
                        setValueReaction(1);
                        reactionHandler("LIKE");
                        notificationHandler("LIKE");
                      }}
                    >
                      <Image
                        source={require("../iconfb/like.png")}
                        style={{ width: 32, height: 32, marginLeft: 4 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setIsPressingLike(false);
                        setValueReaction(2);
                        reactionHandler("LOVE");
                        notificationHandler("LOVE");
                      }}
                    >
                      <Image
                        source={require("../iconfb/love.png")}
                        style={{ width: 32, height: 32, marginLeft: 4 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setIsPressingLike(false);
                        setValueReaction(3);
                        reactionHandler("CARE");
                        notificationHandler("CARE");
                      }}
                    >
                      <Image
                        source={require("../iconfb/care.png")}
                        style={{ width: 32, height: 32, marginLeft: 4 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setIsPressingLike(false);
                        setValueReaction(4);
                        reactionHandler("HAHA");
                        notificationHandler("HAHA");
                      }}
                    >
                      <Image
                        source={require("../iconfb/haha.png")}
                        style={{ width: 32, height: 32, marginLeft: 4 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setIsPressingLike(false);
                        setValueReaction(5);
                        reactionHandler("WOW");
                        notificationHandler("WOW");
                      }}
                    >
                      <Image
                        source={require("../iconfb/wow.png")}
                        style={{ width: 32, height: 32, marginLeft: 4 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setIsPressingLike(false);
                        setValueReaction(6);
                        reactionHandler("SAD");
                        notificationHandler("SAD");
                      }}
                    >
                      <Image
                        source={require("../iconfb/sad.png")}
                        style={{ width: 32, height: 32, marginLeft: 4 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setIsPressingLike(false);
                        setValueReaction(7);
                        reactionHandler("ANGRY");
                        notificationHandler("ANGRY");
                      }}
                    >
                      <Image
                        source={require("../iconfb/angry.png")}
                        style={{
                          width: 32,
                          height: 32,
                          marginLeft: 4,
                          marginRight: 4,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginLeft: 8 }}
                onPress={() => {
                  // remove edit comment
                  setIsCommentTextFocus(false);
                  setIsCommentEditing(false);
                  setCommentIdEditing(null);
                  setCommentImage(null);

                  // Reply comment
                  setIsReplying(true);
                  setCommentIdReplying(item?.id);
                  setNameReplying(item.account_user.profile_name);
                  setIdUserReplying(item.account_user.id);
                  setCommentText(`${item.account_user.profile_name} `);
                  scrollToComment(item?.id);
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "#65676B",
                    fontWeight: "500",
                  }}
                >
                  Reply
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 10,
                }}
                onPress={() => {
                  navigation.navigate("Reaction", {
                    postId: item?.id,
                    reactions: reactions,
                  });
                }}
              >
                {reactions.slice(1, 3).map(
                  (reaction, index) =>
                    reaction.number > 0 && (
                      <Image
                        key={index}
                        source={icons[reaction.type]}
                        style={{
                          width: 16,
                          height: 16,
                          marginLeft: index > 0 ? 2 : 0,
                        }}
                      />
                    )
                )}
                {countReaction > 0 && (
                  <Text
                    style={{
                      marginLeft: 3,
                      fontSize: 12,
                      color: "#65676B",
                    }}
                  >
                    {countReaction}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 12,
              }}
            >
              <Text style={{ fontSize: 12, color: "#65676B" }}>
                {item?.["number-reaction"] > 9999
                  ? "9999+"
                  : item?.["number-reaction"] > 0
                  ? item?.["number-reaction"].toLocaleString()
                  : null}
              </Text>
              {item?.["number-reaction"] > 0 ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity>
                    <Image
                      source={require("../assets/facebook-like.png")}
                      style={{ width: 20, height: 20, marginLeft: 4 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require("../assets/facebook-haha.png")}
                      style={{ width: 20, height: 20 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require("../assets/facebook-heart.jpg")}
                      style={{ width: 20, height: 20 }}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </View>

      <View style={{ marginLeft: 30 }}>
        {item?.answers?.map((reply) => (
          <Comment
            key={reply.id}
            item={reply}
            setIsReplying={setIsReplying}
            setCommentText={setCommentText}
            commentIdReplying={commentIdReplying}
            setCommentIdReplying={setCommentIdReplying}
            setNameReplying={setNameReplying}
            setIdUserReplying={setIdUserReplying}
            // edit comment
            setIsCommentTextFocus={setIsCommentTextFocus}
            setIsCommentEditing={setIsCommentEditing}
            commentIdEditing={commentIdEditing}
            setCommentIdEditing={setCommentIdEditing}
            setCommentImage={setCommentImage}
            //
            scrollToComment={scrollToComment}
            coords={coords}
            setCoords={setCoords}
            navigation={navigation}
          />
        ))}
      </View>
    </View>
  );
};

export default React.memo(Comment);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    // marginTop: StatusBar.currentHeight,
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
    padding: 12,
    borderRadius: 8,
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
    justifyContent: "space-between",
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

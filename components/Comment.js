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
  Ionicons,
  Fontisto,
  Entypo,
} from "@expo/vector-icons";

import React from "react";
import { useState, useEffect, useRef, useContext} from "react";
import {createNotification} from "../service/NotificationService"
import { Context as AccountContext } from "../context/AccountContext";
import moment from "moment";
import { reaction } from "../service/CommentService";

const Comment = ({
  item,
  setIsReplying,
  commentIdReplying,
  setCommentIdReplying,
  setNameReplying,
  setIdUserReplying,
  setCommentText,
  scrollToComment,
  coords,
  setCoords,
}) => {
  const [isPressingLike, setIsPressingLike] = useState(false);
  const [valueReaction, setValueReaction] = useState(0);
  const [nameReaction, setNameReaction] = useState(null);
  const [colorReaction, setColorReaction] = useState("#65676B");
  const { state: accountState } = useContext(AccountContext);

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
    console.log(item.id)

    await reaction({
      id_account: accountState.account.id,
      id_comment: item.id,
      reaction_type: type,
    });

    setValueReaction(convertReactionValue(type));
  }
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

  const ref = useRef();
  const notificationHandler = async(to_account_id, to_comment_post_id, notify_type) => {
    try{
      const response = await createNotification({
        from_account_id: accountState.account.id,
        to_account_id,
        to_post_id: null,
        to_comment_post_id,
        notify_type
      })
    }catch(error) {
      console.log(error);
    }
  }
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
        <TouchableOpacity>
          <Image
            source={item?.account_user?.avatar == null ? require("../assets/defaultProfilePicture.jpg") : { uri: item?.account_user?.avatar }}
            style={{ width: 40, height: 40, borderRadius: 100 }}
          />
        </TouchableOpacity>

        <View style={{maxWidth: '80%'}}>
          <View
            style={{
              flex: 1,
              marginHorizontal: 8,
              borderRadius: 20,
              padding: 8,
              paddingLeft: 12,
              paddingRight: 12,
              backgroundColor:
                item.id === commentIdReplying ? "#ccc" : "#f0f2f5",
            }}
          >
            <TouchableOpacity>
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
          </View>
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
                  width: "80%",
                  aspectRatio: 1,
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
                    reactionHandler("NONE")
                  } else {
                    reactionHandler("LIKE")
                    notificationHandler(item?.account_user.id, item?.id, "LIKE")
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
                      top: -100,
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
                        reactionHandler("LIKE");
                        notificationHandler(item?.account_user.id, item?.id, "LIKE")
                      }}
                    >
                      <Image
                        source={require("../assets/facebook-like.png")}
                        style={{ width: 44, height: 44, marginLeft: 4 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setIsPressingLike(false);
                        reactionHandler("LOVE");
                        notificationHandler(item?.account_user.id, item?.id, "LOVE")
                      }}
                    >
                      <Image
                        source={require("../assets/facebook-heart.jpg")}
                        style={{ width: 40, height: 40 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setIsPressingLike(false);
                        reactionHandler("CARE");
                        notificationHandler(item?.account_user.id, item?.id, "CARE")
                      }}
                    >
                      <Image
                        source={require("../assets/facebook-care2.jpg")}
                        style={{ width: 36, height: 36, marginLeft: 4 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setIsPressingLike(false);
                        reactionHandler("HAHA");
                        notificationHandler(item?.account_user.id, item?.id, "HAHA")
                      }}
                    >
                      <Image
                        source={require("../assets/facebook-haha.png")}
                        style={{ width: 48, height: 48 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setIsPressingLike(false);
                        reactionHandler("WOW");
                        notificationHandler(item?.account_user.id, item?.id, "WOW")
                      }}
                    >
                      <Image
                        source={require("../assets/facebook-wow.png")}
                        style={{ width: 36, height: 36 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginLeft: 4 }}
                      onPress={() => {
                        setIsPressingLike(false);
                        reactionHandler("SAD");
                        notificationHandler(item?.account_user.id, item?.id, "SAD")
                      }}
                    >
                      <Image
                        source={require("../assets/facebook-sad.jpg")}
                        style={{ width: 36, height: 36 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginLeft: 4 }}
                      onPress={() => {
                        setIsPressingLike(false);
                        reactionHandler("ANGRY");
                        notificationHandler(item?.account_user.id, item?.id, "ANGRY")
                      }}
                    >
                      <Image
                        source={require("../assets/facebook-angry.png")}
                        style={{ width: 36, height: 36 }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginLeft: 8 }}
                onPress={() => {
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
            setIdUserReplying = {setIdUserReplying}
            scrollToComment={scrollToComment}
            coords={coords}
            setCoords={setCoords}
          />
        ))}
      </View>
    </View>
  );
}

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

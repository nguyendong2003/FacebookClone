import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import listFriendProfile from "../data/listFriendProfile.json";
import { useNavigation } from "@react-navigation/native";
import React from "react";
const FriendProfile = ({ item, navigation }) => {
  // const navigation = useNavigation()
  return (
    <Pressable
      style={styles.friendContainer}
      onPress={() => {
        navigation.push("Profile", {
          isPersonalPage: false,
          statusFriend: "IS_FRIEND",
          listFriend: [],
          accountId: item.id,
        });
        // console.log("aaa")
      }}
    >
      <Image
        style={styles.friendAvatar}
        source={
          item?.avatar == null
            ? require("../assets/defaultProfilePicture.jpg")
            : { uri: item.avatar }
        }
      />
      <Text style={styles.friendName}>{item.profile_name}</Text>
    </Pressable>
  );
}
export default React.memo(FriendProfile);

const styles = StyleSheet.create({
  friendContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: 10,
    flex: 1,
  },
  friendAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
    // width: "30%"
  },
  friendName: {
    textAlign: "center",
    fontSize: 15,
  },
});

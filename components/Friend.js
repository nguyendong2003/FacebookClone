import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function Friend({ item, navigation }) {
  return (
    <View styles={styles.container}>
      <TouchableOpacity
        style={styles.friendContainer}
        onPress={() => {
          navigation.push("Profile", {
            accountId: item.id,
          });
        }}
      >
        <Image
          style={styles.avartar}
          source={
            item.avatar == null
              ? require("../assets/defaultProfilePicture.jpg")
              : { uri: item.avatar }
          }
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.profile_name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  friendContainer: {
    flexDirection: "row",
    padding: 10,
  },
  avartar: {
    width: 55,
    height: 55,
    borderRadius: 50,
    // backgroundColor:"blue"
  },
  nameContainer: {
    justifyContent: "center",
    alignContent: "center",
    padding: 8,
  },
  name: {
    fontSize: 20,
  },
});

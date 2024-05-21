import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import Friend from "../components/Friend";
import { FontAwesome } from "@expo/vector-icons";

export default function ListAllFriendScreen({navigation, route}) {
    const { listFriend } = route.params;
    return (
    <FlatList
      style={{ backgroundColor: "white" }}
      data={route.params.listFriend}
      renderItem={({ item }) => (
        <Friend item={item} navigation={navigation} key={item.id} />
      )}
      ListHeaderComponent={() => (
        <View style={styles.container}>
          <View style={styles.ButtonContainer}>
            {/* <View style={styles.Seperate}/> */}
            <TouchableOpacity style={styles.Button}>
              <Text style={styles.Text}>All Friend</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button}>
              <Text style={styles.Text}>Nearly</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputTextcontainer}>
            <View style={styles.iconContainer}>
              <FontAwesome name="search" size={15} color="black" />
            </View>

            <TextInput
              style={styles.textInput}
              placeholder="Enter friend's name"
            ></TextInput>
          </View>
          <Text style={styles.quantityFriend}>{listFriend.length + " friends"}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  quantityFriend: {
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
  },
  iconContainer: {
    justifyContent: "center",
    alignContent: "center",
  },
  textInput: {
    height: 25,
    marginLeft: 10,
    flex: 1,
  },
  inputTextcontainer: {
    // backgroundColor:"brown",
    padding: 4,
    flexDirection: "row",
    backgroundColor: "lightblue",
    borderRadius: 30,
    marginLeft: 8,
    marginRight: 8,
  },
  container: {
    flexDirection: "column",
  },
  ButtonContainer: {
    // flex:1,
    flexDirection: "row",
  },
  Button: {
    // borderWidth: 1,
    backgroundColor: "#e9f2f7",
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  Text: {
    fontSize: 15,
  },
  Seperate: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
  },
});

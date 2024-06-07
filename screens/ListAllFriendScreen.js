import React, { useEffect, useState, useMemo } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Friend from "../components/Friend";
import { FontAwesome } from "@expo/vector-icons";

export default function ListAllFriendScreen({ navigation, route }) {
  const { listFriend } = route.params;
  const [searchText, setSearchText] = useState("");
  const [filteredFriendList, setFilteredFriendList] = useState(listFriend);

  const changeSearchText = (newText) => {
    setSearchText(newText);
  };

  useEffect(() => {
    setFilteredFriendList(
      listFriend.filter((item) =>
        item.profile_name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText]);

  const HeaderComponent = useMemo(
    () => (
      <View style={styles.container}>
        {/* <View style={styles.ButtonContainer}>
          <TouchableOpacity style={styles.Button}>
            <Text style={styles.Text}>All Friend</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Button}>
            <Text style={styles.Text}>Nearly</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.inputTextcontainer}>
          <View style={styles.iconContainer}>
            <FontAwesome name="search" size={15} color="black" />
          </View>

          <TextInput
            style={styles.textInput}
            placeholder="Enter friend's name"
            value={searchText}
            onChangeText={changeSearchText}
          />
        </View>
        <Text style={styles.quantityFriend}>{listFriend.length + " friends"}</Text>
      </View>
    ),
    [searchText, listFriend.length]
  );

  return (
    <FlatList
      style={{ backgroundColor: "white" }}
      data={filteredFriendList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Friend item={item} navigation={navigation} key={item.id} />
      )}
      ListHeaderComponent={HeaderComponent}
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
    padding: 4,
    flexDirection: "row",
    backgroundColor: "#dadce0",
    borderRadius: 30,
    marginLeft: 8,
    marginRight: 8,
  },
  container: {
    flexDirection: "column",
  },
  ButtonContainer: {
    flexDirection: "row",
  },
  Button: {
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
});

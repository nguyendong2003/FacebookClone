import { useEffect, useContext } from "react";
import { Text, StyleSheet, View, Image, Alert } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { getAccountById } from "../service/AccountService";
import { Context as AccountContext } from "../context/AccountContext";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Context as AuthContext } from "../context/AuthContext";

export default function MoreScreen(
  { route}
) {
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const { state: accountState, getAccount } = useContext(AccountContext);
  // console.log(accountState.account)
  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <Text style={styles.Menu}>Menu</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Feather name="search" size={27} color="black" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
      onPress={() => navigation.navigate("Profile", {
        accountId: accountState.account.id,
        isPersonalPage: true
      })}
      style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={accountState.account.avatar == null ? require("../assets/defaultProfilePicture.jpg") : { uri: accountState.account.avatar }}
        />
        <Text style={styles.name}>{accountState.account.profile_name}</Text>
      </TouchableOpacity>
        <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => logout()}
        >
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  menuContainer:{
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft:13,
    paddingRight:13
  },
  container: {
    flex: 1,
  },
  Menu: {
    fontWeight: "bold",
    fontSize: 23,
    marginTop: 10,
    // marginLeft: 10
  },
  profileContainer:{
    flexDirection: "row",
    padding: 13,
    margin: 10,
    backgroundColor:"#f9f9f9",
    elevation: 6,
    borderRadius: 8,
    alignItems: "center"
  },
  profileImage:{
    width: 40,
    height: 40,
    borderRadius: 50
  },
  name:{
    fontSize: 18,
    marginLeft: 10,
    // marginTop: 5
  },
  buttonContainer:{
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c4ccc4",
    padding: 10,
    margin: 10,
    borderRadius: 8
  }
})
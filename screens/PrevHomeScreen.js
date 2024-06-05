import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  Image,
} from "react-native";
import { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as AccountContext } from "../context/AccountContext";
import { Context as PostContext } from "../context/PostContext";

export default function PrevHomeScreen({ navigation }) {
  const { checkLoggedIn, state } = useContext(AuthContext);
  const { getAccount } = useContext(AccountContext);
  const { getPosts } = useContext(PostContext);
  useEffect(() => {
    if (state.token != null) {
      getAccount();
      getPosts();
    } else checkLoggedIn();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (state.token != null)
        navigation.navigate("TabNavigationHome");
      else 
        navigation.navigate("Login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.imageApp}
        source={require("../assets/facebook-logo.png")}
      />
      <View style={{ flexDirection: "row", alignItems: "center", height: 200 }}>
        <Image
          source={require("../assets/meta_logo.png")}
          style={{ width: 40, height: 40 }}
        />
        <Text
          style={{
            marginLeft: 8,
            color: "#050505",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Meta
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
  },
  imageApp: {
    width: 150,
    height: 150,
  },
});

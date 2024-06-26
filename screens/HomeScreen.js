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
  DeviceEventEmitter,
} from "react-native";
import { RefreshControl } from "react-native";
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

import { useState, useEffect, useContext, useRef } from "react";
import { useCallback } from "react";
import { useScrollToTop } from "@react-navigation/native";
import Post from "../components/Post";
// Upload image
import * as ImagePicker from "expo-image-picker";

import { Context as AccountContext } from "../context/AccountContext";
import { Context as PostContext } from "../context/PostContext";

export default function HomeScreen({ navigation }) {
  const { state: accountState, getAccount } = useContext(AccountContext);
  const { state: postState, reloadPost,getPosts } = useContext(PostContext);

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
  const ref = useRef(null);
  useScrollToTop(ref);

  const [refreshing, setRefreshing] = useState(false);

  const updatePostById = async (id) => {
    await reloadPost(id);
  };
  
  
  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('reloadHomeScreenPost', updatePostById);
  
    return () => {
      subscription.remove();
    };
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    getPosts()
  }, [refreshing])

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.scrollContainer}>
          <FlatList
            style={{
              alignSelf: "flex-start",
              minWidth: "100%",
            }}
            ref={ref}
            data={postState.posts}
            renderItem={({ item }) => (
              <Post item={item} navigation={navigation} onUpdatePost={updatePostById} postType="POST"/>
            )}
            keyExtractor={(item, index) => item.id.toString()}
            ItemSeparatorComponent={
              <View style={{ height: 4, backgroundColor: "#ccc" }}></View>
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListHeaderComponent={
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 8,
                  borderBottomColor: "#ccc",
                  borderBottomWidth: 4,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Profile", {
                      accountId: accountState.account.id,
                      isPersonalPage: true
                    });
                  }}
                >
                  <Image
                    source={accountState.account.avatar == null ? require("../assets/defaultProfilePicture.jpg") : { uri: accountState.account.avatar }}
                    style={{ width: 40, height: 40, borderRadius: 100 }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flex: 1,
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderColor: "#65676B",
                    borderRadius: 20,
                    borderWidth: 1,
                    marginLeft: 16,
                  }}
                  onPress={() => {
                    navigation.navigate("CreatePost");
                  }}
                >
                  <Text style={{ color: "#65676B" }}>
                    What are you thinking?
                  </Text>
                </TouchableOpacity>
                <Ionicons
                  style={{ marginLeft: 8, padding: 8 }}
                  name="images"
                  size={28}
                  color="#09B44C"
                />
              </View>
            }
            // ListFooterComponent={<View style={{ height: 4 }}></View>}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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

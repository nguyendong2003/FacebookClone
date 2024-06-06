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
} from 'react-native';

import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Feather,
  Ionicons,
  Fontisto,
  Entypo,
} from '@expo/vector-icons';

import { useState, useEffect, useContext } from 'react';
import moment from 'moment';

import postList from '../data/post.json';
import commentList from '../data/comment.json';

import Comment from './Comment';

// // Upload image
import * as ImagePicker from 'expo-image-picker';
import { Context as AccountContext } from "../context/AccountContext";
import { Context as FriendContext } from "../context/FriendContext";
import { createNotification, deleteNotification, getSendNotificationFromFriendRequest, getReceiveNotificationFromFriendRequest } from "../service/NotificationService";
import {getProfileStatus} from "../service/FriendService"
export default function Reaction({
  item,
  navigation,
  name,
  avatar,
  icon,
  size,
  value,
}) {
  const { state } = useContext(AccountContext);
  const [notificationId, setNotificationId] = useState(null);  
  const { sendRequest, cancelFriendRequest, acceptFriendRequest, rejectFriendRequest } = useContext(FriendContext);
  const [status, setStatus] = useState(null)
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ window });
    });
    return () => subscription?.remove();
  });

  useEffect(() => {
    fetchStatus()
  },[])

  useEffect(() => {
    if(notificationId == null) {
      if(status == "IN_REQUEST_SENDER") {
        handleGetSendNotification(item.id)
      }
    }
  }, [status])

  const fetchStatus = async() => {
    try {
      const response = await getProfileStatus(item.id)
      setStatus(response)
    }catch(error) {
      console.log(error)
    }
  }
  const handleGetSendNotification = async(receiverId) => {
    try{ 
      const response = await getSendNotificationFromFriendRequest(receiverId)
      setNotificationId(response.id)
    } catch(error) {
      console.log(error);
    }
  }

  const handleDeleteNotification = async() => {
    try {
        const response = await deleteNotification(notificationId)
    }catch(error) {
        console.log(error);
    }
  }

  const handleCreateNotification = async(to_account_id, notify_type) => {
    try{
      const response = await createNotification({
        from_account_id: state.account.id,
        to_account_id,
        to_post_id: null,
        to_comment_post_id: null,
        notify_type
      })
    }catch(error) {
      console.log(error);
    }
  }

  const sendRequestHandler = async () => {
    await sendRequest(item.id);
    getProfileStatus(item.id).then((data) => {
      setStatus(data);
    });
    handleCreateNotification(item.id, "friend_request")
  };

  const cancelRequestHandler = async () => {
    await cancelFriendRequest(item.id);
    await handleDeleteNotification()
    fetchStatus();
  };
  const renderUserReaction = () => {
    switch(status) {
      case 'STRANGER':
        return (
          <TouchableOpacity
              style={[styles.button]}
              onPress={() => sendRequestHandler()}
            >
              <Text style={{fontSize: 15, color: "white" }}>
                Add friend
              </Text>
          </TouchableOpacity>
        )
      case "IN_REQUEST_SENDER":
        return(
          <TouchableOpacity
              style={[styles.button]}
              onPress={() => cancelRequestHandler()}
            >
              <Text style={{fontSize: 15, color: "white" }}>
                Undo
              </Text>
          </TouchableOpacity>
        )
    }
  }
  const { window } = dimensions;
  const windowWidth = window.width;
  const windowHeight = window.height;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Profile", { accountId: item.id });
      }}
    >
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 8,
          }}
        >
          <View>
            <Image
              source={avatar == null ? require("../assets/defaultProfilePicture.jpg")
              : { uri: avatar }}
              style={{ width: size * 2, height: size * 2, borderRadius: 100 }}
            />
            {icon && (
              <Image
                source={icon}
                style={{
                  width: size,
                  height: size,
                  position: 'absolute',
                  top: '60%',
                  left: '60%',
                  borderRadius: 100,
                }}
              />
            )}
          </View>

          <Text
            style={{
              flexGrow: 1,
              fontSize: 18,
              color: '#050505',
              fontWeight: 'bold',
              marginLeft: 16,
            }}
          >
            {name}
          </Text>
          {renderUserReaction()}
        </View>
        
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    // marginTop: StatusBar.currentHeight,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    // padding: 16,
    paddingBottom: 8,
  },
  topContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  //
  card: {
    backgroundColor: 'white',
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
    textAlign: 'center',
    fontWeight: 'bold',
  },
  //
  inputSearch: {
    marginLeft: 8,
    fontSize: 22,
    width: '90%',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  // Dropdown
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
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
  button: {
    flexDirection: "row",
    backgroundColor: "#0866ff",
    marginRight: 8,
    paddingVertical:8,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  textBottomPost: {
    fontSize: 12,
    marginLeft: 8,
    fontWeight: '500',
    color: '#65676B',
  },
});

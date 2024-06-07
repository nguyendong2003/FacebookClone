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
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import postList from '../data/post.json';
import commentList from '../data/comment.json';

import Comment from './Comment';

// // Upload image
import * as ImagePicker from 'expo-image-picker';

import { Context as FriendContext } from '../context/FriendContext';
import { deleteNotification, getReceiveNotificationFromFriendRequest, createNotification } from "../service/NotificationService";
import {Context as AccountContext} from "../context/AccountContext"
export default function FriendRequest({
  item,
  name,
  avatar,
  icon,
  size,
  value,
}) {
  
  const { state: accountState, getAccount } = useContext(AccountContext);
  const navigation = useNavigation();
  const [notificationId, setNotificationId] = useState(null);
  useEffect(() => {
    handleGetReceiveNotification(item?.id)
  }, [])
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ window });
    });
    return () => subscription?.remove();
  });

  const { window } = dimensions;
  const windowWidth = window.width;
  const windowHeight = window.height;

  const { acceptFriendRequest, getFriendRequests, rejectFriendRequest } = useContext(FriendContext);
  const handleGetReceiveNotification = async(senderId) => {
    try{ 
      const response = await getReceiveNotificationFromFriendRequest(senderId)
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

  const handleCreateNotification = async (to_account_id, notify_type) => {
    try {
      const response = await createNotification({
        from_account_id: accountState.account.id,
        to_account_id,
        to_post_id: null,
        to_comment_post_id: null,
        notify_type,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  const acceptClickHandler = () => {
    acceptFriendRequest(item?.id).then(() => {
      getFriendRequests();
      handleCreateNotification(item?.id, "accept_friend")
      handleDeleteNotification()
    });
  }

  const rejectClickHandler = () => {
    rejectFriendRequest(item?.id).then(() => {
      getFriendRequests();
      handleDeleteNotification()
    }
  )};

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        // minWidth: '100%',
        // backgroundColor: 'red',
      }}
      onPress={() => {
        navigation.navigate('Profile', {accountId: item?.id, isPersonalPage: false});
      }}
    >
      <Image
        source={item?.avatar == null ? require('../assets/defaultProfilePicture.jpg') : { uri: item?.avatar }}
        style={{ width: 80, height: 80, borderRadius: 100 }}
      />
      <View
        style={{
          marginLeft: 16,
          //   backgroundColor: 'blue',
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item?.name}</Text>
          <Text>{item?.time}</Text>
        </View>

        {/* <View>
          <Text style={{ color: '#65676b', padding: 2 }}>14 join friend</Text>
        </View> */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 8,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#0866ff',
              padding: 6,
              borderRadius: 8,
            }}
            onPress={acceptClickHandler}
          >
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                textAlign: 'center',
              }}
            >
              Accept
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#e4e6eb',
              padding: 6,
              borderRadius: 8,
              marginLeft: 8,
            }}
            onPress={rejectClickHandler}
          >
            <Text
              style={{
                fontSize: 16,
                color: '#050505',
                textAlign: 'center',
              }}
            >
              Delete
            </Text>
          </TouchableOpacity>
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
  buttonBottomPost: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // padding: 4,
  },
  textBottomPost: {
    fontSize: 12,
    marginLeft: 8,
    fontWeight: '500',
    color: '#65676B',
  },
});

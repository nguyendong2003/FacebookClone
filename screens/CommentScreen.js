import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  Image,
  Pressable,
  Button,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Dimensions,
  FlatList,
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

import { useState, useEffect, useRef } from 'react';

import Comment from '../components/Comment';

import commentList from '../data/comment.json';

// Upload image
import * as ImagePicker from 'expo-image-picker';

export default function CommentScreen({ route, navigation }) {
  //
  const [commentText, setCommentText] = useState('');
  const [commentImage, setCommentImage] = useState(null);
  const [isCommentTextFocus, setIsCommentTextFocus] = useState(false);
  const [isSelectImage, setIsSelectImage] = useState(false);
  const [isCommentValid, setIsCommentValid] = useState(false);
  //
  const [isReplying, setIsReplying] = useState(false);
  const [commentIdReplying, setCommentIdReplying] = useState(null);
  const [nameReplying, setNameReplying] = useState('');

  // focus vào TextInput để viết comment khi isReplying là true
  const commentInputRef = useRef(null);

  useEffect(() => {
    if (isReplying || isCommentTextFocus) {
      // Kiểm tra xem ref có tồn tại không trước khi gọi focus()
      if (commentInputRef.current) {
        commentInputRef.current.focus();
      }
    }
  }, [isReplying, isCommentTextFocus]);

  useEffect(() => {
    console.log(commentIdReplying);
    console.log(isReplying);
  }, [commentIdReplying, isReplying]);

  // image
  const pickImage = async () => {
    // no permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setCommentImage(result.assets[0].uri);
    }
  };
  useEffect(() => {
    if (isSelectImage) {
      pickImage();
    }
  }, [isSelectImage]);

  useEffect(() => {
    if (commentText || commentImage) {
      setIsCommentValid(true);
    } else {
      setIsCommentValid(false);
    }
  }, [commentText, commentImage]);
  //
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

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        behavior="padding"
      >
        {/* <View style={styles.scrollContainer}> */}
        <FlatList
          keyboardShouldPersistTaps="handled"
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          ListFooterComponentStyle={{ flex: 1, justifyContent: 'flex-end' }}
          style={{
            alignSelf: 'flex-start',
            minWidth: '100%',
          }}
          data={commentList}
          renderItem={({ item }) => (
            <Comment
              item={item}
              setIsReplying={setIsReplying}
              setCommentIdReplying={setCommentIdReplying}
              setNameReplying={setNameReplying}
            />
          )}
          keyExtractor={(item, index) => item.id.toString()}
          // ItemSeparatorComponent={
          //   <View style={{ height: 4, backgroundColor: '#ccc' }}></View>
          // }
          ListEmptyComponent={
            <Text
              style={{
                color: 'red',
                fontSize: 24,
                flex: 1,
                textAlign: 'center',
              }}
            >
              No comment found
            </Text>
          } // display when empty data
          ListHeaderComponent={
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 8,
                paddingHorizontal: 12,
                marginBottom: 16,
                backgroundColor: 'white',
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => navigation.navigate('Reaction')}
              >
                <Image
                  source={require('../assets/facebook-like.png')}
                  style={{ width: 24, height: 24 }}
                />
                <Image
                  source={require('../assets/facebook-haha.png')}
                  style={{ width: 24, height: 24 }}
                />
                <Image
                  source={require('../assets/facebook-heart.jpg')}
                  style={{ width: 24, height: 24 }}
                />
                <Text numberOfLines={1} style={{ width: 200 }}>
                  You, Nguyễn Đông and 127.191 other
                </Text>
                <Entypo name="chevron-small-right" size={24} color="black" />
              </TouchableOpacity>
              <AntDesign
                name="like2"
                size={24}
                color="black"
                onPress={() => {
                  // route?.params.setValueReaction(1);
                }}
              />
            </View>
          }
        />
        <View
          style={{
            backgroundColor: 'white',
            paddingVertical: 4,
            paddingHorizontal: 12,
            borderTopColor: '#ccc',
            borderTopWidth: 1,
          }}
        >
          {isReplying && (
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#65676B', fontSize: 15 }}>Replying</Text>

              <TouchableOpacity>
                <Text
                  style={{
                    marginLeft: 4,
                    color: '#65676B',
                    fontWeight: '500',
                    fontSize: 15,
                  }}
                >
                  {nameReplying}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setIsReplying(false);
                  setCommentIdReplying(null);
                }}
              >
                <Text
                  style={{
                    marginLeft: 16,
                    fontWeight: 'bold',
                    color: '#65676B',
                    fontSize: 15,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <TextInput
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              backgroundColor: '#f0f2f5',
              borderRadius: 24,
              color: '#050505',
              fontSize: 16,
            }}
            placeholder="Enter your comment"
            value={commentText}
            onChangeText={(text) => {
              setCommentText(text);
            }}
            onFocus={() => setIsCommentTextFocus(true)}
            onBlur={() => setIsCommentTextFocus(false)}
            ref={commentInputRef}
            autoFocus={route?.params?.initialCommentFocus}
          />
          {isCommentTextFocus && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 4,
              }}
            >
              {!commentImage && (
                <Ionicons
                  name={isSelectImage ? 'camera' : 'camera-outline'}
                  size={24}
                  color={isSelectImage ? 'black' : '#65676B'}
                  onPress={() => {
                    setIsSelectImage(!isSelectImage);
                  }}
                />
              )}

              {commentImage && (
                <View>
                  <Image
                    source={{ uri: commentImage }}
                    style={{ width: 100, height: 100, resizeMode: 'cover' }}
                  />
                  <Entypo
                    style={{ position: 'absolute', left: '100%' }}
                    name="circle-with-cross"
                    size={24}
                    color="#ccc"
                    onPress={() => {
                      setIsSelectImage(false);
                      setCommentImage(null);
                    }}
                  />
                </View>
              )}

              <FontAwesome
                name={isCommentValid ? 'send' : 'send-o'}
                size={24}
                color={isCommentValid ? '#0866ff' : '#65676B'}
                onPress={() => {
                  if (isCommentValid) {
                    alert('Valid comment');
                  } else {
                    alert('Invalid comment');
                  }
                }}
              />
            </View>
          )}
        </View>
        {/* </View> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight,
    // marginTop: StatusBar.currentHeight,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
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
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    margin: 4,
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
});

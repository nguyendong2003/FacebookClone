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

import { useState, useEffect } from 'react';
import moment from 'moment';

import postList from '../data/post.json';
import commentList from '../data/comment.json';

import Comment from './Comment';

// // Upload image
import * as ImagePicker from 'expo-image-picker';

export default function Post({ item, navigation }) {
  // Reaction
  const [isPressingLike, setIsPressingLike] = useState(false);
  const [valueReaction, setValueReaction] = useState(0);
  const [nameReaction, setNameReaction] = useState(null);
  const [sizeReaction, setSizeReaction] = useState(null);
  const [sourceReaction, setSourceReaction] = useState(null);
  const [colorReaction, setColorReaction] = useState('#65676B');
  //

  useEffect(() => {
    // console.log(valueReaction);
    // Xác định màu dựa trên giá trị reaction
    switch (valueReaction) {
      case 1:
        setColorReaction('#0866FF');
        setNameReaction('Like');
        setSizeReaction(44 - 16);
        setSourceReaction(require('../assets/facebook-like.png'));

        break;
      case 2:
        setColorReaction('#F33E58');
        setNameReaction('Love');
        setSizeReaction(40 - 16);
        setSourceReaction(require('../assets/facebook-heart.jpg'));
        break;
      case 3:
        setColorReaction('#F7B125');
        setNameReaction('Care');
        setSizeReaction(36 - 12);
        setSourceReaction(require('../assets/facebook-care2.jpg'));
        break;
      case 4:
        setColorReaction('#F7B125');
        setNameReaction('Haha');
        setSizeReaction(48 - 20);
        setSourceReaction(require('../assets/facebook-haha.png'));
        break;
      case 5:
        setColorReaction('#F7B125');
        setNameReaction('Wow');
        setSizeReaction(36 - 12);
        setSourceReaction(require('../assets/facebook-wow.png'));
        break;
      case 6:
        setColorReaction('#E9710F');
        setNameReaction('Sad');
        setSizeReaction(36 - 12);
        setSourceReaction(require('../assets/facebook-sad.jpg'));
        break;
      case 7:
        setColorReaction('#E9710F');
        setNameReaction('Angry');
        setSizeReaction(36 - 12);
        setSourceReaction(require('../assets/facebook-angry.png'));
        break;

      default:
        setColorReaction('#65676B'); // Màu mặc định
        setNameReaction('Like');
        setSourceReaction(null);
    }
  }, [valueReaction]);

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
    <View>
      <View style={styles.card} key={item.id}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 12,
            paddingBottom: 0,
          }}
        >
          <TouchableOpacity>
            <Image
              source={{ uri: item?.avatar }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>

          <View style={{ marginLeft: 8 }}>
            <TouchableOpacity>
              <Text
                style={{
                  color: '#050505',
                  fontSize: 15,
                  fontWeight: '600',
                }}
              >
                {item?.name}
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                color: '#65676B',
                fontSize: 13,
                fontWeight: 400,
              }}
            >
              {moment(item?.time, 'YYYY-MM-DD HH:mm:ss').format(
                'DD/MM/yyyy hh:mm:ss'
              )}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              marginTop: 8,
              fontSize: 17,
              fontWeight: '400',

              paddingHorizontal: 12,
              paddingVertical: 0,
            }}
          >
            {item?.description}
          </Text>
          <View
            style={{
              marginTop: 8,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            {item?.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={{
                  marginLeft: 8,
                  marginTop: 8,
                  borderRadius: 20,
                }}
                width={windowWidth / 2 - 12}
                height={windowWidth / 2 - 12}
                resizeMode="cover"
              />
            ))}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            // padding: 4,
            paddingVertical: 4,
            paddingHorizontal: 12,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => alert('Reactions')}
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
              style={{ width: 24, height: 24, marginLeft: 2 }}
            />
            <Text
              style={{
                marginLeft: 3,
                fontSize: 12,
                color: '#65676B',
              }}
            >
              20.500
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={{ padding: 4 }}
              onPress={() => {
                navigation.navigate('Comment');
                // navigation.navigate('Comment', {
                //   setValueReaction: setValueReaction,
                // });
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: 400 }}>
                44.000 comments
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginLeft: 4, padding: 4 }}
              onPress={() => {
                navigation.navigate('Comment');
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: 400 }}>
                220.000 shares
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 8,
            paddingTop: 2,
            paddingBottom: 10,
            paddingHorizontal: 4,
          }}
        >
          <TouchableOpacity
            style={[styles.buttonBottomPost, { width: 54, height: 24 }]}
            onPress={() => {
              setIsPressingLike(false);
              if (valueReaction > 0) {
                setValueReaction(0);
              } else {
                setValueReaction(1);
              }
            }}
            onLongPress={() => setIsPressingLike(!isPressingLike)}
            delayLongPress={400}
          >
            {sourceReaction && (
              <Image
                source={sourceReaction}
                style={{
                  width: sizeReaction,
                  height: sizeReaction,
                }}
              />
            )}

            {!sourceReaction && (
              <AntDesign name="like2" size={24} color="#65676B" />
            )}

            {/* <Text style={styles.textBottomPost}>Like</Text> */}
            <Text style={[styles.textBottomPost, { color: colorReaction }]}>
              {/* Like */}
              {nameReaction ? nameReaction : 'Like'}
            </Text>

            {isPressingLike && (
              <View
                style={{
                  position: 'absolute',
                  top: -84,
                  left: -14,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  padding: 8,
                  borderRadius: 50,

                  shadowColor: 'black',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setIsPressingLike(false);
                    setValueReaction(1);
                  }}
                >
                  <Image
                    source={require('../assets/facebook-like.png')}
                    style={{ width: 44, height: 44, marginLeft: 4 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsPressingLike(false);
                    setValueReaction(2);
                  }}
                >
                  <Image
                    source={require('../assets/facebook-heart.jpg')}
                    style={{ width: 40, height: 40 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsPressingLike(false);
                    setValueReaction(3);
                  }}
                >
                  <Image
                    source={require('../assets/facebook-care2.jpg')}
                    style={{ width: 36, height: 36, marginLeft: 4 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsPressingLike(false);
                    setValueReaction(4);
                  }}
                >
                  <Image
                    source={require('../assets/facebook-haha.png')}
                    style={{ width: 48, height: 48 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsPressingLike(false);
                    setValueReaction(5);
                  }}
                >
                  <Image
                    source={require('../assets/facebook-wow.png')}
                    style={{ width: 36, height: 36 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginLeft: 4 }}
                  onPress={() => {
                    setIsPressingLike(false);
                    setValueReaction(6);
                  }}
                >
                  <Image
                    source={require('../assets/facebook-sad.jpg')}
                    style={{ width: 36, height: 36 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginLeft: 4 }}
                  onPress={() => {
                    setIsPressingLike(false);
                    setValueReaction(7);
                  }}
                >
                  <Image
                    source={require('../assets/facebook-angry.png')}
                    style={{ width: 36, height: 36 }}
                  />
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonBottomPost}
            onPress={() => {
              navigation.navigate('Comment', { initialCommentFocus: true });
            }}
          >
            <FontAwesome5 name="comment" size={24} color="#65676B" />
            <Text style={styles.textBottomPost}>Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonBottomPost}
            onPress={() => alert('send')}
          >
            <Feather name="send" size={24} color="#65676B" />
            <Text style={styles.textBottomPost}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonBottomPost}
            onPress={() => alert('share')}
          >
            <FontAwesome name="share" size={24} color="#65676B" />
            <Text style={styles.textBottomPost}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight,
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
    // padding: 12,
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

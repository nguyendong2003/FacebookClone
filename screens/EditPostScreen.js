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
  Dimensions,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Feather,
  Ionicons,
  Fontisto,
  Entypo,
} from '@expo/vector-icons';

import { Dropdown } from 'react-native-element-dropdown';

import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import moment from 'moment';

import { useFocusEffect } from '@react-navigation/native';
import { Context as PostContext } from '../context/PostContext';
import { Context as AccountContext } from '../context/AccountContext';
import { LogBox } from 'react-native';

export default function EditPostScreen({ navigation, route }) {
  // Lấy item từ Post.js truyền sang
  const { item } = route.params;
  //
  const [textPost, setTextPost] = useState(item?.content);
  const { createPost } = useContext(PostContext);
  const { state } = useContext(AccountContext);

  // chọn chế độ bài viết
  const [value, setValue] = useState(
    item?.view_mode === 'public'
      ? '1'
      : item?.view_mode === 'friend'
      ? '2'
      : item?.view_mode === 'private'
      ? '3'
      : '1'
  );

  const data = [
    { label: 'Public', value: '1' },
    { label: 'Friend', value: '2' },
    { label: 'Private', value: '3' },
  ];
  // useEffect(() => {
  //   console.log(value);
  // }, [value]);

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

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

  // console.log(item);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // https://stackoverflow.com/questions/29685421/hide-keyboard-in-react-native
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 12,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={
                  state.account.avatar == null
                    ? require('../assets/defaultProfilePicture.jpg')
                    : { uri: state.account.avatar }
                }
                style={{ width: 60, height: 60, borderRadius: 100 }}
              />
              <View style={{ marginLeft: 8 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                  {state.account.profile_name}
                </Text>
                <Dropdown
                  style={styles.dropdown}
                  selectedTextStyle={styles.selectedTextStyle}
                  search={false}
                  iconStyle={styles.iconStyle}
                  data={data}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={false}
                  value={value}
                  onChange={(item) => {
                    setValue(item.value);
                  }}
                  renderLeftIcon={() => (
                    <Ionicons
                      style={styles.icon}
                      name={
                        value === '1'
                          ? 'earth-sharp'
                          : value === '2'
                          ? 'people-sharp'
                          : 'lock-closed'
                      }
                      size={20}
                      color="#0866ff"
                    />
                  )}
                  renderRightIcon={() => (
                    <Entypo
                      style={styles.icon}
                      name="triangle-down"
                      size={20}
                      color="#0866ff"
                    />
                  )}
                  renderItem={(item) => (
                    <View style={styles.item}>
                      <Text
                        style={[
                          styles.textItem,
                          {
                            color: item.value === value ? '#0866ff' : '#050505',
                          },
                        ]}
                      >
                        {item.label}
                      </Text>
                      {item.value === value && (
                        <AntDesign
                          style={styles.icon}
                          color="#0866ff"
                          name="Safety"
                          size={20}
                        />
                      )}
                    </View>
                  )}
                />
              </View>
            </View>

            <View>
              <Button
                title="Edit"
                color="#0866ff"
                onPress={() => alert('Edited Post')}
              />
            </View>
          </View>
          <View style={{ marginTop: 16, padding: 12 }}>
            <TextInput
              style={{
                color: '#050505',
                textAlignVertical: 'top',
                fontSize: 18,
                // minHeight: imagePostList ? 100 : 0,
              }}
              value={textPost}
              onChangeText={setTextPost}
              blurOnSubmit={true}
              autoFocus={true}
              multiline
              // numberOfLines={!imagePostList && 5}
              placeholder="Please talk about this post..."
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            {item?.postImages?.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image.image }}
                style={{
                  marginHorizontal: 2,
                  marginTop: 4,
                  // borderRadius: 20,
                }}
                width={
                  item?.postImages.length % 2 === 1 && index === 0
                    ? windowWidth - 4
                    : windowWidth / 2 - 4
                }
                height={
                  item?.postImages.length % 2 === 1 && index === 0
                    ? windowWidth - 4
                    : windowWidth / 2 - 4
                }
                resizeMode="cover"
              />
            ))}
          </View>

          {item?.share_post != null && (
            <View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderBottomWidth: 0,
                  marginHorizontal: 8,
                  paddingBottom: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 12,
                    paddingBottom: 0,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Profile', {
                        isPersonalPage: false,
                        statusFriend: 'realFriend',
                        listFriend: [],
                      });
                    }}
                  >
                    <Image
                      source={
                        item?.share_post?.user?.avatar == null
                          ? require('../assets/defaultProfilePicture.jpg')
                          : { uri: item?.share_post?.user?.avatar }
                      }
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
                        {item?.share_post?.user?.profile_name}
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Text
                        style={{
                          color: '#65676B',
                          fontSize: 13,
                          fontWeight: 400,
                        }}
                      >
                        {moment(item.create_time, 'YYYY-MM-DD HH:mm:ss').format(
                          'DD/MM/yyyy HH:mm'
                        )}
                      </Text>
                      <Ionicons
                        style={{ marginLeft: 12 }}
                        name={
                          item.view_mode === 'public'
                            ? 'earth-sharp'
                            : item.view_mode === 'friend'
                            ? 'people-sharp'
                            : 'lock-closed'
                        }
                        size={14}
                        color="#050505"
                      />
                    </View>
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
                    {item?.share_post?.content}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: 'white',
    // paddingTop: StatusBar.currentHeight,
  },
  scrollContainer: {
    flexGrow: 1,
    // alignItems: 'center',
    backgroundColor: 'white',
    // padding: 16,
    // padding: 4,
    paddingBottom: 8,
  },
  //
  optionButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#e2e4e7',
    borderTopWidth: 1,
    padding: 12,
  },
  textOptionButton: {
    color: '#65676b',
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 12,
  },

  // Dropdown
  dropdown: {
    // margin: 16,
    marginTop: 4,
    minWidth: 130,
    height: 36,
    backgroundColor: '#ebf5ff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#0866FF',
    fontWeight: '500',
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

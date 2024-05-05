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
} from 'react-native';

import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  Fontisto,
  Entypo,
} from '@expo/vector-icons';

import { useState, useEffect } from 'react';

export default function NotificationScreen({ navigation }) {
  //
  const [isAvatarFocus, setIsAvatarFocus] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredFruitList, setFilteredFruitList] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);

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
        <View style={styles.scrollContainer}>
          <View style={styles.topContainer}>
            <View>
              <Text style={{ fontSize: 20 }}>
                Welcome
                {/* <Image
                    source={require('../assets/hand3.png')}
                    style={{ width: 20, height: 20 }}
                  /> */}
              </Text>
              <Text
                style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}
              >
                {/* nhathung2207 */}
                {/* {currentUser?.fullname} */}
              </Text>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              {/* <TouchableOpacity onPress={() => setIsAvatarFocus(!isAvatarFocus)}>
                  {currentUser?.image ? (
                    <Image
                      // source={require('../assets/41.jpg')}
                      source={{ uri: currentUser?.image }}
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 100,
                      }}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name={'account-circle-outline'}
                      size={60}
                    />
                  )}
                </TouchableOpacity> */}

              <View
                style={{
                  position: 'absolute',
                  display: isAvatarFocus ? 'flex' : 'none',
                  top: 60,
                  width: 220,
                  zIndex: 3,

                  backgroundColor: 'white',
                  borderRadius: 10,
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
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 20,

                    borderBottomWidth: 2,
                    borderColor: '#e2e3e5',
                  }}
                  onPress={() => {
                    setIsAvatarFocus(false);
                    navigation.navigate('PersonalInformation');
                  }}
                >
                  <Fontisto name="person" size={24} color="#ffc107" />
                  <Text
                    style={{ fontSize: 16, fontWeight: '600', marginLeft: 16 }}
                  >
                    Profile
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 20,
                    borderBottomWidth: 2,
                    borderColor: '#d6d7db',
                  }}
                  onPress={() => {
                    setUser(null);
                    setIsAvatarFocus(false);
                    navigation.navigate('Login');
                  }}
                >
                  <Entypo name="log-out" size={24} color="#dc3545" />
                  <Text
                    style={{ fontSize: 16, fontWeight: '600', marginLeft: 16 }}
                  >
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={[styles.searchContainer]}>
            <FontAwesome name="search" size={24} color="#3C3C43" />
            <TextInput
              style={styles.inputSearch}
              value={search}
              onChangeText={(text) => {
                setSearch(text);
              }}
              placeholder="Search"
            />
          </View>

          <FlatList
            style={{
              marginTop: 16,
              marginBottom: 16,
              alignSelf: 'flex-start',
              minWidth: '100%',
            }}
            data={filteredFruitList}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('FruitDetail', { fruit: item })
                  }
                >
                  <View style={styles.card} key={item.id_fruit}>
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: (windowWidth - 32 - 80) / 2,
                        height: (windowWidth - 32 - 80) / 2,
                      }}
                      resizeMode="contain"
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <AntDesign
                        name={item.favourite == true ? 'heart' : 'hearto'}
                        size={20}
                        color={item.favourite == true ? 'red' : '#09B44C'}
                      />
                      <Text style={styles.cardText}>{item.name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            numColumns={2}
            keyExtractor={(item, index) => item.id_fruit.toString()}
            ItemSeparatorComponent={<View style={{ height: 4 }}></View>}
            ListEmptyComponent={
              <Text
                style={{
                  color: 'red',
                  fontSize: 24,
                  flex: 1,
                  textAlign: 'center',
                }}
              >
                No fruits found
              </Text>
            } // display when empty data
            ListHeaderComponent={<View style={{ height: 4 }}></View>}
            // ListFooterComponent={<View style={{ height: 4 }}></View>}
            showsVerticalScrollIndicator={false} // tắt thanh scroll khi cuộn item trong FlatList
            // horizontal         // đổi chiều hiển thị theo phương ngang
          />
        </View>
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

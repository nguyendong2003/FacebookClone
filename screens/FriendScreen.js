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

import friendRequestList from '../data/friendRequest.json';
import FriendRequest from '../components/FriendRequest';

export default function FriendScreen({ navigation }) {
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
        <View style={{ padding: 8 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text
              style={{ color: '#65676B', fontWeight: 'bold', fontSize: 32 }}
            >
              Friends
            </Text>
            <FontAwesome name="search" size={24} color="#65676B" />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: '#E4E6EB',
                borderRadius: 20,
              }}
            >
              <Text style={{ color: '#050505' }}>Suggest</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginLeft: 8,
                padding: 10,
                backgroundColor: '#E4E6EB',
                borderRadius: 20,
              }}
            >
              <Text style={{ color: '#050505' }}>Friends</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{ color: '#050505', fontSize: 20, fontWeight: 'bold' }}
              >
                Friend request
              </Text>
              <Text
                style={{
                  color: '#e41e3f',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginLeft: 8,
                }}
              >
                57
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={{ color: '#0866ff', fontSize: 20 }}>See all</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            style={{
              marginTop: 16,
              marginBottom: 16,
              alignSelf: 'flex-start',
              minWidth: '100%',
            }}
            data={friendRequestList}
            renderItem={({ item }) => {
              return <FriendRequest item={item} />;
            }}
            keyExtractor={(item, index) => item.id.toString()}
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
                No friend request found
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
    // paddingTop: StatusBar.currentHeight,
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

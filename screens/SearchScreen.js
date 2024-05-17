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

import searchList from '../data/search.json';

// Upload image
import * as ImagePicker from 'expo-image-picker';

export default function SearchScreen({ navigation }) {
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState(searchList);

  useEffect(() => {
    const filteredResults = searchList.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filteredResults);
  }, [searchValue]);

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
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.scrollContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 8,
            }}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color="black"
              onPress={() => {
                navigation.goBack();
              }}
            />
            <TextInput
              style={{
                flex: 1,
                backgroundColor: '#f0f2f5',
                // color: '#050505',
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 8,
                fontSize: 16,
                color: '#65676b',
                fontWeight: '500',
                marginLeft: 8,
                marginRight: 8,
              }}
              placeholder="Search"
              value={searchValue}
              onChangeText={setSearchValue}
            />
          </View>
          <FlatList
            keyboardShouldPersistTaps="handled"
            style={{
              alignSelf: 'flex-start',
              minWidth: '100%',
            }}
            data={filteredData}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 8,
                }}
                onPress={() => {
                  navigation.navigate('Profile', {isPersonalPage: false, StatusFriend: "stranger"})
                }}
              >
                <Image
                  source={{ uri: item?.avatar }}
                  style={{ width: 50, height: 50, borderRadius: 100 }}
                />
                <View style={{ marginLeft: 16 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {item?.name}
                  </Text>
                  {item?.type && (
                    <Text
                      style={{
                        color: '#65676b',
                        fontSize: 16,
                        fontWeight: '500',
                      }}
                    >
                      {item?.type}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
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
                No search found
              </Text>
            } // display when empty data
            // ListHeaderComponent={
            // }
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

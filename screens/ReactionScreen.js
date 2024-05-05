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
} from 'react-native';

import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  Fontisto,
  Entypo,
} from '@expo/vector-icons';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useState, useEffect } from 'react';
import Reaction from '../components/Reaction';

import reactionList from '../data/reaction.json';

const Tab = createMaterialTopTabNavigator();

export default function ReactionScreen({ navigation }) {
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

  const screens = [
    {
      name: 'All',
      value: 0,
      icon: '',
      // icon: require('../assets/facebook-like.png'),
      size: 44 - 22,
      number: 94570,
    },
    {
      name: 'Like',
      value: 1,
      icon: require('../assets/facebook-like.png'),
      size: 40 - 16,
      number: 1600,
    },
    {
      name: 'Love',
      value: 2,
      icon: require('../assets/facebook-heart.jpg'),
      size: 36 - 12,
      number: 5500,
    },
    {
      name: 'Care',
      value: 3,
      icon: require('../assets/facebook-care2.jpg'),
      size: 36 - 12,
      number: 6000,
    },
    {
      name: 'Haha',
      value: 4,
      icon: require('../assets/facebook-haha.png'),
      size: 48 - 20,
      number: 7000,
    },
    {
      name: 'Wow',
      value: 5,
      icon: require('../assets/facebook-wow.png'),
      size: 36 - 12,
      number: 8000,
    },
    {
      name: 'Sad',
      value: 6,
      icon: require('../assets/facebook-sad.jpg'),
      size: 36 - 12,
      number: 500,
    },
    {
      name: 'Angry',
      value: 7,
      icon: require('../assets/facebook-angry.png'),
      size: 36 - 12,
      number: 50,
    },
  ];

  const ReactionTabScreen = ({ route }) => {
    // Trích xuất giá trị của màn hình từ route.params nếu cần
    const { name, icon, size, value } = route.params;

    const renderReactionList =
      value === 0
        ? reactionList
        : reactionList.filter((item) => item.type === value);

    return (
      <View style={styles.container}>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 8,
          }}
        >
          <View>
            <Image
              source={require('../assets/messi.jpg')}
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
            Messi
          </Text>
          <Button title="Add friend" color={'#0866ff'} />
        </View>
        <Text>{name} Screen Content</Text> */}
        <FlatList
          style={{
            alignSelf: 'flex-start',
            minWidth: '100%',
          }}
          data={renderReactionList}
          renderItem={({ item }) => (
            // <Post item={item} navigation={navigation} />
            <Reaction
              item={item}
              name={item.name}
              avatar={item?.avatar}
              icon={icon}
              size={size}
              value={value}
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
              No reaction found
            </Text>
          } // display when empty data
          // ListFooterComponent={<View style={{ height: 4 }}></View>}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: 'beside-icon',
        // tabBarShowLabel: false,
        tabBarInactiveTintColor: '#65676b', // đổi màu chữ của tab item không được click
        tabBarScrollEnabled: true,
      }}
      style={{ borderTopWidth: 1, borderTopColor: '#ccc' }}
    >
      {screens.map((screen) => (
        <Tab.Screen
          key={screen.value}
          name={screen.name}
          component={ReactionTabScreen}
          initialParams={{
            name: screen.name,
            icon: screen.icon,
            size: screen.size,
            value: screen.value,
          }}
          options={{
            headerShown: false,
            tabBarLabel: screen.number.toString(),
            tabBarIcon: ({ color }) => {
              return screen.icon ? (
                <Image
                  source={screen.icon}
                  color={color}
                  style={{
                    width: screen.size,
                    height: screen.size,
                    borderRadius: 200,
                  }}
                />
              ) : (
                <Text
                  style={{ fontSize: 18, color: '#0866ff', fontWeight: 'bold' }}
                >
                  All
                </Text>
              );
            },
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: 'bold',
            },
            tabBarActiveTintColor: '#0866ff',
            unmountOnBlur: true,
          }}
        />
      ))}
    </Tab.Navigator>
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

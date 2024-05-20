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

import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  Entypo,
  Feather,
  AntDesign,
  Fontisto,
} from '@expo/vector-icons';

import { useState, useEffect, useContext } from 'react';
import { Badge } from 'react-native-elements';

// Tab Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// Screen
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MoreScreen from '../screens/MoreScreen';
import FriendScreen from '../screens/FriendScreen';
import { Context as PostContext } from '../context/PostContext';
import { Context as AccountContext } from '../context/AccountContext';

import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const Tab = createMaterialTopTabNavigator();

export default function TabNavigationHome({ navigation }) {
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
  });

  const { getAccount } = useContext(AccountContext);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ window });
    });
    return () => subscription?.remove();
  });

  const { window } = dimensions;
  const windowWidth = window.width;
  const windowHeight = window.height;

  // console.log({ windowWidth, windowHeight });

  useEffect(() => {
    getAccount()
  }, [])

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 12,
        }}
      >
        <Text style={{ color: '#0866ff', fontSize: 36, fontWeight: 'bold' }}>
          facebook
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome
            name="search"
            size={24}
            color="#050505"
            onPress={() => navigation.navigate('Search')}
          />
          {/* <View>
            <FontAwesome5
              style={{ marginLeft: 16 }}
              name="facebook-messenger"
              size={24}
              color="#050505"
            />
            <Badge
              status="error"
              value="99+"
              containerStyle={{ position: 'absolute', top: -8, right: -8 }}
            />
          </View> */}
        </View>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelPosition: 'below-icon',
          tabBarShowLabel: false,
          tabBarInactiveTintColor: '#65676b', // đổi màu chữ của tab item không được click
          // animationEnabled: false,
          // tabBarStyle: {
          //   // width: 600,
          // },
          // tabBarScrollEnabled: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <Entypo name="home" size={24} color={color} />
            ),
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: 'bold',
            },
            tabBarActiveTintColor: '#0866ff',
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Friend"
          component={FriendScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user-friends" size={20} color={color} />
            ),
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: 'bold',
            },
            tabBarActiveTintColor: '#0866ff',
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <View>
                <Ionicons name="notifications" size={24} color={color} />
                <Badge
                status='error'
                value="11"
                containerStyle={{position: "absolute", top:-8, right:-8}}
                />
              </View>
              
            ),
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: 'bold',
            },
            tabBarActiveTintColor: '#0866ff',
            unmountOnBlur: true,
            
          }}
        />
        <Tab.Screen
          name="More"
          component={MoreScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="bars" size={24} color={color} />
            ),
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: 'bold',
            },
            tabBarActiveTintColor: '#0866ff',
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    // marginTop: StatusBar.currentHeight + 16,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
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
    marginTop: 8,
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
});

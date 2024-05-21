import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

//screens
import PrevHomeScreen from './screens/PrevHomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import TabNavigationHome from './navigations/TabNavigationHome';
import CommentScreen from './screens/CommentScreen';
import ReactionScreen from './screens/ReactionScreen';
import SearchScreen from './screens/SearchScreen';
import CreatePostScreen from './screens/CreatePostScreen';
import ProfileScreen from './screens/ProfileScreen';
import ListAllFriendScreen from './screens/ListAllFriendScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import EditProfileDetailScreen from './screens/EditProfileDetailScreen';

//

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PrevHome">
        <Stack.Screen
          name="PrevHome"
          component={PrevHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabNavigationHome"
          component={TabNavigationHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
          options={{
            headerTitle: 'Create post',
            headerStyle: {
              borderBottomColor: '#e2e4e7',
              borderBottomWidth: 1,
            },
          }}
        />

        <Stack.Group
          screenOptions={{
            presentation: 'modal',

            // gestureDirection: 'vertical',
          }}
        >
          <Stack.Screen
            name="Comment"
            component={CommentScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Reaction"
            component={ReactionScreen}
            options={{
              // gestureDirection: 'vertical',
              title: 'Reactions',
              cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
            }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerTitleAlign: 'center',
              title: 'Nguyễn Đông',
            }}
          />
          <Stack.Screen
          name='ListAllFriend'
          component={ListAllFriendScreen}
          options={{
            title:"Đông",
          }}
          headerStyle={{
            elevation: 10
          }}
          />
          <Stack.Screen
          name='EditProfile'
          component={EditProfileScreen}
          options={{
            title:"Edit personal page"
          }}  
          />
          <Stack.Screen
          name='EditProfileDetail'
          component={EditProfileDetailScreen}
          options={{
            title:"Edit detail"
          }}  
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  checkmarkContainer:{
    alignItems:"center",
    marginRight: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

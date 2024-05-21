import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
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
import EditDescriptionScreen from './screens/EditDescriptionScreen';

//context
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from './context/AuthContext.js';

import { Provider as FriendProvider } from './context/FriendContext.js';
import { Provider as PostProvider } from './context/PostContext.js';
import { Provider as AccountProvider } from './context/AccountContext.js';
import { useContext } from 'react';
import SharePostScreen from './screens/SharePostScreen.js';

const Stack = createStackNavigator();

export default function Navigation() {
  const { state } = useContext(AuthContext);

  return (
    <AccountProvider>
      <PostProvider>
        <FriendProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="PrevHome">
              {state.token != null ? (
                <>
                  <Stack.Screen
                    name="LoginLoading"
                    component={PrevHomeScreen}
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

                  <Stack.Screen
                    name="SharePost"
                    component={SharePostScreen}
                    options={{
                      headerTitle: 'Share post',
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
                        cardStyleInterpolator:
                          CardStyleInterpolators.forFadeFromCenter,
                      }}
                    />
                    <Stack.Screen
                      name="Profile"
                      component={ProfileScreen}
                      options={{
                        headerTitleAlign: 'center',
                      }}
                    />
                    <Stack.Screen
                      name="ListAllFriend"
                      component={ListAllFriendScreen}
                      options={{
                        title: 'All Friends',
                      }}
                      headerStyle={{
                        elevation: 10,
                      }}
                    />
                    <Stack.Screen
                      name="EditProfile"
                      component={EditProfileScreen}
                      options={{
                        title: 'Edit personal page',
                      }}
                    />
                    <Stack.Screen
                      name="EditProfileDetail"
                      component={EditProfileDetailScreen}
                      options={{
                        title: 'Edit detail',
                      }}
                    />
                    <Stack.Screen
                      name="EditDescription"
                      component={EditDescriptionScreen}
                      options={{
                        title: 'Edit description',
                        headerRight: () => (
                          <Text
                            style={{
                              color: '#2f68c4',
                              marginRight: 10,
                              fontSize: 18,
                            }}
                          >
                            Save
                          </Text>
                        ),
                      }}
                    />
                  </Stack.Group>
                </>
              ) : (
                <>
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
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </FriendProvider>
      </PostProvider>
    </AccountProvider>
  );
}

const styles = StyleSheet.create({
  checkmarkContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

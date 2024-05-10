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
import notificationList from '../data/notification.json'
// import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import Notification from '../components/Notification';

export default function NotificationScreen({ navigation }) {

  return (
    <View style={styles.container}>
      
      <FlatList
      data={notificationList}
      renderItem={({item})=>(
        <Notification navigation={navigation} item={item} key={item.id}/>
      )}
      ListHeaderComponent={()=>(
        <Text style={{fontSize: 18, fontWeight: "bold", margin: 9}}>Notifications</Text>
      )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});

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
  RefreshControl
} from 'react-native';

import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  Fontisto,
  Entypo,
} from '@expo/vector-icons';
import React, { useState, useEffect, useContext, useCallback } from "react";
// import notificationList from '../data/dataNotify.json'
// import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import Notification from '../components/Notification';

import { Context as AccountContext } from "../context/AccountContext";
import {getNotificationByAccount} from "../service/NotificationService"
import { useFocusEffect } from '@react-navigation/native';
export default function NotificationScreen({ navigation }) {
  const [notificationList, setNotificationList] = useState(null)
  const { state } = useContext(AccountContext);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await getNotificationByAccount(state.account.id)
      setNotificationList(response)
    }
    fetchData()
  }, [refreshing])

  const handleDeleteNotification = (id) => {
    setNotificationList((prevList) => prevList.filter((item) => item.id !== id));
  };
  return (
    <View 
      style={styles.container}>
      <Text style={{fontSize: 24, fontWeight: "bold", margin: 9}}>Notifications</Text>
      <FlatList
      data={notificationList}
      renderItem={({item})=>(
        <Notification navigation={navigation} item={item} key={item.id} onDelete={handleDeleteNotification}/>
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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

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

import { useState, useEffect } from 'react';

// Upload image
import * as ImagePicker from 'expo-image-picker';

export default function CreatePostScreen({ navigation }) {
  const [textPost, setTextPost] = useState('');
  const [imagePost, setImagePost] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  // image
  const pickImage = async () => {
    // no permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      //   setImagePost(result.assets[0].uri);
    }
  };
  //

  useEffect(() => {
    if (textPost) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  }, [textPost]);

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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 8,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../assets/messi.jpg')}
              style={{ width: 60, height: 60, borderRadius: 100 }}
            />
            <View style={{ marginLeft: 8 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                Nguyễn Đông
              </Text>
              <Text
                style={{ fontSize: 18, fontWeight: '500', color: '#0866ff' }}
              >
                Public
              </Text>
            </View>
          </View>

          <View>
            <Button title="Post" color="#0866ff" disabled={!isSubmit} />
          </View>
        </View>
        <View style={{ marginTop: 16, padding: 8 }}>
          <TextInput
            style={{
              color: '#050505',
              textAlignVertical: 'top',
              fontSize: 26,
            }}
            value={textPost}
            onChangeText={setTextPost}
            blurOnSubmit={true}
            autoFocus={true}
            multiline
            numberOfLines={5}
            placeholder="What are you thinking?"
          />
        </View>

        {imagePost && (
          <View>
            <Image
              source={{ uri: imagePost }}
              style={{ width: 100, height: 100 }}
            />
          </View>
        )}

        <View>
          <TouchableOpacity
            style={styles.optionButtonContainer}
            onPress={() => {
              pickImage();
            }}
          >
            <FontAwesome6 name="image" size={24} color="#45bd62" />
            <Text style={styles.textOptionButton}>Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButtonContainer}
            onPress={() => {}}
          >
            <Ionicons name="person-add" size={24} color="#0866ff" />
            <Text style={styles.textOptionButton}>Tag other people</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButtonContainer}
            onPress={() => {}}
          >
            <MaterialIcons name="add-reaction" size={24} color="#f7bb2d" />
            <Text style={styles.textOptionButton}>Reaction</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButtonContainer}
            onPress={() => {}}
          >
            <Ionicons name="text" size={24} color="#2abba7" />
            <Text style={styles.textOptionButton}>Background Color</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButtonContainer}
            onPress={() => {}}
          >
            <Entypo name="camera" size={24} color="#0866ff" />
            <Text style={styles.textOptionButton}>Camera</Text>
          </TouchableOpacity>
        </View>
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
    paddingBottom: 8,
  },
  //
  optionButtonContainer: {
    flexDirection: 'row',
    borderTopColor: '#e2e4e7',
    borderTopWidth: 1,
    padding: 8,
  },
  textOptionButton: {
    color: '#65676b',
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 12,
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

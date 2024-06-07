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
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useState, useEffect, useContext } from "react";

//
import { Context as AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get("window"),
  });

  const { signIn } = useContext(AuthContext);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions({ window });
    });
    return () => subscription?.remove();
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Reset state when screen gets focused again
      setEmail("");
      setPassword("");
      setShowPassword(false);
      setErrors({});
    });

    return unsubscribe;
  }, [navigation]);

  const { window } = dimensions;
  const windowWidth = window.width;
  const windowHeight = window.height;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    let newErrors = {};

    // Kiểm tra email
    if (!email) {
      newErrors["emailError"] = "Username cannot be empty";
    }

    // Kiểm tra mật khẩu
    if (!password) {
      newErrors["passwordEmptyError"] = "Password cannot be empty";
    }

    // Nếu có lỗi, hiển thị chúng
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Nếu không có lỗi, xóa tất cả các lỗi hiện tại
      setErrors({});
      signIn({ email, password }, navigation);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        behavior="padding"
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // https://stackoverflow.com/questions/29685421/hide-keyboard-in-react-native
        >
          <View
            style={{
              marginTop: 100,
              height: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/facebook-logo.png")}
              style={styles.imageFruit}
              alt="Facebook logo"
            />
          </View>

          <View style={styles.form}>
            <Text style={styles.textTitle}>Login</Text>

            <Text style={styles.labelForm}>Username</Text>
            <TextInput
              style={styles.inputEmail}
              value={email}
              //   onChangeText={setEmail}
              onChangeText={(text) => {
                setEmail(text);
                // Xóa thông báo lỗi khi người dùng thay đổi nội dung
                if (errors["emailError"]) {
                  setErrors({ ...errors, emailError: null });
                }
              }}
              placeholder="Enter your username"
            />
            {errors["emailError"] ? (
              <Text style={styles.errorText}>{errors["emailError"]}</Text>
            ) : null}

            <Text style={styles.labelForm}>Password</Text>
            <View style={[styles.passwordContainer]}>
              <TextInput
                style={styles.inputPassword}
                secureTextEntry={!showPassword}
                value={password}
                // onChangeText={setPassword}
                onChangeText={(text) => {
                  setPassword(text);
                  // Xóa thông báo lỗi khi người dùng thay đổi nội dung
                  if (errors["passwordEmptyError"]) {
                    setErrors({ ...errors, passwordEmptyError: null });
                  }
                }}
                placeholder="Enter your password"
              />
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#aaa"
                style={styles.icon}
                onPress={toggleShowPassword}
              />
            </View>

            {errors["passwordEmptyError"] ? (
              <Text style={styles.errorText}>
                {errors["passwordEmptyError"]}
              </Text>
            ) : null}
            
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleRegister()}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: 16 }}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.createAccount}>
                Do you have any account yet?
              </Text>
              <Text style={styles.createAccount}>Register Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  imageFruit: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    // alignSelf: 'center',
    backgroundColor: "white",
  },
  textTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    maxWidth: "100%",
    minWidth: "100%",
    backgroundColor: "white",
    padding: 20,
    // borderRadius: 10,
    // shadowColor: 'black',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  labelForm: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    marginTop: 15,
  },
  inputEmail: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    // marginBottom: 15,
    paddingHorizontal: 16,
    borderRadius: 16,
  },

  inputPassword: {
    maxWidth: "90%",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    // marginBottom: 15,
    // padding: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  forgotPassword: {
    textAlign: "right",
    color: "#0866ff",
    fontWeight: "bold",
    padding: 10,
    marginBottom: 10,
  },
  createAccount: {
    textAlign: "center",
    color: "#0866ff",
    fontWeight: "bold",
  },
  btnSignIn: {
    borderRadius: 20,
  },

  button: {
    backgroundColor: "#0866ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    marginTop: 8,
    color: "red",
  },
});

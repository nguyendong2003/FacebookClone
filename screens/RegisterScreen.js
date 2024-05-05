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
  Keyboard,
} from 'react-native';

import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';

import { useState, useEffect } from 'react';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');

  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // pick date
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDateOfBirth = (event, selectedDate) => {
    setShowDatePicker(false); // Ẩn DateTimePicker sau khi chọn hoặc hủy bỏ
    if (event.type === 'set' && selectedDate) {
      // Nếu người dùng chọn ngày và nhấn OK
      setDateOfBirth(selectedDate); // Cập nhật ngày sinh mới
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const formatNumber = (number) => {
    return number < 10 ? '0' + number : number;
  };
  //
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     // Reset state when screen gets focused again
  //     setEmail('');
  //     setFullName('');
  //     setPassword('');
  //     setConfirmPassword('');
  //     setShowPassword(false);
  //     setShowConfirmPassword(false);
  //     setErrors({});
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  useEffect(() => {
    // Tính toán ngày 18 năm trước
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    // Đặt thời gian ban đầu cho dateOfBirth
    setDateOfBirth(eighteenYearsAgo);
  }, []);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegister = () => {
    let newErrors = {};

    // Kiểm tra email
    if (!email) {
      newErrors['emailError'] = 'Email address cannot be empty';
    }

    // Kiểm tra full name
    if (!fullName) {
      newErrors['fullNameError'] = 'Full name cannot be empty';
    }

    // Kiểm tra date of birth
    if (dateOfBirth > new Date()) {
      newErrors['dateOfBirthError'] = 'Date of birth cannot be in the future';
    } else {
      const today = new Date();
      const eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      if (dateOfBirth > eighteenYearsAgo) {
        newErrors['dateOfBirthError'] = 'You must be at least 18 years old';
      }
    }

    // Kiểm tra gender
    if (!gender) {
      newErrors['genderError'] = 'Gender cannot be empty';
    }

    // Kiểm tra mật khẩu
    if (!password) {
      newErrors['passwordEmptyError'] = 'Password cannot be empty';
    }
    if (!confirmPassword) {
      newErrors['confirmPasswordEmptyError'] =
        'Confirm Password cannot be empty';
    }
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors['passwordMismatchError'] =
        'Password and Confirm Password do not match';
    }

    // Nếu có lỗi, hiển thị chúng
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Nếu không có lỗi, xóa tất cả các lỗi hiện tại
      setErrors({});
      alert('Register successfully');
      navigation.navigate('Login');
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
              marginTop: 50,
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={require('../assets/facebook-logo.png')}
              style={styles.imageFruit}
              alt="Facebook logo"
            />
          </View>
          <View style={styles.form}>
            <Text style={styles.textTitle}>Create an account</Text>

            <Text style={styles.labelForm}>Email address</Text>
            <TextInput
              style={styles.inputEmail}
              value={email}
              //   onChangeText={setEmail}
              onChangeText={(text) => {
                setEmail(text);
                // Xóa thông báo lỗi khi người dùng thay đổi nội dung
                if (errors['emailError']) {
                  setErrors({ ...errors, emailError: null });
                }
              }}
              placeholder="Enter your email address"
            />
            {errors['emailError'] ? (
              <Text style={styles.errorText}>{errors['emailError']}</Text>
            ) : null}

            <Text style={styles.labelForm}>Full name</Text>
            <TextInput
              style={styles.inputEmail}
              value={fullName}
              //   onChangeText={setEmail}
              onChangeText={(text) => {
                setFullName(text);
                // Xóa thông báo lỗi khi người dùng thay đổi nội dung
                if (errors['fullNameError']) {
                  setErrors({ ...errors, fullNameError: null });
                }
              }}
              placeholder="Enter your full name"
            />
            {errors['fullNameError'] ? (
              <Text style={styles.errorText}>{errors['fullNameError']}</Text>
            ) : null}

            <Text style={styles.labelForm}>Date of birth</Text>
            <TouchableOpacity onPress={toggleDatePicker}>
              <View style={[styles.fieldContainer]}>
                <Text>
                  {dateOfBirth
                    ? formatNumber(dateOfBirth.getDate()) +
                      '/' +
                      formatNumber(dateOfBirth.getMonth() + 1) +
                      '/' +
                      dateOfBirth.getFullYear()
                    : 'Select your date of birth'}
                </Text>
                <FontAwesome name="calendar" size={24} color="#0866ff" />
                {showDatePicker && (
                  <DateTimePicker
                    value={dateOfBirth || new Date()}
                    mode={'date'}
                    is24Hour={true}
                    full="default"
                    onChange={onChangeDateOfBirth}
                  />
                )}
              </View>
            </TouchableOpacity>
            {errors['dateOfBirthError'] ? (
              <Text style={styles.errorText}>{errors['dateOfBirthError']}</Text>
            ) : null}

            <Text style={styles.labelForm}>Gender</Text>
            <View style={styles.radioGroup}>
              <View style={styles.radioButton}>
                <RadioButton
                  value="male"
                  status={gender === 'male' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setGender('male');
                    // Xóa thông báo lỗi khi người dùng chọn giới tính
                    if (errors['genderError']) {
                      setErrors({ ...errors, genderError: null });
                    }
                  }}
                  color="#007BFF"
                />
                <Text style={styles.radioLabel}>Male</Text>
              </View>

              <View style={styles.radioButton}>
                <RadioButton
                  value="female"
                  status={gender === 'female' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setGender('female');
                    // Xóa thông báo lỗi khi người dùng chọn giới tính
                    if (errors['genderError']) {
                      setErrors({ ...errors, genderError: null });
                    }
                  }}
                  color="#007BFF"
                />
                <Text style={styles.radioLabel}>Female</Text>
              </View>

              <View style={styles.radioButton}>
                <RadioButton
                  value="no"
                  status={gender === 'other' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setGender('other');
                    // Xóa thông báo lỗi khi người dùng chọn giới tính
                    if (errors['genderError']) {
                      setErrors({ ...errors, genderError: null });
                    }
                  }}
                  color="#007BFF"
                />
                <Text style={styles.radioLabel}>Other option</Text>
              </View>
            </View>

            {errors['genderError'] ? (
              <Text style={styles.errorText}>{errors['genderError']}</Text>
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
                  if (errors['passwordEmptyError']) {
                    setErrors({ ...errors, passwordEmptyError: null });
                  }
                }}
                placeholder="Enter your password"
              />
              <MaterialCommunityIcons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#aaa"
                style={styles.icon}
                onPress={toggleShowPassword}
              />
            </View>

            {errors['passwordEmptyError'] ? (
              <Text style={styles.errorText}>
                {errors['passwordEmptyError']}
              </Text>
            ) : null}

            <Text style={styles.labelForm}>Confirm password</Text>
            <View style={[styles.passwordContainer]}>
              <TextInput
                style={styles.inputPassword}
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                // onChangeText={setConfirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);

                  // Xóa thông báo lỗi khi người dùng thay đổi nội dung
                  if (errors['confirmPasswordEmptyError']) {
                    setErrors({ ...errors, confirmPasswordEmptyError: null });
                  }
                  if (errors['passwordMismatchError']) {
                    setErrors({ ...errors, passwordMismatchError: null });
                  }
                }}
                placeholder="Enter your confirm password"
              />
              <MaterialCommunityIcons
                name={showConfirmPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#aaa"
                style={styles.icon}
                onPress={toggleShowConfirmPassword}
              />
            </View>

            {errors['confirmPasswordEmptyError'] ? (
              <Text style={styles.errorText}>
                {errors['confirmPasswordEmptyError']}
              </Text>
            ) : null}

            {errors['passwordMismatchError'] ? (
              <Text style={styles.errorText}>
                {errors['passwordMismatchError']}
              </Text>
            ) : null}

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                // Keyboard.dismiss();
                handleRegister();
              }}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: 16 }}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.createAccount}>
                Already have any account yet?
              </Text>
              <Text style={styles.createAccount}>Login Now</Text>
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
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  imageFruit: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    // alignSelf: 'center',
    backgroundColor: 'white',
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    maxWidth: '100%',
    minWidth: '100%',
    backgroundColor: 'white',
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
    fontWeight: 'bold',
    marginTop: 15,
  },
  inputEmail: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    // marginBottom: 15,
    paddingHorizontal: 16,
    borderRadius: 16,
  },

  inputPassword: {
    maxWidth: '90%',
  },

  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    // marginBottom: 15,
    // padding: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    // marginBottom: 15,
    // padding: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#0866ff',
    fontWeight: 'bold',
    padding: 10,
    marginBottom: 10,
  },
  createAccount: {
    textAlign: 'center',
    color: '#0866ff',
    fontWeight: 'bold',
  },
  btnSignIn: {
    borderRadius: 20,
  },

  button: {
    backgroundColor: '#0866ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    marginTop: 8,
    color: 'red',
  },
  // radio button
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // marginTop: 20,
    // borderRadius: 8,
    backgroundColor: 'white',
    // padding: 16,
    // elevation: 4,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    // marginLeft: 4,
    fontSize: 16,
    color: '#333',
  },
});

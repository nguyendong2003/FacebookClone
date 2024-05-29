import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, StyleSheet, View, TextInput, Pressable } from "react-native";
import { useRef, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useContext } from "react";
import { Context as AccountContext } from "../context/AccountContext";

export default function EditProfileDetailScreen({ navigation, route }) {
    const { state: accountState, updateDetail } = useContext(AccountContext);
  
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [cityCurrent, setCityCurrent] = useState(accountState.account.live_at);
  const [homeTown, setHomeTown] = useState(accountState.account.come_from);
  const inputRefCity = useRef();
  const inputRefHomeTown = useRef();


  const changeCityCurrent = (newText) => {
    setCityCurrent(newText);
  };

  const changeHomeTown = (newText) => {
    setHomeTown(newText);
  };

  const pickDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowCalendar(false);
  };

  const updateDetailHandler = async () => {
    const data = {
      from: homeTown,
      address: cityCurrent,
      birthdate: date.toISOString().slice(0, 10)
    };
    try {
      updateDetail(data);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.seperate,
          {
            marginBottom: 5,
            backgroundColor: "black",
            marginLeft: 0,
            marginRight: 0,
          },
        ]}
      />
      <Text style={styles.title}>Province/City current</Text>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRefCity}
          style={styles.textInput}
          value={cityCurrent}
          placeholder="Enter something new!"
          onChangeText={changeCityCurrent}
        />
        <MaterialCommunityIcons
          onPress={() => inputRefCity.current.focus()}
          name="pencil"
          size={24}
          color="black"
        />
      </View>
      <View style={[styles.seperate]} />
      <Text style={styles.title}>Home Town</Text>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRefHomeTown}
          style={styles.textInput}
          value={homeTown}
          placeholder="Enter something new!"
          onChangeText={changeHomeTown}
        />
        <MaterialCommunityIcons
          onPress={() => inputRefHomeTown.current.focus()}
          name="pencil"
          size={24}
          color="black"
        />
      </View>
      <View style={[styles.seperate]} />
      <Text style={styles.title}>Birthday</Text>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.textInput}>{date.toLocaleDateString()}</Text>
        <Entypo
          onPress={() => setShowCalendar(true)}
          name="calendar"
          size={24}
          color="black"
        />
      </View>
      <View style={styles.seperate}></View>
      {showCalendar ? (
        <DateTimePicker
          testID="dateTimePicker"
          display="spinner"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={pickDate}
          maximumDate={new Date()}
        />
      ) : null}
      <TouchableOpacity style={styles.button} onPress={updateDetailHandler}>
        <Text style={styles.text}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
  },
  button: {
    backgroundColor: "lightblue",
    padding: 11,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 30,
    alignItems: "center",
  },
  dateTimeContainer: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 17,
    padding: 6,
    fontWeight: "bold",
  },
  seperate: {
    padding: 0.5,
    backgroundColor: "#C0C0C0",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

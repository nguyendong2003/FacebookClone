import { ScrollView, Text, View, StyleSheet, Image, TextInput, Pressable } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Context as AccountContext } from "../context/AccountContext";

export default function EditProfileScreen(
    route
){
    const { state: accountState } = useContext(AccountContext);

    const navigation = useNavigation()
    const handleModifyDescription = () =>{
        navigation.navigate('EditDescription');
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.seperate}></View>
            <View style={styles.description}>
                <View style={styles.titleContainer}>
                    <Text style={styles.Text}>Description</Text>
                    <Text onPress={handleModifyDescription} style= {[styles.Text, {color: "#87a6e6", fontWeight: "normal", fontSize: 18}]}>Modify</Text>
                </View>
            </View>
            <View style={styles.textInputContainer}>
                <TextInput
                placeholder="Enter description"
                value={accountState.account.description}
                />
            </View>
            <View style={styles.seperate}></View>
            <View style={styles.titleContainer}>
                <Text style={styles.Text}>Detail</Text>
                <Pressable
                onPress={() => navigation.navigate('EditProfileDetail')}
                >
                    <Text style={[styles.Text, {color: "#87a6e6", fontWeight: "normal", fontSize: 18}]}>Modify</Text>
                </Pressable>
            </View>

            <View style={styles.rowInformation}>
                <Ionicons name="location-sharp" size={20} color="black" />
                <Text style={[styles.textInformation, {marginLeft: 10}]}>
                    Lived at <Text style={[styles.textInformation,{fontWeight: "bold"}]}>{accountState.account.live_at}</Text>
                </Text>
            </View>
            <View style={styles.rowInformation}>
                <FontAwesome name="home" size={20} color="black" />
                <Text style={[styles.textInformation, {marginLeft: 10}]}>
                    Home at <Text style={[styles.textInformation,{fontWeight: "bold"}]}>{accountState.account.come_from}</Text>
                </Text>
            </View>
            <View style={styles.rowInformation}>
                <FontAwesome name="birthday-cake" size={20} color="black" />
                <Text style={[styles.textInformation, {marginLeft: 10}]}>
                    Birthday on <Text style={[styles.textInformation,{fontWeight: "bold"}]}>{accountState.account.birth_date}</Text>
                </Text>
            </View>
            <View style={styles.rowInformation}>
                <FontAwesome5 name="clock" size={20} color="black" />
                <Text style={[styles.textInformation, {marginLeft: 10}]}>
                    Participate on <Text style={[styles.textInformation,{fontWeight: "bold"}]}>{accountState.account.create_time}</Text>
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    textInformation:{ 
        textAlign:"center", 
        justifyContent: "center", 
        fontSize: 16,
    },
    rowInformation:{
        flexDirection: "row",
        margin: 5
    },
    informationContainer:{
        flexDirection:"column"
    },
    textInputContainer:{
        marginLeft: 8,
        marginRight: 8,
        alignItems:"center"
    },
    coverPhoTo:{
        width: "100%",
        height: 210,
        borderRadius: 10,
        margin: 8
    },
    coverPhotoContainer:{
        alignItems:"center",
        margin: 10
    },
    avatarContainer:{
        // justifyContent:"center",
        alignItems:"center",
        padding: 10
    },
    avatar:{
        width:140,
        height:140,
        borderRadius:100
    },
    container: {
        flexDirection:"column",
        backgroundColor:"white"
    },
    titleContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center"
    },
    Text:{
        fontSize: 20,
        fontWeight: "bold",
        margin: 8
    },
    seperate:{
        padding: 0.5,
        backgroundColor:"#C0C0C0",
        margin: 8
    }
})
import {Image, View, Text, StyleSheet,TouchableOpacity } from "react-native";
import listFriendProfile from '../data/listFriendProfile.json'


export default function FriendProfile({
    item
})
{

    return (

        <TouchableOpacity 
        style={styles.friendContainer}
        onPress={() => alert(`Ouch!! you touch ${item.name}'s pumpkin :<`)}
        >
            <Image 
                style={styles.friendAvatar}
                source={{uri: item?.avatar}}
            />
            <Text style={styles.friendName}>{item.name}</Text>
        </TouchableOpacity>

        
    )

}

const styles = StyleSheet.create({
    friendContainer:{
        flexDirection:"column",
        justifyContent: "flex-start",
        margin: 10,
        flex: 1
    },
    friendAvatar: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
        resizeMode:"cover"
        // width: "30%"
    },
    friendName: {
        fontSize: 15
    }
})
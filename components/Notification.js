import { Image ,View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Notification(
    {navigation, item}
){

    const [isRead, setIsRead] = useState(false)

    return(
        <View style={[styles.container, {backgroundColor : isRead? "white": "#e9f2f7"}]}>
            <TouchableOpacity 
            style={styles.notifyContainer}
            onPress={()=> {
                setIsRead(true)
                navigation.navigate("PostDetail", {postId: 1, title: "Nguyễn Đông",})
            }}
            >
                <View>
                    <Image
                        style={styles.avartarNotify}
                        source={{uri: item?.avatar}}
                    />
                    <View style={styles.commentIconContainer}>
                        <MaterialCommunityIcons name="message" size={14} color="white" />
                    </View>
                    
                </View>
                <View style={styles.contentContainer}>
                    <Text numberOfLines={3} style={styles.titleNotification}>{item.title}</Text>
                    <Text style={styles.dateNotfication}>{item.date}</Text>                    
                </View>
            </TouchableOpacity>
        </View>
        
    );
}

const styles = StyleSheet.create({
    commentIconContainer:{
        backgroundColor: "green",
        width: 24,
        height: 24,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:20,
        position: "absolute",
        bottom: 0,
        right: 0
    },
    container: {
        flex: 1,
        justifyContent:"center"
        // "#CAE5E8"
    },
    notifyContainer: {
        flexDirection: "row",
        // backgroundColor:"lightblue",
        padding: 0,
        marginBottom:5,
        marginTop: 5,
        marginLeft: 10,
        marginRight: 70
    },
    avartarNotify: {
        width: 75,
        height: 75,
        borderRadius: 100,
        // margin: 10
    },
    contentContainer: {
        flexDirection:"column",
        justifyContent: "center",
        // flexWrap: "wrap"
    },
    titleNotification: {
        fontSize: 18,
        flexWrap: "wrap",
        marginLeft: 10,
        marginRight: 10
    },
    dateNotfication:{
        marginLeft: 10
    },
    titleContainer:{
        flexWrap: "wrap"
    }
})
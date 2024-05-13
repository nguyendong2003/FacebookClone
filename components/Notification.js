import { Image ,View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useState } from "react";

export default function Notification(
    {navigation, item}
){

    const [isRead, setIsRead] = useState(false)

    return(
        <View style={[styles.container, {backgroundColor : isRead? "white": "#CAE5E8"}]}>
            <TouchableOpacity 
            style={styles.notifyContainer}
            onPress={()=> setIsRead(true)}
            >
                <Image
                    style={styles.avartarNotify}
                    source={{uri: item?.avatar}}
                />
                <View style={styles.contentContainer}>
                    <Text numberOfLines={3} style={styles.titleNotification}>{item.title}</Text>
                    <Text style={styles.dateNotfication}>{item.date}</Text>                    
                </View>
            </TouchableOpacity>
        </View>
        
    );
}

const styles = StyleSheet.create({
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
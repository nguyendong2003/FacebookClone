import { Image ,View, Text, StyleSheet, TouchableOpacity } from "react-native"


export default function Notification(
    {navigation, item}
){
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.notifyContainer}>
                <Image
                    style={styles.avartarNotify}
                    source={{uri: item?.avatar}}
                />
                <View style={styles.contentContainer}>
                    <Text style={styles.titleNotification}>{item.title}</Text>
                    <Text style={styles.dateNotfication}>{item.date}</Text>                    
                </View>
            </TouchableOpacity>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor :"white"
    },
    notifyContainer: {
        flexDirection: "row",
        // backgroundColor:"lightblue",
        padding: 0,
        marginBottom:10,
        marginLeft: 10,
        marginRight: 70
    },
    avartarNotify: {
        width: 65,
        height: 65,
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
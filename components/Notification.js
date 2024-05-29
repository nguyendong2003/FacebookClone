import { Image ,View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import B from "../components/B";

export default function Notification(
    {navigation, item}
){

    const [isRead, setIsRead] = useState(item._read)
    const [type, setType] = useState(item.type)

    const text = item.content;
    const parts = text.split("</B>");
    const user = parts[0].replace("<B>", "");
    const rest = parts[1];
    //Sorry, CARE, comment, LOVE, LIKE, ANGRY, WOW
    const renderIcon = (type)=> {
        switch(type){
            case"CARE":
                return (<Image style={{width:24, height:24}} source={require('../iconfb/care.png')}/>)
                break;
            case "comment":
                return (<MaterialCommunityIcons name="message" size={16} color="white" />)
                break;
            case "LOVE":
                return (<Image style={{width:24, height:24}} source={require('../iconfb/love.png')}/>)
                break;
            case "LIKE":
                return (<Image style={{width:24, height:24}} source={require('../iconfb/like.png')}/>)
                break;
            case "ANGRY":
                return (<Image style={{width:24, height:24}} source={require('../iconfb/angry.png')}/>)
                break;
            case "WOW":
                return (<Image style={{width:24, height:24}} source={require('../iconfb/wow.png')}/>)
                break;
            case "SORRY":
                return (<Image style={{width:24, height:24}} source={require('../iconfb/sad.png')}/>)
                break;
            default:
                break;
        }
    }

    const remainTime = (time)=> {
        const currentTime = new Date().getTime();
        const timePost = new Date(time).getTime();
        const remain = currentTime - timePost;
        const remainSecond = remain/1000;
        const remainMinute = remainSecond/60;
        const remainHour = remainMinute/60;
        const remainDay = remainHour/24;
        if(remainSecond < 60){
            return Math.floor(remainSecond) + " seconds ago";
        }else if(remainMinute < 60){
            return Math.floor(remainMinute) + " minutes ago";
        }else if(remainHour < 24){
            return Math.floor(remainHour) + " hours ago";
        }else{
            return Math.floor(remainDay) + " days ago";
        }
    }

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
                        source={{uri: item?.avatar_sender}}
                    />
                    <View style={styles.commentIconContainer}>
                        {renderIcon(item.type)}
                    </View>
                    
                </View>
                <View style={styles.contentContainer}>
                    <Text numberOfLines={3} style={styles.titleNotification}><B>{user}</B> {rest}</Text>
                    <Text style={styles.dateNotfication}>{remainTime(item.create_time)}</Text>                    
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
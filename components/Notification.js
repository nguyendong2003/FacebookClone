import { Image ,View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import B from "../components/B";
import {updateNotification} from "../service/NotificationService"
import {getPostOfComment} from "../service/CommentService"
import moment from "moment";
export default function Notification(
    {navigation, item}
){
    const [isRead, setIsRead] = useState(item._read)
    const [type, setType] = useState(item.type)
    const [post, setPost] = useState(null)

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
            case "HAHA":
                return (<Image style={{width:24, height:24}} source={require('../iconfb/haha.png')}/>)
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
        // const currentTime = new Date().getTime();
        // const timePost = new Date(time).getTime();
        // const remain = currentTime - timePost;
        // const remainSecond = remain/1000;
        // const remainMinute = remainSecond/60;
        // const remainHour = remainMinute/60;
        // const remainDay = remainHour/24;
        // if(remainSecond < 60){
        //     return Math.floor(remainSecond) + " seconds ago";
        // }else if(remainMinute < 60){
        //     return Math.floor(remainMinute) + " minutes ago";
        // }else if(remainHour < 24){
        //     return Math.floor(remainHour) + " hours ago";
        // }else{
        //     return Math.floor(remainDay) + " days ago";
        // }

        const createDate = new Date(time);
        const now = new Date();

        const diffInSeconds = Math.floor((now - createDate) / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInMonths = Math.floor(diffInDays / 30);
        const diffInYears = Math.floor(diffInMonths / 12);

        if (diffInYears > 0) {
            return `${diffInYears} years ago`;
        } else if (diffInMonths > 0) {
            return `${diffInMonths} months ago`;
        } else if (diffInDays > 0) {
            return `${diffInDays} days ago`;
        } else if (diffInHours > 0) {
            return `${diffInHours} hours ago`;
        } else if (diffInMinutes > 0) {
            return `${diffInMinutes} minutes ago`;
        } else {
            return "just now";
        }
    }

    const updateNotificationHandler = async() => {
        try {
            if(!isRead) {
                const response = await updateNotification(item.id)
                // console.log(response)
                setIsRead(true)
            }
        }catch(error) {
            console.log(error);
        }
    }

    const getPostOfCommentHandler = async() => {
        if(item.to_comment_post_id) {
            try {
                const responsse = await getPostOfComment(item?.to_comment_post_id)
                setPost(responsse)
            }catch(error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        getPostOfCommentHandler()
    }, [item])

    return(
        <View style={[styles.container, {backgroundColor : isRead? "white": "#e9f2f7"}]}>
            <TouchableOpacity 
            style={styles.notifyContainer}
            onPress={()=> {
                updateNotificationHandler()
                navigation.navigate("PostDetail", {postId: (item.to_post_id != null) ? item.to_post_id : post.id, commentId: item.to_comment_post_id})
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
                    <Text numberOfLines={3} style={styles.titleNotification}><B>{user}</B>{rest}</Text>
                    <Text style={styles.dateNotfication}>{moment(item?.create_time).fromNow()}</Text>                    
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
import { Image ,View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, Feather } from "react-native"
import { useEffect, useState,useContext } from "react";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import B from "../components/B";
import {deleteNotification, updateNotification} from "../service/NotificationService"
import {getPostOfComment} from "../service/CommentService"
import moment from "moment";
import { Context as PostContext } from "../context/PostContext";
import { Context as FriendContext } from '../context/FriendContext';
export default function Notification(
    {navigation, item, onDelete}
){
    
    const { state: postState, reloadPost } = useContext(PostContext);
    const [isRead, setIsRead] = useState(item._read)
    const [type, setType] = useState(item.type)
    const [isPressingMore, setIsPressingMore] = useState(false);
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
            case "SAD":
                return (<Image style={{width:24, height:24}} source={require('../iconfb/sad.png')}/>)
                break;
            case "friend_request":
                return (<Image style={{width:32, height:32}} source={require('../iconfb/friend.png')}/>)
                break;
            default:
                break;
        }
    }

    const remainTime = (time)=> {
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

    const updatePostById = async (id) => {
        await reloadPost(id);
    };

    const handleDeleteNotification = async() => {
        try {
            const response = await deleteNotification(item?.id)
            onDelete(item?.id)
        }catch(error) {
            console.log(error);
        }
    }

    const { acceptFriendRequest, getFriendRequests, rejectFriendRequest} = useContext(FriendContext);
    const acceptClickHandler = () => {
        acceptFriendRequest(item?.sender_id).then(() => {
            handleDeleteNotification()
        });
    }

    const rejectClickHandler = () => {
        rejectFriendRequest(item?.sender_id).then(() => {
            handleDeleteNotification()
        }
    )};
    return(
        <View style={[styles.container, {backgroundColor : isRead? "white": "#e9f2f7"}]}>
            <TouchableOpacity 
            style={styles.notifyContainer}
            onPress={()=> {
                updateNotificationHandler()
                if(item.type == "friend_request") {
                    navigation.navigate("Friend")
                }else {
                    navigation.navigate("PostDetail", {postId: item.to_post_id, commentId: item.send_comment_id, senderId: item.sender_id, nameSender: item.name_sender})
                }
            }}
            >
                <View>
                    <Image
                        style={styles.avartarNotify}
                        source={ item.avatar_sender? {uri: item.avatar_sender}: require("../assets/defaultProfilePicture.jpg")}
                    />
                    <View style={styles.commentIconContainer}>
                        {renderIcon(item.type)}
                    </View>
                    
                </View>
                <View style={styles.contentContainer}>
                    <Text numberOfLines={3} style={styles.titleNotification}><B>{user}</B>{rest}</Text>
                    <Text style={styles.dateNotfication}>{moment(item?.create_time).fromNow()}</Text>          
                    {item.type == "friend_request" && 
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginHorizontal: 8,
                            marginTop: 8,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                backgroundColor: '#0866ff',
                                padding: 6,
                                borderRadius: 8,
                            }}
                            onPress={acceptClickHandler}
                        >
                            <Text
                            style={{
                                fontSize: 16,
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: '500',
                            }}
                            >
                            Accept
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                            flex: 1,
                            backgroundColor: '#e4e6eb',
                            padding: 6,
                            borderRadius: 8,
                            marginLeft: 8,
                            }}
                            onPress={rejectClickHandler}
                        >
                            <Text
                            style={{
                                fontSize: 16,
                                color: '#050505',
                                textAlign: 'center',
                                fontWeight: '500'
                            }}
                            >
                            Delete
                            </Text>
                        </TouchableOpacity>
                    </View>
                    }          
                </View>

                <View style = {{
                    flexDirection:'column',
                    justifyContent: 'center',
                }}>
                    <TouchableOpacity
                        style={{
                            padding: 8,
                        }}
                        onPress={() => setIsPressingMore(!isPressingMore)}
                        >
                        <MaterialIcons name="more-horiz" size={24} color="#65676B" />
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isPressingMore}
                    onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                    setIsPressingMore(!isPressingMore);
                    }}
                >
                    <View
                    style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        alignItems: "center",
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                    >
                    <Pressable
                        style={{
                        height: "75%",
                        width: "100%",
                        }}
                        onPress={() => setIsPressingMore(false)}
                    />
                    <View
                        style={{
                        height: "25%",
                        width: "100%",
                        backgroundColor: "white",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        padding: 20,
                        }}
                    >
                        <View style = {{
                            flexDirection: "column",
                            alignItems: "center",
                        }}>
                            <View>
                                <Image
                                    style={styles.avartarNotify}
                                    source={{uri: item?.avatar_sender}}
                                />
                                <View style={styles.commentIconContainer}>
                                    {renderIcon(item.type)}
                                </View>
                            
                            </View>
                            <View style = {{
                                marginTop: 5,
                                marginBottom: 10
                            }}>
                                <Text numberOfLines={3} style={styles.titleNotification}>{user}{rest}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                paddingVertical: 12,
                                borderTopColor: "#ccc",
                                borderTopWidth: 1,
                            }}
                            onPress={handleDeleteNotification}
                            >
                            <View style = {{
                                width: 40,
                                height: 40,
                                borderRadius: 32,
                                backgroundColor: "#e4e6eb",
                                justifyContent: "center",
                                alignItems:"center"
                            }}>
                                <Image style={{width:20, height:20}} source={require('../iconfb/remove.png')}/>
                            </View> 
                            <Text
                                style={{
                                fontSize: 18,
                                color: "black",
                                fontWeight: "500",
                                marginLeft: 12,
                                }}
                            >
                            Remove this notification
                            </Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
                </Modal>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    commentIconContainer:{
        backgroundColor: "#3dca60",
        width: 24,
        height: 24,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:20,
        position: "relative",
        bottom: 20,
        left: 50,
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
        width: "85%",
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
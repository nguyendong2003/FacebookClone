import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { getPostById } from "../service/PostService";
import Post from "../components/Post";
import CommentScreen from "./CommentScreen";
import { FlatList } from "react-native";

export default function PostDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { postId, title } = route.params;
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchPost = async () => {
            const post = await getPostById(postId);
            setPost(post);
            setLoading(false); // Set loading to false after data is fetched
        };
        fetchPost();
    }, [postId]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: title || 'None',
        });
    }, [navigation, title]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.separate} />
            <CommentScreen route={{ params: { postId: postId, navigation: navigation, typeCommentScreen: "POST_DETAIL"} }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    separate: {
        padding: 0.5,
        backgroundColor: "#C0C0C0",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
});

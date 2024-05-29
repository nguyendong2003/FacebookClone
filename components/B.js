import { Text, StyleSheet } from 'react-native';

export default function B({ children }) {
    return (
        <Text style={styles.tag}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    tag: {
        fontWeight: "bold"
    }
});
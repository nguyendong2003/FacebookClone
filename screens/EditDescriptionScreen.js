import { useState } from "react"
import { Text, View, StyleSheet, TextInput } from "react-native"

export default function EditDescriptionScreen(
    navigation,
    route
){
    const [textDescription, setTextDescription] = useState("normal Description")
    const [countDigit, setCountDigit] = useState(12)

    const handleChangeText=(newText)=>{
        setTextDescription(newText)
        setCountDigit(newText.length)
    }
    return(
        <View style={styles.container}>
            <View style={styles.seperate}></View>
            <View style={styles.inputContainer}>
                <TextInput
                style={styles.textInput}
                value={textDescription}
                placeholder="Enter something new"
                onChangeText={handleChangeText}
                maxLength={101}
                multiline={true}
                />
            </View>
            <View style={styles.countDigitContainer}>
                <Text style={styles.countDigit}>{countDigit.toString()}/101</Text>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white"
    },
    seperate:{
        padding: 0.5,
        backgroundColor:"#C0C0C0",
    },
    inputContainer:{
        marginTop: 10,
        backgroundColor:"#cfd6e3",
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 20,
    },
    textInput: {
        fontSize: 16,
        padding: 15,
        // backgroundColor: "lightblue"
    },
    countDigitContainer:{
        flexDirection: "row",
        justifyContent:"flex-end",
        margin: 10
    },
    countDigit:{
        fontSize: 15
    }
})
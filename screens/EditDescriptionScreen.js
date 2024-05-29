import { useCallback, useState } from "react"
import { Text, View, StyleSheet, TextInput } from "react-native"
import React, { useLayoutEffect } from 'react';
import { useContext } from "react"
import { Context as AccountContext } from "../context/AccountContext"
import { TouchableOpacity } from "react-native-gesture-handler";
export default function EditDescriptionScreen(
    {navigation,
        route}
){

    const { state: accountState, updateDescription } = useContext(AccountContext);

    const [textDescription, setTextDescription] = useState(accountState.account.description)
    const [countDigit, setCountDigit] = useState(12)

    const handleChangeText=(newText)=>{
        setTextDescription(newText)
        setCountDigit(newText.length)
    }

    const updateDescriptionHandler = useCallback(() =>{
        const data = {
            description: textDescription
        }

        try{
            updateDescription(data)
            navigation.goBack()
        }
        catch(error){
            console.log(error)
        }
    }, [textDescription])

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={updateDescriptionHandler}>
              <Text
                style={{
                  color: '#2f68c4',
                  marginRight: 10,
                  fontSize: 18,
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          ),
        });
      }, [navigation, updateDescriptionHandler]);

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
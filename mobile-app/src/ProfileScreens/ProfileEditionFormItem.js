import { Text, View, TextInput, TouchableOpacity } from "react-native"
import { useState } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FormStyles from "../Styles/FormStyles";

export default function ProfileEditionFormItem({label, property, setProperty}) {

    const [textInputEditable, setTextInputEditable] = useState(false);

    return (
        <>
            <Text style = {FormStyles.defaultText}>{label}</Text>
            <View style = {{flexDirection: 'row'}}>
                <TextInput
                    style = {[FormStyles.textInput, {flex: 10}, !textInputEditable && FormStyles.uneditableTextInput]}
                    onChangeText = {prop => setProperty(prop)}
                    value = {property}
                    editable = {textInputEditable}
                />
                <TouchableOpacity 
                onPress = {() => setTextInputEditable(!textInputEditable)} 
                style = {[FormStyles.defaultButton, {flex: 1, marginTop: 0}]}
                >
                    <Icon name="lead-pencil" size={30} color="white"/>
                </TouchableOpacity>
            </View>
        </>
    )
}
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native"
import FormStyles from "../Styles/FormStyles"
import { useRef, useState, useEffect } from "react"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PasswordChangeForm({onSubmit, onCancel}) {

    const [error, setError] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptDisabled, setAcceptDisabled] = useState(true);

    function handleNewPasswordInput(password) {
        setNewPassword(password);
        validatePassword(password);
    }
    
    function validatePassword(password) {
        const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
        if (!validPasswordRegex.test(password)) {
          setError('Hasło musi zawierać co najmniej 8 znaków, cyfrę i znak specjalny!');
        } else {
          setError('');
        }
    }
    
    function handleConfirmPasswordInput(password) {
        setConfirmPassword(password);
        checkPasswordEquality(password);
    }

    function checkPasswordEquality(confirmPassword) {
        if (!(confirmPassword === newPassword)) {
          setError('Podane hasła nie są takie same!');
        } else {
          setError('');
        }
    }

    useEffect(() => {
        if (oldPassword && newPassword && confirmPassword && error === '') {
            setAcceptDisabled(false);
        } else {
            setAcceptDisabled(true);
        }
    }, [oldPassword, newPassword, confirmPassword])

    return (
        <View style = {FormStyles.container}>
            <Text style={[FormStyles.defaultText, {fontSize: 26, paddingBottom: 20}]}>Zmiana hasła</Text>

            <Text style = {FormStyles.defaultText}>Obecne hasło</Text>
            <TextInput
                style = {[FormStyles.textInput, {flex: 4}]}
                onChangeText = {password => setOldPassword(password)}
                value = {oldPassword}
            />

            <Text style = {FormStyles.defaultText}>Nowe hasło</Text>
            <TextInput
                style = {[FormStyles.textInput, {flex: 4}]}
                onChangeText = {password => handleNewPasswordInput(password)}
                value = {newPassword}
            />

            <Text style = {FormStyles.defaultText}>Potwierdź nowe hasło</Text>
            <TextInput
                style = {[FormStyles.textInput, {flex: 4}]}
                onChangeText = {password => handleConfirmPasswordInput(password)}
                value = {confirmPassword}
            />
            <Text style = {FormStyles.errorText}>{error}</Text>

            <View style = {{flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'}}>

                <TouchableOpacity 
                onPress = {() => onSubmit(oldPassword, newPassword)} 
                style = {[FormStyles.defaultButton, {flexDirection: 'row', width: '40%'}, acceptDisabled && {backgroundColor: '#736b68'}]}
                disabled = {acceptDisabled}
                >
                    <Icon name="check-circle" size={30} color="white" style = {{paddingRight: 10}}/>
                    <Text style = {FormStyles.defaultText}>Akceptuj</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress = {() => onCancel(false)} 
                style = {[FormStyles.defaultButton, {flexDirection: 'row', width: '40%'}]}
                >
                    <Icon name="close-circle" size={30} color="white" style = {{paddingRight: 10}}/>
                    <Text style = {FormStyles.defaultText}>Anuluj</Text>
                </TouchableOpacity>

            </View>
            
        </View>
    )
}

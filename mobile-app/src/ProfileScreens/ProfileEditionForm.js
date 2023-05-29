import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native"
import FormStyles from "../Styles/FormStyles"
import { useRef, useState, useEffect } from "react"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserDataInputValidator from "../UniversalComponents/UserDataInputValidator";
import ProfileEditionFormItem from "./ProfileEditionFormItem";

export default function ProfileEditionForm({profileData, onSubmit, onCancel}) {

    const [error, setError] = useState('');
    const [email, setEmail] = useState(profileData.email);
    const [name, setName] = useState(profileData.name);
    const [surname, setSurname] = useState(profileData.surname);
    const [phoneNumber, setPhoneNumber] = useState(profileData.phoneNumber);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptDisabled, setAcceptDisabled] = useState(true);

    function handleEmailInput(email) {
        setEmail(email);
        setError(UserDataInputValidator.validateEmail(email));
    }
    
    function handlePhoneNumberInput(phoneNumber) {
        setPhoneNumber(phoneNumber);
        setError(UserDataInputValidator.validatePhoneNumber(phoneNumber));
    }

    function checkIfNotEmpty() {
        return (email && name && surname && phoneNumber);
    }

    function checkIfChanged() {
        return (
            email !== profileData.email ||
            name !== profileData.name ||
            surname !== profileData.surname ||
            phoneNumber !== profileData.phoneNumber
        )
    }

    useEffect(() => {
        if (checkIfNotEmpty() && checkIfChanged() && error === '') {
            setAcceptDisabled(false);
        } else {
            setAcceptDisabled(true);
        }
    }, [email, name, surname, phoneNumber])

    return (
        <View style = {FormStyles.container}>
            <Text style={[FormStyles.defaultText, {fontSize: 26, paddingBottom: 20}]}>Edytuj profil</Text>

            <ProfileEditionFormItem
            label = {'Email'}
            property = {email}
            setProperty = {handleEmailInput} />

            <ProfileEditionFormItem
            label = {'Imię'}
            property = {name}
            setProperty = {setName} />

            <ProfileEditionFormItem
            label = {'Nazwisko'}
            property = {surname}
            setProperty = {setSurname} />

            <ProfileEditionFormItem
            label = {'Numer telefonu'}
            property = {phoneNumber}
            setProperty = {handlePhoneNumberInput} />
            
            <Text style = {FormStyles.errorText}>{error}</Text>

            <View style = {{flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'}}>

                <TouchableOpacity 
                onPress = {() => onSubmit(email, name, surname, phoneNumber)} 
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

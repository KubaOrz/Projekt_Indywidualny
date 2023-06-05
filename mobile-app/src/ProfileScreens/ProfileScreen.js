import { useContext, useEffect, useState } from "react"
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { AxiosContext } from "../AuthenticationScreens/AxiosContext"
import { AuthContext } from "../AuthenticationScreens/AuthContext";
import LoadingSpinner from "../UniversalComponents/LoadingSpinner";
import Alert from "../UniversalComponents/Alert";
import FormStyles from "../Styles/FormStyles";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PasswordChangeForm from "./PasswordChangeForm";
import ProfileEditionForm from "./ProfileEditionForm";
import { StackActions } from "@react-navigation/native";

export default function ProfileScreen({navigation}) {

    const {getWithRefresh, putWithRefresh} = useContext(AxiosContext);
    const {getUserDetails, updateAuthState} = useContext(AuthContext);

    const [profileData, setProfileData] = useState(null);
    const [status, setStatus] = useState('loading');

    const [showPasswordChangeForm, setShowPasswordChangeForm] = useState(false);
    const [showPasswordChangeSuccess, setShowPasswordChangeSuccess] = useState(false);
    const [showPasswordChangeError, setShowPasswordChangeError] = useState(false);

    const [showProfileEditionForm, setShowProfileEditionForm] = useState(false);
    const [showProfileEditionSuccess, setShowProfileEditionSuccess] = useState(false);
    const [showProfileEditionError, setShowProfileEditionError] = useState(false);

    function ProfileDataRow({header, text}) {
        return (
            <View style = {styles.profileDataRow}>
                <Text style = {styles.profileDataHeader}>{header}</Text>
                <Text style = {styles.profileDataText}>{text}</Text>
            </View>
        )
    }

    function getProfileIcon() {
        if (profileData.role === 'ROLE_USER') {
            return require('../../assets/user.png');
        } else {
            return require('../../assets/postman.png');
        }
    }

    async function loadProfileData() {
        const [data, error] = await getWithRefresh('/users/' + getUserDetails().email);
        if (!error) {
            setProfileData(data);
            setStatus('ok');
        } else {
            console.log(error);
            setStatus('error');
        }
    }

    async function sendPasswordChangeRequest(oldPassword, newPassword) {
        let passwordChangeRequest = {
            email: getUserDetails().email,
            oldPassword: oldPassword,
            newPassword: newPassword
        }

        const {error} = await putWithRefresh('/auth/change-password', passwordChangeRequest);
        if (!error) {
            setShowPasswordChangeSuccess(true);
        } else {
            setShowPasswordChangeError(true);
            console.log(error);
        }
    };

    async function sendProfileEditionRequest(email, name, surname, phoneNumber) {
        let profileEditionRequest = {
            currentEmail: getUserDetails().email,
            email,
            name,
            surname,
            phoneNumber
        }

        const [data, error] = await putWithRefresh('/users', profileEditionRequest);
        if (!error) {
            await updateAuthState(data);
            setShowProfileEditionSuccess(true);
        } else {
            setShowProfileEditionError(true);
            console.log(error);
        }
    };

    function handlePasswordChangeSuccess() {
        setShowPasswordChangeSuccess(false);
        setShowPasswordChangeForm(false);
    }

    function handleProfileEditionSuccess() {
        setShowProfileEditionSuccess(false);
        setShowProfileEditionForm(false);
        navigation.dispatch(StackActions.popToTop());
        navigation.navigate('Profile');
    }

    function displayPasswordChangeForm() {
        setShowPasswordChangeForm(true);
        setShowProfileEditionForm(false);
    }

    function displayProfileEditionForm() {
        setShowPasswordChangeForm(false);
        setShowProfileEditionForm(true);
    }

    useEffect(() => {
        loadProfileData();
    }, []);

    return (
        <ScrollView style = {styles.container}>
            <Text style = {styles.title}>Twój profil</Text>
            <View style = {styles.profileSection}>

                {status === 'ok' &&
                    <>
                        <View style = {styles.profileIcon}>
                            <Image source = {getProfileIcon()}/>
                        </View>

                        <View style  ={styles.profileData}>
                            <ProfileDataRow header = {'Email: '} text = {profileData.email}/>
                            <ProfileDataRow header = {'Imię: '} text = {profileData.name}/>
                            <ProfileDataRow header = {'Nazwisko: '} text = {profileData.surname}/>
                            <ProfileDataRow header = {'Numer telefonu: '} text = {profileData.phoneNumber}/>
                            <ProfileDataRow header = {'Typ konta: '} text = {profileData.role === 'ROLE_USER' ? 'zamawiający' : 'dostawca'}/>
                        </View>

                        <TouchableOpacity onPress = {() => displayProfileEditionForm()} style = {[FormStyles.defaultButton, {flexDirection: 'row'}]}>
                            <Icon name="form-select" size={30} color="white" style = {{paddingRight: 10}}/>
                            <Text style = {FormStyles.defaultText}>Zmień dane</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress = {() => displayPasswordChangeForm()} style = {[FormStyles.defaultButton, {flexDirection: 'row'}]}>
                            <Icon name="form-textbox-password" size={30} color="white" style = {{paddingRight: 10}}/>
                            <Text style = {FormStyles.defaultText}>Zmień hasło</Text>
                        </TouchableOpacity>

                        {showPasswordChangeForm && 
                            <PasswordChangeForm 
                            onSubmit = {sendPasswordChangeRequest} 
                            onCancel = {setShowPasswordChangeForm}
                            />
                        }

                        {showPasswordChangeSuccess && 
                            <Alert title = {'Sukces!'} message = {'Twoje hasło zostało pomyślnie zmienione!'} onClose={() => handlePasswordChangeSuccess()}/>
                        }

                        {showPasswordChangeError && 
                            <Alert title = {'Błąd!'} message = {'Nie udało się zmienić hasła!'} onClose={() => setShowPasswordChangeError(false)}/>
                        }

                        {showProfileEditionForm && 
                            <ProfileEditionForm 
                            profileData = {profileData}
                            onSubmit = {sendProfileEditionRequest} 
                            onCancel = {setShowProfileEditionForm}
                            />
                        }

                        {showProfileEditionSuccess && 
                            <Alert title = {'Sukces!'} message = {'Twój profil został zaktualizowany!'} onClose={() => handleProfileEditionSuccess()}/>
                        }

                        {showProfileEditionError && 
                            <Alert title = {'Błąd!'} message = {'Nie udało się zaktualizować Twojego profilu!'} onClose={() => setShowProfileEditionError(false)}/>
                        }

                    </>
                }
                
                {status === 'loading' &&
                    <LoadingSpinner/>
                }

                {status === 'error' &&
                    <Alert title = {'Błąd!'} message = {'Wystapił błąd przy połączeniu z serwerem!'} onClose={() => navigation.goBack()}/>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8232B9'
    },

    title: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        fontWeight :'bold',
        marginTop: 30
    },

    profileSection: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },

    profileIcon: {
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 20,
        padding: 10,
        width: '90%'
    },

    profileData: {
        marginTop: 20,
        padding: 10,
    },

    profileDataRow: {
        flexDirection: 'row',
        width: '90%'
    },

    profileDataHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        flex: 1
    },

    profileDataText: {
        fontSize: 16,
        color: 'white',
        flex: 1
    }
})
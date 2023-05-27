import { useContext, useEffect, useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { AxiosContext } from "../AuthenticationScreens/AxiosContext"
import { AuthContext } from "../AuthenticationScreens/AuthContext";
import LoadingSpinner from "../UniversalComponents/LoadingSpinner";
import Alert from "../UniversalComponents/Alert";
import FormStyles from "../Styles/FormStyles";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProfileScreen({navigation}) {

    const {getWithRefresh} = useContext(AxiosContext);
    const {getUserDetails} = useContext(AuthContext);

    const [profileData, setProfileData] = useState(null);
    const [status, setStatus] = useState('loading');

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
        console.log(data);
        if (!error) {
            setProfileData(data);
            setStatus('ok');
        } else {
            console.log(error);
            setStatus('error');
        }
    }

    useEffect(() => {
        loadProfileData();
    }, []);

    return (
        <View style = {styles.container}>
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

                        <TouchableOpacity onPress = {() => console.log('Zmień dane')} style = {[FormStyles.defaultButton, {flexDirection: 'row'}]}>
                            <Icon name="form-select" size={30} color="white" style = {{paddingRight: 10}}/>
                            <Text style = {FormStyles.defaultText}>Zmień dane</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress = {() => console.log('Zmień hasło')} style = {[FormStyles.defaultButton, {flexDirection: 'row'}]}>
                            <Icon name="form-textbox-password" size={30} color="white" style = {{paddingRight: 10}}/>
                            <Text style = {FormStyles.defaultText}>Zmień hasło</Text>
                        </TouchableOpacity>

                    </>
                }
                
                {status === 'loading' &&
                    <LoadingSpinner/>
                }

                {status === 'error' &&
                    <Alert title = {'Błąd!'} message = {'Wystapił błąd przy połączeniu z serwerem!'} onClose={() => navigation.goBack()}/>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
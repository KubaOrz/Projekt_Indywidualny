import { useState } from "react";
import { ImageBackground } from "react-native";
import { View, ScrollView, TouchableOpacity, StyleSheet, Pressable, Text } from "react-native";
import FormStyles from "../../styles/FormStyles";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function DefaultRoot() {

    const [userType, setUserType] = useState('');
    const [displayRegisterForm, setDisplayRegisterForm] = useState(false);
    const [displayLoginForm, setDisplayLoginForm] = useState(false);

    function changeUserType(type) {
        setUserType(type);
        if (!(displayLoginForm || displayRegisterForm)) {
            setDisplayLoginForm(true);
        }
    }

    function switchFormType() {
        setDisplayLoginForm(!displayLoginForm);
        setDisplayRegisterForm(!displayRegisterForm);
    }

    return(
        <ScrollView style = {styles.container}>
            <View style = {styles.userChoiceContainer}>
                <View style = {styles.buttonContainer}>
                    <Pressable style = {[styles.userChoiceButton, userType === 'ROLE_USER' && styles.userChoiceButtonPressed]} 
                    onPress = {() => changeUserType('ROLE_USER')}>
                        <ImageBackground source = {require('../../../assets/trolley.png')} style = {styles.backgroundImage} >
                        </ImageBackground>
                    </Pressable>
                    <Text style = {styles.label}>Zamawiający</Text>
                </View>
                <View style = {styles.buttonContainer}>
                    <Pressable style = {[styles.userChoiceButton, userType === 'ROLE_SUPPLIER' && styles.userChoiceButtonPressed]}
                     onPress = {() => changeUserType('ROLE_SUPPLIER')}>
                        <ImageBackground source = {require('../../../assets/delivery.png')} style = {styles.backgroundImage} >
                        </ImageBackground>
                    </Pressable>
                    <Text style = {styles.label}>Dostawca</Text>
                </View>
            </View>
            {displayLoginForm &&
                <View style = {styles.formContainer}>
                    <View style = {{alignItems: 'center'}}>
                        <Text style = {styles.label}>Nie masz konta?</Text>
                        <TouchableOpacity style = {FormStyles.defaultButton} onPress = {() => switchFormType()} >
                            <Text style = {FormStyles.defaultText}>Zarejestruj się!</Text>
                        </TouchableOpacity>
                    </View>
                    <LoginForm />
                </View>
            }
            {displayRegisterForm && 
                <View style = {styles.formContainer}>
                    <View style = {{alignItems: 'center'}}>
                        <Text style = {styles.label}>Masz już konto?</Text>
                        <TouchableOpacity style = {FormStyles.defaultButton} onPress = {() => switchFormType()}>
                            <Text style = {FormStyles.defaultText}>Zaloguj się!</Text>
                        </TouchableOpacity>
                    </View>
                    <RegisterForm role = {userType}/>
                </View>
            }
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#8232B9',
    },

    userChoiceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        marginTop: 55
    },

    userChoiceButton: {
        width: '70%',
        aspectRatio: 1,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 8,
    },

    userChoiceButtonPressed: {
        borderWidth: 5,
        borderColor: '#C10D49'
    },

    backgroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    buttonContainer: {
        alignItems: 'center',
        flex: 1
    },

    label: {
        marginTop: 5,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    formContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30
    }
});
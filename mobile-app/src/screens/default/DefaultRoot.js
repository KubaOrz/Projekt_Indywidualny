import { useState } from "react";
import { ImageBackground } from "react-native";
import { View, ScrollView, Button, StyleSheet, Pressable, Text, Image } from "react-native";
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
                    <Pressable style = {styles.userChoiceButton} onPress = {() => changeUserType('ROLE_USER')}>
                        <ImageBackground source = {require('../../../assets/trolley.png')} style = {styles.backgroundImage} >
                        </ImageBackground>
                    </Pressable>
                    <Text style = {styles.label}>Zamawiający</Text>
                </View>
                <View style = {styles.buttonContainer}>
                    <Pressable style = {styles.userChoiceButton} onPress = {() => changeUserType('ROLE_SUPPLIER')}>
                        <ImageBackground source = {require('../../../assets/delivery.png')} style = {styles.backgroundImage} >
                        </ImageBackground>
                    </Pressable>
                    <Text style = {styles.label}>Dostawca</Text>
                </View>
            </View>
            {displayLoginForm &&
                <View style = {styles.formContainer}>
                    <View>
                        <Text style = {styles.label}>Nie masz konta?</Text>
                        <Button title = "Zarejestruj się" onPress = {() => switchFormType()} />
                    </View>
                    <LoginForm />
                </View>
            }
            {displayRegisterForm && 
                <View style = {styles.formContainer}>
                    <View>
                        <Text style = {styles.label}>Masz już konto?</Text>
                        <Button title = "Zaloguj się" onPress = {() => switchFormType()} />
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
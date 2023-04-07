import { useState } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet, Text, Pressable, ImageBackground } from "react-native";
import FormStyles from "../../styles/FormStyles";
import DefaultStyles from "../../styles/DefaultStyles";
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
            <View style = {DefaultStyles.tileContainer}>
                <View style = {DefaultStyles.tileRow}>

                    <View style = {DefaultStyles.labeledTileContainer}>
                        <Pressable style = {[DefaultStyles.tile, userType === 'ROLE_USER' && styles.tilePressed]} 
                        onPress = {() => changeUserType('ROLE_USER')}>
                            <ImageBackground source = {require('../../../assets/trolley.png')} style = {DefaultStyles.tileBackgroundImage} >
                            </ImageBackground>
                        </Pressable>
                        <Text style = {DefaultStyles.label}>Zamawiający</Text>
                    </View>

                    <View style = {DefaultStyles.labeledTileContainer}>
                        <Pressable style = {[DefaultStyles.tile, userType === 'ROLE_SUPPLIER' && styles.tilePressed]}
                        onPress = {() => changeUserType('ROLE_SUPPLIER')}>
                            <ImageBackground source = {require('../../../assets/delivery.png')} style = {DefaultStyles.tileBackgroundImage} >
                            </ImageBackground>
                        </Pressable>
                        <Text style = {DefaultStyles.label}>Dostawca</Text>
                    </View>

                </View>
            </View>

            {displayLoginForm &&
                <View style = {styles.formContainer}>
                    <View style = {{alignItems: 'center'}}>
                        <Text style = {DefaultStyles.label}>Nie masz konta?</Text>
                        <TouchableOpacity style = {FormStyles.defaultButton} onPress = {() => switchFormType()} >
                            <Text style = {FormStyles.defaultText}>Zarejestruj się!</Text>
                        </TouchableOpacity>
                    </View>
                    <LoginForm role = {userType}/>
                </View>
            }

            {displayRegisterForm && 
                <View style = {styles.formContainer}>
                    <View style = {{alignItems: 'center'}}>
                        <Text style = {DefaultStyles.label}>Masz już konto?</Text>
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

    tilePressed: {
        borderWidth: 5,
        borderColor: '#C10D49'
    },

    formContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30
    }
});
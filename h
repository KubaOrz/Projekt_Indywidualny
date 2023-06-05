[33mcommit 5ff6d64217d98dc285369cfa61ee58ea23ea6397[m[33m ([m[1;36mHEAD -> [m[1;32muse_case_edit_profile[m[33m)[m
Author: KubaOrz <orz.kub@wp.pl>
Date:   Mon May 29 19:05:29 2023 +0200

    Dodano opcję zmiany danych profilu, aktualizacja diagramów

[1mdiff --git a/individual-project/src/main/java/pl/edu/pw/ee/individualproject/auth/AuthenticationResponse.java b/individual-project/src/main/java/pl/edu/pw/ee/individualproject/auth/AuthenticationResponse.java[m
[1mindex 2010eba..ea1ee02 100644[m
[1m--- a/individual-project/src/main/java/pl/edu/pw/ee/individualproject/auth/AuthenticationResponse.java[m
[1m+++ b/individual-project/src/main/java/pl/edu/pw/ee/individualproject/auth/AuthenticationResponse.java[m
[36m@@ -24,4 +24,14 @@[m [mpublic class AuthenticationResponse {[m
         this.phoneNumber = user.getPhoneNumber();[m
         this.role = user.getRole();[m
     }[m
[32m+[m
[32m+[m[32m    public AuthenticationResponse(User user) {[m
[32m+[m[32m        this.token = null;[m
[32m+[m[32m        this.refreshToken = null;[m
[32m+[m[32m        this.name = user.getName();[m
[32m+[m[32m        this.surname = user.getSurname();[m
[32m+[m[32m        this.email = user.getEmail();[m
[32m+[m[32m        this.phoneNumber = user.getPhoneNumber();[m
[32m+[m[32m        this.role = user.getRole();[m
[32m+[m[32m    }[m
 }[m
[1mdiff --git a/individual-project/src/main/java/pl/edu/pw/ee/individualproject/auth/AuthenticationService.java b/individual-project/src/main/java/pl/edu/pw/ee/individualproject/auth/AuthenticationService.java[m
[1mindex 7deebf6..a4dd63e 100644[m
[1m--- a/individual-project/src/main/java/pl/edu/pw/ee/individualproject/auth/AuthenticationService.java[m
[1m+++ b/individual-project/src/main/java/pl/edu/pw/ee/individualproject/auth/AuthenticationService.java[m
[36m@@ -102,6 +102,25 @@[m [mpublic class AuthenticationService {[m
         return new RefreshResponse(tokenStr, refreshTokenStr);[m
     }[m
 [m
[32m+[m[32m    public RefreshResponse refresh(User user) {[m
[32m+[m[32m        String tokenStr = jwtService.generateToken(user);[m
[32m+[m[32m        String refreshTokenStr = jwtService.generateRefreshToken(user);[m
[32m+[m
[32m+[m[32m        RefreshToken newRefreshToken = refreshTokenRepository.findByUser(user).orElseThrow([m
[32m+[m[32m                InvalidTokenException::new[m
[32m+[m[32m        );[m
[32m+[m[32m        newRefreshToken.setToken(refreshTokenStr);[m
[32m+[m[32m        refreshTokenRepository.save(newRefreshToken);[m
[32m+[m
[32m+[m[32m        revokeAllTokens(user);[m
[32m+[m[32m        tokenRepository.save(Token.builder()[m
[32m+[m[32m                .token(tokenStr)[m
[32m+[m[32m                .revoked(false)[m
[32m+[m[32m                .user(user)[m
[32m+[m[32m                .build());[m
[32m+[m[32m        return new RefreshResponse(tokenStr, refreshTokenStr);[m
[32m+[m[32m    }[m
[32m+[m
     public void changePassword(ChangePasswordRequest request) {[m
         User user = repository.findByEmail(request.email()).orElseThrow([m
                 () -> new UsernameNotFoundException("Podany użytkownik nie istnieje!")[m
[1mdiff --git a/individual-project/src/main/java/pl/edu/pw/ee/individualproject/user/DTO/ProfileEditionRequest.java b/individual-project/src/main/java/pl/edu/pw/ee/individualproject/user/DTO/ProfileEditionRequest.java[m
[1mnew file mode 100644[m
[1mindex 0000000..08542cc[m
[1m--- /dev/null[m
[1m+++ b/individual-project/src/main/java/pl/edu/pw/ee/individualproject/user/DTO/ProfileEditionRequest.java[m
[36m@@ -0,0 +1,10 @@[m
[32m+[m[32mpackage pl.edu.pw.ee.individualproject.user.DTO;[m
[32m+[m
[32m+[m[32mpublic record ProfileEditionRequest([m
[32m+[m[32m        String currentEmail,[m
[32m+[m[32m        String email,[m
[32m+[m[32m        String name,[m
[32m+[m[32m        String surname,[m
[32m+[m[32m        String phoneNumber[m
[32m+[m[32m) {[m
[32m+[m[32m}[m
[1mdiff --git a/individual-project/src/main/java/pl/edu/pw/ee/individualproject/user/UserController.java b/individual-project/src/main/java/pl/edu/pw/ee/individualproject/user/UserController.java[m
[1mindex 694174c..8d1cfc1 100644[m
[1m--- a/individual-project/src/main/java/pl/edu/pw/ee/individualproject/user/UserController.java[m
[1m+++ b/individual-project/src/main/java/pl/edu/pw/ee/individualproject/user/UserController.java[m
[36m@@ -1,8 +1,11 @@[m
 package pl.edu.pw.ee.individualproject.user;[m
 [m
 import lombok.RequiredArgsConstructor;[m
[32m+[m[32mimport org.springframework.http.HttpStatus;[m
 import org.springframework.http.ResponseEntity;[m
 import org.springframework.web.bind.annotation.*;[m
[32m+[m[32mimport pl.edu.pw.ee.individualproject.auth.AuthenticationResponse;[m
[32m+[m[32mimport pl.edu.pw.ee.individualproject.user.DTO.ProfileEditionRequest;[m
 import pl.edu.pw.ee.individualproject.user.DTO.UserProfileData;[m
 [m
 @RestController[m
[36m@@ -16,4 +19,9 @@[m [mpublic class UserController {[m
     public ResponseEntity<UserProfileData> getUserProfileData(@PathVariable String email) {[m
         return ResponseEntity.ok(userService.getUserProfileData(email));[m
     }[m
[32m+[m
[32m+[m[32m    @PutMapping[m
[32m+[m[32m    public ResponseEntity<AuthenticationResponse> changeUserProfile(@RequestBody ProfileEditionRequest request) {[m
[32m+[m[32m        return ResponseEntity.ok(userService.changeUserProfile(request));[m
[32m+[m[32m    }[m
 }[m
[1mdiff --git a/individual-project/src/main/java/pl/edu/pw/ee/individualproject/user/UserService.java b/individual-project/src/main/java/pl/edu/pw/ee/individualproject/user/UserService.java[m
[1mindex 6ef3818..448e82c 100644[m
[1m--- a/individual-project/src/main/java/pl/edu/pw/ee/individualproject/user/UserService.java[m
[1m+++ b/individual-project/src/main/java/pl/edu/pw/ee/individualproject/user/UserService.java[m
[36m@@ -1,18 +1,25 @@[m
 package pl.edu.pw.ee.individualproject.user;[m
 [m
 import lombok.RequiredArgsConstructor;[m
[31m-import org.springframework.http.ResponseEntity;[m
 import org.springframework.stereotype.Service;[m
[32m+[m[32mimport pl.edu.pw.ee.individualproject.auth.AuthenticationResponse;[m
[32m+[m[32mimport pl.edu.pw.ee.individualproject.auth.AuthenticationService;[m
[32m+[m[32mimport pl.edu.pw.ee.individualproject.auth.token.RefreshResponse;[m
 import pl.edu.pw.ee.individualproject.exception.EntityNotFoundException;[m
[32m+[m[32mimport pl.edu.pw.ee.individualproject.exception.UserAlreadyExistsException;[m
 import pl.edu.pw.ee.individualproject.user.DTO.BasicPurchaserData;[m
 import pl.edu.pw.ee.individualproject.user.DTO.BasicSupplierData;[m
[32m+[m[32mimport pl.edu.pw.ee.individualproject.user.DTO.ProfileEditionRequest;[m
 import pl.edu.pw.ee.individualproject.user.DTO.UserProfileData;[m
 [m
[32m+[m[32mimport java.util.Objects;[m
[32m+[m
 @Service[m
 @RequiredArgsConstructor[m
 public class UserService {[m
 [m
     private final UserRepository userRepository;[m
[32m+[m[32m    private final AuthenticationService authenticationService;[m
 [m
     public BasicSupplierData getBasicSupplierData(String email) {[m
         User user = userRepository.findByEmail(email).orElseThrow([m
[36m@@ -37,6 +44,33 @@[m [mpublic class UserService {[m
                 .build();[m
     }[m
 [m
[32m+[m[32m    public AuthenticationResponse changeUserProfile(ProfileEditionRequest request) {[m
[32m+[m[32m        User user = userRepository.findByEmail(request.currentEmail()).orElseThrow([m
[32m+[m[32m                () -> new EntityNotFoundException("Nie znaleziono użytkownika o podanym adresie email!")[m
[32m+[m[32m        );[m
[32m+[m[32m        RefreshResponse refreshResponse = null;[m
[32m+[m
[32m+[m[32m        if (!Objects.equals(request.email(), request.currentEmail())) {[m
[32m+[m[32m            if (!userRepository.existsByEmail(request.email())) {[m
[32m+[m[32m                user.setEmail(request.email());[m
[32m+[m[32m                refreshResponse = authenticationService.refresh(user);[m
[32m+[m[32m            } else {[m
[32m+[m[32m                throw new UserAlreadyExistsException("Inny użytkownik już używa tego adresu email!");[m
[32m+[m[32m            }[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        user.setName(request.name());[m
[32m+[m[32m        user.setSurname(request.surname());[m
[32m+[m[32m        user.setPhoneNumber(request.phoneNumber());[m
[32m+[m
[32m+[m[32m        userRepository.save(user);[m
[32m+[m
[32m+[m[32m        if (refreshResponse != null) {[m
[32m+[m[32m            return new AuthenticationResponse(refreshResponse.token(), refreshResponse.refreshToken(), user);[m
[32m+[m[32m        }[m
[32m+[m[32m        return new AuthenticationResponse(user);[m
[32m+[m[32m    }[m
[32m+[m
     public UserProfileData getUserProfileData(String email) {[m
         User user = userRepository.findByEmail(email).orElseThrow([m
                 () -> new EntityNotFoundException("Nie znaleziono użytkownika o podanym adresie email!")[m
[1mdiff --git a/mobile-app/src/AuthenticationScreens/AuthContext.js b/mobile-app/src/AuthenticationScreens/AuthContext.js[m
[1mindex 5fcdd99..d028e6e 100644[m
[1m--- a/mobile-app/src/AuthenticationScreens/AuthContext.js[m
[1m+++ b/mobile-app/src/AuthenticationScreens/AuthContext.js[m
[36m@@ -13,9 +13,9 @@[m [mfunction AuthProvider({children}) {[m
     }, []);[m
 [m
     async function logout() {[m
[31m-        SecureStore.deleteItemAsync('token');[m
[31m-        SecureStore.deleteItemAsync('refreshToken');[m
[31m-        SecureStore.deleteItemAsync('userDetails');[m
[32m+[m[32m        await SecureStore.deleteItemAsync('token');[m
[32m+[m[32m        await SecureStore.deleteItemAsync('refreshToken');[m
[32m+[m[32m        await SecureStore.deleteItemAsync('userDetails');[m
         setAuthState({[m
             accessToken: null,[m
             refreshToken: null,[m
[36m@@ -24,6 +24,39 @@[m [mfunction AuthProvider({children}) {[m
         });[m
     };[m
 [m
[32m+[m[32m    async function updateAuthState(newAuthState) {[m
[32m+[m[32m        let accessToken;[m
[32m+[m[32m        let refreshToken;[m
[32m+[m
[32m+[m[32m        if (newAuthState.token !== null) {[m
[32m+[m[32m            accessToken = newAuthState.token;[m
[32m+[m[32m            await SecureStore.setItemAsync('token', accessToken);[m
[32m+[m[32m        } else {[m
[32m+[m[32m            accessToken = authState.accessToken;[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        if (newAuthState.refreshToken !== null) {[m
[32m+[m[32m            refreshToken = newAuthState.refreshToken;[m
[32m+[m[32m            await SecureStore.setItemAsync('refreshToken', refreshToken);[m
[32m+[m[32m        } else {[m
[32m+[m[32m            refreshToken = authState.refreshToken;[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        const userDetails = {[m
[32m+[m[32m            name: newAuthState.name,[m
[32m+[m[32m            surname: newAuthState.surname,[m
[32m+[m[32m            email: newAuthState.email,[m
[32m+[m[32m            phoneNumber: newAuthState.phoneNumber[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        setAuthState(() => ({[m
[32m+[m[32m            accessToken: accessToken,[m
[32m+[m[32m            refreshToken: refreshToken,[m
[32m+[m[32m            authenticated: newAuthState.role,[m
[32m+[m[32m            userDetails: userDetails[m
[32m+[m[32m          }));[m
[32m+[m[32m    }[m
[32m+[m
     function getAccessToken() {[m
         return authState.accessToken;[m
     };[m
[36m@@ -43,6 +76,7 @@[m [mfunction AuthProvider({children}) {[m
             setAuthState,[m
             getUserDetails,[m
             getRefreshToken,[m
[32m+[m[32m            updateAuthState,[m
             logout[m
         }}>[m
             {children}[m
[1mdiff --git a/mobile-app/src/AuthenticationScreens/RegisterForm.js b/mobile-app/src/AuthenticationScreens/RegisterForm.js[m
[1mindex ed6ce14..a94b9c3 100644[m
[1m--- a/mobile-app/src/AuthenticationScreens/RegisterForm.js[m
[1m+++ b/mobile-app/src/AuthenticationScreens/RegisterForm.js[m
[36m@@ -5,6 +5,7 @@[m [mimport { AxiosContext } from './AxiosContext';[m
 import FormStyles from '../Styles/FormStyles';[m
 import Alert from '../UniversalComponents/Alert';[m
 import * as SecureStore from 'expo-secure-store';[m
[32m+[m[32mimport UserDataInputValidator from '../UniversalComponents/UserDataInputValidator';[m
 [m
 export default function RegisterForm(props) {[m
 [m
[36m@@ -83,59 +84,24 @@[m [mexport default function RegisterForm(props) {[m
 [m
   function handleEmailInput(email) {[m
     setEmail(email);[m
[31m-    validateEmail(email);[m
[31m-  }[m
[31m-[m
[31m-  function validateEmail(email) {[m
[31m-    const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;[m
[31m-    if (!validEmailRegex.test(email)) {[m
[31m-      setEmailValidationError('Niepoprawny adres e-mail!');[m
[31m-    } else {[m
[31m-      setEmailValidationError('');[m
[31m-    }[m
[32m+[m[32m    setEmailValidationError(UserDataInputValidator.validateEmail(email));[m
   }[m
 [m
   function handlePasswordInput(password) {[m
     setPassword(password);[m
[31m-    validatePassword(password);[m
[31m-  }[m
[31m-[m
[31m-  function validatePassword(password) {[m
[31m-    const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;[m
[31m-    if (!validPasswordRegex.test(password)) {[m
[31m-      setPasswordValidationError('Hasło musi zawierać co najmniej 8 znaków, cyfrę i znak specjalny!');[m
[31m-    } else {[m
[31m-      setPasswordValidationError('');[m
[31m-    }[m
[32m+[m[32m    setPasswordValidationError(UserDataInputValidator.validatePassword(password));[m
   }[m
 [m
   function handleConfirmPasswordInput(confirmPassword) {[m
     setConfirmPassword(confirmPassword);[m
[31m-    checkPasswordEquality(confirmPassword);[m
[31m-  }[m
[31m-[m
[31m-  function checkPasswordEquality(confirmPassword) {[m
[31m-    if (!(confirmPassword === password)) {[m
[31m-      setPasswordsEqualError('Podane hasła nie są takie same!');[m
[31m-    } else {[m
[31m-      setPasswordsEqualError('');[m
[31m-    }[m
[32m+[m[32m    setPasswordsEqualError(UserDataInputValidator.checkPasswordEquality(confirmPassword, password));[m
   }[m
 [m
   function handlePhoneInput(phoneNumber) {[m
     setPhoneNumber(phoneNumber);[m
[31m-    validatePhoneNumber(phoneNumber);[m
[32m+[m[32m    setPhoneValidationError(UserDataInputValidator.validatePhoneNumber(phoneNumber));[m
   }[m
 [m
[31m-  function validatePhoneNumber(phoneNumber) {[m
[31m-    const validPhoneRegex = /^[0-9]{9}$/;[m
[31m-    if (!validPhoneRegex.test(phoneNumber)) {[m
[31m-      setPhoneValidationError('Niepoprawny numer telefonu!');[m
[31m-    } else {[m
[31m-      setPhoneValidationError('');[m
[31m-    }[m
[31m-  };[m
[31m-[m
   function handleSubmit() {[m
     if (emailValidationError || passwordValidationError || passwordsEqualError || phoneValidationError) {[m
       alertTitle.current = 'Błędne dane!';[m
[1mdiff --git a/mobile-app/src/ProfileScreens/PasswordChangeForm.js b/mobile-app/src/ProfileScreens/PasswordChangeForm.js[m
[1mindex 76440ac..5ad8151 100644[m
[1m--- a/mobile-app/src/ProfileScreens/PasswordChangeForm.js[m
[1m+++ b/mobile-app/src/ProfileScreens/PasswordChangeForm.js[m
[36m@@ -2,6 +2,7 @@[m [mimport { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-nativ[m
 import FormStyles from "../Styles/FormStyles"[m
 import { useRef, useState, useEffect } from "react"[m
 import Icon from 'react-native-vector-icons/MaterialCommunityIcons';[m
[32m+[m[32mimport UserDataInputValidator from "../UniversalComponents/UserDataInputValidator";[m
 [m
 export default function PasswordChangeForm({onSubmit, onCancel}) {[m
 [m
[36m@@ -13,29 +14,12 @@[m [mexport default function PasswordChangeForm({onSubmit, onCancel}) {[m
 [m
     function handleNewPasswordInput(password) {[m
         setNewPassword(password);[m
[31m-        validatePassword(password);[m
[31m-    }[m
[31m-    [m
[31m-    function validatePassword(password) {[m
[31m-        const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;[m
[31m-        if (!validPasswordRegex.test(password)) {[m
[31m-          setError('Hasło musi zawierać co najmniej 8 znaków, cyfrę i znak specjalny!');[m
[31m-        } else {[m
[31m-          setError('');[m
[31m-        }[m
[32m+[m[32m        setError(UserDataInputValidator.validatePassword(password));[m
     }[m
     [m
     function handleConfirmPasswordInput(password) {[m
         setConfirmPassword(password);[m
[31m-        checkPasswordEquality(password);[m
[31m-    }[m
[31m-[m
[31m-    function checkPasswordEquality(confirmPassword) {[m
[31m-        if (!(confirmPassword === newPassword)) {[m
[31m-          setError('Podane hasła nie są takie same!');[m
[31m-        } else {[m
[31m-          setError('');[m
[31m-        }[m
[32m+[m[32m        setError(UserDataInputValidator.checkPasswordEquality(password, newPassword));[m
     }[m
 [m
     useEffect(() => {[m
[1mdiff --git a/mobile-app/src/ProfileScreens/ProfileEditionForm.js b/mobile-app/src/ProfileScreens/ProfileEditionForm.js[m
[1mnew file mode 100644[m
[1mindex 0000000..418d527[m
[1m--- /dev/null[m
[1m+++ b/mobile-app/src/ProfileScreens/ProfileEditionForm.js[m
[36m@@ -0,0 +1,101 @@[m
[32m+[m[32mimport { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native"[m
[32m+[m[32mimport FormStyles from "../Styles/FormStyles"[m
[32m+[m[32mimport { useRef, useState, useEffect } from "react"[m
[32m+[m[32mimport Icon from 'react-native-vector-icons/MaterialCommunityIcons';[m
[32m+[m[32mimport UserDataInputValidator from "../UniversalComponents/UserDataInputValidator";[m
[32m+[m[32mimport ProfileEditionFormItem from "./ProfileEditionFormItem";[m
[32m+[m
[32m+[m[32mexport default function ProfileEditionForm({profileData, onSubmit, onCancel}) {[m
[32m+[m
[32m+[m[32m    const [error, setError] = useState('');[m
[32m+[m[32m    const [email, setEmail] = useState(profileData.email);[m
[32m+[m[32m    const [name, setName] = useState(profileData.name);[m
[32m+[m[32m    const [surname, setSurname] = useState(profileData.surname);[m
[32m+[m[32m    const [phoneNumber, setPhoneNumber] = useState(profileData.phoneNumber);[m
[32m+[m
[32m+[m[32m    const [oldPassword, setOldPassword] = useState('');[m
[32m+[m[32m    const [newPassword, setNewPassword] = useState('');[m
[32m+[m[32m    const [confirmPassword, setConfirmPassword] = useState('');[m
[32m+[m[32m    const [acceptDisabled, setAcceptDisabled] = useState(true);[m
[32m+[m
[32m+[m[32m    function handleEmailInput(email) {[m
[32m+[m[32m        setEmail(email);[m
[32m+[m[32m        setError(UserDataInputValidator.validateEmail(email));[m
[32m+[m[32m    }[m
[32m+[m[41m    [m
[32m+[m[32m    function handlePhoneNumberInput(phoneNumber) {[m
[32m+[m[32m        setPhoneNumber(phoneNumber);[m
[32m+[m[32m        setError(UserDataInputValidator.validatePhoneNumber(phoneNumber));[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    function checkIfNotEmpty() {[m
[32m+[m[32m        return (email && name && surname && phoneNumber);[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    function checkIfChanged() {[m
[32m+[m[32m        return ([m
[32m+[m[32m            email !== profileData.email ||[m
[32m+[m[32m            name !== profileData.name ||[m
[32m+[m[32m            surname !== profileData.surname ||[m
[32m+[m[32m            phoneNumber !== profileData.phoneNumber[m
[32m+[m[32m        )[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    useEffect(() => {[m
[32m+[m[32m        if (checkIfNotEmpty() && checkIfChanged() && error === '') {[m
[32m+[m[32m            setAcceptDisabled(false);[m
[32m+[m[32m        } else {[m
[32m+[m[32m            setAcceptDisabled(true);[m
[32m+[m[32m        }[m
[32m+[m[32m    }, [email, name, surname, phoneNumber])[m
[32m+[m
[32m+[m[32m    return ([m
[32m+[m[32m        <View style = {FormStyles.container}>[m
[32m+[m[32m            <Text style={[FormStyles.defaultText, {fontSize: 26, paddingBottom: 20}]}>Edytuj profil</Text>[m
[32m+[m
[32m+[m[32m            <ProfileEditionFormItem[m
[32m+[m[32m            label = {'Email'}[m
[32m+[m[32m            property = {email}[m
[32m+[m[32m            setProperty = {handleEmailInput} />[m
[32m+[m
[32m+[m[32m            <ProfileEditionFormItem[m
[32m+[m[32m            label = {'Imię'}[m
[32m+[m[32m            property = {name}[m
[32m+[m[32m            setProperty = {setName} />[m
[32m+[m
[32m+[m[32m            <ProfileEditionFormItem[m
[32m+[m[32m            label = {'Nazwisko'}[m
[32m+[m[32m            property = {surname}[m
[32m+[m[32m            setProperty = {setSurname} />[m
[32m+[m
[32m+[m[32m            <ProfileEditionFormItem[m
[32m+[m[32m            label = {'Numer telefonu'}[m
[32m+[m[32m            property = {phoneNumber}[m
[32m+[m[32m            setProperty = {handlePhoneNumberInput} />[m
[32m+[m[41m            [m
[32m+[m[32m            <Text style = {FormStyles.errorText}>{error}</Text>[m
[32m+[m
[32m+[m[32m            <View style = {{flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'}}>[m
[32m+[m
[32m+[m[32m                <TouchableOpacity[m[41m [m
[32m+[m[32m                onPress = {() => onSubmit(email, name, surname, phoneNumber)}[m[41m [m
[32m+[m[32m                style = {[FormStyles.defaultButton, {flexDirection: 'row', width: '40%'}, acceptDisabled && {backgroundColor: '#736b68'}]}[m
[32m+[m[32m                disabled = {acceptDisabled}[m
[32m+[m[32m                >[m
[32m+[m[32m                    <Icon name="check-circle" size={30} color="white" style = {{paddingRight: 10}}/>[m
[32m+[m[32m                    <Text style = {FormStyles.defaultText}>Akceptuj</Text>[m
[32m+[m[32m                </TouchableOpacity>[m
[32m+[m
[32m+[m[32m                <TouchableOpacity[m[41m [m
[32m+[m[32m                onPress = {() => onCancel(false)}[m[41m [m
[32m+[m[32m                style = {[FormStyles.defaultButton, {flexDirection: 'row', width: '40%'}]}[m
[32m+[m[32m                >[m
[32m+[m[32m                    <Icon name="close-circle" size={30} color="white" style = {{paddingRight: 10}}/>[m
[32m+[m[32m                    <Text style = {FormStyles.defaultText}>Anuluj</Text>[m
[32m+[m[32m                </TouchableOpacity>[m
[32m+[m
[32m+[m[32m            </View>[m
[32m+[m[41m            [m
[32m+[m[32m        </View>[m
[32m+[m[32m    )[m
[32m+[m[32m}[m
[1mdiff --git a/mobile-app/src/ProfileScreens/ProfileEditionFormItem.js b/mobile-app/src/ProfileScreens/ProfileEditionFormItem.js[m
[1mnew file mode 100644[m
[1mindex 0000000..7324c3e[m
[1m--- /dev/null[m
[1m+++ b/mobile-app/src/ProfileScreens/ProfileEditionFormItem.js[m
[36m@@ -0,0 +1,29 @@[m
[32m+[m[32mimport { Text, View, TextInput, TouchableOpacity } from "react-native"[m
[32m+[m[32mimport { useState } from "react";[m
[32m+[m[32mimport Icon from 'react-native-vector-icons/MaterialCommunityIcons';[m
[32m+[m[32mimport FormStyles from "../Styles/FormStyles";[m
[32m+[m
[32m+[m[32mexport default function ProfileEditionFormItem({label, property, setProperty}) {[m
[32m+[m
[32m+[m[32m    const [textInputEditable, setTextInputEditable] = useState(false);[m
[32m+[m
[32m+[m[32m    return ([m
[32m+[m[32m        <>[m
[32m+[m[32m            <Text style = {FormStyles.defaultText}>{label}</Text>[m
[32m+[m[32m            <View style = {{flexDirection: 'row'}}>[m
[32m+[m[32m                <TextInput[m
[32m+[m[32m                    style = {[FormStyles.textInput, {flex: 10}, !textInputEditable && FormStyles.uneditableTextInput]}[m
[32m+[m[32m                    onChangeText = {prop => setProperty(prop)}[m
[32m+[m[32m                    value = {property}[m
[32m+[m[32m                    editable = {textInputEditable}[m
[32m+[m[32m                />[m
[32m+[m[32m                <TouchableOpacity[m[41m [m
[32m+[m[32m                onPress = {() => setTextInputEditable(!textInputEditable)}[m[41m [m
[32m+[m[32m                style = {[FormStyles.defaultButton, {flex: 1, marginTop: 0}]}[m
[32m+[m[32m                >[m
[32m+[m[32m                    <Icon name="lead-pencil" size={30} color="white"/>[m
[32m+[m[32m                </TouchableOpacity>[m
[32m+[m[32m            </View>[m
[32m+[m[32m        </>[m
[32m+[m[32m    )[m
[32m+[m[32m}[m
\ No newline at end of file[m
[1mdiff --git a/mobile-app/src/ProfileScreens/ProfileScreen.js b/mobile-app/src/ProfileScreens/ProfileScreen.js[m
[1mindex 00a1e67..aeece31 100644[m
[1m--- a/mobile-app/src/ProfileScreens/ProfileScreen.js[m
[1m+++ b/mobile-app/src/ProfileScreens/ProfileScreen.js[m
[36m@@ -7,11 +7,12 @@[m [mimport Alert from "../UniversalComponents/Alert";[m
 import FormStyles from "../Styles/FormStyles";[m
 import Icon from 'react-native-vector-icons/MaterialCommunityIcons';[m
 import PasswordChangeForm from "./PasswordChangeForm";[m
[32m+[m[32mimport ProfileEditionForm from "./ProfileEditionForm";[m
 [m
 export default function ProfileScreen({navigation}) {[m
 [m
     const {getWithRefresh, authAxios} = useContext(AxiosContext);[m
[31m-    const {getUserDetails} = useContext(AuthContext);[m
[32m+[m[32m    const {getUserDetails, updateAuthState} = useContext(AuthContext);[m
 [m
     const [profileData, setProfileData] = useState(null);[m
     const [status, setStatus] = useState('loading');[m
[36m@@ -20,6 +21,10 @@[m [mexport default function ProfileScreen({navigation}) {[m
     const [showPasswordChangeSuccess, setShowPasswordChangeSuccess] = useState(false);[m
     const [showPasswordChangeError, setShowPasswordChangeError] = useState(false);[m
 [m
[32m+[m[32m    const [showProfileEditionForm, setShowProfileEditionForm] = useState(false);[m
[32m+[m[32m    const [showProfileEditionSuccess, setShowProfileEditionSuccess] = useState(false);[m
[32m+[m[32m    const [showProfileEditionError, setShowProfileEditionError] = useState(false);[m
[32m+[m
     function ProfileDataRow({header, text}) {[m
         return ([m
             <View style = {styles.profileDataRow}>[m
[36m@@ -38,6 +43,7 @@[m [mexport default function ProfileScreen({navigation}) {[m
     }[m
 [m
     async function loadProfileData() {[m
[32m+[m[32m        console.log(getUserDetails().email);[m
         const [data, error] = await getWithRefresh('/users/' + getUserDetails().email);[m
         console.log(data);[m
         if (!error) {[m
[36m@@ -65,11 +71,47 @@[m [mexport default function ProfileScreen({navigation}) {[m
         });[m
     };[m
 [m
[31m-    function handleSuccess() {[m
[32m+[m[32m    function sendProfileEditionRequest(email, name, surname, phoneNumber) {[m
[32m+[m[32m        let profileEditionRequest = {[m
[32m+[m[32m            currentEmail: getUserDetails().email,[m
[32m+[m[32m            email,[m
[32m+[m[32m            name,[m
[32m+[m[32m            surname,[m
[32m+[m[32m            phoneNumber[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        authAxios.put('/users', profileEditionRequest)[m
[32m+[m[32m        .then(async (response) => {[m
[32m+[m[32m            console.log(response.data);[m
[32m+[m[32m            let newAuthState = response.data;[m
[32m+[m[32m            await updateAuthState(newAuthState);[m
[32m+[m[32m            setShowProfileEditionSuccess(true);[m
[32m+[m[32m        }).catch(error => {[m
[32m+[m[32m            setShowProfileEditionError(true);[m
[32m+[m[32m            console.log(error);[m
[32m+[m[32m        });[m
[32m+[m[32m    };[m
[32m+[m
[32m+[m[32m    function handlePasswordChangeSuccess() {[m
         setShowPasswordChangeSuccess(false);[m
         setShowPasswordChangeForm(false);[m
     }[m
 [m
[32m+[m[32m    function handleProfileEditionSuccess() {[m
[32m+[m[32m        setShowProfileEditionSuccess(false);[m
[32m+[m[32m        setShowProfileEditionForm(false);[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    function displayPasswordChangeForm() {[m
[32m+[m[32m        setShowPasswordChangeForm(true);[m
[32m+[m[32m        setShowProfileEditionForm(false);[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    function displayProfileEditionForm() {[m
[32m+[m[32m        setShowPasswordChangeForm(false);[m
[32m+[m[32m        setShowProfileEditionForm(true);[m
[32m+[m[32m    }[m
[32m+[m
     useEffect(() => {[m
         loadProfileData();[m
     }, []);[m
[36m@@ -93,12 +135,12 @@[m [mexport default function ProfileScreen({navigation}) {[m
                             <ProfileDataRow header = {'Typ konta: '} text = {profileData.role === 'ROLE_USER' ? 'zamawiający' : 'dostawca'}/>[m
                         </View>[m
 [m
[31m-                        <TouchableOpacity onPress = {() => console.log('Zmień dane')} style = {[FormStyles.defaultButton, {flexDirection: 'row'}]}>[m
[32m+[m[32m                        <TouchableOpacity onPress = {() => displayProfileEditionForm()} style = {[FormStyles.defaultButton, {flexDirection: 'row'}]}>[m
                             <Icon name="form-select" size={30} color="white" style = {{paddingRight: 10}}/>[m
                             <Text style = {FormStyles.defaultText}>Zmień dane</Text>[m
                         </TouchableOpacity>[m
 [m
[31m-                        <TouchableOpacity onPress = {() => setShowPasswordChangeForm(true)} style = {[FormStyles.defaultButton, {flexDirection: 'row'}]}>[m
[32m+[m[32m                        <TouchableOpacity onPress = {() => displayPasswordChangeForm()} style = {[FormStyles.defaultButton, {flexDirection: 'row'}]}>[m
                             <Icon name="form-textbox-password" size={30} color="white" style = {{paddingRight: 10}}/>[m
                             <Text style = {FormStyles.defaultText}>Zmień hasło</Text>[m
                         </TouchableOpacity>[m
[36m@@ -111,13 +153,29 @@[m [mexport default function ProfileScreen({navigation}) {[m
                         }[m
 [m
                         {showPasswordChangeSuccess && [m
[31m-                            <Alert title = {'Sukces!'} message = {'Twoje hasło zostało pomyślnie zmienione!'} onClose={() => handleSuccess()}/>[m
[32m+[m[32m                            <Alert title = {'Sukces!'} message = {'Twoje hasło zostało pomyślnie zmienione!'} onClose={() => handlePasswordChangeSuccess()}/>[m
                         }[m
 [m
                         {showPasswordChangeError && [m
                             <Alert title = {'Błąd!'} message = {'Nie udało się zmienić hasła!'} onClose={() => setShowPasswordChangeError(false)}/>[m
                         }[m
 [m
[32m+[m[32m                        {showProfileEditionForm &&[m[41m [m
[32m+[m[32m                            <ProfileEditionForm[m[41m [m
[32m+[m[32m                            profileData = {profileData}[m
[32m+[m[32m                            onSubmit = {sendProfileEditionRequest}[m[41m [m
[32m+[m[32m                            onCancel = {setShowProfileEditionForm}[m
[32m+[m[32m                            />[m
[32m+[m[32m                        }[m
[32m+[m
[32m+[m[32m                        {showProfileEditionSuccess &&[m[41m [m
[32m+[m[32m                            <Alert title = {'Sukces!'} message = {'Twój profil został zaktualizowany!'} onClose={() => handleProfileEditionSuccess()}/>[m
[32m+[m[32m                        }[m
[32m+[m
[32m+[m[32m                        {showProfileEditionError &&[m[41m [m
[32m+[m[32m                            <Alert title = {'Błąd!'} message = {'Nie udało się zaktualizować Twojego profilu!'} onClose={() => setShowProfileEditionError(false)}/>[m
[32m+[m[32m                        }[m
[32m+[m
                     </>[m
                 }[m
                 [m
[1mdiff --git a/mobile-app/src/Styles/FormStyles.js b/mobile-app/src/Styles/FormStyles.js[m
[1mindex 7a1e915..a226481 100644[m
[1m--- a/mobile-app/src/Styles/FormStyles.js[m
[1m+++ b/mobile-app/src/Styles/FormStyles.js[m
[36m@@ -31,11 +31,18 @@[m [mexport default StyleSheet.create({[m
         borderRadius: 5,[m
         borderColor: 'white',[m
         width: '80%',[m
[32m+[m[32m        height: 50,[m
         padding: 5,[m
         marginBottom: 8,[m
         color: 'white',[m
     },[m
 [m
[32m+[m[32m    uneditableTextInput: {[m
[32m+[m[32m        borderColor: '#736b68',[m
[32m+[m[32m        color: '#736b68',[m
[32m+[m[32m        backgroundColor: 'rgba(0, 0, 0, 0.5)'[m
[32m+[m[32m    },[m
[32m+[m
     defaultText: {[m
         color: 'white',[m
         fontSize: 16,[m
[1mdiff --git a/mobile-app/src/UniversalComponents/UserDataInputValidator.js b/mobile-app/src/UniversalComponents/UserDataInputValidator.js[m
[1mnew file mode 100644[m
[1mindex 0000000..fb1d3f2[m
[1m--- /dev/null[m
[1m+++ b/mobile-app/src/UniversalComponents/UserDataInputValidator.js[m
[36m@@ -0,0 +1,39 @@[m
[32m+[m[32mconst UserDataInputValidator = {[m
[32m+[m
[32m+[m[32m    validateEmail: function (email) {[m
[32m+[m[32m        const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;[m
[32m+[m[32m        if (!validEmailRegex.test(email)) {[m
[32m+[m[32m          return 'Niepoprawny adres e-mail!';[m
[32m+[m[32m        } else {[m
[32m+[m[32m            return '';[m
[32m+[m[32m        }[m
[32m+[m[32m    },[m
[32m+[m
[32m+[m[32m    validatePassword: function (password) {[m
[32m+[m[32m        const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;[m
[32m+[m[32m        if (!validPasswordRegex.test(password)) {[m
[32m+[m[32m          return 'Hasło musi zawierać co najmniej 8 znaków, cyfrę i znak specjalny!';[m
[32m+[m[32m        } else {[m
[32m+[m[32m          return '';[m
[32m+[m[32m        }[m
[32m+[m[32m    },[m
[32m+[m
[32m+[m[32m    checkPasswordEquality: function (confirmPassword, password) {[m
[32m+[m[32m        if (!(confirmPassword === password)) {[m
[32m+[m[32m          return 'Podane hasła nie są takie same!';[m
[32m+[m[32m        } else {[m
[32m+[m[32m          return '';[m
[32m+[m[32m        }[m
[32m+[m[32m    },[m
[32m+[m
[32m+[m[32m    validatePhoneNumber: function (phoneNumber) {[m
[32m+[m[32m        const validPhoneRegex = /^[0-9]{9}$/;[m
[32m+[m[32m        if (!validPhoneRegex.test(phoneNumber)) {[m
[32m+[m[32m          return 'Niepoprawny numer telefonu!';[m
[32m+[m[32m        } else {[m
[32m+[m[32m          return '';[m
[32m+[m[32m        }[m
[32m+[m[32m    }[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mexport default UserDataInputValidator;[m
\ No newline at end of file[m
[1mdiff --git a/projekt_indywidualny.eap b/projekt_indywidualny.eap[m
[1mindex 9fc8347..51ef0d4 100644[m
Binary files a/projekt_indywidualny.eap and b/projekt_indywidualny.eap differ

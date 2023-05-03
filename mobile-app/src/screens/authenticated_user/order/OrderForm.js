import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import FormStyles from '../../../styles/FormStyles';
import Alert from '../../../universal-components/Alert';

export default function OrderForm() {

    const [city, setCity] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [apartmentNumber, setApartmentNumber] = useState('');
    const [postcode, setPostcode] = useState('');

    const [error, setError] = useState('');
    const [showErrorBox, setShowErrorBox] = useState(false);
    const [showSuccessBox, setShowSuccessBox] = useState(false);

    const handleSubmit = () => {
        if (city && streetAddress && houseNumber) {
            console.log('Address:', streetAddress);
            console.log('City:', city);
            console.log('Postcode:', postcode);
        } else {
            setError('Wypełnij wszystkie pola!');
        }
    };

    return (
        <View style = {FormStyles.background}>
            <View style={[FormStyles.container, {marginTop: 40}]}>
                <Text style={[FormStyles.defaultText, {fontSize: 30, paddingBottom: 30}]}>Podaj adres dostawy!</Text>

                {error ? <Text style={FormStyles.errorText}>{error}</Text> : null}

                <TextInput
                    style={FormStyles.textInput}
                    placeholder="Miasto"
                    value={city}
                    onChangeText={setCity}
                />

                <TextInput
                    style={FormStyles.textInput}
                    placeholder="Ulica"
                    value={streetAddress}
                    onChangeText={setStreetAddress}
                />

                <View style = {{justifyContent: 'space-between', flexDirection: 'row', width: '80%'}}>
                    <TextInput
                        style={[FormStyles.textInput, {width: '45%'}]}
                        placeholder="nr domu"
                        value={houseNumber}
                        onChangeText={setHouseNumber}
                    />
                    <TextInput
                        style={[FormStyles.textInput, {width: '45%'}]}
                        placeholder="nr mieszkania"
                        value={apartmentNumber}
                        onChangeText={setApartmentNumber}
                    />
                </View>
                <TextInput
                    style={FormStyles.textInput}
                    placeholder="Postcode"
                    value={postcode}
                    onChangeText={setPostcode}
                />

                <TouchableOpacity
                    style={FormStyles.defaultButton}
                    onPress={handleSubmit}
                >
                    <Text style={FormStyles.defaultText}>Zamów</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

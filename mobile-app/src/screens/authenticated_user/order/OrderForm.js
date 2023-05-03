import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import FormStyles from '../../../styles/FormStyles';
import Alert from '../../../universal-components/Alert';
import { AuthContext } from '../../../context/AuthContext';
import { CartContext } from '../../../context/CartContext';
import { AxiosContext } from '../../../context/AxiosContext';

export default function OrderForm() {

    const {authState} = useContext(AuthContext);
    const {cartState} = useContext(CartContext);
    const {authAxios} = useContext(AxiosContext);

    const [city, setCity] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [apartmentNumber, setApartmentNumber] = useState('');
    const [postcode, setPostcode] = useState('');

    const [error, setError] = useState('');
    const [showErrorBox, setShowErrorBox] = useState(false);
    const [showSuccessBox, setShowSuccessBox] = useState(false);

    async function createOrder() {
        if (city && streetAddress && houseNumber) {
            orderRequest = {
                purchaserEmail: authState.userDetails.email,
                address: createAddress(),
                productList: createProductListDTO()
            }

            await authAxios.post('/orders', orderRequest
              ).then(response => {
                setShowSuccessBox(true);
              }).error(error => {
                setShowErrorBox(true);
              })
        } else {
            setError('Pola miasto, ulica i numer domu są obowiązkowe!');
        }
    };

    function createAddress() {
        let address = streetAddress + ' ' + houseNumber;
        if (apartmentNumber) {
            address += '/' + apartmentNumber;
        }
        if (postcode) {
            address += ' ' + postcode;
        }
        address += ' ' + city;
        return address;
    };

    function createProductListDTO() {
        let products = [...cartState.products];
        products = products.map(item => ({
            productId: item.product.productId,
            count: item.count
        }));
        return products;
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
                    onPress={() => createOrder()}
                >
                    <Text style={FormStyles.defaultText}>Zamów</Text>
                </TouchableOpacity>
            </View>
            {showSuccessBox && 
                <Alert title = {'Zamówienie dodane!'} message = {"Pomyślnie dodano zamówienie"} onClose={() => setShowSuccessBox(false)}/>
            }
            {showErrorBox && 
                <Alert title = {'Błąd!'} message = {"Nie udało się dodać zamówienia!"} onClose={() => setShowErrorBox(false)}/>
            }
        </View>
    );
};

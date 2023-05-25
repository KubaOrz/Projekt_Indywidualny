import React, { useContext, useEffect, useState, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import OrderStatusBox from '../OrderStatusBox';
import UserOrderInfoBox from './UserOrderInfoBox';
import UserOrderSummaryBox from './UserOrderSummaryBox'

import OrderDetailsStyles from '../../Styles/OrderDetailsStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function UserOrderDetailsBody({orderData, onPressShoppingList}) {
    return (
        <View style = {OrderDetailsStyles.body}>
                <OrderStatusBox status = {orderData.status}/>

                <UserOrderInfoBox orderData = {orderData}/>

                <UserOrderSummaryBox orderData = {orderData}/>

                <TouchableOpacity onPress = {() => onPressShoppingList(true)} style = {OrderDetailsStyles.button}>
                    <Icon name="format-list-checks" size={40} color="black" style = {{flex: 1}}/>
                    <Text style = {OrderDetailsStyles.buttonText}>Pokaż listę zakupów</Text>
                </TouchableOpacity>

                {orderData.status === 'IN_PROGRESS' && 

                <TouchableOpacity onPress = {() => console.log('Wyświetlam mapkę')} style = {OrderDetailsStyles.button}>
                    <Icon name="map-marker" size={40} color="red" style = {{flex: 1}}/>
                    <Text style = {OrderDetailsStyles.buttonText}>Pokaż lokalizację dostawcy</Text>
               </TouchableOpacity>               
                }

            </View>
    )
}
import React, { useContext, useEffect, useState, useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import OrderDetailsStyles from '../../Styles/OrderDetailsStyles';
import OrderStatusBox from '../OrderStatusBox';
import ShoppingList from '../ShoppingList';
import SupplierOrderInfoBox from './SupplierOrderInfoBox';
import { StackActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SupplierOrderSummaryBox from './SupplierOrderSummaryBox';

export default function SupplierOrderDetailsBody({orderData, onPressShoppingList, onPressFinishOrder, onPressStartOrder}) {
    return (
        <View style = {OrderDetailsStyles.body}>
            <OrderStatusBox status = {orderData.status}/>

            <SupplierOrderInfoBox orderData = {orderData}/>

            <SupplierOrderSummaryBox orderData = {orderData}/>

            <TouchableOpacity onPress = {() => onPressShoppingList(true)} style = {OrderDetailsStyles.button}>
                <Icon name="format-list-checks" size={40} color="black" style = {{flex: 1}}/>
                <Text style = {OrderDetailsStyles.buttonText}>Pokaż listę zakupów</Text>
            </TouchableOpacity>

            {orderData.status === 'IN_PROGRESS' &&
                <>
                    <TouchableOpacity onPress = {() => console.log('Wyświetlam mapkę')} style = {OrderDetailsStyles.button}>
                        <Icon name="map" size={40} color="#ebc323" style = {{flex: 1}}/>
                        <Text style = {OrderDetailsStyles.buttonText}>Pokaż trasę</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {() => onPressFinishOrder(true)} style = {OrderDetailsStyles.button}>
                        <Icon name="checkbox-marked" size={40} color="green" style = {{flex: 1}}/>
                        <Text style = {OrderDetailsStyles.buttonText}>Potwierdź dostarczenie</Text>
                    </TouchableOpacity>
                </>
            }

            {orderData.status === 'ACTIVE' &&

                <TouchableOpacity onPress = {() => onPressStartOrder(true)} style = {OrderDetailsStyles.button}>
                    <Icon name="truck-delivery" size={40} color="red" style = {{flex: 1}}/>
                    <Text style = {OrderDetailsStyles.buttonText}>Podejmij zamówienie</Text>
                </TouchableOpacity>
            }

        </View>
    )
}
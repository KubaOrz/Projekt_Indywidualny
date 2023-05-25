import { View, Text, StyleSheet } from "react-native"
import OrderDetailsStyles from "../../Styles/OrderDetailsStyles";
import { formatLocalDateTime } from "../../UniversalComponents/DateFormatter";
import OrderInfoBoxItem from "../OrderInfoBoxItem";

export default function SupplierOrderInfoBox({orderData}) {

    const {status, purchaser, address, orderDate, pickUpDate, deliveryDate, totalPrice} = orderData;

    return (
        <View style = {OrderDetailsStyles.orderDetailsContainer}>
                <Text style = {OrderDetailsStyles.orderDetailsTitle}>Szczegóły zamówienia</Text>

                <View style = {OrderDetailsStyles.infoBoxItem}>
                    <Text style = {OrderDetailsStyles.orderDetailsHeader}>Zamawiający:</Text>
                    <View style = {OrderDetailsStyles.infoBoxItemRight}>
                        <Text style = {OrderDetailsStyles.orderDetailsText}>{purchaser.purchaserName}</Text>
                        <Text style = {OrderDetailsStyles.orderDetailsText}>{purchaser.purchaserEmail}</Text>
                        {status === 'IN_PROGRESS' &&
                            <Text style = {OrderDetailsStyles.orderDetailsText}>{purchaser.purchaserPhoneNumber}</Text>
                        }
                    </View>
                </View>

                <OrderInfoBoxItem header = {'Adres dostawy'} data = {address} />

                <OrderInfoBoxItem header = {'Data zamówienia'} data = {formatLocalDateTime(new Date (orderDate))} />

                {status === 'IN_PROGRESS' &&
                    <OrderInfoBoxItem header = {'Data rozpoczęcia'} data = {formatLocalDateTime(new Date (pickUpDate))} />
                }

                {status === 'DELIVERED' &&
                    <OrderInfoBoxItem header = {'Data dostarczenia'} data = {formatLocalDateTime(new Date (deliveryDate))} />
                }

                <OrderInfoBoxItem header = {'Wartość zamówienia'} data = {totalPrice.toFixed(2) + " zł"} />
        </View>
    )
};
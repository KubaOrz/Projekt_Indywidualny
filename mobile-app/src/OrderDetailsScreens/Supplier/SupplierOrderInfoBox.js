import { View, Text, StyleSheet } from "react-native"
import OrderDetailsStyles from "../../Styles/OrderDetailsStyles";
import { formatLocalDateTime } from "../../UniversalComponents/DateFormatter";

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

                <View style = {OrderDetailsStyles.infoBoxItem}>
                    <Text style = {OrderDetailsStyles.orderDetailsHeader}>Adres dostawy:</Text>
                    <Text style = {[OrderDetailsStyles.orderDetailsText, OrderDetailsStyles.infoBoxItemRight]}>{address}</Text>
                </View>

                <View style = {OrderDetailsStyles.infoBoxItem}>
                    <Text style = {OrderDetailsStyles.orderDetailsHeader}>Data zamówienia:</Text>
                    <Text style = {[OrderDetailsStyles.orderDetailsText, OrderDetailsStyles.infoBoxItemRight]}>{formatLocalDateTime(new Date (orderDate))}</Text>
                </View>

                {status === 'IN_PROGRESS' &&
                    <View style = {OrderDetailsStyles.infoBoxItem}>
                        <Text style = {OrderDetailsStyles.orderDetailsHeader}>Data rozpoczęcia:</Text>
                        <Text style = {[OrderDetailsStyles.orderDetailsText, OrderDetailsStyles.infoBoxItemRight]}>{formatLocalDateTime(new Date (pickUpDate))}</Text>
                    </View>
                }

                {status === 'DELIVERED' &&
                    <View style = {OrderDetailsStyles.infoBoxItem}>
                        <Text style = {OrderDetailsStyles.orderDetailsHeader}>Data dostarczenia:</Text>
                        <Text style = {[OrderDetailsStyles.orderDetailsText, OrderDetailsStyles.infoBoxItemRight]}>{formatLocalDateTime(new Date (deliveryDate))}</Text>
                    </View>
                }

                <View style = {OrderDetailsStyles.infoBoxItem}>
                    <Text style = {OrderDetailsStyles.orderDetailsHeader}>Wartość zamówienia:</Text>
                    <Text style = {[OrderDetailsStyles.orderDetailsText, OrderDetailsStyles.infoBoxItemRight]}>{totalPrice.toFixed(2)} zł</Text>
                </View>
        </View>
    )
};
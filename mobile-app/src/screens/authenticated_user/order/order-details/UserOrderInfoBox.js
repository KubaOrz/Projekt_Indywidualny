import { View, Text } from "react-native"
import OrderDetailsStyles from '../../../../styles/OrderDetailsStyles';
import { formatLocalDateTime } from "../../../../universal-components/DateFormatter";

export default function UserOrderInfoBox({orderData}) {

    const {status, address, orderDate, pickUpDate, deliveryDate, totalPrice} = orderData;

    return (
        <View style = {OrderDetailsStyles.orderDetailsContainer}>
                <Text style = {OrderDetailsStyles.orderDetailsTitle}>Szczegóły zamówienia</Text>

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

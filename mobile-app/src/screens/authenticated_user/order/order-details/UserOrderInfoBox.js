import { View, Text } from "react-native"
import OrderDetailsStyles from '../../../../styles/OrderDetailsStyles';

export default function UserOrderInfoBox({orderData}) {

    const {status, address, orderDate, pickUpDate, deliveryDate, totalPrice} = orderData;

    function formatLocalDateTime(dateTime) {
        const formatter = new Intl.DateTimeFormat('pl', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
      
        return formatter.format(dateTime);
      }

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

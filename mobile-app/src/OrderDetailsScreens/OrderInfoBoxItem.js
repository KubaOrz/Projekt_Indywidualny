import { View, Text } from "react-native"
import OrderDetailsStyles from "../Styles/OrderDetailsStyles"

export default function OrderInfoBoxItem({header, data}) {

    return (
        <View style = {OrderDetailsStyles.infoBoxItem}>
            <Text style = {OrderDetailsStyles.orderDetailsHeader}>{header}:</Text>
            <Text style = {[OrderDetailsStyles.orderDetailsText, OrderDetailsStyles.infoBoxItemRight]}>{data}</Text>
        </View>
    )
}
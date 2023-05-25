import OrderListItem from "./OrderListItem";
import { View, FlatList } from "react-native";

export default function OrdersList({orders, navigation, displayType, onEndReached}) {

    const renderItem = ({ item }) => (
        <OrderListItem
            order = {item}
            navigation = {navigation}
            displayType = {displayType}
            />
      );

      if (onEndReached) {
        return (
            <View style = {{flex: 7, width: '100%'}}>
                <FlatList
                    data = {orders}
                    renderItem = {renderItem}
                    keyExtractor={item => item.id.toString()}
                    style = {{paddingTop: 10, paddingBottom: 10}}
                    showsVerticalScrollIndicator={false}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={0.5}
                /> 
            </View>
        )
      } else {
        return (
            <View style = {{flex: 7, width: '100%'}}>
                <FlatList
                    data = {orders}
                    renderItem = {renderItem}
                    keyExtractor={item => item.id.toString()}
                    style = {{paddingTop: 10, paddingBottom: 10}}
                    showsVerticalScrollIndicator={false}
                /> 
            </View>
        )
      }
}
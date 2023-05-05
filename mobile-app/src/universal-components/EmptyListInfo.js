import { StyleSheet, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function EmptyListInfo(props) {

    return (
        <View style = {styles.container}>
            <Text style = {styles.text}>{props.text}</Text>
            <Text>
                <Icon name="clipboard-remove-outline" size={70} color="gray" />
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        fontSize: 24,
        textAlign: 'center',
        color: 'gray'
    },
});
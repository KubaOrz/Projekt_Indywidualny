import { View, Text, Animated, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function OrderStatusBox(props) {

    const {status} = props;
    const [scaleAnim] = useState(new Animated.Value(1));

    useEffect(() => {
        Animated.loop(
        Animated.sequence([
            Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 500,
            useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            }),
        ]),
        ).start();
    }, []);

    if (status === 'ACTIVE') {
        return (
            <View style = {[styles.statusContainer, {backgroundColor: '#ebc323'}]}>
                <Text style = {styles.statusText}>Zamówienie nie zostało jeszcze podjęte</Text>
                <Animated.View style={{ transform: [{ scale: scaleAnim }], marginBottom: 20 }}>
                    <Icon name="magnify" size={50} color="white" />
                </Animated.View>
            </View>
        )
    } else {
        <View style = {[styles.statusContainer, {backgroundColor: 'green'}]}>
            <Text style = {styles.statusText}>Zamówienie jest w trakcie realizacji</Text>
            <Animated.View style={{ transform: [{ scale: scaleAnim }], marginBottom: 20 }}>
               <Icon name="truck-delivery" size={50} color="white" />
            </Animated.View>
        </View>
    }
};

const styles = StyleSheet.create({
    statusContainer: {
        width: '100%',
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 20
    },
    
    statusText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
        marginBottom: 20,
    },
});

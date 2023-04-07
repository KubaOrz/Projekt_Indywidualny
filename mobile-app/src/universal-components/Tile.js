import { Pressable, View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import DefaultStyles from '../styles/DefaultStyles'

export default function Tile(props) {

    return(
            <View style = {DefaultStyles.labeledTileContainer}>
                <Pressable style = {DefaultStyles.tile} onPress = {props.onPress}>
                    <ImageBackground source = {props.backgroundImage} style = {DefaultStyles.tileBackgroundImage} >
                    </ImageBackground>
                </Pressable>
                <Text style = {DefaultStyles.label}>{props.label}</Text>
            </View>
    )
}
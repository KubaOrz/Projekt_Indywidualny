import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    defaultButton: {
        backgroundColor: '#C10D49',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: '80%',
        borderColor: 'white',
        borderWidth: 2,
        marginBottom: 20
    },

    tileRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 55
    },

    tileContainer: {
        marginBottom: 40,
        width: '100%'
    },

    tile: {
        width: '70%',
        aspectRatio: 1,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 8,
    },

    tileBackgroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    labeledTileContainer: {
        alignItems: 'center',
        flex: 1
    },

    label: {
        marginTop: 5,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    header: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    defaultText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
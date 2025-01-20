import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function QRResultScreen({ route, navigation }: { route: any; navigation: any }) {
    const { qrData } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Données du QR Code</Text>
            <Text style={styles.qrData}>{qrData}</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Revenir au Scanner</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    qrData: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

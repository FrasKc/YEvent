import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, FlatList, SafeAreaView, Alert} from 'react-native';
import Colors from '@/constants/Colors';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
import GradientBackground from "@/components/GradientBackground";
import { signOut } from '@/services/authService';


export default function ProfileScreen(navigation: { reset: (arg0: { index: number; routes: { name: string; }[]; }) => void; }) {
    const handleSignOut = async () => {
        const { error } = await signOut();
        if (error) {
            Alert.alert('Erreur', 'Impossible de se déconnecter. Réessayez.');
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }], // Redirection vers la page Login
            });
        }
    };

    return (
        <GradientBackground startColor={Colors.primary} endColor={Colors.background} locations={[0, 0.4]}>
        <SafeAreaView>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.profilePictureContainer}>
                    <Icon name="person-outline" size={70} color="#fff" />
                </View>
                <Text style={styles.name}>Célian Frasca</Text>
                <Text style={styles.email}>celian.frasca@gmail.com</Text>
                <TouchableOpacity style={styles.settingsButton} onPress={handleSignOut}>
                    <Icon name="settings-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 20,
    },
    profilePictureContainer: {
        backgroundColor: Colors.card,
        width: 160,
        height: 160,
        borderRadius: 90,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    email: {
        fontSize: 14,
        color: '#c1d4f1',
    },
    settingsButton: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    reservationContainer: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 10,
    },
    card: {
        backgroundColor: Colors.card,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },
    image: {
        height: 150,
        width: '100%',
    },
    cardContent: {
        padding: 10,
    },
    price: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
        fontSize: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: Colors.text,
    },
    location: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#4daaf7',
        paddingVertical: 8,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: Colors.card,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        elevation: 5,
    },
    footerButton: {
        alignItems: 'center',
    },
    footerButtonActive: {
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    footerTextActive: {
        fontSize: 12,
        color: Colors.secondary,
        fontWeight: 'bold',
    },
});

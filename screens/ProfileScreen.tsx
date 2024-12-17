import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator, FlatList } from 'react-native';
import Colors from '@/constants/Colors';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
import GradientBackground from "@/components/GradientBackground";
import { signOut } from '@/services/authService';
import { getCurrentUser } from '@/services/userService';
import { getUserReservations } from '@/services/reservationService';
import ConfirmationMessage from '@/components/ConfirmationMessage';

export default function ProfileScreen({ navigation }: { navigation: any }) {
    const [user, setUser] = useState<any>(null);
    const [reservations, setReservations] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showConfirmLogout, setShowConfirmLogout] = useState<boolean>(false);

    // Récupération des informations de l'utilisateur
    useEffect(() => {
        const fetchUserData = async () => {
            const { data, error } = await getCurrentUser();
            if (error) {
                console.error('Erreur lors de la récupération des informations utilisateur :', error.message);
                Alert.alert('Erreur', 'Impossible de récupérer les informations de votre profil.');
            } else {
                setUser(data);

                // Récupération des réservations
                const { data: reservationsData, error: reservationsError } = await getUserReservations(data.id);
                if (reservationsError) {
                    console.error('Erreur lors de la récupération des réservations :', reservationsError.message);
                    Alert.alert('Erreur', 'Impossible de récupérer vos réservations.');
                } else if (reservationsData && reservationsData.length > 0) {
                    setReservations(reservationsData);
                } else {
                    setReservations([]);
                }
            }
            setLoading(false);
        };

        fetchUserData();
    }, []);

    // Déconnexion
    const handleSignOut = async () => {
        const { error } = await signOut();
        if (error) {
            Alert.alert('Erreur', 'Impossible de se déconnecter. Réessayez.');
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.secondary} />
            </View>
        );
    }

    return (
        <GradientBackground startColor={Colors.primary} endColor={Colors.background} locations={[0, 0.4]}>
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.profilePictureContainer}>
                        <Icon name="person-outline" size={70} color="#fff" />
                    </View>
                    <Text style={styles.name}>{user?.nom || 'Nom inconnu'}</Text>
                    <Text style={styles.email}>{user?.email || 'Email inconnu'}</Text>
                    <TouchableOpacity
                        style={styles.settingsButton}
                        onPress={() => setShowConfirmLogout(true)}
                    >
                        <Icon name="log-out-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Liste des réservations */}
                <View style={styles.reservationSection}>
                    <Text style={styles.sectionTitle}>Vos réservations</Text>
                    {reservations.length > 0 ? (
                        <FlatList
                            data={reservations}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.reservationCard}>
                                    <Text style={styles.eventTitle}>Événement ID : {item.evenement_id}</Text>
                                    <Text style={styles.details}>Nombre de billets : {item.nb_billets}</Text>
                                    <Text style={styles.details}>Numéro de confirmation : {item.numero_conf}</Text>
                                </View>
                            )}
                        />
                    ) : (
                        <Text style={styles.noReservation}>Vous n'avez aucune réservation pour le moment.</Text>
                    )}
                </View>

                {/* Confirmation de déconnexion */}
                <ConfirmationMessage
                    visible={showConfirmLogout}
                    title="Déconnexion"
                    message="Êtes-vous sûr de vouloir vous déconnecter ?"
                    onConfirm={handleSignOut}
                    onCancel={() => setShowConfirmLogout(false)}
                    confirmText="Déconnexion"
                    cancelText="Annuler"
                />
            </SafeAreaView>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        color: Colors.text,
        marginTop: 10,
    },
    email: {
        marginTop: 5,
        fontSize: 16,
        color: Colors.textSecondary,
    },
    settingsButton: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    reservationSection: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
        color: Colors.text,
    },
    reservationCard: {
        backgroundColor: Colors.card,
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 3,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    details: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginTop: 5,
    },
    noReservation: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop: 20,
    },
});

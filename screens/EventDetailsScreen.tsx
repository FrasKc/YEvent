import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import Colors from '@/constants/Colors';
import { getEventById } from '@/services/eventService';
import GradientBackground from '@/components/GradientBackground';
import CustomButton from '@/components/CustomButton';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
import SeatSelector from "@/components/SeatSelector";

export default function EventDetailsScreen({ route, navigation }: any) {
    const { eventId } = route.params;
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedSeats, setSelectedSeats] = useState<number>(1); // État pour les places sélectionnées

    useEffect(() => {
        const fetchEventDetails = async () => {
            const { data, error } = await getEventById(eventId);
            if (error) {
                Alert.alert('Erreur', 'Impossible de récupérer les détails de l\'événement.');
            } else {
                setEvent(data);
            }
            setLoading(false);
        };

        fetchEventDetails();
    }, [eventId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <GradientBackground startColor={Colors.secondary} endColor={Colors.background} locations={[0, 0.2]}>
            <SafeAreaView style={styles.container}>
                {/* AppBar */}
                <View style={styles.appBar}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.appBarTitle}>Réservation</Text>
                </View>

                {/* Card principale */}
                <ScrollView contentContainerStyle={styles.cardContainer}>
                    <View style={styles.card}>
                        {/* Image et titre */}
                        <View style={styles.header}>
                            <Image source={{ uri: 'https://via.placeholder.com/400x200' }} style={styles.image} />
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{event.titre}</Text>
                                <Text style={styles.location}>{event.lieu}</Text>
                            </View>
                        </View>
                        <View style={styles.separator} />

                        {/* Description */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Description</Text>
                            <Text style={styles.description}>{event.description}</Text>
                        </View>

                        {/* Détails */}
                        <View style={styles.detailsContainer}>
                            <View style={styles.detailBox}>
                                <Text style={styles.sectionTitle}>Date</Text>
                                <Text style={styles.placesValue}>{event.date}</Text>
                            </View>
                            <View style={styles.detailBox}>
                                <Text style={styles.sectionTitle}>Capacité</Text>
                                <Text style={styles.placesValue}>{event.capacite} places</Text>
                            </View>
                        </View>

                        {/* Places restantes */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Places restantes</Text>
                            <Text style={styles.placesValue}>{event.places_restantes} places restantes</Text>
                        </View>

                        <View style={styles.footer}>
                            {/* SeatSelector */}
                            <SeatSelector
                                onValueChange={(value) => setSelectedSeats(value)}
                                maxSeats={event.places_restantes}
                            />

                            {/* Bouton Réserver */}
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: Colors.secondary }]}
                                onPress={() => Alert.alert('Réservation', `Vous avez réservé ${selectedSeats} places.`)}
                            >
                                <Text style={styles.buttonText}>Réserver</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
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
    },
    appBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        elevation: 5,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        zIndex: 1,
    },
    appBarTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardContainer: {
        padding: 20,
        alignItems: 'center',
    },
    card: {
        backgroundColor: Colors.card,
        borderRadius: 10,
        padding: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    titleContainer: {
        marginLeft: 15,
        flex: 1,
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Colors.text,
    },
    location: {
        fontSize: 13,
        color: Colors.textSecondary,
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text,
    },
    description: {
        fontSize: 13,
        color: Colors.textSecondary,
        lineHeight: 20,
        marginTop: 5,
        marginBottom: 10,
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    detailBox: {
        alignItems: 'flex-start',
        flex: 1,
    },
    detailTitle: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text,
    },
    placesTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text,
        marginTop: 10,
    },
    placesValue: {
        fontSize: 13,
        color: Colors.secondary,
        marginTop: 10,
    },
    footer: {
        marginTop: 20,
        flexDirection: 'row', // Met les enfants en ligne
        alignItems: 'center', // Aligne verticalement
        justifyContent: 'space-between', // Répartition équilibrée
        gap: 10, // Ajoute un espacement entre les enfants (React Native >= 0.71)
    },
    button: {
        flex: 1, // Prend tout l'espace restant
        marginTop: 0, // Enlève le marginTop ici si présent
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
    },
    separator: {
        height: 1,
        backgroundColor: Colors.variant, // Utilisation de la couleur de bordure
        marginVertical: 15, // Espacement au-dessus et en dessous du trait
    },
});

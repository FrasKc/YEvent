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
    SafeAreaView
} from 'react-native';
import Colors from '@/constants/Colors';
import { getEventById } from '@/services/eventService';
import GradientBackground from '@/components/GradientBackground';
import CustomButton from '@/components/CustomButton';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';

export default function EventDetailsScreen({ route, navigation }: any) {
    const { eventId } = route.params;
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

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
                <ActivityIndicator size="large"  />
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

                <ScrollView>
                    {/* Image et titre */}
                    <View style={styles.header}>
                        <Image source={{ uri: 'https://via.placeholder.com/400x200' }} style={styles.image} />
                        <Text style={styles.title}>{event.titre}</Text>
                        <Text style={styles.location}>{event.lieu}</Text>
                    </View>

                    {/* Description */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>{event.description}</Text>
                    </View>

                    {/* Détails */}
                    <View style={styles.detailsContainer}>
                        <View style={styles.detailBox}>
                            <Text style={styles.detailTitle}>Date</Text>
                            <Text style={styles.detailValue}>{event.date}</Text>
                        </View>
                        <View style={styles.detailBox}>
                            <Text style={styles.detailTitle}>Capacité</Text>
                            <Text style={styles.detailValue}>{event.capacite} places</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.placesTitle}>Places restantes</Text>
                        <Text style={styles.placesValue}>{event.places_restantes} places restantes</Text>
                    </View>

                    {/* Réserver */}
                    <View style={styles.footer}>
                        <CustomButton
                            title="Réserver"
                            onPress={() => Alert.alert('Réservation', 'Votre réservation a été confirmée !')}
                        />
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
    header: {
        alignItems: 'center',
        marginVertical: 10,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.text,
    },
    location: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    section: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: Colors.textSecondary,
        lineHeight: 20,
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    detailBox: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 10,
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
    },
    placesValue: {
        fontSize: 14,
        color: Colors.secondary,
    },
    footer: {
        marginTop: 20,
        marginHorizontal: 20,
    },
});

import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Text,
    Keyboard,
    TouchableWithoutFeedback,
    SafeAreaView,
} from 'react-native';
import GradientBackground from '@/components/GradientBackground';
import SearchBar from '@/components/SearchBar';
import EventCard from '@/components/EventCard';
import Colors from '@/constants/Colors';
import { fetchEvents } from '@/services/eventService';
import { Event } from '@/models/event';
import { formatDate } from '@/utils/dateUtils';

export default function HomeScreen() {
    const [events, setEvents] = useState<Event[]>([]); // État pour stocker les événements
    const [loading, setLoading] = useState<boolean>(true); // État pour gérer le chargement

    // Appel du service pour récupérer les événements
    useEffect(() => {
        const loadEvents = async () => {
            setLoading(true);
            const data = await fetchEvents();
            setEvents(data);
            setLoading(false);
        };

        loadEvents().then(() => console.log('Events loaded'));
    }, []);

    return (
        <GradientBackground
            startColor={Colors.secondary}
            endColor={Colors.background}
            locations={[0, 0.2]}
        >
                <SafeAreaView style={{ flex: 1 }}>
                    <SearchBar placeholder="Rechercher..." />

                    {loading ? (
                        <ActivityIndicator size="large" color={Colors.secondary} style={styles.loader} />
                    ) : events.length > 0 ? (
                        <FlatList
                            data={events}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <EventCard
                                    image={'https://via.placeholder.com/400x200'}
                                    price={`${item.capacite}€`}
                                    title={item.titre}
                                    date={formatDate(item.date)}
                                    places={item.places_restantes}
                                    location={item.lieu}
                                    onPress={() => console.log(`Détails de l'événement : ${item.titre}`)}
                                />
                            )}
                            contentContainerStyle={{
                                paddingBottom: 20, // Ajoute un espace pour éviter le "bloquage"
                                paddingTop: 10,
                            }}
                            keyboardShouldPersistTaps="handled" // Fixe le problème de TouchableWithoutFeedback
                            showsVerticalScrollIndicator={true}
                            style={{ flex: 1 }}
                        />
                    ) : (
                        <Text style={styles.emptyText}>Aucun événement trouvé.</Text>
                    )}
                </SafeAreaView>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Permet à FlatList de prendre tout l'espace disponible
    },
    loader: {
        marginTop: 20,
    },
    flatList: {
        paddingBottom: 20,
    },
    emptyText: {
        color: Colors.textSecondary,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});

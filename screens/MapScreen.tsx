import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, MapType } from 'react-native-maps';
import Colors from '@/constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { getCurrentLocation, startLocationUpdates } from '@/services/locationService';

export default function MapsScreen() {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [mapType, setMapType] = useState<MapType>('standard'); // État pour le type de carte
    const mapRef = useRef<MapView>(null);

    // Récupérer la localisation initiale
    const fetchLocation = async () => {
        setLoading(true);
        try {
            const currentLocation = await getCurrentLocation();
            setLocation(currentLocation);
        } catch (error) {
            Alert.alert('Erreur', 'Impossible de récupérer votre position.');
        } finally {
            setLoading(false);
        }
    };

    // Recentre et regéolocalise l'utilisateur
    const recenterMap = async () => {
        try {
            const currentLocation = await getCurrentLocation();
            setLocation(currentLocation);
            mapRef.current?.animateToRegion({
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        } catch (error) {
            Alert.alert('Erreur', 'Impossible de récupérer votre position.');
        }
    };

    const toggleMapType = () => {
        // Alterne entre les types de carte
        const types: MapType[] = ['standard', 'satellite', 'hybrid'];
        const currentIndex = types.indexOf(mapType);
        const nextType = types[(currentIndex + 1) % types.length];
        setMapType(nextType);
    };

    useEffect(() => {
        fetchLocation();

        // Démarre la mise à jour régulière
        startLocationUpdates((newLocation) => {
            setLocation(newLocation);
        });
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color={Colors.secondary} />
            ) : (
                <>
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        mapType={mapType} // Type de carte
                        region={{
                            latitude: location?.latitude || 0,
                            longitude: location?.longitude || 0,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        showsUserLocation={true}
                    >
                    </MapView>

                    {/* Bouton pour recentrer */}
                    <TouchableOpacity style={styles.floatingButton} onPress={recenterMap}>
                        <Icon name="locate" size={30} color="#fff" />
                    </TouchableOpacity>

                    {/* Bouton pour changer le type de carte */}
                    <TouchableOpacity style={styles.mapTypeButton} onPress={toggleMapType}>
                        <Text style={styles.mapTypeText}>
                            {mapType.charAt(0).toUpperCase() + mapType.slice(1)}
                        </Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 120,
        right: 30,
        backgroundColor: Colors.secondary,
        borderRadius: 50,
        padding: 12,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    mapTypeButton: {
        position: 'absolute',
        bottom: 120,
        left: 30,
        backgroundColor: Colors.secondary,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        elevation: 5,
    },
    mapTypeText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

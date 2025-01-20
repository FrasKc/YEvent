import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function QRScannerScreen({ navigation }: { navigation: any }) {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Nous avons besoin de votre permission pour accéder à la caméra</Text>
                <TouchableOpacity style={styles.button} onPress={requestPermission}>
                    <Text style={styles.text}>Donner la permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleBarCodeScanned = ({ data }: { data: string }) => {
        if (!scanned) {
            setScanned(true);
            Alert.alert('QR Code Scanné', `Données : ${data}`, [
                { text: 'OK', onPress: () => setScanned(false) },
            ]);
        }
    };

    function toggleCameraFacing() {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            >
                {/* Overlay pour assombrir le reste de l'écran */}
                <View style={styles.overlay}>
                    <View style={styles.topOverlay}></View>
                    <View style={styles.middleOverlay}>
                        <View style={styles.sideOverlay}></View>
                        <View style={styles.scanBox}></View>
                        <View style={styles.sideOverlay}></View>
                    </View>
                    <View style={styles.bottomOverlay}></View>
                </View>
            </CameraView>
            {/* Bouton pour revenir en arrière */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>← Retour</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
        fontSize: 18,
    },
    camera: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    topOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    middleOverlay: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sideOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    scanBox: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'transparent',
    },
    bottomOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 8,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 10,
        borderRadius: 8,
    },
    backButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

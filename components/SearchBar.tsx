import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export default function SearchBar({ placeholder }: { placeholder: string }) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={Colors.textSecondary}
            />
            <Ionicons name="search" size={24} color={Colors.textSecondary} style={styles.icon} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#313131',
        margin: 15,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        color: Colors.text,
        height: 40,
    },
    icon: {
        marginLeft: 10,
    },
});

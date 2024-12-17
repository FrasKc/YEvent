export type Event = {
    id: string; // UUID
    titre: string;
    description: string | null; // Optionnel
    lieu: string;
    date: string; // Timestamp
    prix: number; // int4
    capacite: number; // int4
    places_restantes: number; // int4
    coordonnees: { latitude: number; longitude: number }; // Nouvelle propriété
};

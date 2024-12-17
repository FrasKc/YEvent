import { supabase } from '@/utils/supabase';
import { Event } from '@/models/event';

export const fetchEvents = async (): Promise<Event[]> => {
    const { data, error } = await supabase
        .from('evenements')
        .select('*');

    if (error) {
        console.error('Erreur lors du chargement des événements :', error.message);
        return [];
    }

    return data as Event[];
};

export const getEventById = async (id: string) => {
    const { data, error } = await supabase
        .from('evenements')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Erreur lors de la récupération de l\'événement :', error.message);
        return { error };
    }

    return { data };
};

export default { fetchEvents, getEventById };
import type { Fruit } from "../types/fruit"
import { useQuery } from "@tanstack/react-query";
import { fetchFruits } from "../assets/api/fetchFruits";

export default function useFetchFruits() {
    const { data, error, isLoading } = useQuery<Fruit[]>({
        queryKey: ['fruits'],
        queryFn: fetchFruits
    });

    return { data, error, isLoading }
}
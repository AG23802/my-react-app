import type { Fruit } from "../types/fruit"
import { useQuery } from "@tanstack/react-query";
import { fetchFruits } from "../assets/api/fetchFruits";

export default function useGetApi() {
    const { data, error, isLoading } = useQuery<Fruit[]>({
        queryKey: ['fruits'],
        queryFn: fetchFruits
    });

    return { data, error, isLoading }
}

// const [fruits, setFruits] = useState<Fruit[]>([])

    
// useEffect(() => {
//     fetch('http://localhost:5000/api/external-data')
//         .then(response => response.json())
//         .then(data => setFruits(data))
//         .catch(error => {
//             console.error('Error fetching external data:', error)
//         })
// }, [])
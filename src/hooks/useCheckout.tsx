import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCheckout() {
    const queryClient = useQueryClient();

    return useMutation({
        // 1. The actual function that talks to the server
        mutationFn: async (newCart: any) => {
            const response = await fetch('http://localhost:5000/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCart),
            });
            return response.json();
        },
        // 2. What to do when the server says "OK"
        onSuccess: () => {
            console.log("Data saved!");
            // This tells React Query to re-fetch the fruits/cart list 
            // so the UI stays in sync with the server
            queryClient.invalidateQueries({ queryKey: ['fruits'] });
        },

        onError: (error) => {
            console.error("Save failed:", error);
        }
    })
}
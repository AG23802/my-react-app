import { create } from "zustand"

type CounterStore = {
    count: number
    increment: () => void
    decrement: () => void
    incrementAsync: () => Promise<void>
}

export const useCounterStore = create<CounterStore>(set => (
    {
        count: 0,
        increment: () => set(state => ({ count: state.count + 1 })),
        decrement: () => set(state => ({ count: state.count - 1 })),
        incrementAsync: async () => {
            try {
                await new Promise<void>((resolve, reject) => setTimeout(() => {
                     const fail = Math.random() < 0.5 // 50% chance to fail
                    if (fail) reject(new Error('Failed increment'))
                    else resolve()
                }, 1000))
                set(state => ({ count: state.count + 1 }))
            } catch (error) {
                console.error("Increment async failed:", error)
                return
            }

        }
    }
)
)
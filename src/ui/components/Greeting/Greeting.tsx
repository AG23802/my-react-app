import { useEffect, useState } from "react"
import useCounter from "../../../hooks/useCounter/useCounter";

export default function Greeting({ name, userID }: { name?: string, userID?: number }) {
    const {count, increment, decrement} = useCounter()

    const [user, setUser] = useState<{name: string, email: string; phone: string} | null>(null)

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users/4")
            .then(res => res.json())
            .then(data => setUser(data))
    }, [userID])

    if (!user) return <p>Loading...</p>

    return <>
        <div>{user.name}</div>
        <div>{user.email}</div>
        <div>{user.phone}</div>


        <h1>Hello {name || "World"}!, welcome to our app!</h1>
        <p data-testid="counter">Counter: {count}</p>

        <button onClick={increment}>Click me</button>
    </>
};
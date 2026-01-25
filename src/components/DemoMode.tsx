import { useState } from "react";

export default function DemoMode() {
    const [mode, setMode] = useState('light');

    return (
        <div className="card">
            <button onClick={() => setMode((mode) => (mode == 'light') ? 'dark' : 'light')}>
                mode is {mode}
            </button>
            <p>
                Edit <code>src/App.tsx</code> and save to test HMR
            </p>
        </div>
    )
} 
import { useAppStore } from "../../store/useAppStore";

export function LoginButton() {
    const login = useAppStore(state => state.login);
    return (
        <button onClick={() => login({ id: '1', name: 'Alice' })}>
            Login
        </button>
    );
}
import { useAuthStore } from "../../store/authUser";
const HomeScreen = () => {
    const { logout } = useAuthStore();
    return (
        <div className="hero-bg h-screen">
            <button className="bg-white" onClick={logout}>Logout</button>

        </div>
    )
}

export default HomeScreen;
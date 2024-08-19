import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

// API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

const RegisterForm = () => {
    // State hooks for form fields and registration status
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);

    // Hook for navigation
    const navigate = useNavigate();

    // Handle form submission for registration
    const handleRegister = async (e) => {
        e.preventDefault();

        const body = {
            name,
            email,
            password,
        };

        try {
            // Send registration data to the API
            await axios.post(API_URL + "/auth/register", body);
            setIsRegistered(true);

            // Redirect to login page after 3 seconds
            setTimeout(() => navigate("/login"), 3000);
        } catch (error) {
            alert(error.message);
        }
    };

    // Navigate to login page
    const haveAcoount = () => {
        navigate("/login");
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
            <form
                className="w-full max-w-md bg-white shadow-md rounded-lg p-8"
                onSubmit={handleRegister}
            >
                <h1 className="text-xl font-bold mb-6">Admin Registration</h1>
                <div className="mb-4">
                    <Label className="text-gray-700" htmlFor="name">
                        Name
                    </Label>
                    <Input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        placeholder="John"
                        id="name"
                    />
                </div>
                <div className="mb-4">
                    <Label className="text-gray-700" htmlFor="email">
                        Email
                    </Label>
                    <Input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        placeholder="example@example.com"
                        id="email"
                    />
                </div>
                <div className="mb-6">
                    <Label className="text-gray-700" htmlFor="password">
                        Password
                    </Label>
                    <Input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="••••••••••••"
                        id="password"
                    />
                </div>
                <div className="flex justify-center items-center">
                    <a
                        onClick={haveAcoount}
                        className="mr-5 hover:opacity-65 cursor-pointer transition-all"
                    >
                        Log In
                    </a>
                    <Button type="submit">Register</Button>
                </div>
            </form>
            {isRegistered && <div>Registered successfully!</div>}
        </div>
    );
};

export default RegisterForm;

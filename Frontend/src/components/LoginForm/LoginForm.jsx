import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const API_URL = import.meta.env.VITE_API_URL;

const LoginForm = () => {
    const [email, setEmail] = useState(""); // State for email input
    const [password, setPassword] = useState(""); // State for password input

    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        // Redirect to home if the user is already logged in
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const body = {
            email,
            password,
        };

        try {
            // Send login request to the server
            const response = await axios.post(API_URL + "/auth/login", body);
            localStorage.setItem("token", response.data.token);
            navigate("/"); // Redirect to home
        } catch (error) {
            alert(error.message); // Show an alert if there is an error
        }
    };

    const noAccount = () => {
        navigate("/register"); // Redirect to register page
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
            <form
                className="w-full max-w-md bg-white shadow-md rounded-lg p-8"
                onSubmit={handleLogin}
            >
                <h1 className="text-xl font-bold mb-6">Admin Login</h1>
                <div className="mb-4">
                    <Label htmlFor="email" className="text-gray-700">
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
                    <Label htmlFor="password" className="text-gray-700">
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
                <div className="flex items-center justify-between">
                    <a
                        className="cursor-pointer hover:opacity-70 transition-all"
                        onClick={noAccount}
                    >
                        Dont have an account?
                    </a>
                    <Button type="submit">Login</Button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewPersonForm from "../../components/NewPersonForm/NewPersonForm";
import PeopleContainer from "../../components/PeopleContainer/PeopleContainer";
import { Button } from "../../components/ui/button";
import "../../index.css";

const API_URL = import.meta.env.VITE_API_URL;

const Main = () => {
    const navigate = useNavigate();

    const [people, setPeople] = useState([]); // State to store the list of people

    // Function to fetch people from the API
    const getPeople = async () => {
        await axios
            .get(API_URL + "/users")
            .then((response) => setPeople(response.data)) // Set the fetched people to state
            .catch((error) => alert(error.message)); // Handle any errors
    };

    // Fetch people when the component mounts
    useEffect(() => {
        getPeople();
    }, []);

    // Check for token and validate admin when the component mounts
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            // If no token, navigate to login page
            navigate("/login");
        } else {
            // Validate the token with the server
            axios
                .get(API_URL + "/auth/admins", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        // If token is invalid, remove it and navigate to login page
                        localStorage.removeItem("token");
                        navigate("/login");
                    } else {
                        alert("Something went wrong!"); // Handle other errors
                    }
                });
        }
    }, []);

    // Handle form submission to add a new person
    const handleSubmit = async (body) => {
        await axios.post(API_URL + "/users", body); // Post new person data to the API
        getPeople(); // Refetch the people list
    };

    // Handle logout
    const logout = () => {
        localStorage.removeItem("token"); // Remove token from local storage
        navigate("/login"); // Navigate to login page
    };

    return (
        <div className="px-10">
            <div className="flex justify-between items-center p-2">
                <h1 className="text-xl font-bold">Event Registration</h1>
                <Button
                    className="text-white px-3 py-2 bg-red-800 hover:bg-red-900"
                    onClick={logout}
                >
                    Logout
                </Button>
            </div>
            <div className="flex flex-col items-center">
                <NewPersonForm onSubmit={handleSubmit} />
                <PeopleContainer people={people} refetchData={getPeople} />
            </div>
        </div>
    );
};

export default Main;

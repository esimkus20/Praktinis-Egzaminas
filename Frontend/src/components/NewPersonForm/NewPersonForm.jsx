import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const NewPersonForm = ({ onSubmit, personData }) => {
    // State hooks for form inputs
    const [name, setName] = useState(personData?.name || "");
    const [surname, setSurname] = useState(personData?.surname || "");
    const [email, setEmail] = useState(personData?.email || "");
    const [dateOfBirth, setDateOfBirth] = useState(
        personData?.dateOfBirth || ""
    );

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            name,
            surname,
            email,
            dateOfBirth,
        };

        try {
            // Call the onSubmit function passed as a prop
            onSubmit(body);
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <form
            className="flex flex-col items-start justify-center space-y-4"
            onSubmit={handleSubmit}
        >
            <div>
                <div className="flex flex-wrap gap-4 mb-4 mt-6">
                    <div className="flex flex-col">
                        <Label className="mb-1" htmlFor="name">
                            Name
                        </Label>
                        <Input
                            className="w-56"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            id="name"
                            placeholder="John"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label className="mb-1" htmlFor="surname">
                            Surname
                        </Label>
                        <Input
                            className="w-56"
                            onChange={(e) => setSurname(e.target.value)}
                            value={surname}
                            type="text"
                            id="surname"
                            placeholder="Doe"
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex flex-col">
                        <Label className="mb-1" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            className="w-56"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            id="email"
                            placeholder="example@example.com"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label className="mb-1" htmlFor="dateOfBirth">
                            Birthdate
                        </Label>
                        <Input
                            className="w-56"
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            value={dateOfBirth}
                            type="date"
                            id="dateOfBirth"
                            placeholder="1990-01-01"
                            required
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <Button type="submit">Submit</Button>
                </div>
            </div>
        </form>
    );
};

export default NewPersonForm;

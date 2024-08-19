import axios from "axios";
import reactDom from "react-dom";
import NewPersonForm from "../NewPersonForm/NewPersonForm";

// API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

const UpdatePersonModal = ({ personData, refetchData, cancel }) => {
    // Function to get fields that have changed
    const getChangedFields = (newData, oldData) => {
        return Object.keys(newData).reduce((acc, key) => {
            if (newData[key] !== oldData[key]) {
                acc[key] = newData[key];
            }
            return acc;
        }, {});
    };

    // Function to update person data
    const updatePerson = async (body) => {
        try {
            const changedFields = getChangedFields(body, personData);
            await axios.put(
                API_URL + `/users/${personData._id}`,
                changedFields
            );
            refetchData(); // Refresh data after update
            cancel(); // Close the modal
        } catch (error) {
            alert(error.message);
        }
    };

    // Handle click outside the modal to close it
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            cancel();
        }
    };

    return reactDom.createPortal(
        <div
            className="w-full h-full bg-black/50 absolute top-0 flex items-center justify-center"
            onClick={handleBackgroundClick}
        >
            <div className="absolute top-72 flex justify-center bg-white rounded-xl px-5 flex-col p-4">
                <h2 className="text-xl font-bold">Update Person</h2>
                <p className="mt-2">
                    {personData.name} {personData.surname}
                </p>
                <NewPersonForm
                    onSubmit={updatePerson}
                    personData={personData}
                />
            </div>
        </div>,
        document.body
    );
};

export default UpdatePersonModal;

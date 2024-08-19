import axios from "axios";
import reactDom from "react-dom";

const API_URL = import.meta.env.VITE_API_URL;

const DeletePersonModal = ({ personData, refetchData, cancel }) => {
    // Function to delete a person
    const deletePerson = async () => {
        try {
            await axios.delete(API_URL + `/users/${personData._id}`);
            refetchData(); // Refetch the data to update the list
        } catch (error) {
            alert(error.message); // If there is an error, show an alert
        }
    };

    // Handle click on the background to close the modal
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            cancel(); // Call the cancel function to close the modal
        }
    };

    return reactDom.createPortal(
        <div
            className="w-full h-full bg-black/50 absolute top-0 flex items-center justify-center"
            onClick={handleBackgroundClick} // Close the modal when the background is clicked
        >
            <div className="absolute top-72 flex items-center justify-center bg-white rounded-xl px-5">
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">Delete Person</h2>
                    <p>
                        Are you sure you want to delete {personData.name}{" "}
                        {personData.surname}?
                    </p>
                    <div className="mt-4 flex justify-end space-x-2">
                        <button
                            className="bg-red-900 text-white px-4 py-2 rounded"
                            onClick={deletePerson}
                        >
                            Delete
                        </button>
                        {/* <button
                            className="bg-gray-300 text-black px-4 py-2 rounded"
                            onClick={cancel}
                        >
                            Cancel
                        </button> */}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default DeletePersonModal;

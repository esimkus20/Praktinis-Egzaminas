import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import DeletePersonModal from "../DeletePersonModal/DeletePersonModal";
import UpdatePersonModal from "../UpdatePersonModal/UpdatePersonModal";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";

const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const diffMs = Date.now() - dob.getTime();
    const ageDate = new Date(diffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const Person = ({ personData, refetchData }) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <>
            <TableRow>
                <TableCell>{personData.name}</TableCell>
                <TableCell>{personData.surname}</TableCell>
                <TableCell>{personData.email}</TableCell>
                <TableCell>{calculateAge(personData.dateOfBirth)}</TableCell>
                <TableCell>
                    <Button
                        className="px-3 bg-slate-800 opacity-80 hover:bg-slate-950"
                        onClick={setShowUpdateModal}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </TableCell>
                <TableCell>
                    <Button
                        className="px-3 bg-red-900 opacity-95 hover:bg-red-950"
                        onClick={setShowDeleteModal}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </TableCell>
            </TableRow>
            {showUpdateModal && (
                <UpdatePersonModal
                    cancel={() => setShowUpdateModal(false)}
                    personData={personData}
                    refetchData={refetchData}
                />
            )}
            {showDeleteModal && (
                <DeletePersonModal
                    cancel={() => setShowDeleteModal(false)}
                    personData={personData}
                    refetchData={refetchData}
                />
            )}
        </>
    );
};

export default Person;

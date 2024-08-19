import { useState } from "react";
import Person from "../Person/Person";
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

const PeopleContainer = ({ people, refetchData }) => {
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });

    const sortedPeople = [...people].sort((a, b) => {
        if (sortConfig.key) {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            if (sortConfig.key === "dateOfBirth") {
                aValue = calculateAge(aValue);
                bValue = calculateAge(bValue);
            }

            if (aValue < bValue) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }
        }
        return 0;
    });

    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    return (
        <Table className="border rounded mt-6">
            <TableCaption>Registered Users</TableCaption>
            <TableHeader>
                <TableRow className="bg-slate-100">
                    <TableHead
                        className="hover:bg-slate-200 hover:cursor-pointer"
                        onClick={() => requestSort("name")}
                    >
                        Name
                    </TableHead>
                    <TableHead
                        className="hover:bg-slate-200 hover:cursor-pointer"
                        onClick={() => requestSort("surname")}
                    >
                        Surname
                    </TableHead>
                    <TableHead
                        className="hover:bg-slate-200 hover:cursor-pointer"
                        onClick={() => requestSort("email")}
                    >
                        Email
                    </TableHead>
                    <TableHead
                        className="hover:bg-slate-200 hover:cursor-pointer"
                        onClick={() => requestSort("dateOfBirth")}
                    >
                        Age
                    </TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sortedPeople.map((person) => (
                    <Person
                        key={person._id}
                        personData={person}
                        refetchData={refetchData}
                    />
                ))}
            </TableBody>
        </Table>
    );
};

const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
};

export default PeopleContainer;

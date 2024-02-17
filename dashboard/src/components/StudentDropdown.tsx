"use client";
import React, { useState } from 'react';

export function StudentDropdown ({ students, setSelectedStudent }: { students: string[]; setSelectedStudent: (student: string) => void; }) {
    const [selectedStudentLocal, setSelectedStudentLocal] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStudentLocal(event.target.value);
        setSelectedStudent(event.target.value);
    };

    return (
        <select
            value={selectedStudentLocal}
            onChange={handleChange}
            style={{ borderRadius: '8px' }}
            className="w-1/4 rounded-md"
        >
            <option value="">Select a project</option>
            {students.map((student, index) => (
                <option key={index} value={student}>
                    {student}
                </option>
            ))}
        </select>
    );
};

export default StudentDropdown;
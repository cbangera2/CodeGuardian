"use client";
import React, { useState } from 'react';

export function StudentDropdown ({ students }: { students: string[] }) {
    const [selectedStudent, setSelectedStudent] = useState('');

    // Your component logic and JSX go here
    return (
        <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
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
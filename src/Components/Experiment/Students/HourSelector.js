import React, { useState } from 'react';
import "./students.css"

const HourSelector = ({updateHours}) => {
    const [selectedHour, setSelectedHour] = useState('');
    const [chosenHours, setChosenHours] = useState([]);
    const handleHourChange = (event) => {
        const { value } = event.target;
        setSelectedHour(value);
        const updatedHours = [...chosenHours, value];
        setChosenHours(updatedHours);
        updateHours(updatedHours);
    };

    return (
        <select value={selectedHour} onChange={handleHourChange}>
            <option className="header-stu" value="">Select Hour</option>
            {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                <option key={hour} value={hour}>
                    {hour.toString().padStart(2, '0')}:00
                </option>
            ))}
        </select>
    );
};

export default HourSelector;

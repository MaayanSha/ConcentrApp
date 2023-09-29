import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StudentsList from './StudentsList';
import {MemoryRouter, Route} from "react-router-dom";

describe('StudentsList', () => {
    test('renders without errors', () => {
        const researchValue = '1';
        render(
            <MemoryRouter initialEntries={['/path?research=' + researchValue]}>
                <Route path="/path" render={(props) => <StudentsList {...props} />} />
            </MemoryRouter>);
        // Assert that the component renders without throwing any errors
    });

    test('allows editing notification hours', () => {
        render(<StudentsList research="yourResearchValue" />);
        // Simulate user interaction by clicking on the "edit" button, entering a new hour, and submitting
        fireEvent.click(screen.getByText('edit')); // Assumes there is an "edit" button in the UI
        fireEvent.change(screen.getByPlaceholderText('example: 15:00'), { target: { value: '16:00' } });
        fireEvent.click(screen.getByText('save')); // Assumes there is a "save" button in the UI
        // Assert that the hour is updated correctly
        expect(screen.getByText('16:00')).toBeInTheDocument();
    });

    test('allows adding a new participant', () => {
        render(<StudentsList research="yourResearchValue" />);
        // Simulate user interaction by clicking on the "add new participant" button, filling the form, and submitting
        fireEvent.click(screen.getByText('add new participant')); // Assumes there is an "add new participant" button in the UI
        fireEvent.change(screen.getByLabelText('Participant Name'), { target: { value: 'John' } });
        fireEvent.click(screen.getByText('Submit')); // Assumes there is a "Submit" button in the UI
        // Assert that the new participant is added and displayed
        expect(screen.getByText('John')).toBeInTheDocument();
    });
});

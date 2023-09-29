import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Survey from "../../Components/Experiment/Survey/Survey";
import {MemoryRouter, Route} from "react-router-dom";

describe('Survey_decision', () => {

    const DecisionTreeDropdown = screen.getByText('Your Decision Trees');


    test('renders without errors', () => {
        render(<MemoryRouter initialEntries={['/path?research=1']}>
            <Route path="/path" render={(props) => <Survey {...props} />} />
        </MemoryRouter>);
        // Assert that the component renders without throwing any errors
    });
    test('allows adding a new decision tree', () => {
        render(<Survey />);
        fireEvent.click(screen.getByText('Decision-Tree Style'));
        //simulate user clicking the decision tree button
        fireEvent.change(screen.getByLabelText('Please name the tree'), { target: { value: 'this is a test tree' } });
        //naming the tree
        fireEvent.keyPress(screen.getByLabelText('Please name the tree'), { key: 'Enter', code: 'Enter' });
        //pressing enter to confirm the name
        //check that new tree is added
        fireEvent.click(screen.getByLabelText('your first question here'));
        //adding an answer
        fireEvent.click(screen.getByLabelText('add answers'));
        const inputElement = screen.getByPlaceholderText('answer');
        fireEvent.change(inputElement, { target: { value: 'this is a test answer' } });
        fireEvent.click(screen.getByText('Confirm'));
        //closing the modal
        fireEvent.click(Document.body);
        fireEvent.click(DecisionTreeDropdown);
        //check that the new tree is added
        expect(screen.getByText('this is a test tree')).toBeInTheDocument();
    });
    test('allows editing question within an existing tree', () => {
        render(<MemoryRouter initialEntries={['/path?research=1']}>
            <Route path="/path" render={(props) => <Survey {...props} />} />
        </MemoryRouter>);
        fireEvent.click(screen.getByText('Decision-Tree Style'));
        fireEvent.click(DecisionTreeDropdown);
        fireEvent.click(screen.getByText('this is a test tree'));
        //click the edit icon
        fireEvent.click(screen.getByText('edit'));
        fireEvent.change(screen.getByPlaceholderText('question'), { target: { value: 'this is a test question' } });
        //submit the edit
        fireEvent.click(screen.getByText('Confirm'));
        //closing the modal
        fireEvent.click(Document.body);
        fireEvent.click(DecisionTreeDropdown);
        fireEvent.click(screen.getByText('this is a test tree'));
        //check that the tree is updated
        expect(screen.getByText('this is a test question')).toBeInTheDocument();
    });
    test('allows deleting questions or answers with no descendants', () => {
        render(<MemoryRouter initialEntries={['/path?research=1']}>
            <Route path="/path" render={(props) => <Survey {...props} />} />
        </MemoryRouter>);
        fireEvent.click(screen.getByText('Decision-Tree Style'));
        fireEvent.click(DecisionTreeDropdown);
        fireEvent.click(screen.getByText('this is a test tree'));
        fireEvent.click(screen.getByText('edit'));
        //click the delete icon
        fireEvent.click(screen.getByText('delete'));
        //closing the modal
        fireEvent.click(Document.body);
        fireEvent.click(DecisionTreeDropdown);
        fireEvent.click(screen.getByText('this is a test tree'));
        //check that the tree is updated
        expect(screen.queryByText('this is a test question')).toBeNull();
    });
});

describe('Survey_context', () => {

    const ContextTreeDropdown = screen.getByText('Your Context-based Schemes');


    test('renders without errors', () => {
        render(<MemoryRouter initialEntries={['/path?research=1']}>
            <Route path="/path" render={(props) => <Survey {...props} />} />
        </MemoryRouter>);
        // Assert that the component renders without throwing any errors
    });
    test('allows adding a new decision tree', () => {
        render(<Survey />);
        fireEvent.click(screen.getByText('Context-based Style'));
        //simulate user clicking the decision tree button
        fireEvent.change(screen.getByLabelText('Please name the tree'), { target: { value: 'this is a test tree' } });
        //naming the tree
        fireEvent.keyPress(screen.getByLabelText('Please name the tree'), { key: 'Enter', code: 'Enter' });
        //pressing enter to confirm the name
        //check that new tree is added
        fireEvent.click(screen.getByLabelText('Contexts'));
        fireEvent.click(screen.getByLabelText('your first context question here'));
        //adding an answer
        fireEvent.click(screen.getByLabelText('add answers'));
        const inputElement = screen.getByPlaceholderText('answer');
        fireEvent.change(inputElement, { target: { value: 'this is a test answer' } });
        fireEvent.click(screen.getByText('Confirm'));
        //closing the modal
        fireEvent.click(Document.body);
        fireEvent.click(ContextTreeDropdown);
        //check that the new tree is added
        expect(screen.getByText('this is a test tree')).toBeInTheDocument();
    });
    test('allows editing question within an existing tree', () => {
        render(<MemoryRouter initialEntries={['/path?research=1']}>
            <Route path="/path" render={(props) => <Survey {...props} />} />
        </MemoryRouter>);
        fireEvent.click(screen.getByText('Decision-Tree Style'));
        fireEvent.click(ContextTreeDropdown);
        fireEvent.click(screen.getByText('this is a test tree'));
        //click the edit icon
        fireEvent.click(screen.getByText('edit'));
        fireEvent.change(screen.getByPlaceholderText('question'), { target: { value: 'this is a test question' } });
        //submit the edit
        fireEvent.click(screen.getByText('Confirm'));
        //closing the modal
        fireEvent.click(Document.body);
        fireEvent.click(ContextTreeDropdown);
        fireEvent.click(screen.getByText('Contexts'));
        fireEvent.click(screen.getByText('this is a test tree'));
        //check that the tree is updated
        expect(screen.getByText('this is a test question')).toBeInTheDocument();
    });
    test('allows deleting questions or answers with no descendants', () => {
        render(<MemoryRouter initialEntries={['/path?research=1']}>
            <Route path="/path" render={(props) => <Survey {...props} />} />
        </MemoryRouter>);
        fireEvent.click(screen.getByText('Decision-Tree Style'));
        fireEvent.click(ContextTreeDropdown);
        fireEvent.click(screen.getByText('this is a test tree'));
        fireEvent.click(screen.getByText('edit'));
        //click the delete icon
        fireEvent.click(screen.getByText('delete'));
        //closing the modal
        fireEvent.click(Document.body);
        fireEvent.click(ContextTreeDropdown);
        fireEvent.click(screen.getByText('Contexts'));
        fireEvent.click(screen.getByText('this is a test tree'));
        //check that the tree is updated
        expect(screen.queryByText('this is a test question')).toBeNull();
    });
});
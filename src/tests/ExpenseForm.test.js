import { render, screen } from '@testing-library/react';
import ExpenseForm from '../components/NewExpense/ExpenseForm';
import { Provider } from 'react-redux';
import store from '../store/index';

describe("ExpenseForm component", () => {
    test("renders category text", () => {
        render(<Provider store={store}><ExpenseForm /></Provider>);
        const categoryElement = screen.getByText("category", { exact: false});
        expect(categoryElement).toBeInTheDocument();
    });

    test("renders expense amount text", () => {
        render(<Provider store={store}><ExpenseForm /></Provider>);
        const expenseAmountElement = screen.getByText("expense amount", { exact: false});
        expect(expenseAmountElement).toBeInTheDocument();
    });

    test("renders description text", () => {
        render(<Provider store={store}><ExpenseForm /></Provider>);
        const descriptionElement = screen.getByText("description", { exact: false});
        expect(descriptionElement).toBeInTheDocument();
    });

    test("renders date text", () => {
        render(<Provider store={store}><ExpenseForm /></Provider>);
        const dateElement = screen.getByText("date", { exact: false});
        expect(dateElement).toBeInTheDocument();
    });
})
import { render, screen } from '@testing-library/react';
import ForgotPassword from '../components/Login/ForgotPassword';
import { Provider } from 'react-redux';
import store from '../store/index';

describe("UpdateProfile component", () => {
    test("renders full name text", () => {
        render(<Provider store={store}><ForgotPassword /></Provider>);
        const enterEmailElement = screen.getByText("Enter the email", { exact: false});
        expect(enterEmailElement).toBeInTheDocument();
    });

    test("renders send link button text", () => {
        render(<Provider store={store}><ForgotPassword /></Provider>);
        const sendButtonElement = screen.getByText("send link", { exact: false});
        expect(sendButtonElement).toBeInTheDocument();
    });
})
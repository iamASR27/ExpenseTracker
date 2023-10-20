import { render, screen, waitFor } from '@testing-library/react';
import Login from '../components/Login/Login';
import { Provider } from 'react-redux';
import store from '../store/index';
import userEvent from '@testing-library/user-event';

describe("Login component", () => {
    test("renders password input", () => {
        render(<Provider store={store}><Login /></Provider>);

        const passwordInput = screen.getByPlaceholderText("Password", { exact: true});
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test("renders confirm password input", () => {
        render(<Provider store={store}><Login /></Provider>);

        const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password", { exact: false});
        expect(confirmPasswordInput).toHaveAttribute('type', 'password');
    });

    test("renders show/hide button", async() => {
        render(<Provider store={store}><Login /></Provider>);

        const showButtons = screen.getAllByText(/show/i);
        const firstShowButtonElement = showButtons[0];
        const secondShowButtonElement = showButtons[1];
        userEvent.click(firstShowButtonElement);

        await waitFor(() => {
            const hideButtons = screen.getAllByText("hide", { exact: false});
            const firstHideButtonElement = hideButtons[0];
            expect(firstHideButtonElement).toBeInTheDocument();
        })

        userEvent.click(secondShowButtonElement);

        await waitFor(() => {
            const hideButtons = screen.getAllByText("hide", { exact: false});
            const secondHideButtonElement = hideButtons[1];
            expect(secondHideButtonElement).toBeInTheDocument();
        })
       
    });

    test("renders email input", () => {
        render(<Provider store={store}><Login /></Provider>);

        const emailInput = screen.getByPlaceholderText("Email");
        expect(emailInput).toHaveAttribute('type', 'email');
    });

    test("renders forgot pasword after clicking login with existing account", async () => {
        render(<Provider store={store}><Login /></Provider>)
      
        const loginExistingAccountElement = screen.getByText("Login with existing account");
        expect(loginExistingAccountElement).toBeInTheDocument();
        // userEvent.click(loginExistingAccountElement);

        // await waitFor(() => {
        //     const forgotPasswordLink = screen.getByText("Forgot Password");
        //     expect(forgotPasswordLink).toBeInTheDocument();
        // })
    })
})
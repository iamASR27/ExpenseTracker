import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Login from '../components/Login/Login';
import { Provider } from 'react-redux';
import store from '../store/index';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

beforeAll(() => {
    window.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        idToken: 'mocked-token',
        localId: 'user-id',
      }),
      ok: true,
    });
  });
  
  afterAll(() => {
    // Restore the original window.fetch function.
    window.fetch.mockRestore();
  });

describe("Login component", () => {
    // test('login with valid credentials', async () => {
    //     render(<Provider store={store}><Login /></Provider>);

    //     userEvent.click(screen.getByText('Login with existing account'));
    //     userEvent.type(screen.getByPlaceholderText('Email'), 'user@example.com');
    //     userEvent.type(screen.getByPlaceholderText('Password'), 'password');
    //     userEvent.click(screen.getByText('Login'));
    
    //     await screen.findByText('Sending request....', { exact: false });
    
    //     expect(window.location.pathname).toBe('/home');
    //   });

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

    test("renders forgot pasword after clicking login with existing account", () => {
        render(<BrowserRouter><Provider store={store}><Login /></Provider></BrowserRouter>)
      
        const loginExistingAccountElement = screen.getByText("Login with existing account");
        // const loginExistingAccountElement = screen.getByRole('button', { name: /Login with existing account/i });
        expect(loginExistingAccountElement).toBeInTheDocument();
        // userEvent.click(loginExistingAccountElement);
        fireEvent.click(loginExistingAccountElement);

       
        // const forgotPasswordLink = await screen.findByText("Forgot Password?", { timeout: 5000 });
        const forgotPasswordLink = screen.getByText("Forgot Password?")
        // const forgotPasswordLink = await screen.findByRole('link', { name: /Forgot Password?/i, href: '/forgot-password' });

        expect(forgotPasswordLink).toBeInTheDocument();
    
    })
})
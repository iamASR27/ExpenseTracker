import { render, screen } from '@testing-library/react';
import UpdateProfilePage from '../components/Pages/UpdateProfilePage';
import { Provider } from 'react-redux';
import store from '../store/index';

describe("UpdateProfile component", () => {
    test("renders full name text", () => {
        render(<Provider store={store}><UpdateProfilePage /></Provider>);
        const fullNameElement = screen.getByText("full name", { exact: false});
        expect(fullNameElement).toBeInTheDocument();
    });

    test("renders profile photo url text", () => {
        render(<Provider store={store}><UpdateProfilePage /></Provider>);
        const profilePhotoElement = screen.getByText("profile photo url", { exact: false});
        expect(profilePhotoElement).toBeInTheDocument();
    });

    test("renders contact details text", () => {
        render(<Provider store={store}><UpdateProfilePage /></Provider>);
        const contactTextElement = screen.getByText("contact details", { exact: false});
        expect(contactTextElement).toBeInTheDocument();
    });

    test("renders update button text", () => {
        render(<Provider store={store}><UpdateProfilePage /></Provider>);
        const updateButtonElement = screen.getByText("update", { exact: false});
        expect(updateButtonElement).toBeInTheDocument();
    });
})
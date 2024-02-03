// import { render, screen } from '@testing-library/react';
// import CheckProfile from '../components/Pages/CheckProfile';
// import { Provider } from 'react-redux';
// import store from '../store/index';

// jest.mock('react-router-dom', () => ({
//     useHistory: () => ({
//         replace: jest.fn(),
//     })
// }));

// // const mockProfileData = {
// //     users: [{ displayName: 'John Doe', photoUrl: 'https://example.com/avatar.jpg' }]
// // }

// // const mockGetProfileData = jest.fn(() => Promise.resolve(mockProfileData));

// // jest.mock('../store/auth-context', () => ({
// //     __esModule: true,
// //     default: {
// //       getProfileData: mockGetProfileData,
// //     },
// //   }));

// describe("CheckProfile component", () => {
//     test('renders user profile data when profile data is available', async () => {
//         window.fetch = jest.fn();
//         window.fetch.mockResolvedValueOnce({
//             json: async () => [{ displayName: 'John Doe', photoUrl: 'https://example.com/avatar.jpg' }]
//         });
//         // mockGetProfileData.mockResolvedValueOnce(mockProfileData);
    
//         render(<Provider store={store}><CheckProfile /></Provider>);
    
//         const displayNameText = await screen.findByText(/Your Name:/i);
//         const photoUrlText = await screen.findByText(/Profile Photo Url:/i);
//         const updateButton = await screen.findByText(/Update Profile/i);
//         const goBackButton = await screen.findByText(/Go back to homepage/i);
    
//         expect(displayNameText).toBeInTheDocument();
//         expect(photoUrlText).toBeInTheDocument();
//         expect(updateButton).toBeInTheDocument();
//         expect(goBackButton).toBeInTheDocument();
//       });

//     // test('renders Your Name text', async () => {
//     //     render(<Provider store={store}><CheckProfile /></Provider>);

//     //     const profileDataContainer = await screen.findByTestId('profile-data-container');
        
//     //     expect(profileDataContainer).toHaveTextContent(/Your Name/i);
//     //   });

//       // test('renders Your Name text', () => {
//       //   render(<Provider store={store}><CheckProfile /></Provider>);

//       //   const profileDataContainer = screen.getByText("Your Name", { exact: false});
        
//       //   expect(profileDataContainer).toBeInTheDocument();
//       // });
    
//       // test('renders Profile Photo Url text', () => {
//       //   render(<Provider store={store}><CheckProfile /></Provider>);
//       //   const profileDataContainer = screen.getByTestId('profile-data-container');
//       //   expect(profileDataContainer).toHaveTextContent(/Profile Photo Url:/i);
//       // });

//     // test('renders update profile button text', () => {
//     //     render(<Provider store={store}><CheckProfile /></Provider>);
//     //     const updateProfileButtonElement = screen.getByText("Update Profile");
//     //     expect(updateProfileButtonElement).toBeInTheDocument();
//     //   });
    
//     //   test('renders Profile Photo Url text', () => {
//     //     render(<Provider store={store}><CheckProfile /></Provider>);
//     //     const homeButtonElement = screen.getByText("Go back to homepage");
//     //     expect( homeButtonElement).toBeInTheDocument();
//     //   });


// })

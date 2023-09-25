import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return <><div>
        <h2><i>Welcome to Expense Tracker</i></h2>
    </div>
    <div><i>Your profile is incomplete.<Link to="/updateProfile">Complete now</Link></i></div>
    </>
};

export default HomePage;
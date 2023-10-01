import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

const HomePage = () => {
    const authCtx = useContext(AuthContext);


    return <><div>
        <h2><i>Welcome to Expense Tracker</i></h2>
    </div>
    {!authCtx.profileLink && <div><i>Your profile is incomplete.<Link to="/updateProfile">Complete now</Link></i></div>}
    {authCtx.profileLink && <div><i><Link to="/checkProfile" >Click here </Link>to check your profile</i></div>}
    </>
};

export default HomePage;
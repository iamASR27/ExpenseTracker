import { useState, useRef, useContext } from 'react';
import { useHistory} from 'react-router-dom';
import styles from './Login.module.css';
import AuthContext from '../../store/auth-context';



const Login = () => {
  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  

  const switchLoginModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if(!isLogin){
      const confirmEnteredPassword = confirmPasswordInputRef.current.value;

    if(enteredPassword !== confirmEnteredPassword){
      alert("Password and Confirm password do not match");
      return;
    }
    }
    

    setIsLoading(true);
    let url;
    if (isLogin) {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEH8BPvQKDMeJQkL4qDU3zmtoSvKt297Q";
     
    } else {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEH8BPvQKDMeJQkL4qDU3zmtoSvKt297Q";
     
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        authCtx.login(data.idToken);
        console.log("User has successfully signed up")
        history.replace("/home");
       
      } else {
        const data = await response.json();
        let errorMessage = "Authentication Failed";
        if(data && data.error && data.error.message){
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <section className={styles.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.control}>
          <input type='email' id='email' ref={emailInputRef} placeholder="Email" required />
        </div>
        <div className={styles.control}>
          <input
            type='password'
            id='password'
            ref={passwordInputRef}
            placeholder='Password'
            required
          />
        </div>
        {!isLogin && <div className={styles.control}>
          <input
            type='password'
            id='confirm-password'
            ref={confirmPasswordInputRef}
            placeholder='Confirm Password'
            required
          />
        </div>}
        <div className={styles.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending request....</p>}
          <button
            type='button'
            className={styles.toggle}
            onClick={switchLoginModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;

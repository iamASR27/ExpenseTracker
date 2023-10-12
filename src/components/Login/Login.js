import { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import styles from "./Login.module.css";
import AuthContext from "../../store/auth-context";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const Login = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  // const token = useSelector(state => state.auth.token);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // const emailInputRef = useRef();
  // const passwordInputRef = useRef();
  // const confirmPasswordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const authCtx = useContext(AuthContext);

  const switchLoginModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    // console.log(name, value)
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = loginForm.email;
    const enteredPassword = loginForm.password;

    if (!isLogin) {
      const confirmEnteredPassword = loginForm.confirmPassword;
      console.log("Entered Password:", enteredPassword);
      console.log("Confirmed Password:", confirmEnteredPassword);

      if (enteredPassword !== confirmEnteredPassword) {
        alert("Password and Confirm password do not match");
        return;
      }
    }

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEH8BPvQKDMeJQkL4qDU3zmtoSvKt297Q";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEH8BPvQKDMeJQkL4qDU3zmtoSvKt297Q";
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
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.displayName && data.profilePicture) {
          authCtx.setProfileLink();
        }
        // authCtx.login(data.idToken);
        dispatch(authActions.login(data.idToken));
        // console.log("User has successfully signed up");
        console.log("logged in");
        history.replace("/home");
        console.log("home");
      } else {
        const data = await response.json();
        let errorMessage = "Authentication Failed";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.control}>
          <input
            type="email"
            id="email"
            name="email"
            onChange={inputChangeHandler}
            placeholder="Email"
            required
          />
        </div>
        <div className={styles.control}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            onChange={inputChangeHandler}
            placeholder="Password"
            required
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? "hide" : "show"}
          </button>
        </div>
        {!isLogin && (
          <div className={styles.control}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              name="confirmPassword"
              onChange={inputChangeHandler}
              placeholder="Confirm Password"
              required
            />
            <button type="button" onClick={toggleConfirmPasswordVisibility}>
              {showPassword ? "hide" : "show"}
            </button>
          </div>
        )}
         {isLogin && (
          <div className={styles.actions}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        )}
        <div className={styles.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request....</p>}
          <button
            type="button"
            className={styles.toggle}
            onClick={switchLoginModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;

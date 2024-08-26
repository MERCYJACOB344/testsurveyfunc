import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CsLineIcons from '../../cs-line-icons/CsLineIcons';
import { setCurrentUser } from '../../auth/authSlice';
import { API , Auth} from 'aws-amplify';
import { useAppContext } from '../../lib/contextLib';
import { storeSession } from '../../lib/commonLib';
import { USER_ROLE } from '../../constants.jsx';
import { checkForValidSession } from '../../lib/commonLib';




const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [dismissingAlertShow, setDismissingAlertShow] = useState(false);
  const [alertVariant, setalertVariant] = useState('');
  const [alertMessage, setalertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEnableLogin, setIsEnableLogin] = useState(false);
  const { userHasAuthenticated } = useAppContext();
  const { userEmail,setuserEmail } = useAppContext();
  const dispatch = useDispatch();
 
  React.useEffect(() => {
    document.documentElement.setAttribute('data-placement', 'horizontal');
   
    // dispatch(setPlacement('horizontal'));
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Log the form data
    console.log(formData);

    
   

    
 
    try {
      setIsLoading(true);
      setIsEnableLogin(true);

      
      // await Auth.signIn(formData.email, formData.password);
      // userHasAuthenticated(true);
      // const user_Email = formData.email;
      // setuserEmail(user_Email);
      // console.log(user_Email);
      // console.log('log',userEmail);
      let userObj = {
            role: USER_ROLE.User,
            email: user_Email,
            approved: true,
          };
      const loginState = { isAuthenticated: true,user_Email, userInfo: userObj };
    
      storeSession(loginState);
      history.push('/dashboards');
    } catch (error) {
      console.error('Error:', error.message);
      setIsEnableLogin(false);
      setIsLoading(false);
      setDismissingAlertShow(true);   
      setalertVariant("danger");
      setalertMessage(error.message);  
    }
  };
  
    

    // const userData = {
    //   headers: {
    //     'Content-Type': 'application/json; charset=UTF-8',
    //   },
    //   body: formData,
    // };

  //   API.post('NOTES', `/logininfo`, userData)
  //     .then((response) => {
  //       console.log('Response:', response);
  //       setAlertVariant('success');
  //       setAlertMessage('Login successful!');
  //       setDismissingAlertShow(true);

  //       // Wait for a short time before navigating to another page
  //       setTimeout(() => {
  //         history.push('/dashboards');
  //       }, 2000); // 2 seconds delay
  //     })
  //     .catch((error) => {
  //       setAlertVariant('danger');
  //       setAlertMessage('Unable to Login.');
  //       setDismissingAlertShow(true);
  //       console.error('Error:', error.message);
  //     });
   console.log(alertMessage);

  return (
    <div style={{ textAlign: '-webkit-center' }}>
      <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 rounded">
        <div className="sw-lg-50 px-5">
          <div className="mb-5">
            <h2 className="cta-1 mb-0 text-primary">Welcome,</h2>
            <h2 className="cta-1 text-primary">let's get started!</h2>
          </div>
          
          <div className="mb-5">
            <p className="h6">Please use your credentials to login.</p>
            <p className="h6">
              If you are not a member, please <NavLink to="/registerpage">register</NavLink>.
            </p>
          </div>
          {dismissingAlertShow && (
            <Alert variant={alertVariant} onClose={() => setDismissingAlertShow(false)} dismissible>
              <strong>{alertMessage}</strong>
            </Alert>
          )}

          <div>
            <form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
              <div className="mb-3 filled form-group tooltip-end-top">
                <CsLineIcons icon="email" />
                <Form.Control
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className="mb-3 filled form-group tooltip-end-top ">
                <CsLineIcons icon="lock-off" />
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <NavLink className="text-small position-absolute t-3 e-3" to="/forgotpassword">
                  Forgot?
                </NavLink>
              </div>
              <Button size="lg" type="submit" disabled={isEnableLogin}>
                {isEnableLogin ? (
                  < div >
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Logging In..
                  </div>
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

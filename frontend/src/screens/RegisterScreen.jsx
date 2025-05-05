
// import { useState, useEffect, useCallback } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Form, Button, Row, Col } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import Loader from '../components/Loader';
// import FormContainer from '../components/FormContainer';
// import { useRegisterMutation } from '../slices/usersApiSlice';
// import { setCredentials } from '../slices/authSlice';
// import { toast } from 'react-toastify';

// const RegisterScreen = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const [errors, setErrors] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [register, { isLoading }] = useRegisterMutation();
//   const { userInfo } = useSelector((state) => state.auth);

//   const { search } = useLocation();
//   const sp = new URLSearchParams(search);
//   const redirect = sp.get('redirect') || '/';

//   useEffect(() => {
//     if (userInfo) {
//       navigate(redirect);
//     }
//   }, [navigate, redirect, userInfo]);

//   // Password validation regex (optional)
//   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

//   const validateForm = useCallback(() => {
//     let valid = true;
//     let newErrors = { name: '', email: '', password: '', confirmPassword: '' };

//     if (name.trim().length < 3) {
//       newErrors.name = 'Name must be at least 3 characters';
//       valid = false;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email.trim())) {
//       newErrors.email = 'Invalid email format';
//       valid = false;
//     }

//     if (!passwordRegex.test(password)) {
//       newErrors.password =
//         'Password must be at least 6 characters and contain at least one letter and one number';
//       valid = false;
//     }

//     if (password !== confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   }, [name, email, password, confirmPassword]);

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error('Please fix the errors before submitting');
//       return;
//     }

//     try {
//       const res = await register({
//         name: name.trim(),
//         email: email.trim(),
//         password: password,
//       }).unwrap();

//       dispatch(setCredentials({ ...res }));
//       navigate(redirect);
//     } catch (err) {
//       toast.error(err?.data?.message || err.error);
//     }
//   };

//   return (
//     <FormContainer>
//       <h1>Register</h1>
//       <Form onSubmit={submitHandler}>
//         <Form.Group className='my-2' controlId='name'>
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type='text'
//             placeholder='Enter name'
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             isInvalid={!!errors.name}
//           />
//           <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group className='my-2' controlId='email'>
//           <Form.Label>Email Address</Form.Label>
//           <Form.Control
//             type='email'
//             placeholder='Enter email'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             isInvalid={!!errors.email}
//           />
//           <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group className='my-2' controlId='password'>
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type='password'
//             placeholder='Enter password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             isInvalid={!!errors.password}
//           />
//           <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group className='my-2' controlId='confirmPassword'>
//           <Form.Label>Confirm Password</Form.Label>
//           <Form.Control
//             type='password'
//             placeholder='Confirm password'
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             isInvalid={!!errors.confirmPassword}
//           />
//           <Form.Control.Feedback type='invalid'>{errors.confirmPassword}</Form.Control.Feedback>
//         </Form.Group>

//         <Button disabled={isLoading} type='submit' variant='primary'>
//           Register
//         </Button>

//         {isLoading && <Loader />}
//       </Form>

//       <Row className='py-3'>
//         <Col>
//           Already have an account?{' '}
//           <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
//         </Col>
//       </Row>
//     </FormContainer>
//   );
// };

// export default RegisterScreen;





import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const validateForm = useCallback(() => {
    let valid = true;
    let newErrors = { name: '', email: '', password: '', confirmPassword: '' };

    if (name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be at least 6 characters and contain at least one letter and one number';
      valid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }, [name, email, password, confirmPassword]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    try {
      const res = await register({
        name: name.trim(),
        email: email.trim(),
        password: password,
      }).unwrap();

      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
            />
            <Button variant='outline-secondary' onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeSlash /> : <Eye />}
            </Button>
          </InputGroup>
          <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isInvalid={!!errors.confirmPassword}
            />
            <Button variant='outline-secondary' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeSlash /> : <Eye />}
            </Button>
          </InputGroup>
          <Form.Control.Feedback type='invalid'>{errors.confirmPassword}</Form.Control.Feedback>
        </Form.Group>

        <Button disabled={isLoading} type='submit' variant='primary'>
          Register
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;

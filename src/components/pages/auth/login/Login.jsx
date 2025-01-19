import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotificationToast from '../../../common/NotificationToast';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import * as Yup from "yup";
import { useFormik } from 'formik';
import hideEyeIcon from "../../../../assets/icons/hide-eye.png";
import showEyeIcon from "../../../../assets/icons/show-eye.png";
import { login } from '../../../../redux/actions/auth/auth.actions';
import { Link, Navigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const { isLogginSuccess } = useSelector((state) => state.auth);
    const notification = useSelector(state => state.notification)
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object({
        email: Yup.string()
            .required("Please enter your email address."),

        password: Yup.string()

            .required("Please enter your password."),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let payload = {
                username: values.email,
                password: values.password,
            };
            dispatch(login(payload));
        },
    });

    if (isLogginSuccess) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <>
            {notification && notification.visibility && <NotificationToast type={notification.type} message={notification.message} />}
            <Container>
                <Row>
                    <Col md={12}>
                        <div className='login-screen'>
                            <h3>Welcome to Task Manager</h3>
                            <h5>Login</h5>
                            <div className='login-form mt-3'>
                                <div className='form-content form-wrapper'>
                                    <Form noValidate onSubmit={formik.handleSubmit}>
                                        <Row>
                                            <Col sm={12}>
                                                <Form.Control
                                                    placeholder="Email"
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    maxLength={255}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    isInvalid={
                                                        formik.touched.email && formik.errors.email
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {formik.touched.email && formik.errors.email ? (
                                                    <Form.Control.Feedback
                                                        type="invalid"
                                                        className="d-flex"
                                                    >
                                                        {formik.errors.email}
                                                    </Form.Control.Feedback>
                                                ) : null}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={12}>
                                                <InputGroup>
                                                    <Form.Control
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Password"
                                                        id="password"
                                                        name="password"
                                                        maxLength={50}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        isInvalid={
                                                            formik.touched.password &&
                                                                formik.errors.password
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    <InputGroup.Text
                                                        id="eye-icon"
                                                        style={{
                                                            border:
                                                                formik.touched.password &&
                                                                    formik.errors.password
                                                                    ? "1px solid #82C5E9"
                                                                    : "",
                                                            borderTopRightRadius:
                                                                formik.touched.password &&
                                                                    formik.errors.password
                                                                    ? "4px"
                                                                    : "4px",
                                                            borderBottomRightRadius:
                                                                formik.touched.password &&
                                                                    formik.errors.password
                                                                    ? "4px"
                                                                    : "4px",
                                                        }}
                                                    >
                                                        <img
                                                            src={showPassword ? showEyeIcon : hideEyeIcon}
                                                            width="20px"
                                                            alt="password-toggle"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        />
                                                    </InputGroup.Text>
                                                    {formik.touched.password &&
                                                        formik.errors.password ? (
                                                        <Form.Control.Feedback
                                                            type="invalid"
                                                            className="d-flex text-start"
                                                        >
                                                            {formik.errors.password}
                                                        </Form.Control.Feedback>
                                                    ) : null}
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={12}>
                                                <div className="submit-button text-center">
                                                    <Button
                                                        variant="primary"
                                                        id="button-addon2"
                                                        type="submit"
                                                    >
                                                        Log In
                                                    </Button>
                                                </div>
                                                <p className='register-text text-center'>
                                                    <Link to={"/register"}>Click here to Register</Link>
                                                </p>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Login;
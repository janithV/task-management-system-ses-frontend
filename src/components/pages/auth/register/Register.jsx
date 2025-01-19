import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import NotificationToast from '../../../common/NotificationToast';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import hideEyeIcon from "../../../../assets/icons/hide-eye.png";
import showEyeIcon from "../../../../assets/icons/show-eye.png";
import { register, updateRegisterStatus } from '../../../../redux/actions/auth/auth.actions';
import { Navigate, useNavigate } from 'react-router-dom';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const notification = useSelector(state => state.notification)
    const { isRegisterSuccess } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .max(50, 'Only 50 characters allowed')
            .required('This field is mandatory'),

        lastName: Yup.string()
            .max(50, 'Only 50 characters allowed')
            .required('This field is mandatory'),

        email: Yup.string()
            .matches(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email address")
            .required('This field is mandatory'),

        password: Yup.string()
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&^#"&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d@$!%*?&^#"&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
                "Password must be at least 8 characters long and include a mix of letters, numbers, and special characters."
            )
            .required('This field is mandatory'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let payload = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
            };
            dispatch(register(payload));
        },
    });

    useEffect(() => {
        if(isRegisterSuccess) {
            dispatch(updateRegisterStatus())
            navigate('/')
        }

    }, [isRegisterSuccess, dispatch, navigate])

    return (
        <>
            {notification && notification.visibility && <NotificationToast type={notification.type} message={notification.message} />}
            <Container>
                <Row>
                    <Col md={12}>
                        <div className='login-screen'>
                            <h3>Welcome to Task Manager</h3>
                            <h5>Register</h5>
                            <div className='login-form mt-3'>
                                <div className='form-content form-wrapper'>
                                    <Form noValidate onSubmit={formik.handleSubmit}>
                                        <Row>
                                            <Col sm={12}>
                                                <Form.Control
                                                    placeholder="First name"
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    maxLength={50}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    isInvalid={
                                                        formik.touched.firstName && formik.errors.firstName
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {formik.touched.firstName && formik.errors.firstName ? (
                                                    <Form.Control.Feedback
                                                        type="invalid"
                                                        className="d-flex"
                                                    >
                                                        {formik.errors.firstName}
                                                    </Form.Control.Feedback>
                                                ) : null}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={12}>
                                                <Form.Control
                                                    placeholder="Last name"
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    maxLength={50}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    isInvalid={
                                                        formik.touched.lastName && formik.errors.lastName
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {formik.touched.lastName && formik.errors.lastName ? (
                                                    <Form.Control.Feedback
                                                        type="invalid"
                                                        className="d-flex"
                                                    >
                                                        {formik.errors.lastName}
                                                    </Form.Control.Feedback>
                                                ) : null}
                                            </Col>
                                        </Row>
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
                                                        Register
                                                    </Button>
                                                </div>
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

export default Register;
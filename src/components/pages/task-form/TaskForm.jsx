import { useFormik } from 'formik';
import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import DatePicker from 'react-multi-date-picker';
import { useParams } from 'react-router-dom';
import * as Yup from "yup";

const TaskForm = () => {
    const { id } = useParams()

    const validationSchema = Yup.object({
        title: Yup.string()
            .required('This field is mandatory'),

        description: Yup.string()
            .required('This field is mandatory'),

        dueDate: Yup.date()
            .required('This field is mandatory'),
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            dueDate: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let payload = {
                title: values.title,
                description: values.description,
            };
            //dispatch(login(payload));
        },
    });

    const handleDateChange = (date) => {
        console.log('date',Date(date));
        
    }

    return (
        <>
            <Row>
                <Col md={12}>
                    <div className='task-form'>
                        <h3>{id ? "Edit task" : "Let's Add a new task!"}</h3>
                        <h6>{id ? "Edit the details of the task" : "Enter the follwing details to create a task."}</h6>
                        <div className='form-content form-wrapper'>
                            <Form noValidate onSubmit={formik.handleSubmit}>
                                <Row>
                                    <Col sm={12}>
                                        <Form.Control
                                            placeholder="Title"
                                            type="text"
                                            id="title"
                                            name="title"
                                            maxLength={255}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={
                                                formik.touched.title && formik.errors.title
                                                    ? true
                                                    : false
                                            }
                                        />
                                        {formik.touched.title && formik.errors.title ? (
                                            <Form.Control.Feedback
                                                type="invalid"
                                                className="d-flex"
                                            >
                                                {formik.errors.title}
                                            </Form.Control.Feedback>
                                        ) : null}
                                    </Col>

                                    <Col sm={12}>
                                        <Form.Control
                                            placeholder="Description"
                                            type="textarea"
                                            id="description"
                                            name="description"
                                            maxLength={255}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={
                                                formik.touched.description && formik.errors.description
                                                    ? true
                                                    : false
                                            }
                                        />
                                        {formik.touched.description && formik.errors.description ? (
                                            <Form.Control.Feedback
                                                type="invalid"
                                                className="d-flex"
                                            >
                                                {formik.errors.description}
                                            </Form.Control.Feedback>
                                        ) : null}
                                    </Col>

                                    <Col sm={12}>
                                        <DatePicker
                                            value={formik.values.dueDate}
                                            onChange={handleDateChange}
                                            id='dueDate'
                                           
                                            placeholder='Select Due date'
                                            className='datepicker'
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default TaskForm;
import { useFormik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup";
import { createTask, getTask, resetTask, resetTaskResponse, updateTask } from '../../../redux/actions/task/task.actions';
import { useDispatch, useSelector } from 'react-redux';

const TaskForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams()
    const { status, task } = useSelector(state => state.task);
    const [dueDate, setDueDate] = useState(task ? new Date(task.dueDate) : null);

    const validationSchema = Yup.object({
        title: Yup.string()
            .required('This field is mandatory'),

        description: Yup.string()
            .required('This field is mandatory'),

        dueDate: Yup.date()
            .required('This field is mandatory'),

        status: Yup.number()
            .required('This field is mandatory')
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            dueDate: "",
            status: 1
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let payload = {
                title: values.title,
                description: values.description,
                dueDate: moment(values.dueDate.toISOString()).endOf('day').valueOf(),
                status: values.status
            };

            if (id) {
                dispatch(updateTask(payload, id));
                dispatch(resetTask())
            }
            else {
                dispatch(createTask(payload));
            }
        },
    });

    // handle date change
    const handleDateChange = (date) => {
        formik.setFieldValue("dueDate", date);
        setDueDate(date);
    }

    // reset form on clear
    const handleResetForm = () => {
        if (id) {
            formik.setFieldValue('title', task.title);
            formik.setFieldValue('description', task.description);
            formik.setFieldValue('dueDate', new Date(task.dueDate));
            formik.setFieldValue('status', task.status);
            setDueDate(new Date(task.dueDate));
            return
        }
        formik.resetForm();
        setDueDate(new Date());
    }

    useEffect(() => {
        if (status) {
            formik.resetForm();
            setDueDate(new Date());
            dispatch(resetTaskResponse());
            navigate('/dashboard')
        }
    }, [status]);

    useEffect(() => {
        if (id) {
            dispatch(getTask(id));
        }
    }, [id]);

    useEffect(() => {
        if (task) {
            formik.setFieldValue('title', task.title);
            formik.setFieldValue('description', task.description);
            formik.setFieldValue('dueDate', new Date(task.dueDate));
            formik.setFieldValue('status', task.status);
            setDueDate(new Date(task.dueDate));
        }
    }, [task]);

    return (
        <>
            <Row>
                <Col md={12}>
                    <div className='task-form'>
                        <h3>{id ? "Edit task" : "Let's Add a new task!"}</h3>
                        <h6>{id ? "Edit the details of the task" : "Enter the follwing details to create a task."}</h6>
                        <div className='form-content form-wrapper mt-3'>
                            <Form noValidate onSubmit={formik.handleSubmit}>
                                <Row>
                                    <Col sm={6} className='mb-2'>
                                        <Form.Control
                                            placeholder="Title"
                                            type="text"
                                            id="title"
                                            name="title"
                                            maxLength={255}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.title}
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
                                </Row>
                                <Row>
                                    <Col sm={6} className='mb-2'>
                                        <Form.Control
                                            placeholder="Description"
                                            type="textarea"
                                            id="description"
                                            name="description"
                                            maxLength={255}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.description}
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
                                </Row>
                                <Row>
                                    <Col sm={6} className='mb-2'>
                                        <DatePicker
                                            minDate={new Date()}
                                            placeholderText='Due Date'
                                            id='dueDate'
                                            selected={dueDate}
                                            onChange={handleDateChange}
                                            className='date-picker'
                                        />
                                        {formik.touched.dueDate && formik.errors.dueDate ? (
                                            <Form.Control.Feedback
                                                type="invalid"
                                                className="d-flex"
                                            >
                                                {formik.errors.dueDate}
                                            </Form.Control.Feedback>
                                        ) : null}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6} className='mb-2'>
                                        <Form.Select
                                            aria-label="Default select example"
                                            value={formik.values.status}
                                            onChange={formik.handleChange}
                                            disabled={id ? false : true}
                                            id='status'
                                            name='status'
                                        >
                                            <option value={1}>Pending</option>
                                            <option value={2}>In progress</option>
                                            <option value={3}>Completed</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6} className='mb-2'>

                                        <div className='form-footer'>
                                            <Button type='reset' onClick={handleResetForm}>Clear</Button>
                                            <Button type='submit'>{id ? "Edit" : "Create"} task</Button>
                                        </div>
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
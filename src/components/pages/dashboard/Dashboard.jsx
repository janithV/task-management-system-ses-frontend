import React, { useCallback, useEffect } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import AnalyticCard from '../../common/AnalyticCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getAnalytics, getTasks, resetTask } from '../../../redux/actions/task/task.actions';
import moment from 'moment';

const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { tasks, analytics } = useSelector(state => state.task);

    const handleAddBtnClick = useCallback(() => {
        navigate('/task')
    }, [navigate])

    const handleTaskDelete = (id) => {
        alert('Are you sure you want to delete this task?')
        dispatch(deleteTask(id))
    }

    const handleEditTask = (id) => {
        navigate(`/task/${id}`)
    }

    useEffect(() => {
        dispatch(resetTask())
        dispatch(getTasks())
        dispatch(getAnalytics())
    }, [])

    return (
        <>
            <Row className='row-gap-3'>
                <Col md={4}>
                    <AnalyticCard title={"Total Tasks"} description={"All of your tasks."} amount={analytics.total} />
                </Col>
                <Col md={4}>
                    <AnalyticCard title={"Pending Tasks"} description={"Tasks yet to complete."} amount={analytics.pending} />
                </Col>
                <Col md={4}>
                    <AnalyticCard title={"Completed  Tasks"} description={"Tasks already completed."} amount={analytics.completed} />
                </Col>
            </Row>
            <hr style={{ color: 'black' }} className='mt-4' />
            <Row className='justify-content-end'>
                <Col lg={2}>
                    <div className='text-end'>
                        <Button className='w-100' onClick={handleAddBtnClick}>Add a task</Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <div className='table-view mt-5'>
                        <div className="table-responsive">
                            <Table width={'100%'} className="table">
                                <thead>
                                    <tr>
                                        <th style={{ maxWidth: '20%' }}>TITLE</th>
                                        <th style={{ maxWidth: '20%' }}>DESCRIPTION</th>
                                        <th style={{ maxWidth: '20%' }}>DUE DATE</th>
                                        <th className='text-center' style={{ width: '20%' }}>STATUS</th>
                                        <th style={{ width: '20%' }}>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tasks.length ? tasks.map((task, index) => {
                                            let statusText = 'N/A'

                                            switch (task.status) {
                                                case 1:
                                                    statusText = 'Pending'
                                                    break;
                                                case 2:
                                                    statusText = 'In Progress'
                                                    break;
                                                case 3:
                                                    statusText = 'Completed'
                                                    break;
                                                default:
                                                    statusText = 'N/A'
                                                    break;
                                            }
                                            return(
                                                <tr key={index}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>{moment(task.dueDate).format('DD/MM/YYYY')}</td>
                                                    <td className='text-center'>{statusText}</td>
                                                    <td>
                                                        <div className='d-flex justify-content-around'>
                                                            <Button variant='primary' onClick={() => handleEditTask(task._id)}>Edit</Button>
                                                            <Button variant='danger' onClick={() => handleTaskDelete(task._id)}>Delete</Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                        <td colSpan={5}>
                                           <div>
                                                  <p className='text-center'>No tasks found.</p>
                                           </div>
                                        </td>
                                    </tr>
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default Dashboard;
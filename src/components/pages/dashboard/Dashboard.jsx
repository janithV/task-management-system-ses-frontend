import React, { useCallback } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import AnalyticCard from '../../common/AnalyticCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate()

    const handleAddBtnClick = useCallback(() => {
        navigate('/task')
    }, [navigate])

    return (
        <>
            <Row className='row-gap-3'>
                <Col md={4}>
                    <AnalyticCard title={"Total Tasks"} description={"All of your tasks."} />
                </Col>
                <Col md={4}>
                    <AnalyticCard title={"Pending Tasks"} description={"Tasks yet to complete."} />
                </Col>
                <Col md={4}>
                    <AnalyticCard title={"Completed  Tasks"} description={"Tasks already completed."} />
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
        </>
    );
};

export default Dashboard;
import React from 'react';
import { Card } from 'react-bootstrap';

const AnalyticCard = React.memo(({ title, description, amount }) => {
    return (
        <Card className='custom-card'>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{description}</Card.Subtitle>
                <hr/>
                <Card.Text className='text-end'>
                   {amount}
                </Card.Text>
            </Card.Body>
        </Card>
    );
});

export default AnalyticCard;
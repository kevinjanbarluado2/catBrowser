import React from 'react';
import {Col} from 'react-bootstrap';

function Cats(props) {
    
    return (
        <>
            {props.data.map((el,idx) => (
                <Col key={idx} className='col col-md-3 col-sm-6 col-12'>
                    <div key={idx} className='card'>
                        <img alt="" className="card-img-top carousel img-thumbnail" src={el.url}></img>
                        <div className='card-body'>
                            <a className="btn btn-primary" href={"/" + el.id}>View details</a>
                        </div>
                    </div>
                </Col>
            ))}
        </>
    );
}

export default Cats;
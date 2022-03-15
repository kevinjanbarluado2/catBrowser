import React, { useState, useLocation, useNavigate } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Card, CardImg, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"

export default function Cat() {
    const [display, setdisplay] = useState(<h1>Loading...</h1>);
    const [isLoaded, setisLoaded] = useState(false);
    const { cat } = useParams();

    axios.get(`https://api.thecatapi.com/v1/images/${cat}`).then((e) => e.data
    ).then((data) => {
        if (!isLoaded) {
            console.log(data)
            let img = data.url
            let breed = data.breeds[0].id
            let { name, origin, temperament, description } = data.breeds[0]
            let html =
                <Card>
                    <Card.Header>
                        <a className="btn btn-primary" href={"./?breed=" + breed}>Back</a>
                    </Card.Header>
                    <img alt={data.id} src={img}></img>
                    <Card.Body>
                        <h4>{name}</h4>
                        <h5>Origin: {origin}</h5>
                        <h6>{temperament} </h6>
                        <p>{description}</p>
                    </Card.Body>
                </Card >
            setisLoaded(true)
            setdisplay(html);
        }

    }).catch((e) => {
        window.location = "/"
    })

    return <div className="container">
        {display}
    </div>
}
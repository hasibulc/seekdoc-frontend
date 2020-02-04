import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
// import ListGroup from 'react-bootstrap/ListGroup'
import Search from "../components/SearchForm"



export default function Betterdoctor(props) {

    //declaring new state variable
    const [doctors, setDoctors] = useState([]);
    const [url, setUrl] = useState(props.URL)

    useEffect (() =>{
        fetch(url)
        .then(resp => resp.json())
        .then(data => {setDoctors(data.data)})
    })

    function capitalizeName(name) {
        name = name.toLowerCase()
        return name.replace(/\b(\w)/g, s => s.toUpperCase());
      }

    return (
      <div>
      <Search url={url} setUrl={setUrl}/>
        <CardColumns>
            {doctors.map((doctor, key) => 
                <div key={key}>
                    <Card className="text-center bg-light" border="primary">
                        <Card.Body>
                            <Card.Title>
                                {doctor.profile.first_name} {doctor.profile.last_name}
                            </Card.Title>
                            <Card.Subtitle>
                                {doctor.profile.gender}
                            </Card.Subtitle>
                            <Card.Text>
                                <br />{capitalizeName(doctor.practices[0].name)}
                                <br />
                                <span>
                                    <br/>{doctor.practices[0].visit_address.street}
                                    <br/>{doctor.practices[0].visit_address.city}, {doctor.practices[0].visit_address.state} {doctor.practices[0].visit_address.zip}
                                    <br/>{doctor.practices[0].visit_address.lat}
                                    <br/>{doctor.practices[0].visit_address.lon}
                                </span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </CardColumns>
      </div> 
    )
}

// {doctor.profile.first_name} 
// {doctor.profile.last_name}
// {doctor.profile.gender}
// {doctor.practices[0].lat}
// {doctor.practices[0].lon}
// {doctor.practices[0].name}
// {doctor.practices[0].visit_address.street}                   
// {doctor.practices[0].visit_address.city}
// {doctor.practices[0].visit_address.state}
// {doctor.practices[0].visit_address.zip}
// {doctor.practices[0].visit_address.lat}
// {doctor.practices[0].visit_address.lon}
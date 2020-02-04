import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'

const URL = 'https://api.betterdoctor.com/2016-03-01/doctors?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=d994be9b7ff6bee4ddde72b8eb9b176f'

export default function Betterdoctor() {

    //declaring new state variable
    // const [doctors, setDoctors] = useState(['hi', 'hello']);
    const [doctors, setDoctors] = useState([]);
    // const doctors = ['hi', 'hello']


    useEffect (() =>{
        fetch(URL)
        .then(resp => resp.json())
        .then(data => {setDoctors(data.data)})
    })
    

    return (
      <div>
      <CardColumns>
        {doctors.map((doctor, key) => 
            <div key={key}>
                <Card className="text-center">
                    <Card.Body>
                        <Card.Title>
                            {doctor.profile.first_name} {doctor.profile.last_name}
                        </Card.Title>
                        <Card.Subtitle>
                            {doctor.profile.gender}
                        </Card.Subtitle>
                        <Card.Text>
                            <p>
                                <br/>{doctor.practices[0].name}
                                <br/>{doctor.practices[0].visit_address.street}
                                <br/>{doctor.practices[0].visit_address.city}, {doctor.practices[0].visit_address.state} {doctor.practices[0].visit_address.zip}
                                <br/>{doctor.practices[0].visit_address.lat}
                                <br/>{doctor.practices[0].visit_address.lon}
                            </p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>)}
        </CardColumns>
      </div> 
        // <div>
        //     {doctors}
        // </div>
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
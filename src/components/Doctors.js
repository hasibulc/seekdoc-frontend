import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// import Gravatar from 'react-gravatar';

const DOCTORS_QUERY = gql`
    query {
        allDoctors {
            id
            firstName
            lastName
            bio
            locationLat
            locationLong
            locationName
            street
            city
            # state
            zip
        }
    }`;

class Doctors extends Component {

    
    
    state = {
        
    }

    handleClick = () => {
        console.log('CLICKED')
    }

    render () {
        return (
            <Query query={DOCTORS_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching..</div>
                    if (error) return <div>Error!</div>
        
                    return (
                        <div>
                            {data.allDoctors.map((doctor, key) => 
                                <div key={key} onClick={this.handleClick} style={{textAlign: 'center'}}>
                                    <p>
                                    <br /> ID: {doctor.id}
                                    <br /> First Name: {doctor.firstName}
                                    <br /> Last Name: {doctor.lastName}
                                    <br /> Bio: {doctor.bio}
                                    <br /> Lat: {doctor.locationLat}
                                    <br /> Long: {doctor.locationLong}
                                    <br /> Location Name: {doctor.locationName}
                                    <br /> Street Address: {doctor.street}
                                    <br /> City: {doctor.city}
                                    <br /> State: {doctor.state}
                                    <br /> Zip Code: {doctor.zip}
                                    </p>
                                </div>)}
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default Doctors;
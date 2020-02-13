import React from 'react';
import gql from 'graphql-tag';
import Card from 'react-bootstrap/Card'
import GoogleMapReact from 'google-map-react'
import { Query } from 'react-apollo'
import male from "../images/male_doctor_icon.png"
import female from "../images/female_doctor_icon.png"

export default function UserFavorites() {

    const USER_FAVORITES_QUERY = gql`
        query {
            allUserFavorite {
                doctorFn
                doctorLn
                gender
                bio
                locationLat
                locationLong
                locationName
                locationStreet
                locationCity
                locationState
                locationZip
                rating
                review
            }
        }`;

    function handleGenderIcon(gender) {
        if (gender == 'male') {
            return (
                <img alt="male" src={male} width="30" height="30"/>
            )
        } else {
            return (
                <img alt="female" src={female} width="30" height="30"/>
            )
        }
    }


    return (
        
            <Query query={USER_FAVORITES_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching..</div>
                    if (error) return <div>Error!</div>
                    console.log(data)
                    
                     return(   <div>
                            {data.allUserFavorite.map((doctor, key) => 

                                <Card className="text-center bg-light" border="primary" key={key}>
                                    <Card.Body>
                                        <Card.Title>
                                            {doctor.doctorFn} {doctor.doctorLn}
                                        </Card.Title>
                                        <Card.Subtitle>
                                            {handleGenderIcon(doctor.gender)}
                                        </Card.Subtitle>
                                        <Card.Subtitle>
                                            {doctor.bio}
                                        </Card.Subtitle>
                                        <Card.Text>
                                            <br />{doctor.locationName}
                                            <br />
                                            <span>
                                                <br/>{doctor.locationStreet}
                                                <br/>{doctor.locationCity}, {doctor.locationState} {doctor.locationZip}
                                                {/*<br/>{doctor.locationLat}
                                                   <br/>{doctor.locationLong}*/}
                                            </span>
                                        </Card.Text>
                                    </Card.Body>
                                    {/*Google Maps*/}
                                    <div style={{ height: '25vh', width: '100%', position: 'relative', 'margin': '0 auto'}}>
                                    <GoogleMapReact 

                                        bootstrapURLKeys={{
                                            key: `${process.env.GOOGLE_API}`, 
                                            language: 'en'
                                            }}

                                            defaultCenter={{lat: 40.73, lng: -73.93}}
                                            center={{lat: doctor.locationLat, lng: doctor.locationLong}}
                                            defaultZoom={15}
                                            >  
                                        </GoogleMapReact>
                                    </div>
                                </Card>
                            
                            )}
                        </div>
                    
                     )}}
            </Query>
        
    )
    
}
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import GoogleMapReact from 'google-map-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Query } from 'react-apollo';

import male from "../images/male_doctor_icon.png"
import female from "../images/female_doctor_icon.png"

import { Link } from "gatsby"

export default function Betterdoctor() {

    //declaring new state variable
    const [doctors, setDoctors] = useState([]);
    const [url, setUrl] = useState(`https://api.betterdoctor.com/2016-03-01/doctors?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${process.env.BD_API}`);
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [stateName, setStateName] = useState('');
    const [browserCoords, setBrowserCoords] = useState({});
    const [showFaveForm, setShowFaveForm] = useState(false);
    // const [faveButtonState, setFaveButtonState] = useState(true);

    useEffect ( () =>{
       fetch(url)
        .then(resp  => resp.json())
        .then(data => {setDoctors(data.data)})
    }, [url]);

    function capitalizeName(name) {
        name = name.toLowerCase()
        return name.replace(/\b(\w)/g, s => s.toUpperCase());
    }

    function handleSubmit(e) {
        e.preventDefault()
        
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${streetAddress}+${city}+${stateName}&key=${process.env.GOOGLE_API}`)
        .then(resp => resp.json())
        .then(data => { 
            setUrl(`https://api.betterdoctor.com/2016-03-01/doctors?location=${data.results[0].geometry.location.lat}%2C${data.results[0].geometry.location.lng}%2C100&user_location=${data.results[0].geometry.location.lat}%2C${data.results[0].geometry.location.lng}&sort=distance-asc&skip=0&limit=10&user_key=${process.env.BD_API}`)  
        })
    }

    function handleGender(e) {
        let newUrl = ''
        switch (e.target.innerText) {
            case 'Male' :
                console.log('MALE')

                if (url.includes("&gender=female")) {
                    newUrl = url.split("&gender=female")
                    newUrl = newUrl[0] + `&gender=male&limit=10&user_key=${process.env.BD_API}`
                    setUrl(newUrl)
                } else if (url.includes("&gender=male")) {
                    return null
                } else {
                    newUrl = url.split("&limit=10")
                    newUrl = newUrl[0] + "&gender=male" + `&limit=10&user_key=${process.env.BD_API}`
                    setUrl(newUrl)                   
                }
                
            break;
            case 'Female' :
                console.log('FEMALE')
                
                if (url.includes("&gender=male")) {
                    newUrl = url.split("&gender=male")
                    newUrl = newUrl[0] + `&gender=female&limit=10&user_key=${process.env.BD_API}`
                    setUrl(newUrl)
                } else if (url.includes("&gender=female")){
                    return null
                } else {
                    newUrl = url.split("&limit=10")
                    newUrl = newUrl[0] + `&gender=female" + "&limit=10&user_key=${process.env.BD_API}`
                    setUrl(newUrl)                   
                }

            break;
        }
    }

    function browserLocation() {

        function saveLocation(position) {
            console.log('browser location:', position.coords.latitude, position.coords.longitude)
            setUrl(`https://api.betterdoctor.com/2016-03-01/doctors?location=${position.coords.latitude}%2C${position.coords.longitude}%2C100&user_location=${position.coords.latitude}%2C${position.coords.longitude}&skip=0&limit=10&user_key=${process.env.BD_API}`)
          }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(saveLocation)
          } 
        
    }
    
    function renderMarkers(map, maps, myLatLng) {
        let marker = new maps.Marker({
        position: myLatLng,
        map,
        title: 'Hello World!'
        });
    }

    const Marker = ({text}) => {
        return <div className="SuperAwesomePin"></div>
    }

    function handleFave(e, doctor, createUserFavorite, faveButtonState) {
        // const [faveDoctor, setFaveDoctor] = useState({})
        const docObj = {
            userId: 1,
            doctorFn: doctor.profile.first_name,
            doctorLn: doctor.profile.last_name,
            gender: doctor.profile.gender,
            bio: doctor.profile.bio,
            locationLat: doctor.practices[0].visit_address.lat,
            locationLong: doctor.practices[0].visit_address.lon,
            locationName: capitalizeName(doctor.practices[0].name),
            locationStreet: doctor.practices[0].visit_address.street,
            locationCity: doctor.practices[0].visit_address.city,
            locationState: doctor.practices[0].visit_address.state,
            locationZip: parseInt(doctor.practices[0].visit_address.zip),
            rating: null,
            review: null,
        }
        // console.log(doctor)
        // console.log(e.target.innerText)
        // console.log(docObj)
        if (faveButtonState) {
            createUserFavorite({ variables: docObj })
            // setFaveButtonState(!faveButtonState)
        } 
        // else {
        //     setFaveButtonState(!faveButtonState)
        // }
        console.log(faveButtonState)
        // setFaveButtonState(!faveButtonState)
    }

    function handleGenderIcon(gender) {
        if (gender == 'male') {
            return (
                <img alt="male" src={male} width="40" height="40"/>
            )
        } else {
            return (
                <img alt="female" src={female} width="40" height="40"/>
            )
        }
    }

    const FAVE_DOCTOR = gql`
        mutation CreateUserFavorite(
                              $userId: Int!,  
                              $doctorFn: String!,  
                              $doctorLn: String!,
                              $gender: String! 
                              $bio: String!,
                              $locationLat: Float, 
                              $locationLong: Float, 
                              $locationName: String!,
                              $locationStreet: String!, 
                              $locationCity: String!,
                              $locationState: String!,
                              $locationZip: Int!, 
                              $rating: Int, 
                              $review: String,
                            ) 
                            {
                        createUserFavorite(input: {
                            userId: $userId, 
                            doctorFn: $doctorFn, 
                            doctorLn: $doctorLn, 
                            gender: $gender,
                            bio: $bio, 
                            locationLat: $locationLat,
                            locationLong: $locationLong, 
                            locationName: $locationName, 
                            locationStreet: $locationStreet,
                            locationCity: $locationCity, 
                            locationState: $locationState, 
                            locationZip: $locationZip,
                            rating: $rating,
                            review: $review,
                            }) {
            userFavorite {
                userId
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
        }
    }`;

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



    return (
        <div>
            {/*<Link to="/user-favorites/">User Favorites</Link>*/}
            <div>
                <h3>Enter Your Location</h3>
                <form>
                    <input placeholder="Street Address" value={streetAddress} onChange={e => setStreetAddress(e.target.value)} />
                    <input placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
                    <input placeholder="State" value={stateName} onChange={e => setStateName(e.target.value)} />
                    <button type="submit" onClick={handleSubmit}>
                        Submit
                    </button>
                </form>
                <ButtonToolbar>
                    <Button variant="info" onClick={browserLocation}>
                        Auto Location
                    </Button>
                    <DropdownButton id="dropdown-basic-button" title="Filter By Gender"  onClick={handleGender}>
                        <Dropdown.Item eventKey="male">Male</Dropdown.Item>
                        <Dropdown.Item eventKey="female">Female</Dropdown.Item>
                    </DropdownButton>
                </ButtonToolbar>
            </div>
            <div className="card div">
                {doctors.map((doctor, key) => 
                    <div key={key}>
                        <Card className="text-center bg-light" border="primary">
                            <Card.Body>
                                <Card.Title>
                                    {doctor.profile.first_name} {doctor.profile.last_name}
                                </Card.Title>
                                <Card.Subtitle>
                                    {handleGenderIcon(doctor.profile.gender)}
                                </Card.Subtitle>
                                <Card.Subtitle>
                                    {doctor.profile.bio}
                                </Card.Subtitle>
                                <Card.Text>
                                    <br />{capitalizeName(doctor.practices[0].name)}
                                    <br />
                                    <span>
                                        <br/>{doctor.practices[0].visit_address.street}
                                        <br/>{doctor.practices[0].visit_address.city}, {doctor.practices[0].visit_address.state} {doctor.practices[0].visit_address.zip}
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
                                    center={{lat: doctor.practices[0].visit_address.lat, lng: doctor.practices[0].visit_address.lon}}
                                    defaultZoom={15}
                                    >  
                                    <Marker lat={doctor.practices[0].visit_address.lat} lng={doctor.practices[0].visit_address.lon} text={{text: 'text'}}/>
                                </GoogleMapReact>
                            </div>
                            {/*FAVORITE ICONS TEXT*/}
            
                            <Mutation mutation={FAVE_DOCTOR}>
                            {createUserFaveDoctorMutation => {

                                // const [faveButtonState, setFaveButtonState] = useState(true);
                                let faveButtonState = true

                                // faveButtonState ? 
                                // <ButtonToolbar>
                                //     <Button variant="success" onClick={(e) => handleFave(e, doctor, createUserFaveDoctorMutation)}>
                                //         Favorite
                                //     </Button>
                                // </ButtonToolbar> : 
                                // <ButtonToolbar>
                                // <Button variant="danger" onClick={(e) => handleFave(e, doctor, createUserFaveDoctorMutation)}>
                                //     Unfavorite
                                // </Button>
                                // </ButtonToolbar>
                                if (faveButtonState) {
                                    
                                    return(
                                    <ButtonToolbar >
                                        <Button variant="success" onClick={(e) => handleFave(e, doctor, createUserFaveDoctorMutation, faveButtonState)}>
                                           Favorite 
                                        </Button>
                                     </ButtonToolbar> 
                                    )
                                } else {
                                    return(
                                    <ButtonToolbar>
                                        <Button variant="danger" onClick={(e) => handleFave(e, doctor, createUserFaveDoctorMutation, faveButtonState)}>
                                           Unfavorite
                                        </Button>
                                     </ButtonToolbar> 
                                    )
                                }
                
                            }}
                            </Mutation>

                            <Query query={USER_FAVORITES_QUERY}>
                                {({ loading, error, data }) => {
                                    if (loading) return <div>Fetching..</div>
                                    if (error) return <div>Error!</div>
                                    console.log(data)
                                    
                                    return(   <div>
                                        </div>
                                )}}
                            </Query>
                             
                            {/*{showFaveForm ? 
                                <span>
                                    {doctor.profile.first_name} {doctor.profile.last_name}
                                    {capitalizeName(doctor.practices[0].name)}
                                    {doctor.practices[0].visit_address.street}
                                    {doctor.practices[0].visit_address.city}, {doctor.practices[0].visit_address.state} {doctor.practices[0].visit_address.zip}
                                 </span>
                            : null}*/}
                        </Card>
                     </div>
                )}
            </div>
        </div> 
    )
}
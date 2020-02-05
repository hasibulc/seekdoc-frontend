import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
// import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
// import ListGroup from 'react-bootstrap/ListGroup'
// import Search from "../components/SearchForm"
// import { ResponsiveEmbed } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';




export default function Betterdoctor() {

    //declaring new state variable
    const [doctors, setDoctors] = useState([]);
    const [url, setUrl] = useState(`https://api.betterdoctor.com/2016-03-01/doctors?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=d994be9b7ff6bee4ddde72b8eb9b176f`);
    // const [coordinates, setCoordinates] = useState({});
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [stateName, setStateName] = useState('');
    

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
        // props.setUrl('https://api.betterdoctor.com/2016-03-01/doctors?location=40.707983%2C-74.010011%2C100&user_location=40.707983%2C-74.010011&sort=distance-asc&skip=0&limit=10&user_key=d994be9b7ff6bee4ddde72b8eb9b176f')
        // console.log(`https://api.betterdoctor.com/2016-03-01/doctors?location=${lat}%2C${lon}%2C100&user_location=${lat}%${lon}&sort=distance-asc&skip=0&limit=10&user_key=d994be9b7ff6bee4ddde72b8eb9b176f`)
        
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${streetAddress}+${city}+${stateName}&key=AIzaSyDowWZL-i8GKG7UXzQC78enxxnV_sG8jwo`)
        .then(resp => resp.json())
        .then(data => { 
            // setCoordinates(data.results[0].geometry.location)
            console.log(`https://api.betterdoctor.com/2016-03-01/doctors?location=${data.results[0].geometry.location.lat}%2C${data.results[0].geometry.location.lng}%2C100&user_location=${data.results[0].geometry.location.lat}%2C${data.results[0].geometry.location.lng}&sort=distance-asc&skip=0&limit=10&user_key=d994be9b7ff6bee4ddde72b8eb9b176f`)
            setUrl(`https://api.betterdoctor.com/2016-03-01/doctors?location=${data.results[0].geometry.location.lat}%2C${data.results[0].geometry.location.lng}%2C100&user_location=${data.results[0].geometry.location.lat}%2C${data.results[0].geometry.location.lng}&sort=distance-asc&skip=0&limit=10&user_key=d994be9b7ff6bee4ddde72b8eb9b176f`)
            // setUrl(`https://api.betterdoctor.com/2016-03-01/doctors?location=${coordinates.lat}%2C${coordinates.lng}%2C100&user_location=${coordinates.lat}%${coordinates.lng}&sort=distance-asc&skip=0&limit=10&user_key=d994be9b7ff6bee4ddde72b8eb9b176f`)
        })
        // .then(setUrl(`https://api.betterdoctor.com/2016-03-01/doctors?location=${coordinates.lat}%2C${coordinates.lng}%2C100&user_location=${coordinates.lat}%${coordinates.lng}&sort=distance-asc&skip=0&limit=10&user_key=d994be9b7ff6bee4ddde72b8eb9b176f`))
    }

    function handleGender(e) {
        // console.log(e.target.innerText)
        let newUrl = ''
        switch (e.target.innerText) {
            case 'Male' :
                console.log('MALE')

                if (url.includes("&gender=female")) {
                    newUrl = url.split("&gender=female")
                    // console.log('SPLITING', newUrl)
                    newUrl = newUrl[0] + "&gender=male&limit=10&user_key=d994be9b7ff6bee4ddde72b8eb9b176f"
                    setUrl(newUrl)
                } else if (url.includes("&gender=male")) {
                    return null
                } else {
                    newUrl = url.split("&limit=10")
                    newUrl = newUrl[0] + "&gender=male" + "&limit=10&user_key=d994be9b7ff6bee4ddde72b8eb9b176f"
                    console.log(newUrl)
                    setUrl(newUrl)                   
                }
                
            break;
            case 'Female' :
                console.log('FEMALE')
                
                if (url.includes("&gender=male")) {
                    newUrl = url.split("&gender=male")
                    // console.log('SPLITING', newUrl)
                    newUrl = newUrl[0] + "&gender=female&limit=10&user_key=d994be9b7ff6bee4ddde72b8eb9b176f"
                    setUrl(newUrl)
                } else if (url.includes("&gender=female")){
                    return null
                } else {
                    newUrl = url.split("&limit=10")
                    newUrl = newUrl[0] + "&gender=female" + "&limit=10&user_key=d994be9b7ff6bee4ddde72b8eb9b176f"
                    console.log(newUrl)
                    setUrl(newUrl)                   
                }

            break;
        }
    }



    console.log(doctors)
    console.log(url)
    // console.log(process.env.BETTERDOCTOR_API)
    return (
        <div>
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
                    <DropdownButton id="dropdown-basic-button" title="Filter By Gender"  onClick={handleGender}>
                        <Dropdown.Item eventKey="male">Male</Dropdown.Item>
                        <Dropdown.Item eventKey="female">Female</Dropdown.Item>
                    </DropdownButton>
                </div>
        {/*<Search url={url} setUrl={setUrl}/>*/}
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
                          Google Maps
                          <div style={{ height: '25vh', width: '100%' }}>
                          <GoogleMapReact 

                          bootstrapURLKeys={{
                            key: 'AIzaSyDowWZL-i8GKG7UXzQC78enxxnV_sG8jwo', 
                            language: 'en'
                         }}

                            defaultCenter={{lat: 40.73, lng: -73.93}}
                            // center={{lat: 40.73, lng: -73.93}}
                            // defaultCenter={{lat: doctor.practices[0].visit_address.lat, lng: doctor.practices[0].visit_address.lon}}
                            center={{lat: doctor.practices[0].visit_address.lat, lng: doctor.practices[0].visit_address.lon}}
                            defaultZoom={12}
                            // onChildMouseEnter={this.onChildMouseEnter}
                            // onChildMouseLeave={this.onChildMouseLeave}
                            />
                        </div>
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
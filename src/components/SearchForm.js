import React, { useState } from 'react';
// import Geocode from "react-geocode";

export default function Search(props) {

    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [stateName, setStateName] = useState('');
    const [coordinates, setCoordinates] = useState({});

    // Geocode.setApiKey('')
    // Geocode.setLanguage("en")
    // Geocode.fromAddress(`${streetAddress} ${city} ${stateName}`).then(
    //     response => {
    //       const { lat, lon } = response.results[0].geometry.location;
    //       console.log(lat, lon);
    //     },
    //     error => {
    //       console.error(error);
    //     }
    //   )

    function handleSubmit(e) {
        e.preventDefault()
    
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${streetAddress}+${city}+${stateName}&key=${process.env.GOOGLE_API}`)
        .then(resp => resp.json())
        .then(data => {setCoordinates(data.results[0].geometry.location)})
        .then(console.log(coordinates.lat))
        .then(console.log(coordinates.lng))
        .then(props.setUrl(`https://api.betterdoctor.com/2016-03-01/doctors?location=${coordinates.lat}%2C${coordinates.lng}%2C100&user_location=${coordinates.lat}%${coordinates.lng}&sort=distance-asc&skip=0&limit=10&user_key=${process.env.BD_API}`))
    }


    return (
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
        </div>
    )
  
}
import React, { useState } from 'react';

export default function Search(props) {

    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [stateName, setStateName] = useState('');

    function handleSubmit(e) {
        e.preventDefault()
        props.setUrl('https://api.betterdoctor.com/2016-03-01/doctors?location=40.707983%2C-74.010011%2C100&user_location=40.707983%2C-74.010011&sort=distance-asc&skip=0&limit=10&user_key=d994be9b7ff6bee4ddde72b8eb9b176f')
        console.log(props)
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
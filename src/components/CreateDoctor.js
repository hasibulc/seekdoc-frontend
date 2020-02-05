import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';


class CreateDoctor extends Component {

    CREATE_DOCTOR = gql`
        mutation CreateDoctor($firstName: String!,  
                              $lastName: String!,
                              $gender: String! 
                              $bio: String!,
                              $locationLat: Float, 
                              $locationLong: Float, 
                              $locationName: String!,
                              $locationStreet: String!, 
                              $locationCity: String!,
                              $locationState: String!,
                              $locationZip: Int!) {
        createDoctor(input: {firstName: $firstName, 
                             lastName: $lastName, 
                             gender: $gender,
                             bio: $bio, 
                             locationLat: $locationLat,
                             locationLong: $locationLong, 
                             locationName: $locationName, 
                             locationStreet: $locationStreet,
                             locationCity: $locationCity, 
                             locationState: $locationState, 
                             locationZip: $locationZip}) {
            doctor {
                firstName
                lastName
                gender
                bio
                locationLat
                locationLong
                locationName
                locationStreet
                locationCity
                locationState
                locationZip
            }
        }
    }`;



    state = {
        firstName: '',
        lastName: '',
        gender: '',
        bio: '',
        locationLat: '',
        locationLong: '',
        locationName: '',
        locationStreet: '',
        locationCity: '',
        locationState: '',
        locationZip: '',
    }

    handleSubmit = (e, createDoctor) => {
        e.preventDefault()
        createDoctor({ variables: this.state })
        console.log(this.state)
        this.setState ({
            firstName: '',
            lastName: '',
            gender: '',
            bio: '',
            locationLat: '',
            locationLong: '',
            locationName: '',
            locationStreet: '',
            locationCity: '',
            locationState: '',
            locationZip: '',
        })
    }
    
    render () {

        return (
            <Mutation 
                mutation={this.CREATE_DOCTOR}
                // update={this.props.onCreateDoctor}
                >
                {createDoctorMutation => (
                    <form className="createDoctor" onSubmit={e => this.handleSubmit(e, createDoctorMutation)}>
                        <h3>Create new doctor</h3>
                        <div>
                            <input value={this.state.firstName} placeholder="First Name" onChange={e => this.setState({ firstName: e.target.value})}/>
                        </div>
                        <div>
                            <input value={this.state.lastName} placeholder="Last Name" onChange={e => this.setState({ lastName: e.target.value})}/>
                        </div>
                        <div>
                            <input value={this.state.gender} placeholder="Gender" onChange={e => this.setState({ gender: e.target.value})}/>
                        </div>
                        <div>
                            <input value={this.state.bio} placeholder="Bio" onChange={e => this.setState({ bio: e.target.value})}/>
                        </div>
                        <div>
                            <input value={this.state.locationLat} type="number" step="any" placeholder="Location Lat" onChange={e => this.setState({ locationLat: parseFloat(e.target.value)})}/>
                        </div>
                        <div>
                            <input value={this.state.locationLong} type="number" step="any" placeholder="Location Long" onChange={e => this.setState({ locationLong: parseFloat(e.target.value)})}/>
                        </div>
                        <div>
                            <input value={this.state.locationName} placeholder="Location Name" onChange={e => this.setState({ locationName: e.target.value})}/>
                        </div>
                        <div>
                            <input value={this.state.locationStreet} placeholder="Street Address" onChange={e => this.setState({ locationStreet: e.target.value})}/>
                        </div>
                        <div>
                            <input value={this.state.locationCity} placeholder="City" onChange={e => this.setState({ locationCity: e.target.value})}/>
                        </div>
                        <div>
                            <input value={this.state.locationState} placeholder="State" onChange={e => this.setState({ locationState: e.target.value})}/>
                        </div>
                        <div>
                            <input value={this.state.locationZip} type="number" placeholder="Zip Code" onChange={e => this.setState({ locationZip: parseInt(e.target.value)})}/>
                        </div>
                        <button type="submit">
                            Submit
                        </button>
                    </form>
                )}
            </Mutation>
        )

    }
}

export default CreateDoctor;
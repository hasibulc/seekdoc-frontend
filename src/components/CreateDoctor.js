import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';


class CreateDoctor extends Component {

    CREATE_DOCTOR = gql`
        mutation CreateDoctor($firstName: String!,  
                              $lastName: String!, 
                              $bio: String!,
                              $locationLat: Float!, 
                              $locationLong: Float!, 
                              $locationName: String!,
                              $street: String!, 
                              $city: String!,
                              $zip: Int!) {
        createDoctor(input: {firstName: $firstName, 
                             lastName: $lastName, 
                             bio: $bio, 
                             locationLat: $locationLat,
                             locationLong: $locationLong, 
                             locationName: $locationName, 
                             street: $street,
                             city: $city, 
                             zip: $zip}) {
            doctor {
                firstName
                lastName
                bio
                locationLat
                locationLong
                locationName
                street
                city
                zip
            }
        }
    }`;



    state = {
        firstName: '',
        lastName: '',
        bio: '',
        locationLat: '',
        locationLong: '',
        locationName: '',
        street: '',
        city: '',
        // state: '',
        zip: '',
    }

    handleSubmit = (e, createDoctor) => {
        e.preventDefault()
        createDoctor({ variables: this.state })
        console.log(this.state)
        this.setState ({ firstName: '',
                         lastName: '',
                         bio: '',
                         locationLat: '',
                         locationLong: '',
                         locationName: '',
                         street: '',
                         city: '',
                        //  state: '',
                         zip: '',
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
                            <input value={this.state.street} placeholder="Street Address" onChange={e => this.setState({ street: e.target.value})}/>
                        </div>
                        <div>
                            <input value={this.state.city} placeholder="City" onChange={e => this.setState({ city: e.target.value})}/>
                        </div>
                        {/*}
                        <div>
                            <input value={this.state.state} placeholder="State" onChange={e => this.setState({ state: e.target.value})}/>
                        </div>
                        */}
                        <div>
                            <input value={this.state.zip} type="number" placeholder="Zip Code" onChange={e => this.setState({ zip: parseInt(e.target.value)})}/>
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
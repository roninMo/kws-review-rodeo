import React, { useState } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Modal, 
    ModalHeader,
    ModalBody
} from 'reactstrap';

import APIURL from '../../helpers/environment';


const RevCreateModal = (props) => {
    const [ review, setReview ] = useState('');

    // Put request to update the a workout log
    const createReview = ( event, character ) => { // Updates log into the server
        console.log('prop passed through', props.characterAttach);
        let reviewerid = localStorage.getItem('reviewer');
        let reviewerName = localStorage.getItem('reviewerName');
        let image = props.characterAttach.image;
        let name = props.characterAttach.name;
        let gender = props.characterAttach.gender;
        let species = props.characterAttach.species;
        let status = props.characterAttach.status;

        event.preventDefault();
        fetch(`${APIURL}/reviews/newReview`, {
            method: 'POST',
            body: JSON.stringify(
                  {reviews: {
                      reviewerid: reviewerid,
                      reviewerName: reviewerName,
                      review: review,
                      characterImage: image,
                      characterName: name,
                      characterGender: gender,
                      characterSpecies: species,
                      characterStatus: status
              }}),
            headers: new Headers({ 
              'Content-Type': 'application/json',
              'Authorization': props.token
            }) 
        })
        .then((res) => { // After the update...
            console.log(res);
            props.updateOff(); // Turns off the modal 
        })
    }




    return(
        <Modal isOpen={true}>
            <ModalHeader>Log a Workout</ModalHeader>
            <ModalBody>
                <Form onSubmit={createReview}>
                   
                    <FormGroup>
                        <Label htmlFor="description">Edit Description:</Label>
                        <Input name="description" value={review} onChange={(e) => setReview(e.target.value)}/>
                    </FormGroup>

                    <Button type="submit">Update the workout!</Button>

                </Form>
            </ModalBody>
        </Modal>
    )
}

export default RevCreateModal;
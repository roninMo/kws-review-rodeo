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
// we pass in reviewAttach, then  


const RevEditModal = (props) => {
    const [ editReview, setEditReview ] = useState('');

    // Put request to update the a workout log
    const fetchEditRev = ( event, review ) => { // Updates log into the server
        console.log('prop passed through', props.reviewAttach);
        console.log(editReview);
        let revid = props.reviewAttach.id;

        event.preventDefault();
        fetch(`${APIURL}/reviews/update/${revid}`, {
            method: 'PUT',
            body: JSON.stringify(
                   {
                      review: editReview,
              }),
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
                <Form onSubmit={fetchEditRev}>
                   
                    <FormGroup>
                        <Label htmlFor="description">Edit Description:</Label>
                        <Input name="description" value={editReview} onChange={(e) => setEditReview(e.target.value)}/>
                    </FormGroup>

                    <Button type="submit">Update the workout!</Button>

                </Form>
            </ModalBody>
        </Modal>
    )
}

export default RevEditModal;
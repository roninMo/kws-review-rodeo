import React, { useState, useEffect } from 'react';
import { 
    Row,
    Col,
    Button, 
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle
} from 'reactstrap';
import APIURL from '../../helpers/environment';

import RevEditModal from './RevEditModal';




const AllReviews = (props) => {
    const [ reviews, setReviews ] = useState([]); // This is for the database reviews - 1

    // Const modal attach 
    const [ modalToggle, setModalToggle ] = useState(false);
    const [ reviewAttach, setReviewAttach ] = useState({});

        // Fetch all reviews - 1
    const fetchAllReviews = (e) => {
        fetch(`${APIURL}/reviews/userall`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then( (res) => res.json())
        .then((reviewData) => {
            console.log(props.token)
            console.log('all users', reviewData)
            setReviews(reviewData) // Store all the logs from the search to map out!
            // reviewMapper()
        })
    }


    // Delete a review
    const delRev = (review) => { //1
        fetch(`${APIURL}/reviews/delete/${review}`, {
          method: 'DELETE', 
          headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': props.token
          })
        })
        .then(() => fetchAllReviews()) // Reinitialize the data after deleting a table in the db
      }



      const editReview = (review) => {
        setReviewAttach(review);
        console.log(review);
      }
      
      const updateOn = () => {
        setModalToggle(true);
      }
      
      const updateOff = () => {
        setModalToggle(false);
        fetchAllReviews();
        reviewMapper();
      }




      // UseEffect for fetch
    useEffect(() => {
        fetchAllReviews();
    }, [])

    



    // Review mapper
    const reviewMapper = () => {
        return reviews.map((review, index) => {

            // okay, blast off time boys
            return(
                <React.Fragment key={index}>
                <Row>
                    <Col md="3" className="cards">
                        <Card>
                            <CardImg top width="100%" src={review.characterImage} alt="Card image cap" />
                            <CardBody className="cards">
                                <CardTitle>{review.characterName}</CardTitle>
                                <CardSubtitle>Gender: {review.characterGender}</CardSubtitle>
                                <CardSubtitle>Species: {review.characterSpecies}</CardSubtitle>
                                <CardSubtitle>Status: {review.characterStatus}</CardSubtitle>
                                
                                <Button color="danger" outline onClick={() => {delRev(review.id);}}>Delete this review</Button>
                                <Button color="success" outline onClick={() => {editReview(review.id); updateOn()}} >Edit my review</Button>
                                
                            </CardBody>
                        </Card>
                    </Col>

                    <Col md="9" > 
                        <h2 className="title">Review</h2> 
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <i><b>by: </b> {review.reviewerName}</i></p>
                        <hr />
                        <p className="title2"><b>Review:</b> {review.review}</p>
                    </Col>
                    <Col md='12'>
                        <hr />
                    </Col>
                </Row>
                </React.Fragment>
                    
            )
        })
    }


    return (
        <React.Fragment>
            <Col md='10'>
                <h2>These are your reviews!</h2>
                <p>
                    You can see what other you posted, edit and delete whatcha need to. Keep your work buddies in check, and help guide them the right way with goodconstructive criticism and gentle banter. Feel free to make changes to your own content and view what other's wrote about the Rick and Morty cast.
                </p>

            </Col>
            <Col md="12">
                <hr />
            </Col>

            <Col md='12'>
                { reviews.length > 0 ? reviewMapper() : null}
                {modalToggle ? <RevEditModal reviewAttach={reviewAttach}
                    updateOff={updateOff} token={props.token}/> : <></>}
            </Col>
            <Col md='12'>
                <p><i>Review Rodeo</i></p>
            </Col>
        </React.Fragment>
    )
}

export default AllReviews;
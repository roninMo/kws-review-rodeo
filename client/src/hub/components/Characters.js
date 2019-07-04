import React, { useState } from 'react';
import { 
    Container, 
    Row,
    Col,
    Button, 
    Form,
    FormGroup,
    Label,
    Input,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle
} from 'reactstrap';
import './Characters.css';

import RevCreateModal from './RevCreateModal';


const Characters = (props) => {
    const baseURL = `https://rickandmortyapi.com/api/character/`;
    // Parameters for our fetch
    const [ name, setName ] = useState('');
    const [ status, setStatus ] = useState('');
    const [ species, setSpecies ] = useState('');
    const [ gender, setGender ] = useState('');
    const [ nextPage, setNextPage ] = useState('');
    const [ prevPage, setPrevPage ] = useState('');
    // Results of our fetch
    const [ charResults, setCharResults ] = useState([]);

    // We need these for our modal
    const [ modalToggle, setModalToggle ] = useState(false);
    const [ characterAttach, setCharacterAttach ] = useState({});

    /***********************
     * Functions
     **********************/
    
     // Fetch results and prep to handle pagination 
     const fetchResults = () => {
         let url = `${baseURL}?name=${name}&status=${status}&species=${species}&gender=${gender}`;

         fetch(url)
            .then(res => res.json())
            // Returns jsonified fetch, yay
 
            // Sets up the buttons to nav through the search, and stores results
            .then(data => {
                console.log('data ', data);
                setCharResults(data.results);
                setNextPage(data.info.next);
                setPrevPage(data.info.prev);

                // Clean up inputs
                setName('');
                setStatus('');
                setSpecies('');
                setGender('');
            })                         
            .catch(err => console.log(err))
     };

    // Handlesubmit that calls our fetch from form
     const handleSubmit = (event) => {
         event.preventDefault();
         fetchResults();
        //  console.log(charResults)
         mapper();
     };


     // Fetches for Next and Previous page
     const nextFetch = () => {
        let url = nextPage;

        fetch(url)
           .then(res => res.json())
           .then(data => {
               console.log(data);
               setCharResults(data.results);
               setNextPage(data.info.next);
               setPrevPage(data.info.prev);
           })
           .catch(err => console.log(err))
    };
    const prevFetch = () => {
        let url = prevPage;

        fetch(url)
           .then(res => res.json())
           .then(data => {
               console.log(data);
               setCharResults(data.results);
               setNextPage(data.info.next);
               setPrevPage(data.info.prev);
           })
           .catch(err => console.log(err))
    };

    //  const handleSubmit1 = (event) => {
    //      event.preventDefault();
    //     console.log(name)
    //     console.log(status)
    //     console.log(species)
    //     console.log(gender)
         
    //  }


    // Implement 2 map funtions 1 for the characters with a button tied to the user, storing it's id in localStorage before moving onto a modal createReview
    // Pass in the owner id and the character id as foreign keys into the review so when you pull in the review data, you can pull in the character data along with it

    /********************************
    * Map function for the char cards
    ********************************/
    const mapper = () => {
    

        return charResults.map((character, index) => {
            return (
                        <Col md="3" key={index} className="cards">

                            <Card>
                                <CardImg top width="100%" src={character.image} alt="Card image cap" />
                                <CardBody className="cards">
                                    <CardTitle>{character.name}</CardTitle>
                                    <CardSubtitle>Gender: {character.gender}</CardSubtitle>
                                    <CardSubtitle>Species: {character.species}</CardSubtitle>
                                    <CardSubtitle>Status: {character.status}</CardSubtitle>
                                    <Button color="success" onClick={() => {createReview(character); updateOn()}}>Write a review!</Button>
                                </CardBody>

                            </Card>
                        </Col>
            )
        })
    }


        // Attaches current iteration/index of character fetch to the useState so we can pull the data in
    const createReview = (character) => {
        setCharacterAttach(character);
        console.log(character);
      }
      
      const updateOn = () => {
        setModalToggle(true);
      }
      
      const updateOff = () => {
        setModalToggle(false);
      }












    return (
        <div>
            <Container>

                <Row className="form-section"> {/* Form for searching for a rick and morty character */}
                    <h2>Search for a Character here</h2> 
                    <Col md="8"> 
                        <FormGroup>
                            <Label htmlFor="name">Character Name</Label>
                            <Input 
                                onChange={(e) => setName(e.target.value)}
                                name="name"
                                value={name}
                                placeholder="Enter name here"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="species">Species</Label>
                            <Input
                                onChange={(e) => setSpecies(e.target.value)}
                                name="species"
                                value={species}
                                placeholder="Enter a species"
                            />
                        </FormGroup>
                    </Col>


                    <Col md="4">
                    <FormGroup>
                            <Label for="status">Status</Label>
                            <Input 
                            type="select" 
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            >
                                <option></option>
                                <option value="alive">Alive</option>
                                <option value="dead">Dead</option>
                                <option value="unknown">Unknown</option>
                            </Input>
                        </FormGroup>
                        
                        <FormGroup>
                            <Label for="gender">Gender</Label>
                            <Input 
                            type="select" 
                            name="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            >
                                <option></option>
                                <option value="female">female</option>
                                <option value="male">male</option>
                                <option value="unknown">unknown</option>
                            </Input>
                        </FormGroup>
                    </Col>

                    <Col md="12">
                        <Form onSubmit={handleSubmit}>
                            <Button type="submit">Search!</Button>
                        </Form>
                    </Col>

                </Row>


                <Row className="form-section" > {/* Mapped out fetch */}
                    {mapper()}
                </Row>
                
                
                {modalToggle ? <RevCreateModal characterAttach={characterAttach}
                    updateOff={updateOff} token={props.token}/> : <></>}





                
                <Row>   {/* Prev/Next page component */}
                    <Col md="1">
                        <Button onClick={prevFetch}> Prev </Button>
                    </Col>

                    <Col md="10">
                        <hr />
                    </Col>
                        
                    <Col md="1">
                        <Button onClick={nextFetch}> Next </Button>
                    </Col>
                </Row>

            </Container>
            
        </div>
        
    )
}

export default Characters;
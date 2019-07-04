import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Hub.css';

import { Link, Route, Switch } from 'react-router-dom';
import About from './components/About';
import AllReviews from './components/AllReviews';
import Characters from './components/Characters';
import MyReviews from './components/MyReviews';

import Bar from '../Bar';

const Hub = (props) => {



    return (
        <React.Fragment>
            <Bar clearToken={props.clearToken}/>

            <div className="nav-section">
                <Container className="martop">
                    <Row>
                        <Col md='12'>
                            <h2>Getting Started</h2>
                        </Col>


                        <Col md='3'>
                            <div className="pretty"><Link className="nav-link" to='/About'>About</Link></div>
                        </Col>
                        <Col md='3'>
                            <div className="pretty"><Link className="nav-link" to='/Characters'>Characters</Link></div>
                        </Col>
                        <Col md='3'>
                            <div className="pretty"><Link className="nav-link" to='/AllReviews'>AllReviews</Link></div>
                        </Col>
                        <Col md='3'>
                            <div className="pretty"><Link className="nav-link" to='/MyReviews'>MyReviews</Link></div>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <Switch>
                            <Route exact path="/About"> <About token={props.token} /> </Route>
                            <Route exact path="/Characters"> <Characters token={props.token} /> </Route>
                            <Route exact path="/AllReviews"> <AllReviews token={props.token} /> </Route>
                            <Route exact path="/MyReviews"> <MyReviews token={props.token} /> </Route>
                        </Switch>
                    </Row>
                </Container>

            </div>
        </React.Fragment>
    )
}

export default Hub;
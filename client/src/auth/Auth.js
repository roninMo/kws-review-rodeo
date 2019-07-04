import React from 'react';
import { Container, Row, Col, Button, Jumbotron } from 'reactstrap';
import './AuthStyles.css';

import Landing from './Landing';
// Importing the authentication steps that are being put in the switch
import Login from './Login';
import Signup from './Signup';
import { Route, Link, Switch } from 'react-router-dom';


const Auth = (props) => {

    return (
        <Container>
            <Row>
                <Col md='12'>
                    <Landing/>
                </Col>
            </Row>

            <Row className="martop">
                <Col md='3'></Col>
                <Col md='3' className="auth-btn">
                    <Button outline color="primary"> <Link className="links" to="/Signup">Sign Up</Link> </Button>
                </Col>

                <Col md='3' className="auth-btn">
                   <Button outline color="primary"> <Link className="links" to="/Login">Login</Link> </Button>
                </Col>
                <Col md='3'></Col>
            </Row>

            <Row>
                <Col md='12' className="body">
                    <Jumbotron>
                        <p className="lead description">At review rodeo you can find your favorite rick and morty characters, and write reviews on each of them. There's a feed of all the users reviews on the site, you can expand to it by creating and editing your own!</p>
                    </Jumbotron>
                </Col>
            </Row>

            <Row className='marbot'>
                <Switch>
                    <Route exact path="/Signup"> <Signup updateToken={props.updateToken} /> </Route>
                    <Route exact path="/Login"> <Login updateToken={props.updateToken} /> </Route>
                </Switch>
            </Row>



        </Container>
    )
}

export default Auth;
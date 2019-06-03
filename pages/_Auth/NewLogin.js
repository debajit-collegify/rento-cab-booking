import React, { Component } from 'react'
import Layout from '../../component/Layout'
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import axios from 'axios';
import {Link , Router} from '../../routes';
import { withRouter } from 'next/router';
class NewLogin extends Component {
    constructor(props){
        super(props);
        this.state ={
            email:'',
            password:'',
            loginMsg: '',
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
         console.log(this.props.router.query.action);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    signUp = () => {
        this.toggle();
    }

    render() {
        return (
            <Layout>
            <div className="login-dark">
                <form method="post" action="/Login" style={{width:'320px',margin:'0px'}}>
                    <div style={{animation: 'zoomin 3s', transition:"all .3s"}}>

                            <div className="alert alert-danger alert-error text-center">
                                <span className="badge badge-pill badge-danger">Error </span>

                            </div>


                                    <div className="alert alert-success alert-success text-center">
                                        <span className="badge badge-pill badge-success">Success </span>

                                    </div>

                                        <h2 className="sr-only">Login Form</h2>
                                        <div data-bs-hover-animate="pulse" className="illustration" >
                                            {/*<img src="../static/images/logo_bakbak.png" alt="Logo" height="160px"/>*/}
                                            <img src="../static/Icons/man.png" alt="Logo" height="160px"/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" type="text" name="username" placeholder="Username"/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" type="password" name="password" placeholder="Password"/>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-outline-primary active btn-block btn-lg" type="submit" data-bs-hover-animate="shake" id="waitMe_ex">Log In</button>
                                        </div>
                                        <a className="forgot">Dont have Account? <span className="primary"
                                        onClick={this.signUp.bind(this)}
                                        >Sign Up Today</span></a>
                    </div>
                </form>
            </div>


                <Modal backdrop="static" keyboard={false}
                       isOpen={this.state.modal}
                       toggle={this.toggle}
                       className="fixed right-off top-off margin-top-off animated slideInRight" style={{minWidth:'50%'}}>
                    <ModalHeader toggle={this.toggle}>User SignUp</ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <Form>
                                <Row>
                                    <Col sm={6}>

                                        <FormGroup>
                                            <Label for="exampleFirstName">FirstName</Label>
                                            <Input type="text" name="firstName" id="examplefirstname" placeholder="FirstName" />
                                        </FormGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <Label for="examplePassword">LastName</Label>
                                            <Input type="text" name="lastName" id="exampleLastName" placeholder="LastName" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>

                                        <FormGroup>
                                            <Label for="exampleemail">Email</Label>
                                            <Input type="email" name="email" id="emailexample" placeholder="EmailID" />
                                        </FormGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <Label for="examplePassword">password</Label>
                                            <Input type="password" name="password" id="examplepassword" placeholder="Password" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <FormGroup>
                                            <Label for="examplestate">State</Label>
                                            <Input type="text" name="state" id="emailState" placeholder="State" />
                                        </FormGroup>
                                    </Col>
                                    <Col sm={4}>
                                        <FormGroup>
                                            <Label for="examplePassword">City</Label>
                                            <Input type="text" name="city" id="exampleCity" placeholder="City" />
                                        </FormGroup>
                                    </Col>
                                    <Col sm={4}>
                                        <FormGroup>
                                            <Label for="examplePin">Pin</Label>
                                            <Input type="number" name="pin" id="examplePin" placeholder="Pincode" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={7}>
                                        <FormGroup>
                                            <Label for="exampleAddress">Address</Label>
                                            <Input type="textarea" name="state" id="emailState" placeholder="Full Address" />
                                        </FormGroup>
                                    </Col>
                                    <Col sm={2}>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="checkbox" name="state" id="emailState" placeholder="Full Address" />
                                                Do you Know Driving?
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={3}>
                                        <FormGroup>
                                            <Label for="examplePin">Licence No</Label>
                                            <Input type="text" name="licenceNo" id="examplePin" placeholder="Licence Number" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>

                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Save</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>


            </Layout>
        )
    }
}


export default withRouter(NewLogin);
// export default NewLogin;

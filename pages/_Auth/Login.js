import React, { Component } from 'react';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Badge,
    ListGroup,
    ListGroupItem,
    Card,
    CardImg,
    CardText,
    CardBody,
} from 'reactstrap';
import AuthHeader from '../../component/AuthHeader';
import axios from 'axios';
import { Link, Router } from '../../routes';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loginMsg: '',
            viewModal: false,
            showModalSignUp: false
        }
    }

    handelChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(atob(base64));
    }

    authenticateForm = (e) => {
        e.preventDefault();
        console.log(this.state.email);
        console.log(this.state.password);


        //Section Axios call to validate user for login:--

        var bodyParameters = {

            "email": this.state.email,
            "password": this.state.password,
            "loginType": "backend"
        }

        axios.post('http://18.188.170.189:3000/api/v1/user/login?_format=json', bodyParameters).then((response) => {
            console.log(response);

            if (response.status === 200) {
                localStorage.setItem('userKey', response.data.data.accessToken);
                localStorage.setItem('userEmail', response.data.data.email);


                //console.log(JSON.parse(localStorage.getItem('userKey')));
                //localStorage.removeItem('userKey');

                /*let tokenData = this.parseJwt(localStorage.getItem('userKey'));
                let firstName = tokenData.firstName;
                let lastName = tokenData.lastName;
                let name = firstName + ''+ lastName;*/

                Router.pushRoute('/cab/list');

            }

        }).catch((error) => {
            console.log(error);
            this.setState({ loginMsg: "UserId OR Password Does'nt Matched" });
        });



    }

    openSignUpmodal = () => {
        this.setState({ showModalSignUp: true }, () => {
            this.viewToggle();
            console.log(this.state)
        });
    }

    viewToggle = () => {
        this.setState(prevState => ({
            viewModal: !prevState.viewModal
        }));

    }



    render() {
        //console.log(this.state);
        return (
            <div>

<<<<<<< HEAD
              <div className="container-fluid absolute full-width bg-light full-height" style={{backgroundImage: `url(../../static/images/bottomImg.jpg)` }}>

                  <div className="margin-left-2x">
                      <img src="../../static/images/tasks-icon-19.png" alt="no Image" width="40px" className="inline"/>
                      <span className="logo-font font-4x margin-left-x bold primary-color-text" style={{lineHeight:"60px" , color: "blue"}}>Rento</span>
                      <span className="logo-font font-0-2x block primary-color-text padding-left-3x lighter" style={{color: "blue"}}>Rent a cab easily</span>
                  </div>

                  <div className="row margin-top-2x">

                      {/*section of logo and left panel*/}

                      <div className="col-6">

                          {/*Section of circle image and text section*/}

                          <div className="row padding-top-2x">
                              <div className="col-sm-6">
                                  <div className="my-circle box-shadow float-right">
                                      <img src="../../static/images/imageedit_1_4837153092.png" alt="no Image" width="110%"/>
                                  </div>
                              </div>
                              <div className="col-sm-6 margin-top-2x font-3x font-weight-bolder" style={{color: 'blue'}}>
                                 <span>Login To App</span>
                              </div>
                          </div>

                          <div className="row">
                              <div className="col-6"><span className="margin-right-3x float-right font-weight-light blue-grey">|</span></div>
                          </div>

                          <div className="row">
                              <div className="col-sm-6">
                                  <div className="my-circle box-shadow float-right">
                                      <img src="../../static/images/imageedit_3_7750841084.png" alt="no Image" width="110%"/>
                                  </div>
                              </div>
                              <div className="col-sm-6 margin-top-2x font-3x font-weight-bolder" style={{color: 'blue'}}>
                                  <span>Search For a Cab</span>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-6"><span className="margin-right-3x float-right font-weight-light blue-grey">|</span></div>
                          </div>

                          <div className="row">
                              <div className="col-sm-6">
                                  <div className="my-circle box-shadow float-right">
                                      <img src="../../static/images/imageedit_8_5376925248.png" alt="no Image" width="110%"/>
                                  </div>
                              </div>
                              <div className="col-sm-6 margin-top-2x font-3x font-weight-bolder" style={{color: 'blue'}}>
                                  <span>Choose Best Car To Travel</span>
                              </div>
                          </div>


                      </div>

                      {/*section of logo and left panel END*/}


                      {/*Section of login form Start*/}

                      <div className="col-6">
                          <Card className="box-shadow padding-2x w-50">
                              <h2 className="font-weight-light font-3x">Login to Continue</h2>
                              <Form onSubmit={this.authenticateForm.bind(this)} className="padding-top-3x">
                                  <Col>
                                      <FormGroup>
                                          <Label className="font-weight-light font-1-5x">Email Address</Label>
                                          <Input
                                              type="email"
                                              name="email"
                                              onChange={this.handelChange.bind(this)}
                                              value={this.state.email}
                                              id="exampleEmail"
                                              placeholder="myemail@email.com"
                                          />
                                      </FormGroup>
                                  </Col>
                                  <Col>
                                      <FormGroup className="padding-top-0-8x padding-bottom-2x">
                                          <Label for="examplePassword" className="font-weight-light font-1-5x">Password</Label>
                                          <Input
                                              type="password"
                                              name="password"
                                              onChange={this.handelChange.bind(this)}
                                              value={this.state.password}
                                              id="examplePassword"
                                              placeholder="********"
                                          />
                                      </FormGroup>
                                  </Col>
                                  <Col>
                                      <div className="padding-top-0-8x padding-bottom-2x">
                                          <button className="btn-primary hvr-float-shadow shadow font-1-5x  padding-1-5x full-width border-radius-10x">Authenticate</button>
                                      </div>
                                  </Col>


                              </Form>
                          </Card>

                      </div>

                      {/*Section of login form END*/}



                  </div>

              </div>
=======

                <div className="container-fluid absolute full-width bg-light full-height">

                    <div className="margin-left-2x">
                        <img src="../../static/images/tasks-icon-19.png" alt="no Image" width="40px" className="inline" />
                        <span className="logo-font font-4x margin-left-x bold primary-color-text" style={{ lineHeight: "60px", color: "blue" }}>rento</span>
                        <span className="logo-font font-0-2x block primary-color-text padding-left-3x lighter" style={{ color: "blue" }}>Rent a cab easily</span>
                    </div>

                    <div className="row margin-top-2x">

                        {/*section of logo and left panel*/}

                        <div className="col-6">

                            {/*Section of circle image and text section*/}

                            <div className="row padding-top-2x">
                                <div className="col-sm-6">
                                    <div className="my-circle box-shadow float-right">
                                        <img src="../../static/images/imageedit_1_4837153092.png" alt="no Image" width="110%" />
                                    </div>
                                </div>
                                <div className="col-sm-6 margin-top-2x font-2x font-weight-light">
                                    <span>Login To App</span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6"><span className="margin-right-3x float-right font-weight-light blue-grey">|</span></div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="my-circle box-shadow float-right">
                                        <img src="../../static/images/imageedit_3_7750841084.png" alt="no Image" width="110%" />
                                    </div>
                                </div>
                                <div className="col-sm-6 margin-top-2x font-2x font-weight-light">
                                    <span>Search for a Cab</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6"><span className="margin-right-3x float-right font-weight-light blue-grey">|</span></div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="my-circle box-shadow float-right">
                                        <img src="../../static/images/imageedit_8_5376925248.png" alt="no Image" width="110%" />
                                    </div>
                                </div>
                                <div className="col-sm-6 margin-top-2x font-2x font-weight-light">
                                    <span>Choose best car to Travel</span>
                                </div>
                            </div>


                        </div>

                        {/*section of logo and left panel END*/}


                        {/*Section of login form Start*/}

                        <div className="col-6">
                            <Card className="box-shadow padding-2x w-50">
                                <h2 className="font-weight-light font-3x">Login to Continue</h2>
                                <Form onSubmit={this.authenticateForm.bind(this)} className="padding-top-3x">
                                    <Col>
                                        <FormGroup>
                                            <Label className="font-weight-light font-1-5x">Email Address</Label>
                                            <Input
                                                type="email"
                                                name="email"
                                                onChange={this.handelChange.bind(this)}
                                                value={this.state.email}
                                                id="exampleEmail"
                                                placeholder="myemail@email.com"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup className="padding-top-0-8x padding-bottom-2x">
                                            <Label for="examplePassword" className="font-weight-light font-1-5x">Password</Label>
                                            <Input
                                                type="password"
                                                name="password"
                                                onChange={this.handelChange.bind(this)}
                                                value={this.state.password}
                                                id="examplePassword"
                                                placeholder="********"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <div className="padding-top-0-8x padding-bottom-2x">
                                            <button className="btn-primary hvr-float-shadow shadow font-1-5x  padding-1-5x full-width border-radius-10x">Authenticate</button>
                                        </div>
                                    </Col>


                                </Form>
                                <span className="font-1-2x grey-text">Don't have account? <span onClick={this.openSignUpmodal.bind(this)} className="pointer blue-text"> Sign Up Here </span></span>
                            </Card>

                        </div>

                        {/*Section of login form END*/}

                        {/* Section of SignUp modal Start */}


                        {
                            this.state.showModalSignUp &&

                            <Modal backdrop="static" keyboard={false} isOpen={this.state.viewModal} toggle={this.viewToggle.bind(this)} className="fixed Left-off top-off margin-top-off animated slideInRight" style={{ minWidth: '30%' }}>
                                <ModalHeader toggle={this.viewToggle.bind(this)}>Create Your Account</ModalHeader>
                                <ModalBody className='overflow-scroll-y padding-3x'>

                                    <Form>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="exampleEmail">Email</Label>
                                                    <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="examplePassword">Password</Label>
                                                    <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <FormGroup>
                                            <Label for="exampleAddress">Address</Label>
                                            <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="exampleAddress2">Address 2</Label>
                                            <Input type="text" name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor" />
                                        </FormGroup>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="exampleCity">City</Label>
                                                    <Input type="text" name="city" id="exampleCity" />
                                                </FormGroup>
                                            </Col>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label for="exampleState">State</Label>
                                                    <Input type="text" name="state" id="exampleState" />
                                                </FormGroup>
                                            </Col>
                                            <Col md={2}>
                                                <FormGroup>
                                                    <Label for="exampleZip">Zip</Label>
                                                    <Input type="text" name="zip" id="exampleZip" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <FormGroup check>
                                            <Input type="checkbox" name="check" id="exampleCheck" />
                                            <Label for="exampleCheck" check>Check me out</Label>
                                        </FormGroup>
                                        <Button>Sign in</Button>
                                    </Form>

                                </ModalBody>
                                <ModalFooter>
                                    <Button className="margin-left-1-2x">Create Account</Button>
                                </ModalFooter>
                            </Modal>
                        }




                    </div>

                </div>
>>>>>>> 2093a756cad427a2efbdd4f297e07b5564400fd9


            </div>
        );
    }
}

export default Login;


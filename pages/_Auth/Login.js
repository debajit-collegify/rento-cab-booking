import React, {Component} from 'react';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,Card} from 'reactstrap';
import AuthHeader from '../../component/AuthHeader';
import axios from 'axios';
import {Link , Router} from '../../routes';



class Login extends Component {
    constructor(props){
        super(props);
        this.state ={
            email:'',
            password:'',
            loginMsg: ''
        }
    }

    handelChange = (e)=> {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(atob(base64));
    }

    authenticateForm = (e) =>{
        e.preventDefault();
        console.log(this.state.email);
        console.log(this.state.password);


        //Section Axios call to validate user for login:--

        var bodyParameters = {

            "email" : this.state.email,
            "password" : this.state.password,
            "loginType":"backend"
        }

        axios.post('http://18.188.170.189:3000/api/v1/user/login?_format=json', bodyParameters).then((response) => {

            if(response.status === 200){
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
            this.setState({loginMsg : "UserId OR Password Does'nt Matched"});
        });



    }



    render() {
        //console.log(this.state);
        return (
            <div>

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


            </div>
        );
    }
}

export default Login;

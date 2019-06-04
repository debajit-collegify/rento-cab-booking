import React, { Component } from 'react'
import Layout from '../../component/Layout'
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import axios from 'axios';
import {Router} from "../../routes";
import { withRouter } from 'next/router';
import Validation from "../Validation";


class NewLogin extends Component {
    constructor(props){
        super(props);
        this.state ={
            loginFormData: {
                email:'',
                password:''
            },
            validationTestSignIn: false,
            loginMsg: '',
            loading: false
        }
    }

    componentDidMount() {
        console.log(this.props.router.query.action);
        if(localStorage.getItem('adminKey')){
            Router.pushRoute('/admin/config');
        }
    }

    clearSignInFormData(){
        this.setState({
            loginFormData: {
                ...this.state.loginFormData,
                email:'',
                password:''
            },
            validationTest: false,
            loading: false,
            loginMsg: ''
        });
    }

    getSignInFormValue(e){
        this.setState({
            loginFormData: {
                ...this.state.loginFormData,
                [e.target.name]: e.target.value
            },
            validationTestSignIn: false
        },() => {
            console.log(this.state.loginFormData);
        })
    }



    signIn = (e) => {
        const state = this.state;
        e.preventDefault();
        console.log("working");

        this.setState({
            validationTestSignIn: true,
            loading: true
        },() => {
            if(this.state.validationTestSignIn && (!Validation.emailValidate(this.state.loginFormData.email))){
                this.setState({loginMsg: 'Email ID not valid'})
            }else{
                this.setState({loginMsg: ''})
            }
        });

        if(Validation.emailValidate(this.state.loginFormData.email) &&
            Validation.stringValidate(this.state.loginFormData.password)){
            console.log("validation complete");

            var signInFromData = {
                email: this.state.loginFormData.email,
                password: this.state.loginFormData.password
            }
            axios.post('http://f6781c6a.ngrok.io/api/admin/signin',signInFromData).then((response) => {
                const res = response;
                console.log(res);

                if(res.status === 200 && res.statusText === "OK"){
                    this.setState({loginMsg: '' , loading: false});
                    localStorage.setItem('adminKey', res.data.accessToken);
                    console.log("Admin login successfully");
                    this.clearSignInFormData();
                    Router.pushRoute('/admin/config');
                    console.log("------------------");
                }else{
                    console.log("Admin login not successful");
                    this.setState({loginMsg: 'Email ID or password Invalid',loading: false});
                }

            }).catch((error) => {
                console.log("Inside catch block login Admin" + error);
                this.setState({loginMsg: 'Email ID or password Invalid',loading: false});
            });
        }else{
            console.log("one or more required field are missing");
            this.setState({loading: false});
        }



    }

    render() {
        return (
            <Layout>
                <div className="login-dark">
                    <Form method='post' style={{width:'320px',margin:'0px'}}>
                        <div style={{animation: 'zoomin 3s', transition:"all .3s"}}>

                            {
                                this.state.loginMsg !=='' &&
                                <div className="alert alert-danger alert-error text-center">
                                    {
                                        this.state.loginMsg === 'Email ID not valid' &&
                                        <span className="badge badge-pill badge-danger">{this.state.loginMsg}</span>
                                    }
                                    {
                                        this.state.loginMsg === 'Email ID or password Invalid' &&
                                        <span className="badge badge-pill badge-danger">{this.state.loginMsg}</span>
                                    }


                                </div>
                            }

                            <h2 className="sr-only">Login Form</h2>
                            <div data-bs-hover-animate="pulse" className="illustration" >
                                <img src="../static/images/logo_bakbak.png" alt="Logo" height="160px"/>
                                {/*<img src="../static/Icons/man.png" alt="Logo" height="160px"/>*/}
                            </div>
                            <div className="form-group">
                                <input type="text" name="email"
                                       placeholder="User Email"
                                       value={this.state.loginFormData.email}
                                       className="form-control"
                                       className={`form-control ${this.state.validationTestSignIn && (!Validation.stringValidate(this.state.loginFormData.email) && 'error-bottom-outline')}`}
                                       onChange={this.getSignInFormValue.bind(this)}/>
                            </div>
                            <div className="form-group">
                                <input type="password" name="password"
                                       value={this.state.loginFormData.password}
                                       className="form-control"
                                       className={`form-control ${this.state.validationTestSignIn && (!Validation.stringValidate(this.state.loginFormData.password) && 'error-bottom-outline')}`}
                                       onChange={this.getSignInFormValue.bind(this)}
                                       placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-outline-primary active btn-block btn-lg" data-bs-hover-animate="shake" id="waitMe_ex"
                                        onClick={this.signIn.bind(this)}
                                        disabled={this.state.loading}
                                >Log In</button>
                            </div>
                        </div>
                    </Form>
                </div>

            </Layout>
        )
    }
}


export default withRouter(NewLogin);
// export default NewLogin;

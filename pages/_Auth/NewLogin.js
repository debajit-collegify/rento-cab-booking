import React, { Component } from 'react'
import Layout from '../../component/Layout'
export default class NewLogin extends Component {
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
                                    <img src="../static/images/logo_bakbak.png" alt="Logo" height="160px"/>
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
                                <a className="forgot">Dont have Account? <span className="primary">Sign Up Today</span></a>
            </div>
        </form>
            </div></Layout>
        )
    }
}

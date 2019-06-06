import React, {Component} from 'react';
import {Link , Router} from '../routes';
import { Row, Badge, ListGroup, ListGroupItem, Collapse, Navbar, NavbarToggler,  NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown,  DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import Header from '../_Layout/Header'
import Validation from "../pages/Validation";
import {toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLogin: false,
            userName: ''
        }

    }

    componentDidMount() {

        if (localStorage.getItem('userKey')) {

            let tokenData = Validation.parseJwt(localStorage.getItem('userKey'));
            console.log(tokenData.user.firstname +' '+ tokenData.user.lastname);
            let name = 'Hi ,' + tokenData.user.firstname +' '+ tokenData.user.lastname;
            console.log(name);
            console.log(tokenData);


            if(tokenData){
                this.setState({isLogin : true , userName : name});

            }else{
                this.setState({isLogin : false , userName : ''});
            }


        }
        if (localStorage.getItem('adminKey')) {

            let tokenData = Validation.parseJwt(localStorage.getItem('adminKey'));
            console.log(tokenData.admin.name);
            let name = 'Hi Admin ,' + tokenData.admin.name;
            // console.log(tokenData);

            if(localStorage.getItem('userKey')){
                localStorage.removeItem('userKey');
                if(tokenData){
                    this.setState({isLogin : true , userName : name});

                }else{
                    this.setState({isLogin : false , userName : ''});
                }

            }else{
                if(tokenData){
                    this.setState({isLogin : true , userName : name});

                }else{
                    this.setState({isLogin : false , userName : ''});
                }
            }



        }

    }
    logout = () => {
        console.log("%c logout working","color:red; font-size:30px;");
        localStorage.removeItem('userKey');
        localStorage.removeItem('adminKey');
        localStorage.clear();
    }
    goToMyBooking = () => {
        Router.pushRoute('/cab/my-bookings');

    }


    render() {
        return (
            <Row>
                {/* Design Left side logo */}

                <ListGroup className="padding-left-2x full-width inline-block blue accent-3">
                    <ListGroupItem className="transparent float-left no-border white-text">
                        <span className="logo-font font-4x bold block" style={{lineHeight:"40px"}}>Rento</span>
                        <span className="logo-font font-1-5x lighter">Rent a cab easily</span>
                    </ListGroupItem>

                    {/* Design Icon dropdown*/}

                    <ListGroupItem className="transparent no-border float-right  padding-right-2x padding-top-2x white-text">
                        <UncontrolledDropdown>
                            <DropdownToggle nav caret>
                                <i className="material-icons no-border full-height text-white">person_outline</i>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    {
                                        (this.state.isLogin)?
                                            (<Link route='welcome-cab'><a onClick={this.logout.bind(this)} href="#">Logout</a></Link>):
                                            (<Link route='Login'><a href="#">Login</a></Link>)
                                    }


                                </DropdownItem>
                                <DropdownItem>
                                    <a onClick={this.goToMyBooking.bind(this)} href="#">
                                        My-Booking
                                    </a>
                                </DropdownItem>
                                <DropdownItem divider />
                                {/*<DropdownItem>
                                    <Link route='cab-list'><a href="#">Cab List</a></Link>
                                </DropdownItem>*/}
                            </DropdownMenu>
                        </UncontrolledDropdown>

                    </ListGroupItem>

                    {/* Design show UserName When Login*/}

                    <ListGroupItem className="transparent float-right no-border white-text">
                        <span className="float-right margin-top-2x  font-weight-lighter font-1-8x">{this.state.userName}</span>
                    </ListGroupItem>
                </ListGroup>

                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    bodyClassName= {'pl-3 pb-3 pt-3 pr-3'}
                    closeOnClick
                    className={'font-1-5x bold'}
                    rtl={false}
                    pauseOnVisibilityChange
                    pauseOnHover
                />
            </Row>
        );
    }
}
export default Index;

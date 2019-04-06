import React, {Component} from 'react';
import {Link , Router} from '../routes';
import { Row, Badge, ListGroup, ListGroupItem, Collapse, Navbar, NavbarToggler,  NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown,  DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import Header from '../_Layout/Header'

class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLogin: false,
            userName: ''
        }

    }

    parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(atob(base64));
    }

    componentDidMount() {

        if(localStorage.getItem('userKey')){

            let tokenData = this.parseJwt(localStorage.getItem('userKey'));
            let firstName = tokenData.firstName;
            let lastName = tokenData.lastName;
            let name = 'Hi ,' + firstName + '  '+ lastName;
            if(tokenData){
                this.setState({isLogin : true , userName : name});

            }
        }else{
            this.setState({isLogin : false , userName : ''});
        }


    }
    logout = () => {
        console.log("%c logout working","color:red; font-size:30px;");
        //localStorage.removeItem('userKey');
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
                                            (<Link route='auth'><a onClick={this.logout.bind(this)} href="#">Logout</a></Link>):
                                            (<Link route='auth'><a href="#">Login</a></Link>)
                                    }


                                </DropdownItem>
                                <DropdownItem>
                                    <a onClick={this.goToMyBooking.bind(this)} href="#">
                                        My-Booking
                                    </a>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <Link route='cab-list'><a href="#">Cab List</a></Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                    </ListGroupItem>

                    {/* Design show UserName When Login*/}

                    <ListGroupItem className="transparent float-right no-border white-text">
                        <span className="float-right margin-top-2x margin-right-3x font-weight-lighter font-1-8x">{this.state.userName}</span>
                    </ListGroupItem>
                </ListGroup>
            </Row>
        );
    }
}
export default Index;

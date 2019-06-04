import React, {Component} from 'react';
import { Button, ButtonGroup, Row, Container, Col, ListGroup } from 'reactstrap';
import {Router} from "../../routes";
import AuthHeader from '../../component/AuthHeader';

import CabDetails from "./CabDetails";
import DriverDetails from "./DriverDetails";
import TarifPlan from "./TarifPlan";
import TotalBooking from "./TotalBooking";



class MainBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentConfiguration: props.url.query.action
        };
    }

    componentDidMount() {
        if(localStorage.getItem('adminKey')){
            // Router.pushRoute('/admin/config');
            // Router.push({ pathname: '/adminConfig' })
        }else{
            Router.push({ pathname: '/admin/Login' })
        }
    }

    currentConfiguration = (param) => {
        const parentThis = this;
        Router.pushRoute(`/adminConfig?action=${param}`).then(() =>{
            parentThis.state.currentConfiguration = param;
            parentThis.setState(this.state);
        });
    };

    render() {
        const parentThis = this;
        const state = parentThis.state;
        // console.log(parentThis.state.currentConfiguration);
        return (
            <div>
                <AuthHeader/>
                <Container>
                    <Row className="margin-top-2x display-initial">
                        <Col sm={6} className={'no-padding'}>
                            <ButtonGroup>
                                <Button color={'light'} className={"font-1-2x " + (parentThis.state.currentConfiguration === 'CabDetails' ? 'white small-border grey-text text-darken-4 bolder card-shadow ' : 'grey-text text-darken-3 transparent thin-border')}
                                        onClick={parentThis.currentConfiguration.bind(parentThis,'CabDetails')}>CabDetails</Button>
                                <Button color={'light'} className={"font-1-2x " + (parentThis.state.currentConfiguration === 'DriverDetails' ? 'white small-border grey-text text-darken-4 bolder card-shadow ' : 'grey-text text-darken-3 transparent thin-border')}
                                        onClick={parentThis.currentConfiguration.bind(parentThis,'DriverDetails')}>DriverDetails</Button>
                                <Button color={'light'} className={"font-1-2x " + (parentThis.state.currentConfiguration === 'TarifPlan' ? 'white small-border grey-text text-darken-4 bolder card-shadow ' : 'grey-text text-darken-3 transparent thin-border')}
                                        onClick={parentThis.currentConfiguration.bind(parentThis,'TarifPlan')}>TarifPlan</Button>
                                <Button color={'light'} className={"font-1-2x " + (parentThis.state.currentConfiguration === 'totalBooking' ? 'white small-border grey-text text-darken-4 bolder card-shadow ' : 'grey-text text-darken-3 transparent thin-border')}
                                        onClick={parentThis.currentConfiguration.bind(parentThis,'totalBooking')}>TotalBooking</Button>
                                {/*<Button color={'light'} className={"font-1-2x " + (parentThis.state.currentConfiguration === 'paid-user' ? 'white small-border grey-text text-darken-4 bolder card-shadow ' : 'grey-text text-darken-3 transparent thin-border')}
                                        onClick={parentThis.currentConfiguration.bind(parentThis,'paid-user')}>Paid User</Button>
                                <Button color={'light'} className={"font-1-2x " + (parentThis.state.currentConfiguration === 'unpaid-user' ? 'white small-border grey-text text-darken-4 bolder card-shadow ' : 'grey-text text-darken-3 transparent thin-border')}
                                        onClick={parentThis.currentConfiguration.bind(parentThis,'unpaid-user')}>Unpaid User</Button>*/}
                            </ButtonGroup>
                        </Col>
                        {
                            parentThis.state.currentConfiguration === 'CabDetails' && <CabDetails />
                        }
                        {
                            parentThis.state.currentConfiguration === 'DriverDetails' && <DriverDetails />
                        }
                        {
                            parentThis.state.currentConfiguration === 'TarifPlan' && <TarifPlan />
                        }
                        {
                            parentThis.state.currentConfiguration === 'totalBooking' && <TotalBooking />
                        }



                        {
                            parentThis.state.currentConfiguration === '_blank' &&
                            <ListGroup className={'padding-2x mt-2'}>
                                <div style={{margin: '20px auto'}} className="grey-text font-weight-bolder font-4x">Choose Any Option</div>
                            </ListGroup>
                        }


                    </Row>
                </Container>
            </div>
        );
    }
}

export default MainBuilder;

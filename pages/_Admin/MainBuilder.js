import React, {Component} from 'react';
import { Button, ButtonGroup, Row, Container, Col } from 'reactstrap';
import {Router} from "../../routes";
import AuthHeader from '../../component/AuthHeader';

import CabDriverDetails from "./CabDriverDetails";



class MainBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentConfiguration: props.url.query.action
        };
    }

    componentDidMount() {
        const parentThis = this;

    }

    currentConfiguration = (param) => {
        const parentThis = this;
        Router.pushRoute(`/admin/config?action=${param}`).then(() =>{
            parentThis.state.currentConfiguration = param;
            parentThis.setState(this.state);
        });
    };

    render() {
        const parentThis = this;
        const state = parentThis.state;
        return (
            <div>
                <AuthHeader/>
                <Container>
                    <Row className="margin-top-2x">
                        <Col sm={6} className={'no-padding'}>
                            <ButtonGroup>
                                <Button color={'light'} className={"font-1-2x " + (parentThis.state.currentConfiguration === 'subscription' ? 'white small-border grey-text text-darken-4 bolder card-shadow ' : 'grey-text text-darken-3 transparent thin-border')}
                                        onClick={parentThis.currentConfiguration.bind(parentThis,'subscription')}>CabDriverDetails</Button>
                                {/*<Button color={'light'} className={"font-1-2x " + (parentThis.state.currentConfiguration === 'payment-coupon' ? 'white small-border grey-text text-darken-4 bolder card-shadow ' : 'grey-text text-darken-3 transparent thin-border')}
                                        onClick={parentThis.currentConfiguration.bind(parentThis,'payment-coupon')}>Discount Coupon</Button>
                                <Button color={'light'} className={"font-1-2x " + (parentThis.state.currentConfiguration === 'paid-user' ? 'white small-border grey-text text-darken-4 bolder card-shadow ' : 'grey-text text-darken-3 transparent thin-border')}
                                        onClick={parentThis.currentConfiguration.bind(parentThis,'paid-user')}>Paid User</Button>
                                <Button color={'light'} className={"font-1-2x " + (parentThis.state.currentConfiguration === 'unpaid-user' ? 'white small-border grey-text text-darken-4 bolder card-shadow ' : 'grey-text text-darken-3 transparent thin-border')}
                                        onClick={parentThis.currentConfiguration.bind(parentThis,'unpaid-user')}>Unpaid User</Button>*/}
                            </ButtonGroup>
                        </Col>
                        {
                            parentThis.state.currentConfiguration === 'subscription' && <CabDriverDetails />
                        }


                    </Row>
                </Container>
            </div>
        );
    }
}

export default MainBuilder;

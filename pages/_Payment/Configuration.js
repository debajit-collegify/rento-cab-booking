import React, {Component} from 'react';
import Head from "next/head";
import Layout from "../_Layout/AuthLayout";
import { Button, ButtonGroup, Row, Container, Col } from 'reactstrap';
import {Router} from "../../routes";
import Subscription from "./Subscription";
import PaymentCoupon from "./PaymentCoupon";
import PaymentUsers from "./PaymentUsers";
import PaymentUnpaid from "./PaymentUnpaid";



class Configuration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileIP: "",
            currentConfiguration: props.url.query.action,
            courseId:'',
        };
    }

    componentDidMount() {
        const parentThis = this;
        this.setState({fileIP: window.location.origin, courseId: atob(parentThis.props.url.query.courseId)});
    }

    currentConfiguration = (param) => {
        const parentThis = this;
        Router.pushRoute(`/payment/configuration?courseId=${btoa(parentThis.state.courseId)}&action=${param}`).then(() =>{
            parentThis.state.currentConfiguration = param;
            parentThis.setState(this.state);
        });
    };

    render() {
        const parentThis = this;
        const state = parentThis.state;
        return (
            <Layout titleString="Payment Configuration">
                <Head>
                    <title>Payment Configuration</title>
                </Head>
                <Container>
                    <Row className="margin-top-2x">
                        <Col sm={6} className={'no-padding'}>
                            <ButtonGroup>
                                <Button color={'light'} className={"font-1-2x " + (parentThis.state.currentConfiguration === 'subscription' ? 'white small-border grey-text text-darken-4 bolder card-shadow ' : 'grey-text text-darken-3 transparent thin-border')}
                                        onClick={parentThis.currentConfiguration.bind(parentThis,'subscription')}>Subscription</Button>
                                {/*<Button color={'light'} className={"font-1-2x " + (parentThis.state.currentConfiguration === 'payment-coupon' ? 'white small-border grey-text text-darken-4 bolder card-shadow ' : 'grey-text text-darken-3 transparent thin-border')}
                                        onClick={parentThis.currentConfiguration.bind(parentThis,'payment-coupon')}>Discount Coupon</Button>
                                <Button color={'light'} className={"font-1-2x " + (parentThis.state.currentConfiguration === 'paid-user' ? 'white small-border grey-text text-darken-4 bolder card-shadow ' : 'grey-text text-darken-3 transparent thin-border')}
                                        onClick={parentThis.currentConfiguration.bind(parentThis,'paid-user')}>Paid User</Button>
                                <Button color={'light'} className={"font-1-2x " + (parentThis.state.currentConfiguration === 'unpaid-user' ? 'white small-border grey-text text-darken-4 bolder card-shadow ' : 'grey-text text-darken-3 transparent thin-border')}
                                        onClick={parentThis.currentConfiguration.bind(parentThis,'unpaid-user')}>Unpaid User</Button>*/}
                            </ButtonGroup>
                        </Col>
                        {
                            parentThis.state.courseId > 0 &&
                            parentThis.state.currentConfiguration === 'subscription' && <Subscription courseId={parentThis.state.courseId}/>
                        }
                        {
                            parentThis.state.courseId > 0 &&
                            parentThis.state.currentConfiguration === 'payment-coupon' && <PaymentCoupon courseId={parentThis.state.courseId}/>
                        }
                        {
                            parentThis.state.courseId > 0 &&
                            parentThis.state.currentConfiguration === 'paid-user' && <PaymentUsers courseId={parentThis.state.courseId}/>
                        }
                        {
                            parentThis.state.courseId > 0 &&
                            parentThis.state.currentConfiguration === 'unpaid-user' && <PaymentUnpaid courseId={parentThis.state.courseId}/>
                        }

                    </Row>
                </Container>
            </Layout>
        );
    }
}

export default Configuration;

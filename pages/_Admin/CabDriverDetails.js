import React, {Component} from 'react';
import {
    Container,
    Row,
    Col, ListGroup, ListGroupItem, Label, Input, InputGroup, InputGroupAddon, Button, Card, CardTitle, Badge, CardText,

} from 'reactstrap';

import _ from 'lodash';



class CabDriverDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    /*static getInitialProps({query}) {
        return {query}
    }*/




    /*componentDidMount() {


    }*/



    render() {

        return (
            <div>
                <ListGroup className={'margin-top-off'}>
                    <ListGroupItem className={'margin-bottom-x padding-2x card-shadow pulse-highlight'}>
                        <Row>
                            <Col sm={2} className={'text-center'}>
                                <span className="font-1-4x pl-3 pr-3 pt-2 pb-2 black-text bold grey lighten-4 top-off left">{state.course}</span>
                            </Col>
                            <Col sm={{size: 2, offset: 7}}
                                 className={'padding-right-off margin-top-0-5x text-center'}>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col sm={6} className={'text-left mt-1'}>
                                <Label for="title" className="font-1-4x grey-text text-darken-2 float-left">Payment Title</Label>
                                <Input name="paymentTitle"
                                       /*className={`${state.validationTest && (!Validation.stringValidate(state.SubscriptionList.paymentTitle) && 'border-red-x')}`}*/
                                       type="text" />
                            </Col>
                            <Col sm={{size: 3}} className={'text-left mt-1'}>
                                <Label className="font-1-4x text-darken-2 grey-text float-left">Amount</Label>

                                <InputGroup bSsize="md">
                                    <InputGroupAddon addonType="prepend">RS</InputGroupAddon>
                                    <Input type="number"
                                           /*className={`${state.validationTest && (!Validation.positiveNumber(state.SubscriptionList.paymentPrice) && 'border-red-x')}`}*/
                                           name="paymentPrice" />
                                </InputGroup>

                            </Col>
                            <Col sm={{size: 3}} className={'text-left mt-1'}>
                                <Label className="font-1-4x grey-text text-darken-2 float-left">Payment Type</Label>
                                <Input size="md" type="select"
                                      /* className={`${state.validationTest && (!Validation.stringValidate(state.SubscriptionList.paymentType) && 'border-red-x')}`}*/
                                       name="paymentType" >
                                    <option value="">Choose Type</option>
                                    <option value="paid">Paid</option>
                                    <option value="trial">Trial</option>
                                </Input>

                            </Col>
                        </Row>
                        <Row className="margin-top-1-5x">
                            <Col sm={6} className={'text-left mt-1'}>

                                <Label for="desc" className="font-1-4x grey-text text-darken-2 float-left">Description</Label>
                                <textarea name="paymentDescription"
                                          /*className={`form-control ${state.validationTest && (!Validation.stringValidate(state.SubscriptionList.paymentDescription) && 'border-red-x')}`}*/
                                          rows="3" />
                            </Col>
                            <Col sm={{size: 3 }} className={'text-left mt-1'}>
                                <Label className="font-1-4x text-darken-2 grey-text float-left">Currency</Label>
                                <Input size="md" type="select"
                                       /*className={`${state.validationTest && (!Validation.stringValidate(state.SubscriptionList.currencyId) && 'border-red-x')}`}*/
                                       name="currencyId">
                                    <option value="">Choose Currency</option>
                                    {
                                        (state.listCurrency.length > 0) &&
                                        state.listCurrency.map((val,index) =>(

                                            <option key={index} value={val.currencyId}>{val.currencyShortName}</option>

                                        ))
                                    }
                                </Input>
                            </Col>
                            <Col sm={{size: 3 }} className={'text-left mt-1'}>
                                <Label className="font-1-4x text-darken-2 grey-text float-left">Subscription</Label>
                                <Input size="md" name="paymentDuration" value={state.SubscriptionList.paymentDuration}
                                       className={`${state.validationTest && (!Validation.stringValidate(state.SubscriptionList.paymentDuration) && 'border-red-x')}`}
                                       type="select" onChange={parentThis.getFormValue.bind(parentThis)}>
                                    <option value="">Choose Subscription</option>
                                    <option value="1">1 Day</option>
                                    <option value="3">3 Days</option>
                                    <option value="7">7 Days</option>
                                    <option value="30">1 Month</option>
                                    <option value="90">3 Months</option>
                                    <option value="180">6 Months</option>
                                    <option value="365">1 Year</option>
                                    <option value="730">2 Years</option>
                                    <option value="36500">Lifetime</option>

                                </Input>

                            </Col>

                        </Row>

                        <Row className="margin-top-1-5x">
                            <Col sm={{size: 2, offset: 10}} className={'padding-left-off float-right'}>
                                <Button
                                    onClick={parentThis.addSubscription.bind(parentThis)}
                                    className="float-right btn-action-control box-shadow text-center no-radius ripple padding-0-2x"
                                    style={{lineHeight: "1px"}}>

                                    <i className="material-icons">check</i>

                                </Button>
                                <Button
                                    outline
                                    className="float-right margin-right-0-2x box-shadow text-center no-radius ripple padding-0-2x"
                                    color="secondary" style={{lineHeight: "1px"}}
                                    onClick={parentThis.closeFormHandler.bind(parentThis , "Add")}>
                                    <i className="material-icons">close</i>
                                </Button>
                            </Col>
                        </Row>
                    </ListGroupItem>
                </ListGroup>
            </div>

        );
    }
}



export default CabDriverDetails;



import React, {Component} from 'react';
import {
    Container,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    Button,
    Card,
    CardTitle,
    Badge,
    CardText,
    ListGroupItemHeading,
    UncontrolledCollapse,
    FormGroup,
    FormFeedback,
    FormText, CustomInput, UncontrolledTooltip
}
    from 'reactstrap';

import _ from 'lodash';



class TarifPlan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            variable: {
                loader: false,
                showForm: false
            }

        };

    }

    /*static getInitialProps({query}) {
        return {query}
    }*/




    /*componentDidMount() {


    }*/
    addNew = () => {
        const parentThis = this;
        const state = parentThis.state;
        state.variable.showForm = true;
        parentThis.setState(state);
    }

    closeForm = () => {
        const parentThis = this;
        const state = parentThis.state;
        state.variable.showForm = false;
        parentThis.setState(state);
    }

    updateDetails = () => {
        const parentThis = this;
        const state = parentThis.state;
        state.variable.showForm = true;
        parentThis.setState(state);
    }



    render() {

        return (

            <div>
                <div className="jumbotron">

                    {
                        (this.state.variable.showForm)&&
                        <div className="jumbotron margin-top-off bg-info">

                            <ListGroup className={'margin-top-off'}>
                                <ListGroupItem className={'margin-bottom-x padding-2x card-shadow pulse-highlight'}>

                                    <Row>
                                        <Col sm={2} className={'text-center'}>
                                   <span
                                       className="font-1-4x pl-3 pr-3 pt-2 pb-2 black-text bold grey lighten-4 top-off left">CAB TARIFF PLAN</span>
                                        </Col>
                                        <Col sm={{size: 2, offset: 7}}
                                             className={'padding-right-off margin-top-0-5x text-center'}>
                                        </Col>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <Col sm={6} className={'text-left mt-1'}>
                                            <Label for="title"
                                                   className="font-1-4x grey-text text-darken-2 float-left"> Tariff Plan Name</Label>
                                            <Input name="paymentTitle"
                                                /*className={`${state.validationTest && (!Validation.stringValidate(state.SubscriptionList.paymentTitle) && 'border-red-x')}`}*/
                                                   type="text"/>
                                        </Col>
                                        <Col sm={{size: 3}} className={'text-left mt-1'}>
                                            <Label className="font-1-4x text-darken-2 grey-text float-left">Amount Per/Day</Label>

                                            <InputGroup bSsize="md">
                                                <InputGroupAddon addonType="prepend">RS</InputGroupAddon>
                                                <Input type="number"
                                                    /*className={`${state.validationTest && (!Validation.positiveNumber(state.SubscriptionList.paymentPrice) && 'border-red-x')}`}*/
                                                       name="paymentPrice"/>
                                            </InputGroup>

                                        </Col>
                                        <Col sm={{size: 3}} className={'text-left mt-1'}>
                                            <Label className="font-1-4x grey-text text-darken-2 float-left">Cab Type</Label>
                                            <Input size="md" type="select"
                                                /* className={`${state.validationTest && (!Validation.stringValidate(state.SubscriptionList.paymentType) && 'border-red-x')}`}*/
                                                   name="paymentType">
                                                <option value="">Choose Type</option>
                                                <option value="mini">mini</option>
                                                <option value="micro">micro</option>
                                                <option value="sedan">sedan</option>
                                            </Input>

                                        </Col>
                                    </Row>
                                    <Row className="margin-top-1-5x">
                                        <Col sm={6} className={'text-left mt-1'}>

                                            <Label for="desc"
                                                   className="font-1-4x grey-text text-darken-2 float-left">Tariff Plan Description</Label>
                                            <textarea name="paymentDescription"
                                                      className="form-control"
                                                /*className={`form-control ${state.validationTest && (!Validation.stringValidate(state.SubscriptionList.paymentDescription) && 'border-red-x')}`}*/
                                                      rows="3"/>
                                        </Col>
                                        <Col sm={{size: 3}} className={'text-left mt-1'}>
                                            <Label className="font-1-4x text-darken-2 grey-text float-left">Amount Per/HR</Label>

                                            <InputGroup bSsize="md">
                                                <InputGroupAddon addonType="prepend">RS</InputGroupAddon>
                                                <Input type="number"
                                                    /*className={`${state.validationTest && (!Validation.positiveNumber(state.SubscriptionList.paymentPrice) && 'border-red-x')}`}*/
                                                       name="paymentPrice"/>
                                            </InputGroup>

                                        </Col>
                                        <Col sm={{size: 3}} className={'text-left mt-1'}>
                                            <Label className="font-1-4x text-darken-2 grey-text float-left">Night Charge</Label>

                                            <InputGroup bSsize="md">
                                                <InputGroupAddon addonType="prepend">RS</InputGroupAddon>
                                                <Input type="number"
                                                    /*className={`${state.validationTest && (!Validation.positiveNumber(state.SubscriptionList.paymentPrice) && 'border-red-x')}`}*/
                                                       name="paymentPrice"/>
                                            </InputGroup>

                                        </Col>

                                    </Row>

                                    <Row className="margin-top-1-5x">
                                        <Col sm={{size: 2, offset: 10}} className={'padding-left-off float-right'}>
                                            <Button

                                                className="float-right btn-action-control box-shadow text-center no-radius ripple padding-0-2x"
                                                style={{lineHeight: "1px"}}>

                                                <i className="material-icons">check</i>

                                            </Button>
                                            <Button
                                                outline
                                                onClick={this.closeForm.bind(this)}
                                                className="float-right margin-right-0-2x box-shadow text-center no-radius ripple padding-0-2x"
                                                color="secondary" style={{lineHeight: "1px"}}>
                                                <i className="material-icons">close</i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    }

                    <div className="jumbotron" style={{backgroundColor: '#e1e1d0'}}>

                        <ListGroup className={'margin-top-off transparent'}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                                {/*<div className="font-2x" style={{flexGrow: 1}}>
                               Filters:
                           </div>
                           <div className="ml-3 mr-2 flex">
                               <span className={'font-1-4x grey-text text-darken-5 mt-1 ml-2 mr-2'}>By Country :</span>
                               <Input size="sm" type="select" className={'border-radius-25'} style={{width: '6rem'}}
                                      name="country">
                                   <option value=''>Country</option>
                                   <option value='all'>All</option>

                               </Input>
                           </div>
                           <div className="ml-3 mr-2 flex">
                               <span className={'font-1-4x grey-text text-darken-5 mt-1 ml-2 mr-2'}>By Currency :</span>
                               <Input size="sm" type="select" name="currency" style={{width: '6rem'}}>
                                   <option value="">Currency</option>
                                   <option value="all">All</option>

                               </Input>
                           </div>*/}
                            </div>


                            <Row className={`mt-3`}>
                                <Col sm={4} className={'text-center margin-bottom-x'}>
                                    <Card body outline className="small-border card-shadow pointer" style={{height: '17rem'}}
                                          onClick={this.addNew.bind(this)}>
                                        <CardTitle className="margin-top-3x">
                                            <Badge pill style={{width: 75, height: 75, lineHeight: 6.5}}
                                                   className="auto grey lighten-3 no-border">
                                                <i className="circle material-icons grey-text font-4x"
                                                   style={{padding: '10px'}}>add</i>
                                            </Badge>
                                        </CardTitle>
                                        <CardText className={'mt-1 mb-0 font-1-5x grey-text text-darken-4'}>Add
                                            New</CardText>
                                    </Card>
                                </Col>


                                <Col sm={4} className={'text-center margin-bottom-2x hvr-grow'}>
                                    <section className={`absolute z-index-one circle box-shadow padding-0-5x grey lighten-4 self-middle left-50`}>
                                        <div className={'grey-text text-darken-4 mt-1 mb-0 '}>
                                            <div className={'font-2x'}>text</div>
                                            <span className={'bolder font-2-5x word-wrap'}>price</span>
                                        </div>
                                    </section>
                                    <Card body outline
                                          className={"small-border padding-1-5x card-shadow overflow"}>
                                                <span
                                                    className={`grey-text text-darken-3 font-1-5x uppercase ribbon pl-2 pr-2`}>
                                                   type
                                                </span>

                                        <CardTitle className="mt-3 mb-2">
                                                <span className={'grey-text text-darken-3 bolder font-2x'}>
                                                    text
                                                </span>
                                            <span className={`ml-2 mr-2 grey-text text-darken-2`}>|</span>
                                            <span
                                                className={'grey-text text-darken-3 bolder font-2x'}>
                                                    text
                                                </span>
                                        </CardTitle>
                                        <Button
                                            color={'white'}
                                            onClick={this.updateDetails.bind(this)}
                                            className={`top-x right-x absolute ripple padding-0-2x`}
                                            style={{lineHeight: "1px"}}>
                                            <img src="../../static/Icons/edit.svg"
                                                 width="18"/>
                                        </Button>

                                        <CardText className={`mt-1 mb-1 ripple`} style={{lineHeight: "3px"}}>


                                            <i className="material-icons yellow-text text-accent-4 pointer font-4x animated-slow zoomIn"
                                               title="Featured">star</i>

                                            {/* <i class="material-icons grey-text text-accent-4 pointer font-3x  animated zoomIn"
                                          title="Mark as Feature">star_border</i>*/}
                                        </CardText>

                                        <CardText className={'grey-text text-darken-4 mt-1 mb-0 '}>
                                            <span className={'font-2-5x bold'}>symbol</span>
                                            <span className={'bolder font-2-5x word-wrap margin-left-0-2x'}>text</span>
                                        </CardText>

                                        <CardText className={'mt-1 mb-2 text-center'} style={{maxWidth: 330}}>
                                            <div
                                                className={'grey-text text-darken-3 font-1-8x'}>text
                                            </div>
                                            <div
                                                className={'grey-text text-darken-5 font-1-5x mt-2'}>desc</div>
                                        </CardText>
                                        <CardText className={'mt-2 mb-0'}>
                                            <Badge
                                                className={"lighter pt-2 pb-2 ml-2 font-1-2x capitalize ui-success pointer"}

                                                style={{width: 60}} pill> status
                                            </Badge>
                                        </CardText>
                                        <hr/>
                                    </Card>


                                </Col>



                            </Row>


                        </ListGroup>
                    </div>




                </div>

                {/*<div className="jumbotron jumbotron-fluid">


               </div>*/}

            </div>

        );
    }
}



export default TarifPlan;



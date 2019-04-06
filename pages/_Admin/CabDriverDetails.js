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
    Button, Card, CardTitle, Badge, CardText
}
    from 'reactstrap';

import _ from 'lodash';



class CabDriverDetails extends React.Component {
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



    render() {

        return (
            <div>

                <ListGroup className={'margin-top-off'}>
                    <ListGroupItem className={'margin-bottom-x padding-2x card-shadow pulse-highlight'}>
                        <Row>
                            <Col sm={2} className={'text-center'}>
                                <span className="font-1-4x pl-3 pr-3 pt-2 pb-2 black-text bold grey lighten-4 top-off left">badge</span>
                            </Col>
                            <Col sm={{size: 2, offset: 7}}
                                 className={'padding-right-off margin-top-0-5x text-center'}>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col sm={6} className={'text-left mt-1'}>
                                <Label for="title" className="font-1-4x grey-text text-darken-2 float-left"> Title</Label>
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
                                <Label className="font-1-4x grey-text text-darken-2 float-left"> Type</Label>
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

                                </Input>
                            </Col>
                            <Col sm={{size: 3 }} className={'text-left mt-1'}>
                                <Label className="font-1-4x text-darken-2 grey-text float-left">Subscription</Label>
                                <Input size="md" name="paymentDuration"
                                      /* className={`${state.validationTest && (!Validation.stringValidate(state.SubscriptionList.paymentDuration) && 'border-red-x')}`}*/
                                       type="select">
                                    <option value="">Choose</option>
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

                                    className="float-right btn-action-control box-shadow text-center no-radius ripple padding-0-2x"
                                    style={{lineHeight: "1px"}}>

                                    <i className="material-icons">check</i>

                                </Button>
                                <Button
                                    outline
                                    className="float-right margin-right-0-2x box-shadow text-center no-radius ripple padding-0-2x"
                                    color="secondary" style={{lineHeight: "1px"}} >
                                    <i className="material-icons">close</i>
                                </Button>
                            </Col>
                        </Row>
                    </ListGroupItem>
                </ListGroup>

                {/*{
                    (this.state.variable.loader) && <Row className={'margin-top-2x padding-top-x'}>
                        {
                            [...Array(8)].map((x, i) =>
                                <Col sm={3} className={'text-center mt-1'} key={i}>
                                    <Card body outline className="small-border padding-2x card-shadow pointer">
                                        <ContentLoader
                                            height={160}
                                            width={200}
                                            speed={1}
                                            primaryColor="#e2e2e2"
                                            secondaryColor="#ecebeb">
                                            <rect x="70" y="15" rx="4" ry="4" width="117" height="6.4"/>
                                            <rect x="70" y="35" rx="3" ry="3" width="85" height="6.4"/>
                                            <rect x="0" y="80" rx="3" ry="3" width="350" height="6.4"/>
                                            <rect x="0" y="100" rx="3" ry="3" width="380" height="6.4"/>
                                            <rect x="0" y="120" rx="3" ry="3" width="201" height="6.4"/>
                                        </ContentLoader>
                                    </Card>
                                </Col>
                            )
                        }
                    </Row>
                }*/}

                <ListGroup className={'margin-top-off transparent'}>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} >
                        <div className="font-2x" style={{flexGrow:1}}>
                            Filters:
                        </div>
                        <div  className="ml-3 mr-2 flex">
                            <span className={'font-1-4x grey-text text-darken-5 mt-1 ml-2 mr-2'}>By Country :</span>
                            <Input size="sm" type="select" className={'border-radius-25'} style={{width: '6rem'}} name="country" >
                                <option value=''>Country</option>
                                <option value='all'>All</option>

                            </Input>
                        </div>
                        <div className="ml-3 mr-2 flex">
                            <span className={'font-1-4x grey-text text-darken-5 mt-1 ml-2 mr-2'}>By Currency :</span>
                            <Input size="sm" type="select" name="currency" style={{width: '6rem'}} >
                                <option value="">Currency</option>
                                <option value="all" >All</option>

                            </Input>
                        </div>
                    </div>


                    <Row className={`mt-3`}>
                        <Col sm={4} className={'text-center margin-bottom-x'}>
                            <Card body outline className="small-border card-shadow pointer" style={{height: '17rem'}} onClick={this.addNew.bind(this)} >
                                <CardTitle className="margin-top-3x">
                                    <Badge pill style={{width: 75, height: 75, lineHeight:6.5}}
                                           className="auto grey lighten-3 no-border">
                                        <i className="circle material-icons grey-text font-4x" style={{padding: '10px'}}>add</i>
                                    </Badge>
                                </CardTitle>
                                <CardText className={'mt-1 mb-0 font-1-5x grey-text text-darken-4'}>Add New</CardText>
                            </Card>
                        </Col>



                                <Col sm={4} className={'text-center margin-bottom-2x hvr-grow'} >
                                    {/* <section className={`absolute z-index-one circle box-shadow padding-0-5x grey lighten-4 self-middle left-50`}>
                                            <div className={'grey-text text-darken-4 mt-1 mb-0 '}>
                                                <div className={'font-2x'}>{value.currencyShortName}</div>
                                                <span className={'bolder font-2-5x word-wrap'}>{value.paymentPrice}</span>
                                            </div>
                                         </section> */}
                                    <Card body outline
                                          className={"small-border padding-1-5x card-shadow overflow"}>
                                                <span className={`grey-text text-darken-3 font-1-5x uppercase ribbon pl-2 pr-2`}>
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

                                            className={`top-x right-x absolute ripple padding-0-2x`}
                                            style={{lineHeight: "1px"}}>
                                            <img src="../../static/Icons/edit.svg"
                                                 width="18"/>
                                        </Button>

                                        <CardText className={`mt-1 mb-1 ripple`} style={{lineHeight: "3px"}}>


                                                    <i class="material-icons yellow-text text-accent-4 pointer font-4x animated-slow zoomIn"
                                                       title="Featured">star</i>

                                                    /*<i class="material-icons grey-text text-accent-4 pointer font-3x  animated zoomIn"
                                                       title="Mark as Feature">star_border</i>*/
                                        </CardText>

                                        <CardText className={'grey-text text-darken-4 mt-1 mb-0 '}>
                                            <span className={'font-2-5x bold'}>symbol</span>
                                            <span className={'bolder font-2-5x word-wrap margin-left-0-2x'}>text</span>
                                        </CardText>

                                        <CardText className={'mt-1 mb-2 text-center'}style={{maxWidth: 330}}>
                                            <div
                                                className={'grey-text text-darken-3 font-1-8x'}>text</div>
                                            {/*<div
                                                        className={'grey-text text-darken-5 font-1-5x mt-2'}>{value.paymentDescription}</div>*/}
                                        </CardText>
                                        {/* <CardText className={'mt-2 mb-0'}>
                                                    <Badge
                                                        className={"lighter pt-2 pb-2 ml-2 font-1-2x capitalize ui-success pointer"}
                                                        onClick={parentThis.updatePaymentStatus.bind(parentThis , index)}
                                                        style={{width: 60}} pill> {value.paymentStatus}
                                                    </Badge>
                                                </CardText> */}
                                        <hr />
                                    </Card>



                                </Col>
                            )
                        }


                    </Row>
                </ListGroup>


            </div>

        );
    }
}



export default CabDriverDetails;



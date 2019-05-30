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
    FormText,
    CustomInput,
    UncontrolledTooltip,
    Spinner,
    UncontrolledPopover,
    PopoverHeader,
    PopoverBody,
    ListGroupItemText
}
    from 'reactstrap';

import _ from 'lodash';



class CabDetails extends React.Component {
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



    render() {

        return (

            <div>
                <div className="jumbotron">

                    <div className="jumbotron" style={{backgroundColor: '#e1e1d0'}}>


                        <ListGroup className={'margin-top-2x'}>
                            <ListGroupItem className={'grey lighten-5'}>
                                <ListGroupItemHeading id="cis" className={'pt-1 black-text pointer font-1-8x'}>
                                    {/*<i className={'material-icons left font-1-8x mr-1 relative'}>credit_card</i>*/}
                                    Driver Information
                                </ListGroupItemHeading>
                                <UncontrolledCollapse toggler="#cis" isOpen={'true'}>
                                    <ListGroup className={'mt-3 card-shadow mb-1'}>
                                        <ListGroupItem className={'padding-2x'}>
                                            <Row>
                                                <Col sm={6}>
                                                    <FormGroup>
                                                        <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>Name</Label>
                                                        <i id="py-is" className={'material-icons font-1-5x top-0-2x relative ml-2'}>info_outline</i>
                                                        <Input type="text" name="courseName"
                                                            /*className={`${state.validationTest && (!Validation.stringValidate(state.billing.productDetails.courseName) && 'border-red-x')}`}*/
                                                        />
                                                        {/*<UncontrolledTooltip placement="right" target="py-is">
                                                           Driver name should be the purchased course or service
                                                       </UncontrolledTooltip>*/}
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={6}>
                                                    <FormGroup>
                                                        <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>Experience</Label>
                                                        <CustomInput type="select" id="exampleCustomSelect" name="taxType"
                                                            /*className={`${state.validationTest && (!Validation.stringValidate(state.billing.paymentRequested.taxType) && 'border-red-x')}`}*/
                                                        >
                                                            <option value="">Year Of Experience</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                        </CustomInput>

                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <FormGroup>
                                                <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>Driver description</Label>
                                                <Input type='textarea' name="courseDescription"
                                                    /* className={`${state.validationTest && (!Validation.stringValidate(state.billing.productDetails.courseDescription) && 'border-red-x')}`}*/
                                                />
                                            </FormGroup>

                                            <Row className={'mt-4'}>
                                                <Col sm={4}>
                                                    <FormGroup>
                                                        <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>Phone Number</Label>
                                                        <Input type='number' name="licence"
                                                            /*className={`${state.validationTest && (!Validation.stringValidate(state.billing.paymentRequested.amount) && 'border-red-x')}`}*/
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={4}>
                                                    <FormGroup>
                                                        <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>Email</Label>
                                                        <Input type='email' name="email"
                                                            /*className={`${state.validationTest && (!Validation.stringValidate(state.billing.paymentRequested.amount) && 'border-red-x')}`}*/
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={4}>
                                                    <FormGroup>
                                                        <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>Licence Number</Label>
                                                        <Input type='text' name="licence"
                                                            /*className={`${state.validationTest && (!Validation.stringValidate(state.billing.paymentRequested.amount) && 'border-red-x')}`}*/
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row className={'mt-2'}>
                                                <Col sm={12}>
                                                    <FormGroup>
                                                        <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>Full Address</Label>
                                                        <Input type='textarea' name="otherDetails"
                                                            /*className={`${state.validationTest && (!Validation.stringValidate(state.billing.paymentRequested.otherDetails) && 'border-red-x')}`}*/
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    </ListGroup>

                                    {/*<Button color="link" className={'mt-4'}>
                                    <i className={'material-icons left font-1-8x mr-1 top-0-2x relative underline'}>add_circle_outline</i>
                                    Add another Payment</Button>*/}
                                </UncontrolledCollapse>
                            </ListGroupItem>
                        </ListGroup>

                        <Row>
                            {/*<Col sm={{ size: 2, offset: 8 }}>
                            <Button className={'brand-primary capitalize float-right mt-4'}
                                    onClick={parentThis.invoicePreviewToggle.bind(parentThis)}>
                                Preview
                            </Button>
                        </Col>*/}



                            <Col sm={{ size: 3, offset: 9 }}>
                                <Button className="float-right brand-primary capitalize text-center mt-4 mr-0 flex"
                                >

                                    Save
                                </Button>
                            </Col>

                        </Row>

                    </div>

                    <div className="jumbotron" style={{backgroundColor: '#e1e1d0'}}>

                        <ListGroup className={'padding-2x thin-border'}>
                            {[...Array(3)].map((x, i) =>
                                <ListGroup key={i}>

                                    <ListGroupItem className={'card-shadow mb-2 padding-top-2x padding-left-3x padding-right-3x padding-bottom-x hvr-underline-reveal'} key={i}>
                                        <div className="ribbon__item">
                                        <span className={'white-text bold font-x uppercase text-center ui-success'}>
                                        cheque
                                        </span>
                                        </div>
                                        <ListGroupItemHeading className={'bolder font-1-5x relative mb-0'} style={{top:-10}}>
                                            <Badge color="light" className={'pt-2 pl-2 pr-4 pb-2 font-1-2x thin-border-dashed left-align'}>
                                                Cab Number
                                            </Badge>
                                        </ListGroupItemHeading>
                                        <ListGroupItemHeading className={'bolder font-2x float-left'}>
                                            DriverName
                                            <i id={"pr__contact-"+i} className={'material-icons grey-text text-darken-2 font-1-8x top-0-2x left-0-5x relative'}>
                                                info_outline
                                            </i>

                                            <UncontrolledTooltip placement="right" target={"pr__contact-"+i}>
                                            <span className={'grid right left-align padding-0-5x'}>
                                                <b>Address : </b>
                                                <label className={'mt-1'}>
                                                    PO Box 1964 Cupertino
                                                    Cupertino, Pin-95015<br/>
                                                    California ,United States
                                                </label>
                                                <b>Contact : </b>
                                                <label className={'mt-1'}>
                                                    debajit@collegify.com
                                                    <br/>+91 5478965412
                                                </label>
                                            </span>
                                            </UncontrolledTooltip>
                                        </ListGroupItemHeading>

                                        <Button className={'pt-0 pb-0 pl-1 pr-1 relative float-right right-0-5x left-x'} style={{top: "-7px"}} color="link">
                                            {/*<i id={"pr__share-"+i} className={'material-icons relative top-0-2x font-2x'}>share</i>*/}
                                            <img width={25} id={"pr__edit-"+i} className={'padding-0-2x'}
                                                 src={"../../static/images/edit.png"}/>
                                            <UncontrolledTooltip placement="top" target={"pr__edit-"+i}>
                                                Edit
                                            </UncontrolledTooltip>
                                        </Button>{' '}

                                        <Button id="UncontrolledPopover" className={'pt-0 pb-0 pl-1 pr-1 relative float-right right-0-5x left-x'} style={{top: "-7px"}} color="link">
                                            {/*<i id={"pr__share-"+i} className={'material-icons relative top-0-2x font-2x'}>share</i>*/}
                                            <img width={25} id={"pr__share-"+i} className={'padding-0-2x'}
                                                 src={"../../static/images/007-share.png"}/>
                                            <UncontrolledTooltip placement="top" target={"pr__share-"+i}>
                                                Share via Email
                                            </UncontrolledTooltip>

                                        </Button>

                                        <UncontrolledPopover placement="bottom" className="no-border card-shadow" target="UncontrolledPopover">
                                            <PopoverHeader className={'capitalize'}>enter an email address</PopoverHeader>
                                            <PopoverBody>

                                                <Input type="text"/>
                                            </PopoverBody>
                                        </UncontrolledPopover>

                                        <Button className={'pt-0 pb-0 pl-1 pr-1 relative float-right right-0-5x left-x'}  style={{top: "-7px"}} color="link">
                                            {/*<i id={"pr__download-"+i} className={'material-icons relative top-0-2x font-2x'}>cloud_download</i>*/}
                                            <img id={"pr__download-"+i} width={25} className={'padding-0-2x'}
                                                 src={"/static/images/028-download.png"}/>

                                        </Button>

                                        <ListGroupItemText className={'mt-2 mb-2 clear'}>
                                            <Badge className={'pt-2 pl-0 pr-4 pb-2 transparent font-1-2x no-border black-text left-align'}>
                                                text <span className={'font-1-2x grey-text text-darken-4 light relative ml-0'}> <br/><br/>Paid on 30th January,2019</span>
                                            </Badge>
                                        </ListGroupItemText>

                                        <ListGroupItemText className={'mt-2 mb-0 font-1-2x grey-text text-darken-3'}>
                                            driver details &nbsp; <code>Licence Number</code>
                                        </ListGroupItemText>

                                        <Badge pill color={'light'} className={'float-right small-border padding-1-5x font-2x absolute right-2x'} style={{bottom: '25px'}}>
                                            USD 200000
                                        </Badge>
                                    </ListGroupItem>
                                </ListGroup>
                            )}

                        </ListGroup>
                    </div>




                </div>

                {/*<div className="jumbotron jumbotron-fluid">


               </div>*/}

            </div>

        );
    }
}



export default CabDetails;



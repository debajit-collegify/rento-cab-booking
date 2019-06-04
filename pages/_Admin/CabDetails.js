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
import {Router} from "../../routes";
import FileUpload from "../../component/FileUpload";


class CabDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            variable: {
                loader: false,
                showForm: false
            },
            formData: {
                regno: '',
                company: '',
                model: '',
                type: '',
                state: '',
                district: '',
                postalcode: ''
            }

        };

    }

    /*static getInitialProps({query}) {
        return {query}
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
                                   {/*<i className={'material-icons left font-1-8x mr-1 relative'}>assignment_ind</i>*/}
                                   Cab Information
                                   {/*<i className='material-icons float-right font-2x'>arrow_drop_down_circle</i>*/}
                               </ListGroupItemHeading>
                               <UncontrolledCollapse toggler="#cis" isOpen={'true'}>
                                   <ListGroup className={'mt-3 card-shadow'}>
                                       <ListGroupItem className={'padding-2x'}>
                                           <FormGroup className="inline">
                                               <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>Registration Number</Label>
                                               <Input type="text"

                                                      name="name" />
                                           </FormGroup>

                                           <FormGroup className={'mt-4'}>
                                               <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>Make</Label>
                                               <Input type='textarea' name="address1"
                                               /> {/*invalid*/}
                                               <FormFeedback>Oh noes! that name is already taken</FormFeedback>
                                               <FormText>Example help text that remains unchanged.</FormText>
                                           </FormGroup>

                                           <FormGroup className={'mt-4'}>
                                               <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>Model</Label>
                                               <Input type={'textarea'}  name="address2"

                                               />
                                           </FormGroup>

                                           <Row className={'mt-3'}>
                                               <Col sm={3}>
                                                   <FormGroup>
                                                       <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>Cab Type</Label>
                                                       <Input type="text" name="state"
                                                           /*className={`${state.validationTest && (!Validation.stringValidate(state.billing.userDetails.state) && 'border-red-x')}`}*/
                                                       />
                                                   </FormGroup>
                                               </Col>
                                               <Col sm={3}>
                                                   <FormGroup>
                                                       <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>State</Label>
                                                       <Input type="text" name="state"
                                                           /*className={`${state.validationTest && (!Validation.stringValidate(state.billing.userDetails.state) && 'border-red-x')}`}*/
                                                       />
                                                   </FormGroup>
                                               </Col>
                                               <Col sm={3}>
                                                   <FormGroup>
                                                       <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>District</Label>
                                                       <Input type="text" name="dist"
                                                           /*className={`${state.validationTest && (!Validation.stringValidate(state.billing.userDetails.dist) && 'border-red-x')}`}*/

                                                       />
                                                   </FormGroup>
                                               </Col>
                                               <Col sm={3}>
                                                   <FormGroup>
                                                       <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>postal code</Label>
                                                       <Input type="text" name="pin"
                                                           /*className={`${state.validationTest && (!Validation.stringValidate(state.billing.userDetails.pin) && 'border-red-x')}`}*/
                                                       />
                                                   </FormGroup>
                                               </Col>
                                           </Row>

                                           <Row className={'mt-6'}>
                                               <Col sm={6}>
                                                    <FileUpload />
                                               </Col>
                                           </Row>
                                       </ListGroupItem>
                                   </ListGroup>
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

           </div>

        );
    }
}



export default CabDetails;



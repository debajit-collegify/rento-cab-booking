import React, {Component} from 'react';
import Head from "next/head";
import { Button, ListGroup, ListGroupItem, Card, Badge, CardText, CardTitle, Label, Row, Col , InputGroup , InputGroupAddon , Input} from 'reactstrap';
import Switch from 'react-toggle-switch';
import Client from "../../services/Client";
import PaymentSubscriptionAction from '../../actions/Payment/SubscriptionAction';
import ListAction from '../../actions/Country/ListAction';

import "react-toggle-switch/dist/css/switch.min.css";
import "react-datepicker/dist/react-datepicker.css";
import ContentLoader from 'react-content-loader';

import Validation from "../../actions/Global/Validation";
import CourseAction from "../../actions/Course/CourseAction";

import moment from "moment";
import _ from "lodash";
import env from "../../env";
import $ from "jquery";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


class Subscription extends Component {
    constructor(props){
        super(props);
        this.state = {
            fileIP: '',
            validationTest: false,
            courseId: '',
            course: '',
            listSubscription: [],
            listSubscriptionFilter: [],
            listCurrency: [],
            listCountry: [],
            SubscriptionList: {
                currencyId: '',
                paymentTitle: '',
                paymentDescription: '',
                paymentPrice: '',
                paymentType: '',
                paymentDuration: '',
                paymentId: ''
            },
            variable: {
                disableButton : true,
                loader : true,
                loading: false,
                showForm: false,
                updateForm: false,
                currencySymbol: '',
                updateFlag: false,
                countryInput: '',
                currencyInput: ''
            }
        }
}

    changeStatus = () => {

        this.setState({switchStatus : (this.state.switchStatus === 'active')? 'inactive': 'active'})
    };

    componentDidMount() {
        const parentThis = this;

        parentThis.setState({fileIp: window.location.origin , courseId: parentThis.props.courseId},
            () => {
                parentThis.fetchSubscription();
                parentThis.fetchCurrency();
                parentThis.fetchCountryList("active");
                parentThis.courseDetails();
            });

    }

    courseDetails = () => {
        const parentThis = this;
        const state = parentThis.state;
        CourseAction.courseFetch(state.courseId).then(function (res) {
            const response = res.data.singleCourse;
            if (response.status === 'success' && response.code === '200') {
                state.course = response.data.courseDetails.courseName;
                parentThis.setState(state);
            }
            else {
                console.log('Problem in fetching coursename in courseDetails method in payment subscription');
            }
        }).catch(function (err) {
            console.log(err);
        });
    }

    getSubscriptionOption(days){
        let value = "";
        switch(days){
            case 1:
                value = "1 Day";
            break;
            case 3:
                value = "3 Days";
            break;
            case 7:
                value = "7 Days";
            break;
            case 30:
                value = "1 Month";
            break;
            case 90:
                value = "3 Months";
            break;
            case 180:
                value = "6 Months";
            break;
            case 365:
                value = "1 Year";
            break;
            case 730:
                value = "2 Years";
            break;
            case 36500:
                value = "Lifetime";
            break;
            default:
                value = "Wrong choice for getSubscriptionOption case";
        }
        return value;
    }

    stringToHTML(value){
        return <span dangerouslySetInnerHTML={{__html: value}} />
    }

    fetchSubscription(){
        const parentThis = this;
        const state = parentThis.state;

        PaymentSubscriptionAction.listSubscription(state.courseId , null , [], "_all")
            .then( res => {

                const response = res;
                if(response.data.listSubscription.code === "200" && response.data.listSubscription.status === "success"){
                    // console.log(response);
                    state.variable.loader = false;
                    // state.listSubscription = response.data.listSubscription.data;
                    state.listSubscription = _.sortBy(response.data.listSubscription.data , ['paymentPrice']);
                    state.listSubscriptionFilter = state.listSubscription;
                    parentThis.setState(state, () => {
                         // console.log(state.listSubscription);
                    });

                }else{
                    parentThis.setState({loader: false},() => {
                        console.log("something went wrong in fetching Subscription graphQL");
                    });

                }

            }).catch(function(err){
            console.log(err);
        });
    }

    fetchCurrency(){
        const parentThis = this;
        const state = parentThis.state;
        PaymentSubscriptionAction.listCurrency().then( res => {
            const response = res;
            if(response.data.listCurrency.code === "200" && response.data.listCurrency.status === "success"){
                state.listCurrency = response.data.listCurrency.data.currencies;
                parentThis.setState(state);
            }else{
                console.log("something went wrong in fetchCurrency graphQL");
            }
        }).catch(function(err){
            console.log("Fetch currency Catch block: -- " + err)
        });

    }

    fetchCountryList = (status) => {
            const parentThis = this;
            const state = parentThis.state;
            ListAction.listCountry(status).then( res => {
                const response = res;

                if(response.data.listCountry.code === "200" && response.data.listCountry.status === "success"){
                    state.listCountry = response.data.listCountry.data.countries;
                    parentThis.setState(state);
                }else{
                    console.log("something went wrong in fetchCountryList graphQL");
                }

            }).catch(function(err){
                console.log("Fetch Country Catch block: -- " + err)
            });

    }
    /*changeSymbol(e){
            const parentThis = this;
            const state = parentThis.state;
            state.variable.currencySymbol = state.listCurrency[e.target.value].currencySymbol;
            parentThis.setState(state,() => {
                console.log(state.variable.currencySymbol);
            });
    }*/

    getFormValue(e){
        const parentThis = this;
        const state = parentThis.state;
        state.validationTest = false;

        state.SubscriptionList[e.target.name] = e.target.value;

        parentThis.setState(state , () => {
            // console.log(state);
        });

    }

    addSubscription = () => {
        const parentThis = this;
        const state = parentThis.state;
        state.validationTest = true;
        parentThis.setState(state);
        Client.cache.reset();

        if(state.SubscriptionList.currencyId !== '' &&
            state.SubscriptionList.paymentDescription !== '' &&
            state.SubscriptionList.paymentDuration !== '' &&
            state.SubscriptionList.paymentPrice !== '' &&
            state.SubscriptionList.paymentPrice >= 0 &&
            state.SubscriptionList.paymentTitle !== '' &&
            state.SubscriptionList.paymentType !== ''){

            PaymentSubscriptionAction.addSubscription(state.courseId,
                state.SubscriptionList.currencyId,
                state.SubscriptionList.paymentTitle,
                state.SubscriptionList.paymentDuration,
                state.SubscriptionList.paymentPrice,
                state.SubscriptionList.paymentDescription,
                state.SubscriptionList.paymentType).then( res => {

                const response = res.data.subscriptionAdd;
                if (response.status === 'success' && response.code === '201') {

                    parentThis.closeFormHandler("Add");
                    parentThis.fetchSubscription();
                    state.SubscriptionList.currencyId = '';
                    state.SubscriptionList.paymentDescription = '';
                    state.SubscriptionList.paymentDuration = '';
                    state.SubscriptionList.paymentPrice = '';
                    state.SubscriptionList.paymentTitle = '';
                    state.SubscriptionList.paymentType = '';
                    parentThis.setState(state,() => {
                        toast.success(response.message);
                        parentThis.fetchSubscription();
                    });
                }
                else {
                    toast.error(response.message);
                }
                    console.log(response);

            }).catch(function(err){
                console.log("catch block in addSubscription" + err);
            })

        }else{
            toast.info("One or more required field are missing");
        }

    }

    updatePaymentStatus = (index) => {
        const parentThis = this;
        const state = parentThis.state;
        let status = "";
        if(state.listSubscription[index].paymentStatus === "active"){
            status = "inactive";
        }else{
            status = "active";
        }

        PaymentSubscriptionAction.subscriptionStatusUpdate(state.courseId,
            state.listSubscription[index].currencyId,
            state.listSubscription[index].paymentId,
            state.listSubscription[index].paymentDuration,
            state.listSubscription[index].paymentType,
            status).then( res => {
                const response = res.data.subscriptionStatusUpdate;
                if(response.code === "200" && response.status === "success"){
                    Client.cache.reset();
                    toast.success(response.message);
                    parentThis.fetchSubscription();

                }else{
                    toast.error(response.message);
                }

        }).catch(function(err){
            console.log("Inside catch block of updateStatus" + err);
        })


    }


    addNewPaymentConfig = () => {
        const parentThis = this;
        const state = parentThis.state;

        state.variable.showForm = true;
        state.variable.updateForm = false;

        state.SubscriptionList.currencyId = '';
        state.SubscriptionList.paymentDescription = '';
        state.SubscriptionList.paymentDuration = '';
        state.SubscriptionList.paymentPrice = '';
        state.SubscriptionList.paymentTitle = '';
        state.SubscriptionList.paymentType = '';

        parentThis.setState(state);
    }

    updatePaymentConfig = (index) => {
        const parentThis = this;
        const state = parentThis.state;
        state.variable.showForm = false;
        state.validationTest = true;
        parentThis.setState(state);

        parentThis.checkUpdateForSubscription(index);
    }

    updateSubscription(){
        const parentThis = this;
        const state = parentThis.state;
        Client.cache.reset();

        let currencyId = state.SubscriptionList.currencyId;
        let paymentDescription = state.SubscriptionList.paymentDescription;
        let paymentDuration = state.SubscriptionList.paymentDuration;
        let paymentPrice =  state.SubscriptionList.paymentPrice;
        let paymentTitle = state.SubscriptionList.paymentTitle;
        let paymentType = state.SubscriptionList.paymentType;
        let paymentId = state.SubscriptionList.paymentId;

        if(currencyId!== '' && paymentDuration!== '' && paymentPrice!== '' && paymentPrice >= 0 && paymentDescription!== '' && paymentTitle!== '' && paymentType!== '' && paymentId!== ''){
            if(currencyId!== null && paymentDuration!== null && paymentPrice!== null && paymentDescription!== null && paymentTitle!== null && paymentType!== null && paymentId!== null){

                PaymentSubscriptionAction.subscriptionUpdate(state.courseId,paymentId,paymentDuration,paymentPrice,paymentType,currencyId,paymentTitle,paymentDescription).then( res => {
                    const response = res.data.subscriptionUpdate;
                    console.log(response);
                    if(response.code === "200" && response.status === "success"){
                        toast.success(response.message);
                        parentThis.closeFormHandler("Update");
                        parentThis.fetchSubscription();
                    }else{
                        toast.error(response.message);
                    }

                }).catch(function(err){
                    console.log("Inside catch block of updateSubscription " + err);
                });

            }else{
                toast.info("one or more required field are missing");
            }
        }else{
            toast.info("one or more required field are missing");
        }

    }

    checkUpdateForSubscription = (index) => {
        const parentThis = this;
        const state = parentThis.state;
        PaymentSubscriptionAction.checkSubscriptionUpdate(state.listSubscription[index].paymentId).then( res => {
            const response = res.data.checkSubscriptionUpdate;
            // console.log(response);
            if(response.code === "200" && response.status === "success"){

                    state.SubscriptionList.currencyId = response.data.currencyId;
                    state.SubscriptionList.paymentTitle = response.data.paymentTitle;
                    state.SubscriptionList.paymentDescription = response.data.paymentDescription;
                    state.SubscriptionList.paymentPrice = response.data.paymentPrice;
                    state.SubscriptionList.paymentType = response.data.paymentType;
                    state.SubscriptionList.paymentDuration = response.data.paymentDuration;
                    state.SubscriptionList.paymentId = response.data.paymentId;
                    state.variable.updateForm = true;
                    state.variable.updateFlag = false;
                    parentThis.setState(state);
                    $('html, body').animate({
                        scrollTop: $("#subscription").offset().top
                    }, 600);
                if(response.data.count.length > 0){
                    response.data.count.map((val) => {
                        if(val.transactionStatus === "pending" || val.transactionStatus === "success"){

                            console.log("only Able to update paymentTitle & PaymentDescription");
                            parentThis.setState(state , () => {
                                console.log("only Able to update paymentTitle & PaymentDescription and state updated");
                            });

                        }else{
                            console.log("Able to update all");
                            state.variable.updateFlag = true;
                            parentThis.setState(state , () => {
                                console.log("Able to update all and state updated");
                            });
                        }
                    })
                }else{
                    console.log("Able to update all");
                    state.variable.updateFlag = true;
                    parentThis.setState(state , () => {
                        console.log("Able to update all and state updated");
                    });
                }
            }
        }).catch(function(err){
            console.log("Inside catch block of checkUpdateForSubscription " + err);
        });

    }

    featureHandler =(featuredId,currencyId,contentId) => {
        const parentThis = this;
        const state = parentThis.state;

        Client.cache.reset();

        if(featuredId === null || featuredId === ''){
            featuredId = 0;
        }

        if(currencyId!=='' && featuredId!== '' && contentId!== ''){
            if(currencyId!== null && featuredId!== null && contentId!== null){

                console.log(parseInt(state.courseId), currencyId, featuredId, contentId);
                PaymentSubscriptionAction.featureUpdate(parseInt(state.courseId),currencyId,featuredId,contentId).then( res => {
                    const response = res.data.featureUpdate;
                    if(response.code === "200" && response.status === "success"){

                        parentThis.fetchSubscription();
                        toast.success(response.message);

                    }else{
                        toast.error(response.message);
                    }

                }).catch(function(err){
                    console.log("Inside catch block of featureHandler " + err);
                })

            }else{
                console.log("Key missing null for feature Update");
            }
        }else{
            console.log("Key missing for feature Update");
        }


    }
    closeFormHandler = (key) => {
        const parentThis = this;
        const state = parentThis.state;
        if(key === "Add"){
            state.variable.showForm = false;
            state.validationTest = false;
            parentThis.setState(state);
        }else{
            state.variable.updateForm = false;
            state.variable.updateFlag = false;
            state.SubscriptionList.currencyId = '';
            state.SubscriptionList.paymentDescription = '';
            state.SubscriptionList.paymentDuration = '';
            state.SubscriptionList.paymentPrice = '';
            state.SubscriptionList.paymentTitle = '';
            state.SubscriptionList.paymentType = '';
            state.validationTest = false;
            parentThis.setState(state);
        }

    }

    filterByCurrency = (e) => {
        const parentThis = this;
        const state = parentThis.state;
        Client.cache.reset();

        // state.listSubscriptionFilter = state.listSubscription;
        state.variable.countryInput = 'all';
        state.variable.currencyInput = e.target.value;
        state.variable.loader = true;
        parentThis.setState(state);

        let id;
        let filterValue;
        let val = e.target.value;
        if(val === 'all' ||val === ''){

          parentThis.fetchSubscription();

        }else{

            PaymentSubscriptionAction.listSubscription(state.courseId , null , [], "_all")
                .then( res => {

                    const response = res;
                    if(response.data.listSubscription.code === "200" && response.data.listSubscription.status === "success"){

                        state.listSubscription = _.sortBy(response.data.listSubscription.data , ['paymentPrice']);
                        state.listSubscriptionFilter = state.listSubscription;

                        id = parseInt(val);
                        filterValue =  _.filter(state.listSubscriptionFilter, ["currencyId", id]);
                        state.listSubscriptionFilter = filterValue;
                        state.variable.loader = false;
                        parentThis.setState(state);
                        console.log(filterValue);

                    }else{
                        console.log("something went wrong in fetching Subscription graphQL");

                    }

                }).catch(function(err){
                console.log(err);
            });


        }

    }

    filterByCountry = (e) => {
        const parentThis = this;
        const state = parentThis.state;
        state.variable.loader = true;
        parentThis.setState(state);
        Client.cache.reset();


        if(e.target.value === '' || e.target.value === 'all'){

            parentThis.fetchSubscription();
            (e.target.value === '')?state.variable.countryInput = 'country':state.variable.countryInput = 'all';
            parentThis.setState(state);

        }else{

            let Code = e.target.value;
            let CountryCode = Code.split('-');


            state.variable.countryInput = CountryCode[0]+'-'+CountryCode[1];
            state.variable.currencyInput = 'all';
            parentThis.setState(state);

            PaymentSubscriptionAction.listSubscription(state.courseId , null , [], CountryCode[0])
                .then( res => {

                    const response = res;
                    if(response.data.listSubscription.code === "200" && response.data.listSubscription.status === "success"){

                        state.listSubscription = _.sortBy(response.data.listSubscription.data , ['paymentPrice']);
                        state.listSubscriptionFilter = state.listSubscription;
                        state.variable.loader = false;
                        parentThis.setState(state);

                    }else{
                        console.log("something went wrong in fetching Subscription graphQL");
                    }

                }).catch(function(err){
                console.log(err);
            });

        }
    }

    render() {
        const parentThis = this;
        const state = parentThis.state;
        const SubscriptionList = state.SubscriptionList;
        return (
            <Col sm={12} id={'subscription'} className="page-loader mb-4 padding-2x thin-border">
                <Head>
                    <title>Subscription</title>
                </Head>

        {
            state.variable.showForm &&
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
                                    <Input name="paymentTitle" value={state.SubscriptionList.paymentTitle}
                                           className={`${state.validationTest && (!Validation.stringValidate(state.SubscriptionList.paymentTitle) && 'border-red-x')}`}
                                           type="text" onChange={parentThis.getFormValue.bind(parentThis)} />
                                </Col>
                                <Col sm={{size: 3}} className={'text-left mt-1'}>
                                    <Label className="font-1-4x text-darken-2 grey-text float-left">Amount</Label>

                                     <InputGroup bSsize="md">
                                        <InputGroupAddon addonType="prepend">{parentThis.stringToHTML(state.currencySymbol)}</InputGroupAddon>
                                        <Input type="number" value={state.SubscriptionList.paymentPrice}
                                               className={`${state.validationTest && (!Validation.positiveNumber(state.SubscriptionList.paymentPrice) && 'border-red-x')}`}
                                               name="paymentPrice" onChange={parentThis.getFormValue.bind(parentThis)}/>
                                    </InputGroup>

                                </Col>
                                <Col sm={{size: 3}} className={'text-left mt-1'}>
                                    <Label className="font-1-4x grey-text text-darken-2 float-left">Payment Type</Label>
                                    <Input size="md" type="select" value={state.SubscriptionList.paymentType}
                                           className={`${state.validationTest && (!Validation.stringValidate(state.SubscriptionList.paymentType) && 'border-red-x')}`}
                                           name="paymentType" onChange={parentThis.getFormValue.bind(parentThis)}>
                                        <option value="">Choose Type</option>
                                        <option value="paid">Paid</option>
                                        <option value="trial">Trial</option>
                                    </Input>

                                </Col>
                            </Row>
                            <Row className="margin-top-1-5x">
                                <Col sm={6} className={'text-left mt-1'}>

                                        <Label for="desc" className="font-1-4x grey-text text-darken-2 float-left">Description</Label>
                                        <textarea name="paymentDescription" value={state.SubscriptionList.paymentDescription}
                                                  className={`form-control ${state.validationTest && (!Validation.stringValidate(state.SubscriptionList.paymentDescription) && 'border-red-x')}`}
                                                  rows="3" onChange={parentThis.getFormValue.bind(parentThis)}/>
                                </Col>
                                <Col sm={{size: 3 }} className={'text-left mt-1'}>
                                    <Label className="font-1-4x text-darken-2 grey-text float-left">Currency</Label>
                                    <Input size="md" type="select" value={state.SubscriptionList.currencyId}
                                           className={`${state.validationTest && (!Validation.stringValidate(state.SubscriptionList.currencyId) && 'border-red-x')}`}
                                           name="currencyId" onChange={parentThis.getFormValue.bind(parentThis)}>
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

        }

        {/*Section for EDIT form*/}


                {
                    state.variable.updateForm &&
                    <ListGroup className={'margin-top-off'}>
                        <ListGroupItem   className={'margin-bottom-x padding-2x card-shadow pulse-highlight'}>
                            <Row>
                                <Col sm={2}>
                                    <span className="font-1-4x grey lighten-4 pl-3 pr-3 pt-2 pb-2 black-text bold top-off left-off">{state.course}</span>
                                </Col>
                                <Col sm={{size: 2, offset: 7}}
                                     className={'padding-right-off margin-top-0-5x text-center'}>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col sm={6} className={'text-left mt-1'}>
                                    <Label for="title" className="font-1-4x grey-text text-darken-2 float-left">Payment Title</Label>
                                    <Input name="paymentTitle" type="text"
                                           /*className={`${state.validationTest && (!Validation.stringValidate(state.SubscriptionList.paymentTitle) && 'border-red-x')}`}*/
                                           value={state.SubscriptionList.paymentTitle} onChange={parentThis.getFormValue.bind(parentThis)} />
                                </Col>
                                <Col sm={{size: 3}} className={'text-left mt-1'}>
                                    <Label className="font-1-4x text-darken-2 grey-text float-left">Amount</Label>

                                    {
                                        (state.variable.updateFlag)?
                                            <InputGroup bSsize="md">
                                                <InputGroupAddon addonType="prepend">{parentThis.stringToHTML(state.currencySymbol)}</InputGroupAddon>
                                                <Input type="number" name="paymentPrice" value={state.SubscriptionList.paymentPrice}
                                                       /*className={`${state.validationTest && (!Validation.positiveNumber(state.SubscriptionList.paymentPrice) && 'border-red-x')}`}*/
                                                       onChange={parentThis.getFormValue.bind(parentThis)}/>
                                            </InputGroup>
                                            :
                                            <InputGroup bSsize="md">
                                                <InputGroupAddon addonType="prepend">{parentThis.stringToHTML(state.currencySymbol)}</InputGroupAddon>
                                                <Input type="number"
                                                       name="paymentPrice" value={state.SubscriptionList.paymentPrice}
                                                       onChange={parentThis.getFormValue.bind(parentThis)} disabled="true"/>
                                            </InputGroup>
                                    }

                                </Col>
                                <Col sm={{size: 3}} className={'text-left mt-1'}>
                                    <Label className="font-1-4x grey-text text-darken-2 float-left">Payment Type</Label>
                                    {
                                        (state.variable.updateFlag)?
                                        <Input size="md" type="select" name="paymentType" value={state.SubscriptionList.paymentType}
                                               /*className={`${state.validationTest && (!Validation.stringValidate(state.SubscriptionList.paymentType) && 'border-red-x')}`}*/
                                               onChange={parentThis.getFormValue.bind(parentThis)}>

                                            <option value="paid">Paid</option>
                                            <option value="trial">Trial</option>

                                        </Input>
                                            :
                                        <Input size="md" type="select" name="paymentType" value={state.SubscriptionList.paymentType}
                                               onChange={parentThis.getFormValue.bind(parentThis)} disabled="true">

                                            <option value="paid">Paid</option>
                                            <option value="trial">Trial</option>

                                        </Input>
                                    }

                                </Col>
                            </Row>
                            <Row className="margin-top-1-5x">
                                <Col sm={6} className={'text-left mt-1'}>

                                    <Label for="desc" className="font-1-4x grey-text text-darken-2 float-left">Description</Label>
                                    <textarea name="paymentDescription" className="form-control" rows="3" value={state.SubscriptionList.paymentDescription}
                                              /*className={`form-control ${state.validationTest && (!Validation.stringValidate(state.SubscriptionList.paymentDuration) && 'border-red-x')}`}*/
                                              onChange={parentThis.getFormValue.bind(parentThis)}/>
                                </Col>
                                <Col sm={{size: 3 }} className={'text-left mt-1'}>
                                    <Label className="font-1-4x text-darken-2 grey-text float-left">Currency</Label>
                                    {
                                        (state.variable.updateFlag)?
                                            <Input size="md" type="select" name="currencyId" value={state.SubscriptionList.currencyId}
                                                   /*className={`${state.validationTest && (!Validation.stringValidate(state.SubscriptionList.currencyId) && 'border-red-x')}`}*/
                                                   onChange={parentThis.getFormValue.bind(parentThis)}>

                                                {
                                                    (state.listCurrency.length > 0) &&
                                                    state.listCurrency.map((val,index) =>(

                                                        <option key={index} value={val.currencyId}>{val.currencyShortName}</option>

                                                    ))
                                                }
                                            </Input>
                                            :
                                            <Input size="md" type="select" name="currencyId" value={state.SubscriptionList.currencyId}
                                                   onChange={parentThis.getFormValue.bind(parentThis)} disabled="true">

                                                {
                                                    (state.listCurrency.length > 0) &&
                                                    state.listCurrency.map((val,index) =>(

                                                        <option key={index} value={val.currencyId}>{val.currencyShortName}</option>

                                                    ))
                                                }
                                            </Input>
                                    }
                                </Col>
                                <Col sm={{size: 3 }} className={'text-left mt-1'}>
                                    <Label className="font-1-4x text-darken-2 grey-text float-left">Subscription</Label>
                                    {
                                        (state.variable.updateFlag)?
                                            <Input size="md" name="paymentDuration" type="select" value={state.SubscriptionList.paymentDuration}
                                                   /*className={`${state.validationTest && (!Validation.stringValidate(state.SubscriptionList.paymentDuration) && 'border-red-x')}`}*/
                                                   onChange={parentThis.getFormValue.bind(parentThis)}>
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
                                            :
                                            <Input size="md" name="paymentDuration" type="select" value={state.SubscriptionList.paymentDuration}
                                                   onChange={parentThis.getFormValue.bind(parentThis)} disabled="true">
                                                <option value="1" >1 Day</option>
                                                <option value="3" >3 Days</option>
                                                <option value="7" >7 Days</option>
                                                <option value="30" >1 Month</option>
                                                <option value="90" >3 Months</option>
                                                <option value="180" >6 Months</option>
                                                <option value="365">1 Year</option>
                                                <option value="730">2 Years</option>
                                                <option value="36500">Lifetime</option>

                                            </Input>
                                    }

                                </Col>

                            </Row>

                            <Row className="margin-top-1-5x">
                                <Col sm={{size: 2, offset: 10}} className={'padding-left-off float-right'}>
                                    <Button
                                        onClick={parentThis.updateSubscription.bind(parentThis)}
                                        className="float-right btn-action-control box-shadow text-center no-radius ripple padding-0-2x"
                                        style={{lineHeight: "1px"}}>

                                        <i className="material-icons">check</i>

                                    </Button>
                                    <Button
                                        outline
                                        className="float-right margin-right-0-2x box-shadow text-center no-radius ripple padding-0-2x"
                                        color="secondary" style={{lineHeight: "1px"}}
                                        onClick={parentThis.closeFormHandler.bind(parentThis , "Update")}>
                                        <i className="material-icons">close</i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                }



                {
                    (state.variable.loader)? (<Row className={'margin-top-2x padding-top-x'}>
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
                    </Row>)
                        :
                        (<ListGroup className={'margin-top-off transparent'}>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} >
                                <div className="font-2x" style={{flexGrow:1}}>
                                    Filters:
                                </div>
                                <div  className="ml-3 mr-2 flex">
                                    <span className={'font-1-4x grey-text text-darken-5 mt-1 ml-2 mr-2'}>By Country :</span>
                                    <Input size="sm" type="select" className={'border-radius-25'} style={{width: '6rem'}} name="country"  value={state.variable.countryInput} onChange={parentThis.filterByCountry.bind(parentThis)}>
                                        <option value=''>Country</option>
                                        <option value='all'>All</option>
                                        {
                                            (state.listCountry.length > 0) &&
                                             state.listCountry.map((value,index) =>(

                                                 <option key={index} value={value.code + '-' + value.name} >{value.name}</option>

                                                ))
                                        }

                                    </Input>
                                </div>
                                <div className="ml-3 mr-2 flex">
                                    <span className={'font-1-4x grey-text text-darken-5 mt-1 ml-2 mr-2'}>By Currency :</span>
                                    <Input size="sm" type="select" name="currency" style={{width: '6rem'}} value={state.variable.currencyInput} className={'border-radius-25'} onChange={parentThis.filterByCurrency.bind(parentThis)}>
                                        <option value="">Currency</option>
                                        <option value="all" >All</option>
                                        {
                                            (state.listCurrency.length > 0) &&
                                            state.listCurrency.map((value,index) =>(

                                                <option  key={index} value={value.currencyId}>{value.currencyShortName}</option>

                                            ))
                                        }

                                    </Input>
                                </div>
                            </div>
                            <Row className={`mt-3`}>
                                <Col sm={4} className={'text-center margin-bottom-x'}>
                                    <Card body outline className="small-border card-shadow pointer" style={{height: '17rem'}} onClick={parentThis.addNewPaymentConfig.bind(this)}>
                                        <CardTitle className="margin-top-3x">
                                            <Badge pill style={{width: 75, height: 75, lineHeight:6.5}}
                                                   className="auto grey lighten-3 no-border">
                                                <i className="circle material-icons grey-text font-4x" style={{padding: '10px'}}>add</i>
                                            </Badge>
                                        </CardTitle>
                                        <CardText className={'mt-1 mb-0 font-1-5x grey-text text-darken-4'}>Add New Configuration</CardText>
                                    </Card>
                                </Col>


                                {
                                    (state.listSubscriptionFilter.length > 0)&&
                                        state.listSubscriptionFilter.map((value,index) =>


                                        <Col sm={4} className={'text-center margin-bottom-2x hvr-grow'} key={index}>
                                         {/* <section className={`absolute z-index-one circle box-shadow padding-0-5x grey lighten-4 self-middle left-50`}>
                                            <div className={'grey-text text-darken-4 mt-1 mb-0 '}>
                                                <div className={'font-2x'}>{value.currencyShortName}</div>
                                                <span className={'bolder font-2-5x word-wrap'}>{value.paymentPrice}</span>
                                            </div>
                                         </section> */}
                                            <Card body outline
                                                  className={"small-border padding-1-5x card-shadow overflow"}>
                                                <span className={`grey-text text-darken-3 font-1-5x uppercase ribbon pl-2 pr-2 ${value.paymentType === 'paid' ? 'ui-warning bold': 'ui-warning'}`}>
                                                    {value.paymentType}
                                                </span>

                                                <CardTitle className="mt-3 mb-2">
                                                <span className={'grey-text text-darken-3 bolder font-2x'}>
                                                    {value.currencyShortName}
                                                </span>
                                                <span className={`ml-2 mr-2 grey-text text-darken-2`}>|</span>
                                                <span
                                                    className={'grey-text text-darken-3 bolder font-2x'}>
                                                    {parentThis.getSubscriptionOption(value.paymentDuration)}
                                                </span>
                                                </CardTitle>
                                                <Button
                                                    color={'white'}
                                                    onClick={parentThis.updatePaymentConfig.bind(parentThis , index)}
                                                    className={`top-x right-x absolute ripple padding-0-2x`}
                                                    style={{lineHeight: "1px"}}>
                                                    <img src={`${this.state.fileIP}` + "/static/Icons/edit.svg"}
                                                         width="18"/>
                                                </Button>

                                                <CardText onClick={this.featureHandler.bind(parentThis,value.featuredId,value.currencyId,value.paymentId)}
                                                          className={`mt-1 mb-1 ripple`} style={{lineHeight: "3px"}}>
                                                    {
                                                        (value.featuredStatus === "active") ?
                                                            <i class="material-icons yellow-text text-accent-4 pointer font-4x animated-slow zoomIn"
                                                               title="Featured">star</i>
                                                            :
                                                            <i class="material-icons grey-text text-accent-4 pointer font-3x  animated zoomIn"
                                                               title="Mark as Feature">star_border</i>
                                                    }
                                                </CardText>
                                                <CardText className={'grey-text text-darken-4 mt-1 mb-0 '}>
                                                     <span className={'font-2-5x bold'}>{parentThis.stringToHTML(value.currencySymbol)}</span>
                                                    <span className={'bolder font-2-5x word-wrap margin-left-0-2x'}>{value.paymentPrice}</span>
                                                </CardText>

                                                <CardText className={'mt-1 mb-2 text-center'}style={{maxWidth: 330}}>
                                                    <div
                                                        className={'grey-text text-darken-3 font-1-8x'}>{value.paymentTitle}</div>
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
                                                 <section className={`relative`}>
                                                    <Label className={`font-1-3x left left-5x  mr-1 absolute top-off ${value.paymentStatus === 'inactive' ? 'grey-text text-darken-4':'grey-text text-darken-2'}`}> Inactive</Label>
                                                    <Switch className={`ml-1 mr-1  ${value.paymentStatus === 'active'? 'ui-success': 'ui-light'}`}
                                                            onClick={parentThis.updatePaymentStatus.bind(parentThis , index)}
                                                            on={value.paymentStatus === 'active'}
                                                    />
                                                    <Label className={`font-1-3x float-right text-darken-2 ml-1 absolute top-off ${value.paymentStatus === 'active' ? 'grey-text text-darken-4':'grey-text text-darken-2'}`} > Active</Label>
                                                </section>

                                            </Card>
                                        </Col>
                                    )
                                }


                            </Row>
                        </ListGroup>)
                }

            </Col>
        );
    }
}

export default Subscription;

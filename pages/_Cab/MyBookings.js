import AuthHeader from '../../component/AuthHeader';
import React, {Component} from 'react';
import { Container, Row, Col} from 'reactstrap';
import axios from "axios";
import {Router} from "../../routes";
import { Alert } from 'reactstrap';
import  _ from 'lodash';


class MyBookings extends Component {
    constructor(props){
        super(props);
        this.state = {
            booking: true,
            status: false,
            visible: true,
            cabDetailsBookingPerUser: [],
            cabDetailsBookingPerUserKeyAsBookingDate: [],
            bookingBookedOn:[],
            totalValue:[]
        }

        // this.getIndividualUserBooking = this.getIndividualUserBooking.bind(this);

        /*For Alert Component*/
        this.onDismiss = this.onDismiss.bind(this);
    }

    static getInitialProps({query}) {
        return {query}
    }

    /*redirectToCabList = () =>{

        Router.pushRoute('/cab/list');
    }*/


    /*getIndividualUserBooking(){

        let userEmail = localStorage.getItem('userEmail');

        axios.get('http://localhost:4010/booking-details').then(response => {
            var bookedOnArr = [];
            let data = response.data;
            //console.log(typeof(data));

            /!*If data is not blank object checking*!/

            if(data !== {}){

                data.map((item) => {
                    if (item.userEmail === userEmail) {

                        axios.get('http://localhost:4010/cab-details?id='+item.cabId).then(res => {
                            //var bookedOnArr = [];
                            let cabDetails = res.data;

                            cabDetails.map((items , i)=>{
                                if(items.id === item.cabId){


                                    let newItem  = {
                                        'cabId' :  item.cabId,
                                        'totalValue' : item.totalValue,
                                        'bookingId' : item.bookingId,
                                        'imgSrc' : items.imgSrc,
                                        'carType': items.carType,
                                        'budgetPlanPerHr' : items.budgetPlanPerHr,
                                        'cabTitle' : items.cabTitle,
                                        'carNUmber' : items.carNUmber,
                                        'bookedOn' : item.bookedOn

                                    }
                                    bookedOnArr.push(newItem);
                                }
                            })


                            var result = _.chain(bookedOnArr)
                                .groupBy('bookedOn')
                                .map((cabDetails , bookedOn) => ({ bookedOn , cabDetails}))
                                .value();
                            //console.log(result);

                            /!*_.forEach(result , (val,i)=>{

                                _.forEach(val.cabDetails, (value , index)=>{
                                    //console.log(value.cabId);

                                });




                            });*!/


                            this.setState({cabDetailsBookingPerUserKeyAsBookingDate : result});


                        })



                    }
                })


            }else{
                this.setState({booking:false},()=>{console.log("booking setState done") });
            }


        })


        /!*var data = [
            {
                "name": "jim",
                "color": "blue",
                "age": "22"
            },
            {
                "name": "Sam",
                "color": "blue",
                "age": "33"
            },
            {
                "name": "eddie",
                "color": "green",
                "age": "77"
            }];

        var res = _.chain(data)
            .groupBy('color')
            .map(( color , details) => ({color ,  details }))
            .value();

        console.log(res);*!/
        /!*_.forEach(res.color , (val,i)=>{

                console.log(val);
        });*!/


    }*/

    componentDidMount() {

        if(this.props.query.hasOwnProperty('status')){
            this.setState({status:true});
        }

        // this.getIndividualUserBooking();

        /*if(! localStorage.getItem('userKey')){
            Router.pushRoute('/cab/list');
        }*/
    }

    onDismiss() {
        this.setState({ visible: false });
    }


    render() {


        const parentThis = this;
        return (
            <div>
                <AuthHeader />


                {
                    (this.state.status)?

                        <Alert className="text-center" color="primary" isOpen={this.state.visible} toggle={this.onDismiss} fade={true}>
                            Booking Confirmed
                        </Alert> :''
                }

                {
                    (this.state.booking) ?

                        (<div className="container padding-2x primary-color-text margin-top-2x">
                            <span className="font-4x margin-bottom-2x margin-left-1-2x" >My Bookings</span>



                            {
                                parentThis.state.cabDetailsBookingPerUserKeyAsBookingDate.map((item,index)=> (


                                    <React.Fragment key={index}>
                                        <div
                                            className="row padding-0-7x font-2x font-weight-light margin-top-2x heading-panel"
                                            style={{background: '#E6ECF3'}}>
                                            <div className="col-6 blue-text">
                                                <span>Booked On {item.bookedOn}</span>
                                            </div>
                                            {/*<span>{item.cabDetails[0].cabId}</span>*/}
                                        </div>



                                        {/*individual Card*/}

                                        {
                                            item.cabDetails.map((items, i) => (


                                                <div key={i} className="row padding-2x">
                                                    <div className="col-sm-12 bg-white padding-left-off box-shadow">
                                                        <div className="row">
                                                            <div className="col-sm-2 padding-left-off">
                                                                <span className="notify-badge badge">{items.carType}</span>
                                                                <img src={items.imgSrc}
                                                                     className="full-width"
                                                                     alt="No Image Available"/>

                                                            </div>
                                                            <div className="col-sm-10 ">
                                                                <div className="row">
                                                                    <div
                                                                        className="col-sm-20 col-md-12 col-lg-12 padding-top-0-8x">
                                                                        <span className="font-2x">{items.cabTitle}</span>

                                                                    </div>
                                                                    <div
                                                                        className="col-sm-20 col-md-12 col-lg-12 padding-0-8x">
                                                                        <span className="font-1-5x">{items.carNUmber}</span>
                                                                        <span
                                                                            className="float-right padding-right-2x font-2x font-weight-bold">{items.totalValue} INR</span>
                                                                        <span
                                                                            className="float-right padding-right-2x padding-bottom-0-5x font-1-3x">Amount paid</span>

                                                                    </div>
                                                                    <div
                                                                        className="col-sm-20 col-md-12 col-lg-12 padding-top-0-8x padding-right-0-5x padding-left-0-5x">
                                                                        <span className="margin-left-1-2x font-0-9x"><i>Booked on: {items.bookedOn}</i></span>
                                                                        <span className="float-right"><button
                                                                            onClick={this.redirectToCabList.bind(this)}
                                                                            className="btn btn-primary margin-0-5x hvr-float-shadow shadow margin-right-1-5x font-0-9x border-radius-25 border-0">Book Again</button></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>


                                            ))

                                        }




                                    </React.Fragment>



                                    ))



                            }

                            </div>)

                        : (<div className="container">

                        {/*Section of no data found*/}


                        <div className="col-sm-3 no-booking-heading-margin primary-color-text">
                            <span className="font-4x font-weight-lighter" >My Bookings</span>
                        </div>
                        <Container className="margin-top-3x no-booking-container-height">

                            <Row className="text-center margin-top-5x">
                                <Col className="">
                                    <p className="grey-text text-lighten-1 font-3x lightest">No Booking History</p>
                                </Col>
                            </Row>


                        </Container>



                        </div>)
                }

            </div>
        );
    }
}

export default MyBookings;

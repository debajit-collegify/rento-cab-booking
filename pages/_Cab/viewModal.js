import React, {Component} from 'react';
import { Modal,ModalBody,ModalFooter,ModalHeader,Collapse, Button, CardBody, Card,CardImg, Badge, Label, Input, FormGroup } from "reactstrap";
import axios from 'axios';
import {Link , Router} from '../../routes';

class ViewModal extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleBooking = this.toggleBooking.bind(this);
        this.dateDiffHere = this.dateDiffHere.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);

        this.state = {
            collapse: true,
            startDate: new Date().toISOString().slice(0, 10),
            endDate: null,
            collapseBooking: false,
            totalVal: null
        };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse , collapseBooking: false });
    }

    toggleBooking() {
        this.setState({ collapseBooking: !this.state.collapseBooking , collapse : false});

        /*var startDate = localStorage.getItem('StDate');
        var Days = localStorage.getItem('Days');

        var date = startDate;
        var endDate = date.getDate() + Days;

        console.log(date + '---' + endDate);*/

    }

    componentDidMount() {
        //console.log("%c component Did Mount","color:red;font-size:20px;");
        let queryStr = this.props.welcomePageData;
        console.log(queryStr);
        if(queryStr.hasOwnProperty("st_date")){
            let data = this.props.welcomePageData;
            var days = parseInt(data.days);
            var date = new Date(data.st_date);
            date.setDate(date.getDate() + days);
            this.setState({startDate:data.st_date , endDate: date.toISOString().slice(0, 10) });
        }else{
            //console.log("props empty");
        }

    }


    handleChangeStart(e) {
        if(e.target.value < this.state.startDate){

            alert("Start date should be today or future Date");
            return false;
        }else{
            this.setState({ startDate : e.target.value});
        }


    }
    calculateTotal(){

        let edDate = this.state.endDate;
        let stDate = this.state.startDate;

        if(stDate !== null && edDate !== null && stDate >= edDate){
            let dateDifference = this.dateDiffHere(stDate , edDate);
            console.log(dateDifference);
            let total = parseInt(this.props.data[this.props.indexNo].budgetPlanPerHr) * parseInt(dateDifference);
            console.log(" calculate total function" + total);
            return total;

        }
    }

    handleChangeEnd(e) {


        if(e.target.value < this.state.startDate)
        {
            alert("End Date Should be grater than Start Date");
            return false;
        }else{
            var endDate = e.target.value;
            setTimeout(()=>{
                this.setState({ endDate : endDate});
            },500);
            console.log(this.state.startDate,this.state.endDate);

            console.log(this.calculateTotal());


        }

    }



    handelBooking = () => {

        let token = localStorage.getItem('userKey');
        //console.log(this.state.totalValue);
        /*Login check done first*/

        if(token){

            let stDate = this.state.startDate;
            let edDate = this.state.endDate;
            var cabId = this.props.data[this.props.indexNo].id;

            /*user Data*/
            let userEmail = localStorage.getItem('userEmail');

            if(stDate !== null && edDate !== null){
                if(stDate >= new Date().toISOString().slice(0, 10) && edDate >= stDate){

                    /*Post Call for Insert booking Details*/

                    axios.post('http://localhost:4010/booking-details', {
                        cabId: this.props.data[this.props.indexNo].id,
                        userEmail: userEmail,
                        bookingDate: new Date().toISOString().slice(0, 10),
                        startDate: stDate,
                        endDate: edDate,
                        totalValue: this.props.data[this.props.indexNo].budgetPlanPerHr *
                            this.dateDiffHere(stDate , edDate),
                        bookingId: "00ab1"+stDate+"0001234"+edDate,
                        bookedOn: new Date().toISOString().slice(0,10)

                    }).then(resp => {
                        //console.log(resp.data);
                        this.props.toggleViewDetailsModal.bind(this);
                        Router.pushRoute('/cab/my-bookings?status=confirm');
                        //Router.pushRoute('/cab/my-bookings');
                    }).catch(error => {
                        console.log(error);
                    });

                    /*Post Call end*/


                }else{
                    alert("start date should be grater than today and end date should be grater than start date");
                }
            }else{
                alert("Date filed should not be blank");
            }

        }else{
            Router.pushRoute('/auth/login');
        }




    }

    /*Util Functions*/

    dateDiffHere = (stDate , edDate) => {
        var date1 = new Date(stDate);
        var date2 = new Date(edDate);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        /*alert(diffDays);*/
        return diffDays;
    }


    render() {

        return (
            <div>

                {/*View details modal section*/}


                <div>
                    <Modal isOpen={this.props.modalState} className="modal-size-view-details">

                        <ModalHeader>
                            <div onClick={this.props.toggleViewDetailsModal.bind(this)} className="absolute right-2x top-0-5x margin-bottom-0-5x pointer">
                                <i className="material-icons">close</i>
                            </div>
                        </ModalHeader>
                        <ModalBody className="modal-size-view-details-body">

                            {/*cab details collaps*/}

                            <div>
                                <div onClick={this.toggle} className="row pointer padding-0-7x font-2x font-weight-lighter" style={{background:'#E6ECF3'}}>
                                    <div className="col-6">
                                        <span>Cab Details</span>
                                    </div>
                                    <div className="col-6">
                                        <div className="float-right auto-height pointer"><i className="material-icons">arrow_drop_down</i></div>
                                    </div>
                                </div>
                                <div>
                                    <Collapse isOpen={this.state.collapse}>
                                        <Card>
                                            <CardBody>
                                                <div className="row">
                                                    <div className="col-6 font-4x font-weight-light">
                                                        {this.props.data[this.props.indexNo].cabTitle}
                                                    </div>
                                                    <div className="col-5 float-right">
                                                        <img className="collap-img-style" src={this.props.data[this.props.indexNo].imgSrc} alt="Card image cap" />
                                                    </div>
                                                    <div className="col-1"></div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 font-2-5x font-weight-light grey-text margin-left-1-5x">
                                                        {this.props.data[this.props.indexNo].carNUmber}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <Badge className="font-weight-light font-1-5x padding-0-5x margin-left-2x" color="primary">{this.props.data[this.props.indexNo].carType}</Badge>
                                                    </div>
                                                    <div className="col-6 font-4x font-weight-bold">
                                                        <span className="float-right margin-right-5x margin-top-neg-0-10x">{this.props.data[this.props.indexNo].budgetPlanPerHr} INR</span>
                                                        <span className="font-2-5x font-weight-light hour-style">/Hour</span>
                                                    </div>
                                                </div>

                                            </CardBody>
                                        </Card>
                                    </Collapse>
                                </div>
                            </div>
                            <hr/>

                            {/*booking Details collaps*/}

                            <div>
                                <div onClick={this.toggleBooking}  className="row pointer padding-0-7x font-2x font-weight-lighter" style={{background:'#E6ECF3'}}>
                                    <div className="col-6">
                                        <span>Booking Details</span>
                                    </div>
                                    <div className="col-6">
                                        <div className="float-right auto-height pointer"><i className="material-icons">arrow_drop_down</i></div>
                                    </div>
                                </div>
                                <div>

                                    <Collapse isOpen={this.state.collapseBooking}>
                                        <Card>
                                            <CardBody>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <span className="font-1-2x grey-text margin-left-3x">Start Date</span>
                                                    </div>
                                                    <div className="col-4">
                                                        <span className="font-1-2x grey-text margin-left-1-5x">End Date</span>
                                                    </div>
                                                    <div className="col-4">
                                                        <span className="font-2x float-right font-weight-light margin-right-1-5x">Amount to pay</span>
                                                    </div>
                                                </div>
                                                {/*--------------------------------------*/}
                                                <div className="row">
                                                    <div className="col-4">
                                                        <span className="font-1-2x grey-text margin-left-3x">
                                                            <FormGroup className="date-pick-modal">

                                                                <Input
                                                                    type="date"
                                                                    name="startDate"
                                                                    onChange={this.handleChangeStart.bind(this)}
                                                                    selected={this.state.startDate}
                                                                    value={this.state.startDate}
                                                                 />
                                                            </FormGroup>
                                                        </span>
                                                    </div>
                                                    <div className="col-4">
                                                        <span className="font-1-2x grey-text margin-left-3x">
                                                            <FormGroup className="date-pick-modal">

                                                                <Input
                                                                    type="date"
                                                                    name="endDate"
                                                                    onChange={this.handleChangeEnd.bind(this)}
                                                                    selected={this.state.endDate}
                                                                    value={this.state.endDate}
                                                                />
                                                            </FormGroup>
                                                        </span>
                                                    </div>
                                                    <div className="col-4">
                                                        <span className="float-right font-3x">{this.state.totalVal} INR</span>
                                                        <span className="absolute right-5x" style={{top:'55px'}}>
                                                            <button onClick={this.handelBooking.bind(this)} className="box-shadow border-radius-25 btn-style padding-0-7x font-1-2x">Finalize booking</button>
                                                        </span>

                                                    </div>

                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Collapse>
                                </div>
                            </div>


                        </ModalBody>
                        {/*<ModalFooter>
                            <Button color="primary">Finalize booking</Button>

                        </ModalFooter>*/}
                    </Modal>
                </div>

            </div>
        );
    }
}

export default ViewModal;


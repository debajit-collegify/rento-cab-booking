import { Badge, Row, Col , FormGroup, Label, Input, Button , Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle , Container} from 'reactstrap';
import Layout from '../../_Layout/Header';
import React, {Component} from 'react';

import {Link , Router} from '../../routes';




class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date().toISOString().slice(0, 10),
            dateCheck:false,
            selectedDays:0,
            isLogin: false
        };

    }

    componentDidMount() {
        let loginData = localStorage.getItem('userKey');
        if(loginData){
            this.setState({isLogin: true})
        }
    }

    handleChange(e) {
        if(e.target.value < this.state.startDate){

            this.setState({dateCheck: true});

        }else{
            this.setState({
                startDate: e.target.value,
                dateCheck:false
            });
        }

    }
    decrement = () => {
        if(this.state.selectedDays > 0){
            this.setState({selectedDays: this.state.selectedDays - 1});
        }

    }
    increment = () => {
        this.setState({selectedDays: this.state.selectedDays + 1});
    }
    findCab = () => {

        if(this.state.selectedDays > 0 && this.state.startDate !== ''){
            let stDate = this.state.startDate;
            let days = this.state.selectedDays;

            Router.pushRoute('/cab/list?st_date='+stDate+'&days='+days);
        }else{
            Router.pushRoute('/cab/list');
        }



    }

    render() {

        return (
            <Layout>
                <Row>
                    <Col sm={12}>
                        <section className="fixed full-width blue accent-10 thin-border-bottom" style={{height: '100%'}}>
                            <section className="left-3x absolute top-x">
                                <img src="../../static/images/tasks-icon-19.png" alt="no Image" width={50} className="inline"/>
                                <span className="white-text" style={{lineHeight:"60px"}}>
                                <label className="logo-font font-4x margin-left-x bold"> rento</label>
                                <label style={{lineHeight:0}} className="font-1-4x margin-left-2x padding-left-2x block lighter">
                                    Rent a cab easily
                                </label>
                            </span>
                            </section>
                            <article style={{width:600}} className="margin-top-6x padding-5x absolute">
                                <h1 className="white-text lightest" style={{fontSize:60}}>We make your travel easy</h1>
                                <Row className="margin-top-4x">
                                    <Col sm={6}>
                                        <FormGroup className="margin-bottom-off">
                                            { (this.state.dateCheck)?(<Label for="exampleDate"> Please Select Future Date</Label>): '' }
                                            <Input
                                                type="date"
                                                name="date"
                                                /*id="exampleDate"*/
                                                placeholder= "put a date"
                                                selected={this.state.startDate}
                                                onChange={this.handleChange.bind(this)}
                                                /*value={this.state.startDate}*/
                                            />
                                        </FormGroup>
                                    </Col>
                                    {/*this.increment.bind(this)*/}
                                    <Col sm={6}>
                                        <Badge color="warning" onClick={this.decrement.bind(this)} className="padding-0-5x margin-right-0-5x box-shadow" pill>
                                            <i className="material-icons lightest white-text pointer">remove_circle_outline</i>
                                        </Badge>
                                        <label className="capitalize margin-left-0-5x relative white-text" style={{top: "-5px"}}> {this.state.selectedDays} days selected</label>
                                        <Badge color="warning" onClick={this.increment.bind(this)} className="padding-0-5x float-right absolute bottom right-off box-shadow" pill>
                                            <i className="material-icons lightest white-text pointer">add_circle_outline</i>
                                        </Badge>
                                    </Col>
                                    <Col sm={{ size: '4', offset: 8 }} className="text-right margin-top-3x">
                                        <Button onClick={this.findCab.bind(this)} className="white capitalize blue-text box-shadow text-accent-4 bolder"
                                                style={{borderRadius:20}}>
                                            find cabs <i className="material-icons relative top-0-5x">arrow_forward</i>
                                        </Button>{' '}
                                    </Col>

                                </Row>
                            </article>
                            <article className="width-50 right-off absolute">

                                {
                                    (this.state.isLogin)?
                                        (<label className="capitalize absolute font-1-5x bolder white-text margin-top-2x high-z-index right-3x">
                                            <i className="material-icons font-2-5x relative top-0-5x">lock_outline</i>
                                            <Link route='cab-list'><a href="#">Loged in</a></Link>
                                        </label>):
                                        (<label className="capitalize absolute font-1-5x bolder white-text margin-top-2x high-z-index right-3x">
                                            <i className="material-icons font-2-5x relative top-0-5x">lock_outline</i>
                                            <Link route='Login'><a href="#">click to login</a></Link>
                                        </label>)
                                }



                                <Row>
                                    <Col sm={12} className="black full-width full-height loader-opacity absolute" style={{left: '12%'}}>
                                        <img src="../../static/images/UberIM-365.jpg" alt="No Image Available" className="hvr-grow-shadow" style={{zoom:"55%" ,
                                            borderLeft: '10px solid yellow',
                                            borderTopLeftRadius: '28em' ,
                                            borderBottomLeftRadius: '31em'}}/>
                                    </Col>

                                </Row>

                            </article>
                        </section>
                    </Col>
                </Row>

                <div className="container-fluid margin-top-0-5x" style={{position: 'absolute', bottom: '0%'
                    , height: '44%' , backgroundColor: '#ffffb3' , backgroundImage: `url(../../static/images/background.jpg)`

                }}>
                    <Row style={{marginLeft: '14%', marginTop: '3%'}}>
                        <Col sm={3}>
                            <Card className="hvr-grow-shadow bg-color-white" style={{width: '100%'}}>
                                <CardBody>
                                    <Row className="blue accent-4">
                                        <Col>
                                            <CardText className="text-center">Offer</CardText>
                                        </Col>
                                    </Row>
                                    <div className="">
                                        <img src="../../static/images/special_offer3.jpeg" width="50%" height="40%" className="margin-left-5x box-shadow" alt=""/>
                                    </div>

                                    <CardText className="grey-text font-weight-bolder text-center">We are offering you to see our special discount package.</CardText>
                                    <Row className="green accent-4">
                                        <Col>
                                            <CardText className="text-center">Avail Offer</CardText>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm={3}>
                            <Card className="hvr-grow-shadow bg-color-white" style={{width: '100%'}}>
                                <CardBody>
                                    <Row className="blue accent-4">
                                        <Col>
                                            <CardText className="text-center">24/7 Service</CardText>
                                        </Col>
                                    </Row>
                                    <div className="">
                                        <img src="../../static/images/24hour.png" width="50%" height="40%" className="margin-left-5x box-shadow" alt=""/>
                                    </div>

                                    <CardText className="grey-text font-weight-bolder text-center">We are here to assist you 24/7. Happy to help You</CardText>
                                    <Row className="green accent-4">
                                        <Col>
                                            <CardText className="text-center">Get in touch</CardText>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm={3}>
                            <Card className="hvr-grow-shadow bg-color-white" style={{width: '100%'}}>
                                <CardBody>
                                    <Row className="blue accent-4">
                                        <Col>
                                            <CardText className="text-center">Contact Us</CardText>
                                        </Col>
                                    </Row>
                                    <div className="">
                                        <img src="../../static/images/contact_us.jpeg" width="50%" height="40%" className="margin-left-5x box-shadow" alt=""/>
                                    </div>

                                    <CardText className="grey-text font-weight-bolder text-center">Contact with us for any kind of help.We are here for you.</CardText>
                                    <Row className="green accent-4">
                                        <Col>
                                            <CardText className="text-center">Visit</CardText>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>



                    </Row>
                </div>

            </Layout>
        );
    }
}


export default Welcome;


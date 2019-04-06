import React, {Component} from "react";
import {Link} from "../../../routes";
import {
    Row,
    Col,
    Pagination,
    PaginationItem,
    PaginationLink,
    UncontrolledPopover,
    PopoverHeader,
    PopoverBody,
    ListGroupItemText,
    UncontrolledTooltip,
    Button,
    ListGroup,
    Badge,
    ListGroupItemHeading,
    ListGroupItem,
    Input
} from 'reactstrap';
import Head from "next/head";

export default class InvoiceList extends Component {

    constructor (){
        super()
        this.state = {
            fileIP: ""
        }
    }

    componentDidMount = () => {
        this.setState({fileIP: window.location.origin});
    };

    render() {
        return (
            <div>
                <Head>
                    <title>Invoice List</title>
                </Head>
                <ListGroup className={'padding-2x thin-border'}>
                    {[...Array(3)].map((x, i) =>
                        <ListGroup className={'mb-4'} key={i}>
                            <ListGroupItemHeading className={'font-1-2x text-italic mb-3'}> Added 3 Days Ago</ListGroupItemHeading>
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
                                                CLG/C-KOL/31/MAR/18-19
                                            </Badge>
                                        </ListGroupItemHeading>
                                        <ListGroupItemHeading className={'bolder font-2x float-left'}>
                                            Srinivas Satya
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
                                                    tamaghna@findela.com
                                                    <br/>+91 7890713852
                                                </label>
                                            </span>
                                            </UncontrolledTooltip>
                                        </ListGroupItemHeading>

                                        <Button className={'pt-0 pb-0 pl-1 pr-1 relative float-right right-0-5x left-x'} style={{top: "-7px"}} color="link">
                                            {/*<i id={"pr__share-"+i} className={'material-icons relative top-0-2x font-2x'}>share</i>*/}
                                            <img width={25} id={"pr__edit-"+i} className={'padding-0-2x'}
                                                 src={this.state.fileIP+"/static/images/edit.png"}/>
                                            <UncontrolledTooltip placement="top" target={"pr__edit-"+i}>
                                                Edit Invoice
                                            </UncontrolledTooltip>
                                        </Button>{' '}

                                        <Button id="UncontrolledPopover" className={'pt-0 pb-0 pl-1 pr-1 relative float-right right-0-5x left-x'} style={{top: "-7px"}} color="link">
                                            {/*<i id={"pr__share-"+i} className={'material-icons relative top-0-2x font-2x'}>share</i>*/}
                                            <img width={25} id={"pr__share-"+i} className={'padding-0-2x'}
                                                 src={this.state.fileIP+"/static/images/007-share.png"}/>
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
                                                 src={this.state.fileIP+"/static/images/028-download.png"}/>
                                            <UncontrolledTooltip placement="top" target={"pr__download-"+i}>
                                                Download as PDF
                                            </UncontrolledTooltip>
                                        </Button>

                                        <ListGroupItemText className={'mt-2 mb-2 clear'}>
                                            <Badge className={'pt-2 pl-0 pr-4 pb-2 transparent font-1-2x no-border black-text left-align'}>
                                                GMAT <span className={'font-1-2x grey-text text-darken-4 light relative ml-0'}> <br/><br/>Paid on 30th January,2019</span>
                                            </Badge>
                                        </ListGroupItemText>

                                        <ListGroupItemText className={'mt-2 mb-0 font-1-2x grey-text text-darken-3'}>
                                            Payment made by &nbsp; <code>NEFT AXis Bank TNID 3ASDFSDF454545322#</code>
                                        </ListGroupItemText>

                                        <Badge pill color={'light'} className={'float-right small-border padding-1-5x font-2x absolute bottom-1-5x right-2x'}>
                                            USD 200000
                                        </Badge>
                                    </ListGroupItem>
                                </ListGroup>
                            )}
                        </ListGroup>
                    )}
                    <Row>
                        <Col sm={12}>
                            <Pagination className='float-right' aria-label="Page navigation example">
                                <PaginationItem active>
                                    <PaginationLink href="#">
                                        1
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">
                                        2
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">
                                        3
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">
                                        4
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">
                                        5
                                    </PaginationLink>
                                </PaginationItem>
                            </Pagination>
                        </Col>
                    </Row>

                </ListGroup>

            </div>
        );
    }
}

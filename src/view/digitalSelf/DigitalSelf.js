import React from 'react';
import { Row, Col, Divider, Input, Table, Tooltip, Button, Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import "antd/dist/antd.css";
import './digitalSelf.css';
import DropDown from '../../components/Dropdown/Dropdown';
import DatePicker from '../../components/DatePicker/DatePicker';
import axios from 'axios';

class DigitalSelf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            country: '',
            partnerName: '',
            keywordId: '',
            masterPartnerId: '',
            detailedPartnerId: '',
            market: '',
            keywordCategory: '',
            keywordSubcategory: '',
            scrapeDate: '',
            keywordText: '',
            dataCategory1: [],
            dataSubCategory1: [],
            dataMarket1: [],
            dataCountry1:[],
            screenshotUrl: '',
            dataReceivedFromBackend: [],
            spin: false,
            higherRecordLength: false,
        };

        this.columns = [
            {
                title: "Screenshot Url",
                dataIndex: 'screenshotUrl',
                key: 'screenshotUrl',
                render: (text) => {
                    if (text != " ")
                        return <label style={{ cursor: "pointer", color: "#0095d9" }}>Click Here</label>
                    else
                        return <label style={{ cursor: "pointer" }}>Screenshot not available</label>
                }
            },
            {
                title: "Keyword Id",
                dataIndex: 'keywordId',
                key: 'keywordId',
                // width: 80,
            },
            {
                title: "Master Partner Id",
                dataIndex: 'masterPartnerId',
                key: 'masterPartnerId',
                // width: 80,
            },
            {
                title: "Partner Name",
                dataIndex: 'partnerName',
                key: 'partnerName',
                // width: 80,
            },

            {
                title: "Market",
                dataIndex: 'market',
                key: 'market',
                // width: 80,
            },
            {
                title: "Country",
                dataIndex: 'country',
                key: 'country',
                // width: 80,
            },
            {
                title: "keyword Category",
                dataIndex: 'keywordCategory',
                key: 'keywordCategory',
                // width: 80,
            },
            {
                title: "Keyword SubCategory",
                dataIndex: 'keywordSubcategory',
                key: 'keywordSubcategory',
                // width: 80,
            },
            {
                title: "Detailed Partner Id",
                dataIndex: 'detailedPartnerId',
                key: 'detailedPartnerId',
                // width: 80,
            },
            {
                title: "Keyword Text",
                dataIndex: 'keywordText',
                key: 'keywordText',
            },
            {
                title: "Scrape Date",
                dataIndex: 'scrapeDate',
                key: 'scrapeDate',
                // width: 80,
            },
        ]
    }


    componentDidMount() {
        let dataCategory = [], dataSubCategory = [], dataMarket = [], dataCountry=[];
        axios.get(process.env.REACT_APP_DOMAIN + '/api/v1/digital_shelf/filter_data')
            .then(response => {
                if (response.status === 200) {

                    if (response.data.category) {
                        response.data.category.map((val) => {
                            dataCategory.push(val);
                        })
                    }
                    if (response.data.subCategory) {
                        response.data.subCategory.map((val) => {
                            dataSubCategory.push(val);
                        })
                    }
                    if (response.data.market) {
                        response.data.market.map((val) => {
                            dataMarket.push(val);
                        })
                    }
                    if(response.data.country){
                        response.data.country.map((val)=>{
                            dataCountry.push(val);
                        })
                    }
                }
                else {
                    console.log('error is coming')
                }
                this.setState({
                    dataCategory1: dataCategory,
                    dataSubCategory1: dataSubCategory,
                    dataMarket1: dataMarket,
                    dataCountry1:dataCountry,
                })
            })
            .catch(err => err);
    }


    text = (event) => {

        if (event.target.id === "country") {
            this.setState({
                country: event.target.value,
            })
        }
        else if (event.target.id === "partnerName") {
            this.setState({
                partnerName: event.target.value,
            })
        }
        else if (event.target.id === "masterPartnerId") {
            this.setState({
                masterPartnerId: event.target.value,
            })
        }
        else if (event.target.id === "detailedPartnerId") {
            this.setState({
                detailedPartnerId: event.target.value,
            })
        }
        else if (event.target.id === "keywordId") {
            this.setState({
                keywordId: event.target.value,
            })
        }
        else if (event.target.id === "keywordText") {
            this.setState({
                keywordText: event.target.value,
            })
        }
    }

    select = (value, id) => {

        if (id === "market") {
            this.setState({
                market: value,
            })
        }
        else if (id === "category") {
            this.setState({
                keywordCategory: value,
            })
        }
        else if (id === "subCategory") {
            this.setState({
                keywordSubcategory: value,
            })
        }
        else if(id === "country"){
            this.setState({
                country:value,
            })
        }
    }

    refresh = () => {
        this.setState({
            country: '',
            partnerName: '',
            masterPartnerId: '',
            detailedPartnerId: '',
            keywordId: '',
            market: '',
            keywordCategory: '',
            keywordSubcategory: '',
            scrapeDate: '',
            keywordText: '',
            dataReceivedFromBackend: '',
            spin: false,
            higherRecordLength: false,
        })
    }

    showResult = () => {
        this.setState({
            spin: true,
        })
        const data = {
            country: this.state.country,
            partnerName: this.state.partnerName,
            masterPartnerId: this.state.masterPartnerId,
            detailedPartnerId: this.state.detailedPartnerId,
            keywordId: this.state.keywordId,
            market: this.state.market,
            category: this.state.keywordCategory,
            subCategory: this.state.keywordSubcategory,
            scrapeDate: this.state.scrapeDate,
            keywordText: this.state.keywordText,
        }
        let dataPacket = [];
        return new Promise((resolve, reject) => {
            axios.post(process.env.REACT_APP_DOMAIN + '/api/v1/digital_shelf/screenshot', data)
                .then(response => {
                    console.log("res", response)
                    if (response.status === 200) {
                        if (response.data.length <= 20) {
                            response.data.map((data) => {
                                dataPacket.push({
                                    country: data.country,
                                    partnerName: data.partnerName,
                                    masterPartnerId: data.masterPartnerId,
                                    detailedPartnerId: data.detailedPartnerId,
                                    keywordId: data.keywordId,
                                    market: data.market,
                                    keywordCategory: data.keywordCategory,
                                    keywordSubcategory: data.keywordSubcategory,
                                    scrapeDate: data.scrapeDate,
                                    screenshotUrl: data.screenshotUrl,
                                    keywordText: data.keywordText,
                                })
                            })
                            this.setState({
                                dataReceived: true,
                                spin: false,
                                dataReceivedFromBackend: dataPacket,
                                higherRecordLength: false,
                            })
                        }
                        else {
                            this.setState({
                                higherRecordLength: true,
                            })
                        }
                    }
                })
                .catch(err => err);
        })
    }

    dateSelect = (date, dateString, id) => {
        this.setState({
            scrapeDate: dateString,
        })
    }

    handleOk = () => {
        this.setState({
            higherRecordLength: false,
            dataReceivedFromBackend: '',
            spin: false,
        })
    }

    render() {
        // console.log(this.state.keywordSubcategory)
        return (
            <div style={{ marginLeft: "-7em" }}>

                <Row>
                    <Col span={2}></Col>
                    <label className="title1">DIGITAL SELF FILTERS</label>
                    <Col span={17}></Col>
                    <Col span={2} ><Tooltip placement="top" title="Refresh" ><span style={{ color: "#0095d9", fontSize: "15px", cursor: "pointer",marginLeft:"3.7em"}} onClick={this.refresh}>Clear All</span></Tooltip></Col>
                </Row>

                <Row style={{ marginTop: "1.4em" }}>
                    <Col span={2}></Col>
                    <Col span={1}><label className="title1">Country</label></Col>
                    <Col span={2}><DropDown placeholder={"Select country..."} data={this.state.dataCountry1} id="country" select={this.select} value={this.state.country} /></Col>

                    <Col span={3}><label className="title1" style={{marginLeft:"3em"}}>Partner Name</label></Col>
                    <Col span={2}><Input className="filter-text" style={{marginLeft:"-0.5em"}}allowClear id="partnerName" onChange={this.text} value={this.state.partnerName} /></Col>

                    <Col span={3}><label className="title1" style={{marginLeft:"1.8em"}}>Master Partner Id</label></Col>
                    <Col span={2}><Input className="filter-text" style={{marginLeft:"0em"}} allowClear id="masterPartnerId" onChange={this.text} value={this.state.masterPartnerId} /></Col>

                    <Col span={3}><label className="title1" style={{marginLeft:"2em"}}>Detailed Partner Id</label></Col>
                    <Col span={2}><Input className="filter-text" allowClear id="detailedPartnerId" onChange={this.text} value={this.state.detailedPartnerId} /></Col>

                    <Col span={2}><label className="title1" style={{marginLeft:"1.3em"}}>Keyword Id</label></Col>
                    <Col span={2}><Input className="filter-text" style={{marginLeft:"-0.5em"}} allowClear id="keywordId" onChange={this.text} value={this.state.keywordId} /></Col>
                </Row>

                <Row style={{ marginTop: 35 }}>
                    <Col span={2}></Col>
                    <Col span={1}><label className="title1">Market</label></Col>
                    <Col span={2}><DropDown placeholder={"Select market..."} id="market" data={this.state.dataMarket1} select={this.select} value={this.state.market} /></Col>

                    <Col span={3}><label className="title1" style={{marginLeft:"2em"}}>Keyword Category</label></Col>
                    <Col span={2} style={{marginLeft:"-0.5em"}}><DropDown placeholder={"Select categ..."} id="category" data={this.state.dataCategory1} select={this.select} value={this.state.keywordCategory} /></Col>

                    <Col span={3}><label className="title1" style={{marginLeft:"1.5em"}}>Keyword SubCategory</label></Col>
                    <Col span={2} style={{marginLeft:"0.5em"}}><DropDown placeholder={"Select Sub C..."} id="subCategory" data={this.state.dataSubCategory1} select={this.select} value={this.state.keywordSubcategory} /></Col>

                    <Col span={3}><label className="title1" style={{marginLeft:"3.5em"}}>Scrape Date</label></Col>
                    <Col span={2} style={{marginLeft:"0em"}}><DatePicker defaultVal={true} action={this.dateSelect} placeholder="Select Date" id={"scrape_date"} value={this.state.scrapeDate} /></Col>

                    <Col span={2}><label className="title1" style={{marginLeft:"1.2em"}}>Keyword Text</label></Col>
                    <Col span={2}><Input className="filter-text" style={{marginLeft:"-0.5em"}} allowClear id="keywordText" onChange={this.text} value={this.state.keywordText} /></Col>
                </Row>

                <Row style={{marginTop:"1em"}}>
                    <Col span={22}></Col>
                    <Col span={1}><Button style={{ backgroundColor: "#0095d9", color: "white",marginLeft:"2em" }} onClick={this.showResult}>Search</Button></Col>
                </Row>
                <Row style={{marginTop:"-1em"}}>
                    <Col span={2}></Col>
                    <Col span={22}>
                        <Divider />
                    </Col>
                    <Col span={1}></Col>
                </Row>

                <Row style={{ marginTop: "-0.5em" }}>
                    <Col span={2}></Col>
                    <label className="title1">DIGITAL SELF LIST</label>
                </Row>

                <Row style={{ marginTop: "1em" }}>
                    <Col span={2}></Col>
                    <Col span={22}>
                        <Table columns={this.columns}
                            loading={this.state.spin}
                            dataSource={this.state.dataReceivedFromBackend ? this.state.dataReceivedFromBackend : null}
                            pagination={false}
                            bordered
                            onRow={(record) => ({
                                onClick: () => (
                                   (record.screenshotUrl!=" " && record.screenshotUrl !=null)?
                                        window.open(record.screenshotUrl) : null
                                )
                            })} />
                    </Col>
                </Row>

                <Modal
                    visible={this.state.higherRecordLength}
                    forceRender
                    style={{ top: "30%" }}
                    width={350}
                    closable={false}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            Ok
                        </Button>,
                    ]}><h3 className="waring-promt"><ExclamationCircleFilled className="icon-warning-sign" /> Please choose more filters.<div className="text-margin">The number of rows are too many to display.</div></h3></Modal>
            </div>
        )
    }
}
export default DigitalSelf;
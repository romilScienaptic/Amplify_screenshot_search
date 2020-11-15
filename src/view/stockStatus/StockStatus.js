import React from 'react';
import { Row, Col, Divider, Input, Table, Tooltip, Button, Modal, Form, Select } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import "antd/dist/antd.css";
import './StockStatus.css';
import axios from 'axios';
import DropDown from '../../components/Dropdown/Dropdown';
import DatePicker from '../../components/DatePicker/DatePicker';
import GetCountries from '../../components/getCountries/GetCountries';
import GetPartnerType from '../../components/getPartnerType/GetPartnerType';

const { Option } = Select;
class StockStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            country: '',
            partnerName: '',
            masterPartnerId: '',
            detailedPartnerId: '',
            mpnModel: '',
            market: '',
            marketDuplicate: 'undefined',
            countryDuplicate: 'undefined',
            category: '',
            subCategory: '',
            // scrapeDate: '',
            scrapeStartDate: '',
            scrapeEndDate: '',
            dataCategory1: [],
            dataSubCategory1: [],
            dataMarket1: [],
            dataCountry1: [],
            screenshotUrl: '',
            partnerType: '',
            dataReceivedFromBackend: [],
            countryError: false,
            partnerTypeError: false,
            scrapeDateError:false,
            spin: false,
            higherRecordLength: false,
            showImage: false,
        };

        this.columns = [
            {
                title: "Screenshot Url",
                dataIndex: 'screenshotUrl',
                key: 'screenshotUrl',
                render: (text) => {
                    if (text != " " && text != null)
                        return <label style={{ cursor: "pointer", color: "#0095d9" }}>Click Here</label>
                    else
                        return <label>Screenshot not available</label>
                }
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
                title: "Partner Type",
                dataIndex: 'partnerType',
                key: 'partnerType',
                // width: 80,
            },
            {
                title: "Partner Name",
                dataIndex: 'partnerName',
                key: 'partnerName',
                // width: 80,
            },
            {
                title: "MPN Model",
                dataIndex: 'mpnModel',
                key: 'mpnModel',
                // width: 80,
            },
            // {
            //     title: "Master Partner Id",
            //     dataIndex: 'masterPartnerId',
            //     key: 'masterPartnerId',
            //     // width: 80,
            // },
            {
                title: "Category",
                dataIndex: 'category',
                key: 'category',
                // width: 80,
            },
            {
                title: "Sub Category",
                dataIndex: 'subCategory',
                key: 'subCategory',
                // width: 80,
            },
            // {
            //     title: "Detailed Partner Id",
            //     dataIndex: 'detailedPartnerId',
            //     key: 'detailedPartnerId',
            //     // width: 80,
            // },
            {
                title: "Scrape Date",
                dataIndex: 'scrapeDate',
                key: 'scrapeDate',
                // width: 80,
            },
        ]
    }

    componentDidMount() {
        let dataCategory = [], dataSubCategory = [], dataMarket = [], dataCountry = [];
        axios.get(process.env.REACT_APP_DOMAIN + '/api/v1/stock_status/filter_data')
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
                    if (response.data.country) {
                        response.data.country.map((val) => {
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
                    dataCountry1: dataCountry,
                })
            })
            .catch(err => err);
    }
    text = (event) => {

        if (event.target.id === "partnerName") {
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
        else if (event.target.id === "mpnModel") {
            this.setState({
                mpnModel: event.target.value,
            })
        }
    }

    select = (value, id) => {

        if (id === "market") {
            this.setState({
                market: value,
                marketDuplicate: value,
                partnerType: '',
                country: '',
                countryDuplicate: 'undefined',
                partnerTypeError: false,
            })
        }
        else if (id === "category") {
            this.setState({
                category: value,
            })
        }
        else if (id === "subCategory") {
            this.setState({
                subCategory: value,
            })
        }
        else if (id === "country") {
            this.setState({
                country: value,
                countryDuplicate: value,
                partnerType: '',
            })
        }
        else if (id === "partnerType") {
            this.setState({
                partnerType: value,
            })
        }

    }

    refresh = () => {
        this.setState({
            country: '',
            partnerName: '',
            partnerType: '',
            masterPartnerId: '',
            detailedPartnerId: '',
            mpnModel: '',
            market: '',
            category: '',
            subCategory: '',
            //scrapeDate: '',
            scrapeStartDate: '',
            scrapeEndDate: '',
            dataReceivedFromBackend: '',
            spin: false,
            higherRecordLength: false,
            countryError: false,
            scrapeDateError:false,
            partnerTypeError: false,
            marketDuplicate: 'undefined',
            countryDuplicate: 'undefined',
        })
    }

    showResult = () => {

        if (this.state.scrapeStartDate == "" || this.state.scrapeEndDate == "") {
                 this.setState({
                    scrapeDateError:true,
                 })
        }
        else {
            this.setState({
                spin: true,
            })
            const data = {
                country: this.state.country,
                partnerName: this.state.partnerName,
                // masterPartnerId: this.state.masterPartnerId,
                // detailedPartnerId: this.state.detailedPartnerId,
                mpnModel: this.state.mpnModel,
                market: this.state.market,
                category: this.state.category,
                subCategory: this.state.subCategory,
                // scrapeDate: this.state.scrapeDate,
                scrapeStartDate: this.state.scrapeStartDate,
                scrapeEndDate: this.state.scrapeEndDate,
                partnerType: this.state.partnerType,
            }
            let dataPacket = [];
            return new Promise((resolve, reject) => {
                axios.post(process.env.REACT_APP_DOMAIN + '/api/v1/stock_status/screenshot', data)
                    .then(response => {
                        console.log("res", response)
                        if (response.status === 200) {
                            if (response.data.length <= 20) {
                                response.data.map((data) => {
                                    dataPacket.push({
                                        country: data.country,
                                        partnerName: data.partnerName,
                                        // masterPartnerId: data.masterPartnerId,
                                        // detailedPartnerId: data.detailedPartnerId,
                                        mpnModel: data.mpnModel,
                                        market: data.market,
                                        category: data.category,
                                        subCategory: data.subCategory,
                                        // scrapeDate: data.scrapeDate,
                                        scrapeStartDate: data.scrapeStartDate,
                                        scrapeEndDate: data.scrapeEndDate,
                                        screenshotUrl: data.screenshotUrl,
                                        partnerType: data.partnerType,
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
    }

    dateSelect = (date, dateString, id) => {
        this.setState({
            // scrapeDate: dateString,
            scrapeStartDate: dateString[0],
            scrapeEndDate: dateString[1],
            scrapeDateError:false,
        })

    }

    handleOk = () => {
        this.setState({
            higherRecordLength: false,
            dataReceivedFromBackend: '',
            spin: false,
        })
    }

    // rowIndex = (link) => {
    //     console.log("url->", link.screenshotUrl)
    // }

    callImage = (record) => {
        const w = window.open('about:blank');
        const image = new Image();
        image.src = "data:image/jpg;base64," + record;
        setTimeout(function () {
            w.document.write(image.outerHTML);
        }, 0);
    }

    checkErrorForCountry = () => {
        if (this.state.marketDuplicate === 'undefined') {
            this.setState({
                countryError: true,
            })
        }
    }

    checkErrorForPartnerType = () => {
        if (this.state.countryDuplicate === 'undefined') {
            this.setState({
                partnerTypeError: true,
            })
        }
    }

    checkErrorForScrapeDate=()=>{
        if(this.state.scrapeEndDate !="" && this.state.scrapeStartDate!=""){
            this.setState({

            })
        }
    }
    render() {
        return (
            <div style={{ marginLeft: "-7em" }}>
                <Row>
                    <Col span={2}></Col>
                    <label className="title1">STOCK STATUS FILTERS</label>
                    <Col span={22}></Col>
                    <Col style={{ marginTop: "-2em" }}><Tooltip placement="right" title="Refresh"><span style={{ color: "#0095d9", fontSize: "15px", cursor: "pointer", marginLeft: "1em" }} onClick={this.refresh}>Clear All</span></Tooltip></Col>
                </Row>

                <Row style={{ marginTop: "1.5em" }}>
                    <Col span={2}></Col>

                    <Col><label className="title1" style={{ marginLeft: "1.5em" }}>Market</label></Col>
                    <Col style={{ marginLeft: "2em" }}><DropDown placeholder={"Select market..."} data={this.state.dataMarket1} id="market" select={this.select} value={this.state.market} /></Col>

                    <Col ><label className="title1" style={{ marginLeft: "1.8em" }}>Country</label></Col>
                    <Col style={{ marginLeft: "3.5em" }} span={3}><GetCountries placeholder={"Select country..."} data={this.state.marketDuplicate} id="country" error={this.state.countryError} checkErrorForCountry={this.checkErrorForCountry} select={this.select} value={this.state.country} /></Col>

                    <Col span={2}><label className="title1" style={{ marginLeft: "-2em" }}>Partner Type</label></Col>
                    <Col span={3} style={{ marginLeft: "-2.5em" }}><GetPartnerType placeholder={"Select Part...."} data={this.state.countryDuplicate} id="partnerType" error={this.state.partnerTypeError} checkErrorForPartnerType={this.checkErrorForPartnerType} select={this.select} value={this.state.partnerType} /></Col>

                    <Col span={2}><label className="title1" style={{ marginLeft: "-1em" }}>Partner Name</label></Col>
                    <Col span={2}><Input className="filter-text" style={{ marginLeft: "-1em" }} allowClear id="partnerName" onChange={this.text} value={this.state.partnerName} /></Col>

                    {/* <Col span={2}><label className="title1" style={{marginLeft:"-0.5em"}} >Master Partner Id</label></Col>
                    <Col span={2}><Input className="filter-text" allowClear id="masterPartnerId" onChange={this.text} value={this.state.masterPartnerId} /></Col>

                    <Col span={3}><label className="title1" style={{marginLeft:"2em"}} >Detailed Partner Id</label></Col>
                    <Col span={2}><Input className="filter-text" allowClear id="detailedPartnerId" onChange={this.text} value={this.state.detailedPartnerId} /></Col> */}

                    <Col span={2}><label className="title1" style={{ marginLeft: "1em" }}>MPN Model</label></Col>
                    <Col span={2}><Input className="filter-text" allowClear id="mpnModel" onChange={this.text} value={this.state.mpnModel} /></Col>
                </Row>

                <Row style={{ marginTop: 20 }}>
                    <Col span={2}></Col>

                    <Col ><label className="title1" style={{ marginLeft: "1.5em" }}>Category</label></Col>
                    <Col style={{ marginLeft: "1em" }}><DropDown placeholder={"Select categ..."} data={this.state.dataCategory1} id="category" select={this.select} value={this.state.category} /></Col>

                    <Col><label className="title1" style={{ marginLeft: "1.7em" }}>Sub Category</label></Col>
                    <Col style={{ marginLeft: "1em" }}><DropDown placeholder={"Select Sub C..."} id="subCategory" data={this.state.dataSubCategory1} select={this.select} value={this.state.subCategory} /></Col>

                    <Col><label className="title1" style={{ marginLeft: "2em" }}>Scrape Date</label></Col>
                    <Col style={{ marginLeft: "2.2em" }}><DatePicker defaultVal={true} action={this.dateSelect} placeholder="Select Date" id={"scrape_date"} error={this.state.scrapeDateError} checkErrorForScrapeDate={this.checkErrorForScrapeDate} value={this.state.scrapeStartDate, this.state.scrapeEndDate} /></Col>

                    <Col><Button style={{ backgroundColor: "#0095d9", color: "white", marginLeft: "25em" }} onClick={this.showResult}>Search</Button></Col>
                </Row>

                <Row>
                    <Col span={2}></Col>
                    <Col span={22}>
                        <Divider />
                    </Col>
                    <Col span={1}></Col>
                </Row>

                <Row style={{ marginTop: "-0.5em" }}>
                    <Col span={2}></Col>
                    <label className="title1">STOCK STATUS LIST</label>
                </Row>
                <Row style={{ marginTop: "1em" }}>
                    <Col span={2}></Col>
                    <Col span={22}>
                        <Table columns={this.columns}
                            loading={this.state.spin}
                            dataSource={this.state.dataReceivedFromBackend ? this.state.dataReceivedFromBackend : null}
                            pagination={false}
                            bordered
                            // onRow={(record) => ({ onClick: () => (
                            //     (record.screenshotUrl!=" " && record.screenshotUrl !=null)?
                            //     window.open(record.screenshotUrl) :null
                            //  ) })}

                            onRow={(record) => ({
                                onClick: () => { this.callImage(record.screenshotUrl) }
                            })}
                        />
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
export default StockStatus;
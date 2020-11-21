import React from 'react';
import { Row, Col, Divider, Input, Table, Tooltip, Button, Modal, Select, message, Space } from 'antd';
import { ExclamationCircleFilled, DownloadOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import './digitalSelf.css';
import moment from 'moment';
import DropDown from '../../components/digitalShelfDropdown/dropdown';
import DatePicker from '../../components/DatePicker/DatePicker';
import axios from 'axios';
import GetCountries from '../../components/digitalShelfGetCountries/getCountries';
import GetPartnerType from '../../components/digitalShelfGetPartnerType/getPartnerType';

class DigitalSelf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            market: '',
            country: '',
            partnerType: '',
            partnerName: '',
            keywordId: '',
            masterPartnerId: '',
            detailedPartnerId: '',
            keywordCategory: '',
            keywordSubcategory: '',
            scrapeDate: '',
            scrapeStartDate: '',
            scrapeEndDate: '',
            keywordText: '',
            marketDuplicate: 'undefined',
            countryDuplicate: 'undefined',
            dataCategory1: [],
            dataSubCategory1: [],
            dataMarket1: [],
            dataCountry1: [],
            screenshotUrl: '',
            dataReceivedFromBackend: [],
            spin: false,
            higherRecordLength: false,
            countryError: false,
            partnerTypeError: false,
            scrapeDateError: false,
            showImage: false,
            secondRowGap:-5,
        };

        this.columns = [
            {
                title: "Screenshot",
                dataIndex: 'screenshotUrl',
                key: 'screenshotUrl',
                width:150,
                render: (text) => {
                    if (text != " " && text != "" && text != null)
                        return <div>
                            <label style={{ cursor: "pointer", color: "#0095d9" }} onClick={() => { this.callImage(text) }}>Click Here</label>
                            <a href={`data:image/png;base64,${text}`} download={"digital_shelf"}><DownloadOutlined className="icon" /></a>
                        </div>
                    else
                        return <label style={{ cursor: "pointer" }}>Screenshot not available</label>
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
                title: "Keyword Id",
                dataIndex: 'keywordId',
                key: 'keywordId',
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
                title: "Master Partner Id",
                dataIndex: 'masterPartnerId',
                key: 'masterPartnerId',
                // width: 80,
            },


            {
                title: "Detailed Partner Id",
                dataIndex: 'detailedPartnerId',
                key: 'detailedPartnerId',
                // width: 80,
            },

            // {
            //     title: "Keyword Text",
            //     dataIndex: 'keywordText',
            //     key: 'keywordText',
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
                    if (response.data.country) {
                        response.data.country.map((val) => {
                            dataCountry.push(val);
                        })
                    }
                }
                else {
                    this.error();
                }
                this.setState({
                    dataCategory1: dataCategory,
                    dataSubCategory1: dataSubCategory,
                    dataMarket1: dataMarket,
                    dataCountry1: dataCountry,
                })
            })
            .catch(err => {
                this.error();
            });
    }

    error = () => {
        message.error('something went wrong! Please try agian');
    };

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
                marketDuplicate: value,
                partnerType: '',
                country: '',
                countryDuplicate: 'undefined',
                partnerTypeError: false,
                secondRowGap:-5,
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
        else if (id === "country") {
            this.setState({
                country: value,
                countryDuplicate: value,
                partnerType: '',
                secondRowGap:-5,
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
            keywordId: '',
            market: '',
            keywordCategory: '',
            keywordSubcategory: '',
            scrapeStartDate: '',
            scrapeEndDate: '',
            scrapeDate: '',
            keywordText: '',
            dataReceivedFromBackend: '',
            spin: false,
            higherRecordLength: false,
            countryError: false,
            scrapeDateError: false,
            partnerTypeError: false,
            marketDuplicate: 'undefined',
            countryDuplicate: 'undefined',
            secondRowGap:-5,
        })
    }

    
    forMandatoryFilled = () => {
        message.error('Please select all mandatory fields');
    };

    showResult = () => {

        if (this.state.scrapeStartDate == "" || this.state.scrapeEndDate == "" || this.state.market == "" || this.state.country == "" || this.state.partnerType == "") {
            this.forMandatoryFilled();
        }  
        else {
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
                // scrapeDate: this.state.scrapeDate,
                scrapeStartDate: this.state.scrapeStartDate,
                scrapeEndDate: this.state.scrapeEndDate,
                partnerType: this.state.partnerType,
                // keywordText: this.state.keywordText,
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
                                        // scrapeStartDate: data.scrapeStartDate,
                                        // scrapeEndDate: data.scrapeEndDate,
                                        screenshotUrl: data.screenshotUrl,
                                        partnerType: data.partnerType,
                                        //keywordText: data.keywordText,
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
                        else {
                            this.error();
                        }
                    })
                    .catch(err => {
                        if(err.response.data.status === 413){
                            this.setState({
                                higherRecordLength: true,
                            })
                        }
                        else{
                         this.error();
                        }
                    });
            })
        }
    }


    dateSelect = (date, dateString, id) => {
        var someDateString1 = "", someDateString2 = "";

        if (dateString[0] != "" || dateString[1] != "") {
            someDateString1 = moment(dateString[0]).format("YYYY-MM-DD");
            someDateString2 = moment(dateString[1]).format("YYYY-MM-DD");
        }
        this.setState({
            // scrapeDate: dateString,
            scrapeStartDate: someDateString1,
            scrapeEndDate: someDateString2,
            scrapeDateError: false,
        })

    }

    handleOk = () => {
        this.setState({
            higherRecordLength: false,
            dataReceivedFromBackend: '',
            spin: false,
        })
    }

    callImage = (record) => {
        if (record != "" && record != " " && record != null) {
            const w = window.open('about:blank');
            const image = new Image();
            image.src = "data:image/jpg;base64," + record;
            setTimeout(function () {
                w.document.write(image.outerHTML);
            }, 0);
        }
    }

    checkErrorForCountry = () => {
        if (this.state.marketDuplicate === 'undefined') {
            this.setState({
                countryError: true,
                secondRowGap:3,
            })
        }
    }

    checkErrorForPartnerType = () => {
        if (this.state.countryDuplicate === 'undefined') {
            this.setState({
                partnerTypeError: true,
                secondRowGap:3,
            })
        }
    }

    checkErrorForScrapeDate = () => {
        if (this.state.scrapeEndDate != "" && this.state.scrapeStartDate != "") {
            this.setState({

            })
        }
    }

    render() {
        // console.log(this.state.keywordSubcategory)
        return (
            <div style={{ marginLeft: "-7em" }}>

                <Row>
                    <Col span={2}></Col>
                    <label className="title1">DIGITAL SHELF FILTERS</label>
                </Row>

                <Row style={{ marginTop: "1em" }}>
                    <Col span={2}></Col>

                    <Col style={{marginTop:"-0.3em"}}><label className="title1" style={{ marginLeft: "0em" }}>Market<span className="mandatory-field">*</span></label></Col>
                    <Col style={{ marginLeft: "3em" }}><DropDown placeholder={"Select market"} id="market" data={this.state.dataMarket1} select={this.select} value={this.state.market} /></Col>

                    <Col style={{marginTop:"-0.3em"}}><label className="title1" style={{ marginLeft: "2.5em" }}>Country<span className="mandatory-field">*</span></label></Col>
                    <Col style={{ marginLeft: "4.7em" }}><GetCountries placeholder={"Select country"} data={this.state.marketDuplicate} id="country" error={this.state.countryError} checkErrorForCountry={this.checkErrorForCountry} select={this.select} value={this.state.country} /></Col>

                    <Col style={{marginTop:"-0.3em"}}><label className="title1" style={{ marginLeft: "2em" }}>Partner Type<span className="mandatory-field">*</span></label></Col>
                    <Col style={{ marginLeft: "2.8em" }}><GetPartnerType placeholder={"Select Partner Type"} data={this.state.countryDuplicate} id="partnerType" error={this.state.partnerTypeError} checkErrorForPartnerType={this.checkErrorForPartnerType} select={this.select} value={this.state.partnerType} /></Col>


                    <Col><label className="title1" style={{ marginLeft: "2em" }}>Master Partner Id</label></Col>
                    <Col ><Input className="filter-text" style={{ marginLeft: "2.8em", width: 160 }} allowClear id="masterPartnerId" placeholder="Select master partner id" onChange={this.text} value={this.state.masterPartnerId} /></Col>
                </Row>

                <Row style={{ marginTop: this.state.secondRowGap }}>
                    <Col span={2}></Col>

                    <Col><label className="title1" style={{ marginLeft: "0em" }}>Keyword Id</label></Col>
                    <Col ><Input className="filter-text" style={{ marginLeft: "1.8em", width: 160 }} placeholder="Select keyword id" allowClear id="keywordId" onChange={this.text} value={this.state.keywordId} /></Col>

                    <Col><label className="title1" style={{ marginLeft: "2.3em" }}>Detailed Partner Id</label></Col>
                    <Col ><Input className="filter-text" style={{ marginLeft: "0.7em", width: 160 }} allowClear id="detailedPartnerId" placeholder="Select detailed partner id" onChange={this.text} value={this.state.detailedPartnerId} /></Col>

                    <Col><label className="title1" style={{ marginLeft: "2em" }}>Keyword Category</label></Col>
                    <Col style={{ marginLeft: "0.8em", width: 150 }}><DropDown placeholder={"Select Keyword Category"} id="category" data={this.state.dataCategory1} select={this.select} value={this.state.keywordCategory} /></Col>

                    <Col ><label className="title1" style={{ marginLeft: "2.6em" }}>Keyword SubCategory</label></Col>
                    <Col style={{ marginLeft: "0.8em" }}><DropDown placeholder={"Select Keyword SubCategory"} id="subCategory" data={this.state.dataSubCategory1} select={this.select} value={this.state.keywordSubcategory} /></Col>

                    {/* <Col span={2}><label className="title1" style={{marginLeft:"1.2em"}}>Keyword Text</label></Col>
                    <Col span={2}><Input className="filter-text" style={{marginLeft:"-0.5em"}} allowClear id="keywordText" onChange={this.text} value={this.state.keywordText} /></Col> */}
                </Row>

                <Row style={{ marginTop: 18 }}>
                    <Col span={2}></Col>

                    <Col><label className="title1" style={{ marginLeft: "0em" }}>Partner Name</label></Col>
                    <Col><Input className="filter-text" style={{ marginLeft: "0.6em", width: 160 }} placeholder="Select partner name" allowClear id="partnerName" onChange={this.text} value={this.state.partnerName} /></Col>

                    <Col style={{marginTop:"-0.3em"}}><label className="title1" style={{ marginLeft: "2.4em" }}>Scrape Date<span className="mandatory-field">*</span></label></Col>
                    <Col style={{ marginLeft: "3em" }}><DatePicker defaultVal={true} action={this.dateSelect} placeholder="Select Scrape Date" id={"scrape_date"} error={this.state.scrapeDateError} checkErrorForScrapeDate={this.checkErrorForScrapeDate} value={this.state.scrapeStartDate, this.state.scrapeEndDate} /></Col>
                      
                        <Col span={20}></Col>

                    <Col style={{marginTop:"-2.4em", marginLeft:"4.8em"}}><Button style={{ backgroundColor: "#0095d9", color: "white"}} onClick={this.showResult}>Search</Button></Col>
                    <Col style={{marginTop:"-2.4em"}}><Tooltip placement="top" title="Refresh" ><span style={{ color: "#0095d9", fontSize: "15px", cursor: "pointer", marginLeft: "1em" }} onClick={this.refresh}>Clear All</span></Tooltip></Col>

                </Row>

                <Row style={{ marginTop: "-1em" }}>
                    <Col span={2}></Col>
                    <Col span={22}>
                        <Divider />
                    </Col>
                    <Col span={1}></Col>
                </Row>

                <Row style={{ marginTop: "-0.5em" }}>
                    <Col span={2}></Col>
                    <label className="title1">DIGITAL SHELF LIST</label>
                </Row>

                <Row style={{ marginTop: "1em" }}>
                    <Col span={2}></Col>
                    <Col span={22}>
                        <Table columns={this.columns}
                            loading={this.state.spin}
                            dataSource={this.state.dataReceivedFromBackend ? this.state.dataReceivedFromBackend : null}
                            pagination={false}
                            bordered
                        // onRow={(record) => ({
                        //     onClick: () => (
                        //        (record.screenshotUrl!=" " && record.screenshotUrl !=null)?
                        //             window.open(record.screenshotUrl) : null
                        //     )
                        // })} 
                        // onRow={(record) => ({
                        //     onClick: () => { this.callImage(record.screenshotUrl) }
                        // })}
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
export default DigitalSelf;
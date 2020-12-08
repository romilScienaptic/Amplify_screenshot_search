import React from 'react';
import { Row, Col, Divider, Input, Table, Tooltip, Button, Modal, Form, Select, message, Space, Cascader } from 'antd';
import { ExclamationCircleFilled, DownloadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './BestPractise.css';
import axios from 'axios';
import moment from 'moment';
import DatePicker from '../../components/DatePicker/DatePicker';
import DropDown from '../../components/stockStatus/Dropdown/Dropdown';
import GetCountries from '../../components/stockStatus/getCountries/GetCountries';
import GetPartnerType from '../../components/stockStatus/getPartnerType/GetPartnerType';
import GetSubCategory1 from '../../components/stockStatus/getSubCategory/GetSubCategory';
import GetCategory from '../../components/stockStatus/getCategory/GetCategory';
import GetPartnerName from '../../components/stockStatus/getPartnerName/getPartnerName';

const { Option } = Select;
class BestPractise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            market: '',
            country: '',
            partnerType: '',
            partnerName: undefined,
            mpnModel: '',
            masterPartnerId: '',
            detailedPartnerId: '',
            category: '',
            subCategory: '',
            // scrapeDate: '',
            scrapeStartDate: '',
            scrapeEndDate: '',
            marketDuplicate: 'undefined',
            countryDuplicate: 'undefined',
            dataCategory1: [],
            dataSubCategory1: [],
            dataCountry1: [],
            screenshotUrl: '',
            dataReceivedFromBackend: [],
            spin: false,
            higherRecordLength: false,
            showImage: false,
            secondRowGap: -10,
            // ---------
            marketArray: [],
            countryArray: [],
            partnerTypeArray: [],
            categoryArray: [],
            subCategoryArray: [],
            countryArrayReceive: false,
            partnerTypeArrayReceive: false,
            subCategoryArrayReceive: false,
            categoryArrayReceive: false,
            countryError: false,
            subCategoryError: false,
            partnerTypeError: false,
            scrapeDateError: false,
            categoryError: false,
            partnerNameError:false,
            allFiltersFilled: false,
        };

        this.columns = [
            {
                title: "Screenshot",
                dataIndex: 'screenshotUrl',
                key: 'screenshotUrl',
                render: (text) => {
                    if (text != " " && text != "" && text != null)
                        return <div>
                            <label style={{ cursor: "pointer", color: "#0095d9" }} onClick={() => { this.callImage(text) }}>Click Here</label>
                            <a href={`data:image/png;base64,${text}`} download={"best_practices"}><DownloadOutlined className="icon" /></a>
                        </div>

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
            {
                title: "MPN Model",
                dataIndex: 'mpnModel',
                key: 'mpnModel',
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
        axios.get(process.env.REACT_APP_DOMAIN + '/api/v1/best_practices/filter_data')
            .then(response => {
                if (response.status === 200) {

                    // if (response.data.category) {
                    //     response.data.category.map((val) => {
                    //         dataCategory.push(val);
                    //     })
                    // }

                    // if (response.data.subCategory) {
                    //     response.data.subCategory.map((val) => {
                    //         dataSubCategory.push(val);
                    //     })
                    // }

                    if (response.data.market) {
                        response.data.market.map((val) => {
                            dataMarket.push(val);
                        })
                    }
                    // if (response.data.country) {
                    //     response.data.country.map((val) => {
                    //         dataCountry.push(val);
                    //     })
                    // }
                }
                else {
                    this.error();
                }
                this.setState({
                    //    dataCategory1: dataCategory,
                    //   dataSubCategory1: dataSubCategory,
                    marketArray: dataMarket,
                    // dataCountry1: dataCountry,
                })
            })
            .catch(err => {
                this.error();
            });
    }

    error = () => {
        message.error('Something went wrong! Please try again later');
    };

    forMandatoryFilled = () => {
        message.error('Please select all mandatory filters');
    };

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

    getCountriesArray = () => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/api/v1/best_practices/getCountries/${this.state.market}`)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        countryArray: [...response.data],
                        countryArrayReceive: true,
                    })
                }
                else {
                    this.error();
                }
            })
            .catch(err => {
                this.error();
            });
    }

    getPartnerType = () => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/api/v1/best_practices/getPartnerType/${this.state.market}/${this.state.country}`)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        partnerTypeArray: [...response.data],
                        partnerTypeArrayReceive: true,
                    })
                }
                else {
                    this.error();
                }
            })
            .catch(err => {
                this.error();
            });

    }

    getSubCategory = () => {
        const data = {
            country: this.state.country,
            market: this.state.market,
            partnerType: this.state.partnerType,
            category: this.state.category,
        }
        axios.post(process.env.REACT_APP_DOMAIN + '/api/v1/best_practices/getSubCategories', data)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        subCategoryArray: [...response.data],
                        subCategoryArrayReceive: true,
                    })
                }
                else {
                    this.error();
                }
            })
            .catch(err => {
                this.error();
            });
    }

    getCategory = () => {
        const data = {
            country: this.state.country,
            market: this.state.market,
            partnerType: this.state.partnerType,
        }
        axios.post(process.env.REACT_APP_DOMAIN + '/api/v1/best_practices/getCategories', data)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        categoryArray: [...response.data],
                        categoryArrayReceive: true,
                    })
                }
                else {
                    this.error();
                }
            })
            .catch(err => {
                this.error();
            });
    }

    select = (value, id) => {

        if (id === "market") {
            this.setState({
                market: value,
                marketDuplicate: value, //no need
                countryDuplicate: 'undefined',//no need
                secondRowGap: -10,
                //latest change
                partnerType: '',
                country: '',
                category: '',
                subCategory: '',
                partnerTypeArrayReceive: false,
                categoryArrayReceive: false,
                subCategoryArrayReceive: false,
                countryError: false,
                partnerTypeError: false,
                subCategoryError: false,
                categoryError: false,
                partnerNameError:false,
                allFiltersFilled: false,

            }, () => { this.getCountriesArray() })
        }

        else if (id === "category") {
            this.setState({
                category: value,
                subCategory: '',
                subCategoryArrayReceive: false,
                subCategoryError: false,
                partnerNameError:false,
                allFiltersFilled: false,
            }, () => { this.getSubCategory() })
        }

        else if (id === "subCategory") {
            this.setState({
                subCategory: value,
                partnerNameError:false,
                allFiltersFilled: true,
            })
        }

        else if (id === "country") {
            this.setState({
                country: value,
                countryDuplicate: value,
                partnerType: '',
                partnerTypeError: false,
                secondRowGap: -10,
                subCategoryError: false,
                categoryError: false,
                category: '',
                subCategory: '',
                categoryArrayReceive: false,
                subCategoryArrayReceive: false,
                partnerNameError:false,
                allFiltersFilled: false,

            }, () => { this.getPartnerType() })
        }

        else if (id === "partnerType") {
            this.setState({
                partnerType: value,
                subCategoryError: false,
                categoryError: false,
                category: '',
                subCategory: '',
                categoryArrayReceive: false,
                subCategoryArrayReceive: false,
                partnerNameError:false,
                allFiltersFilled: false,

            }, () => { this.getCategory() })
        }

    }

    refresh = () => {
        this.setState({
            market: '',
            country: '',
            partnerType: '',
            partnerName: undefined,
            //   masterPartnerId: '',
            //   detailedPartnerId: '',
            mpnModel: '',
            category: '',
            subCategory: '',
            //scrapeDate: '',
            scrapeStartDate: '',
            scrapeEndDate: '',

            dataReceivedFromBackend: '',
            spin: false,
            higherRecordLength: false,
            marketDuplicate: 'undefined',
            countryDuplicate: 'undefined',
            secondRowGap: -10,

            countryError: false,
            scrapeDateError: false,
            partnerTypeError: false,
            subCategoryError: false,
            categoryError: false,
            countryArrayReceive: false,
            partnerTypeArrayReceive: false,
            subCategoryArrayReceive: false,
            categoryArrayReceive: false,
            partnerNameError:false,
            allFiltersFilled: false,
        })
    }

    showResult = () => {
        this.setState({
            subCategoryError: false,
            categoryError: false,
        })

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
                axios.post(process.env.REACT_APP_DOMAIN + '/api/v1/best_practices/screenshot', data)
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
                                        subCategory: data.subcategory,
                                        scrapeDate: data.scrapeDate,
                                        // scrapeStartDate: data.scrapeStartDate,
                                        // scrapeEndDate: data.scrapeEndDate,
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
                        else {
                            this.error();
                        }
                    })
                    .catch(err => {
                        if (err.response.data.status === 413) {
                            this.setState({
                                higherRecordLength: true,
                            })
                        }
                        else {
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
        //open for new window
        // const w = window.open('about:blank','new romil jain',  
        // 'resizable=yes, width=' + 1200 
        // + ', height=' +1200 + ', top=' 
        // + 20 + ', left=' + 20);
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
        if (this.state.market == '') {
            this.setState({
                countryError: true,
                secondRowGap: 8,
            })
        }
    }

    checkErrorForPartnerType = () => {
        if (this.state.country == '') {
            this.setState({
                partnerTypeError: true,
                secondRowGap: 8,
            })
        }
    }

    checkErrorForSubCategory = () => {
        if (this.state.category == '') {
            this.setState({
                subCategoryError: true,
                secondRowGap: 8,
            })
        }
    }

    checkErrorForCategory = () => {
        if (this.state.market == '' || this.state.country == '' || this.state.partnerType == '') {
            this.setState({
                categoryError: true,
                secondRowGap: 8,
            })
        }
    }

    checkErrorForScrapeDate = () => {
        if (this.state.scrapeEndDate != "" && this.state.scrapeStartDate != "") {
            this.setState({

            })
        }
    }

    checkErrorForPartnerName = () => {
        if (this.state.market == '' || this.state.country == '' || this.state.partnerType == '' || this.state.category == '' || this.state.subCategory == '') {
            this.setState({
                partnerNameError: true,
                secondRowGap: 8,
            })
        }
    }

    getPartnerNameValue = (val, id) => {
        this.setState({
            partnerName: val,
        })
    }
    
     fetchAccount = (value, callback) => {
        this.setState({
            partnerNameError: true,
        })
        axios.get(`${process.env.REACT_APP_DOMAIN}/api/v1/best_practices/getDistPartnerName/${this.state.market}/${this.state.country}/${this.state.partnerType}/${this.state.category}/${this.state.subCategory}/${value}`)
            .then(response => {
                const data = response.data;
                callback(data);
            })
            .catch(err => err);
    }

    render() {
        return (
            <div style={{ marginLeft: "-7em" }}>
                <Row>
                    <Col span={2}></Col>
                    <label className="title1">BEST PRACTICES FILTERS</label>
                    <Col span={16}></Col>
                    <Col><Button style={{ backgroundColor: "#0095d9", color: "white", marginLeft: "2em", marginTop: "-1em" }} onClick={this.showResult}>Search</Button></Col>
                    <Col style={{ marginTop: "-0.2em" }}><Tooltip placement="top" title="Refresh"><span style={{ color: "#0095d9", fontSize: "15px", cursor: "pointer", marginLeft: "1em" }} onClick={this.refresh}>Clear All</span></Tooltip></Col>
                </Row>

                <Row style={{ marginTop: "0.9em" }}>
                    <Col span={2}></Col>

                    <Col style={{ marginTop: "-0.3em" }}><label className="title1" style={{ marginLeft: "0em" }}>Market<span className="mandatory-field">*</span></label></Col>
                    <Col style={{ marginLeft: "1.2em" }}><DropDown placeholder={"Select market"} data={this.state.marketArray} id="market" select={this.select} value={this.state.market} /></Col>

                    <Col style={{ marginTop: "-0.3em" }}><label className="title1" style={{ marginLeft: "1.5em" }}>Country<span className="mandatory-field">*</span></label></Col>
                    <Col style={{ marginLeft: "2.8em" }}><GetCountries placeholder={"Select country"} data={this.state.countryArray} id="country" countryArrayReceive={this.state.countryArrayReceive} error={this.state.countryError} checkErrorForCountry={this.checkErrorForCountry} select={this.select} value={this.state.country} /></Col>

                    <Col style={{ marginTop: "-0.3em" }}><label className="title1" style={{ marginLeft: "2em" }}>Partner Type<span className="mandatory-field">*</span></label></Col>
                    <Col style={{ marginLeft: "0.6em" }}><GetPartnerType placeholder={"Select Partner Type"} data={this.state.partnerTypeArray} id="partnerType" partnerTypeArrayReceive={this.state.partnerTypeArrayReceive} error={this.state.partnerTypeError} checkErrorForPartnerType={this.checkErrorForPartnerType} select={this.select} value={this.state.partnerType} /></Col>

                    <Col><label className="title1" style={{ marginLeft: "2em" }}>Partner Name</label></Col>
                    {/* <Col><Input className="filter-text" style={{ marginLeft: "1em", width: 218 }} placeholder="Select partner name" allowClear id="partnerName" onChange={this.text} value={this.state.partnerName} /></Col> */}
                    <Col style={{ marginLeft: "1em" }}><GetPartnerName id="partnerName" placeholder={"Select Partner Name"} allowClear getPartnerNameValue={this.getPartnerNameValue} error={this.state.partnerNameError} allFiltersFilled={this.state.allFiltersFilled} checkErrorForPartnerName={this.checkErrorForPartnerName} fetchAccount={this.fetchAccount} value={this.state.partnerName} /></Col>

                    {/* <Col span={2}><label className="title1" style={{marginLeft:"-0.5em"}} >Master Partner Id</label></Col>
                    <Col span={2}><Input className="filter-text" allowClear id="masterPartnerId" onChange={this.text} value={this.state.masterPartnerId} /></Col>

                    <Col span={3}><label className="title1" style={{marginLeft:"2em"}} >Detailed Partner Id</label></Col>
                    <Col span={2}><Input className="filter-text" allowClear id="detailedPartnerId" onChange={this.text} value={this.state.detailedPartnerId} /></Col> */}
                </Row>

                <Row style={{ marginTop: "1em" }}>
                    <Col span={2}></Col>

                    <Col ><label className="title1" style={{ marginLeft: "0em" }}>Category</label></Col>
                    <Col style={{ marginLeft: "1em" }}><GetCategory placeholder={"Select category"} data={this.state.categoryArray} id="category" categoryArrayReceive={this.state.categoryArrayReceive} error={this.state.categoryError} checkErrorForCategory={this.checkErrorForCategory} select={this.select} value={this.state.category} /></Col>

                    <Col><label className="title1" style={{ marginLeft: "1.5em" }}>Sub Category</label></Col>
                    <Col style={{ marginLeft: "1em" }}><GetSubCategory1 placeholder={"Select Sub Category"} id="subCategory" data={this.state.subCategoryArray} subCategoryArrayReceive={this.state.subCategoryArrayReceive} error={this.state.subCategoryError} checkErrorForSubCategory={this.checkErrorForSubCategory} select={this.select} value={this.state.subCategory} /></Col>

                    <Col><label className="title1" style={{ marginLeft: "2em" }}>MPN Model</label></Col>
                    <Col style={{ marginTop: "0.1em" }}><Input className="filter-text" style={{ marginLeft: "1.5em", width: 190 }} allowClear id="mpnModel" placeholder="Select MPN model" onChange={this.text} value={this.state.mpnModel} /></Col>

                    <Col><label className="title1" style={{ marginLeft: "2em" }}>Scrape Date<span className="mandatory-field">*</span></label></Col>
                    <Col style={{ marginLeft: "1.2em", marginTop: "-0.2em" }}><DatePicker defaultVal={true} action={this.dateSelect} placeholder="Select Scrape Date" id={"scrape_date"} error={this.state.scrapeDateError} checkErrorForScrapeDate={this.checkErrorForScrapeDate} value={this.state.scrapeStartDate, this.state.scrapeEndDate} /></Col>
                </Row>

                <Row style={{ marginTop: "-0.5em" }}>
                    <Col span={2}></Col>
                    <Col span={22}>
                        <Divider />
                    </Col>
                    <Col span={1}></Col>
                </Row>

                <Row style={{ marginTop: "-0.5em" }}>
                    <Col span={2}></Col>
                    <label className="title1">BEST PRACTICES LIST</label>
                </Row>
                <Row style={{ marginTop: "1em", marginBottom: 20 }}>
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
                    width={400}
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
export default BestPractise;
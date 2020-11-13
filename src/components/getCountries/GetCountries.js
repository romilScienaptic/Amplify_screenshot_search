import React from 'react';
import axios from 'axios';
import { Select, Spin } from 'antd';

const { Option } = Select;

class GetCountries extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            marketData: [],
        }
    }

    componentWillReceiveProps(nextProps) {
        axios.get(`${process.env.REACT_APP_DOMAIN}/api/v1/stock_status/getCountries/${nextProps.data}`)
            .then(response => {
                this.setState({
                    marketData: [...response.data],
                })
            })
            .catch(err => err);
    }

    render() {
        if (this.state.marketData.length <= 0 && this.props.data.length <=0) {
            return (
                <Select style={{ width: 116 }} defaultValue={this.props.defaultValue} style={{ width: 116 }} showSearch onChange={this.handleChange} placeholder={this.props.placeholder} value={this.state.val}>
                    {
                        <Option style={{ width: 116, height: 70 }}><Spin style={{ marginTop: 25, marginLeft: 35 }} /></Option>
                    }
                </Select>
            )
        }
        else {
            return (
                <Select defaultValue={this.props.defaultValue} style={{ width: 116 }} showSearch onChange={this.handleChange} placeholder={this.props.placeholder} value={this.state.val}>
                    {
                        this.state.marketData.map((data, i) => {
                            return (
                                <Option value={data} key={i}>{data}</Option>
                            )
                        })
                    }
                </Select>
            )
        }
    }
}

export default GetCountries;
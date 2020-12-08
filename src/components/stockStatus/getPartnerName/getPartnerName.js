import React from 'react';
import 'antd/dist/antd.css';
import { Select, Spin, Input, Form,message} from 'antd';
import axios from 'axios';

const { Option } = Select;

class GetPartnerName extends React.Component {
    state = {
        data: [],
        value: undefined,
        fetching: true
    };

    handleSearch = value => {
        this.setState({
            fetching: true
        });
        if (value.length >= 2) {
            this.props.fetchAccount(value, data =>
                this.setState({
                    data,
                    fetching: false
                }));
        } else {
            this.setState({
                data: [''],
                fetching: false
            });
        }
    };

    handleChange = value => {
        this.setState({ value, data:[] });
        this.props.getPartnerNameValue(value, this.props.id);
    };

    render() {
    let options=[];
        if(this.state.data.length>=1){
        options = this.state.data.map((d,i) => (<Option key={d}>{d}</Option>));
        }

        if (this.props.error === false && this.props.allFiltersFilled ==false) {
            return <Form.Item style={{marginBottom:"0em"}} validateStatus={'none'}  onClick={()=>{this.props.checkErrorForPartnerName()}}><Input className="filter-text" allowClear style={{ width:220 }} placeholder={this.props.placeholder}/></Form.Item>
         }
         else if (this.props.error === true && this.props.allFiltersFilled ==false) {
            return  <Form.Item help={"Please choose all filters"} style={{marginBottom:"0em"}} validateStatus="error"><Input className="filter-text" allowClear style={{ width:220 }} placeholder={this.props.placeholder}/></Form.Item> 
         }
         else{
        return (
            <Select
                mode="single"
                allowClear
                showSearch
                value={this.props.value}
                placeholder={this.props.placeholder} 
                style={{ width: 220}}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                notFoundContent={"no result"} >
                {options}
            </Select>
        )}
    }
}

export default GetPartnerName;
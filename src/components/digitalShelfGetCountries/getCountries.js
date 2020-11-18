import React from 'react';
import axios from 'axios';
import { Select, Spin, Input, Form,message } from 'antd';

const { Option } = Select;

class getCountries extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            marketData: [],
            val:''
        }
    }

    componentWillReceiveProps(nextProps) {
        axios.get(`${process.env.REACT_APP_DOMAIN}/api/v1/digital_shelf/getCountries/${nextProps.data}`)
            .then(response => {
                if(response.status === 200){
                    this.setState({
                        marketData: [...response.data],
                    })
                }
                else{
                    this.error();
                }
            })
            .catch(err => {
                this.error();
            });

            if(nextProps.value !== "")
            this.setState({ val: nextProps.value});
           else
            this.setState({ val: nextProps.defaultValue});
    }

    error = () => {
        message.error('something went wrong! Please try agian');
      };

    handleChange=(value)=>{
        this.props.select(value,this.props.id);
    }

    render() {
        if (this.props.data == 'undefined' && this.props.error === false) {
           return <Form.Item validateStatus={'none'} onClick={()=>{this.props.checkErrorForCountry()}}><Input className="filter-text" style={{ width:116 }} placeholder={this.props.placeholder}/></Form.Item>
        }

       else if (this.props.data == 'undefined' && this.props.error === true) {
            return  <Form.Item help={"Please choose market"} validateStatus="error"><Input className="filter-text" style={{ width:116 }} placeholder={this.props.placeholder}/></Form.Item> 
         }

       else if (this.state.marketData.length <= 0 && this.props.data != 'undefined') {
            return (
                <Select style={{ width: 116,marginBottom:"1.8em" }} defaultValue={this.props.defaultValue} style={{ width: 116 }} showSearch onChange={this.handleChange} placeholder={this.props.placeholder} value={this.state.val}>
                    {
                         <Option style={{ width: 116, height:70}}><Spin style={{ marginTop:25,marginLeft:35 }}/></Option>
                    }
                </Select>
            )
        }
        else {
            return (
                <Select defaultValue={this.props.defaultValue} style={{ width: 116,marginBottom:"1.8em"  }} showSearch onChange={this.handleChange} placeholder={this.props.placeholder} value={this.state.val}>
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

export default getCountries;
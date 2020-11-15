
import React from 'react';
import 'antd/dist/antd.css';
import { DatePicker,Form } from 'antd';
import moment from 'moment';

const {RangePicker} = DatePicker;
const dateFormat = 'MM/DD/YYYY';
class Datepicker extends React.Component{

    constructor(props){
        super(props);
            this.state={
                val:props.defaultValue,
                size:props.size
            }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.value !== "")
         this.setState({ val: nextProps.value});
        else
         this.setState({ val: nextProps.defaultValue});
    }

    onChange = (date,dateString) =>{
        this.props.action(date,dateString,this.props.id);
    }
    render(){

        if(this.props.error === true){
            return  <Form.Item help={"Please select scrape date"} validateStatus="error"><RangePicker id={this.props.id} onChange={this.onChange}  size={this.state.size}   style={{width:200,border:this.props.validate, borderRadius:this.props.borderRadius}} value={this.state.val !== "" && this.state.val !== undefined ? moment(this.state.val) : null}/></Form.Item> 
        }
        return(this.props.defaultVal === false ?
            (<RangePicker id={this.props.id}  onChange={this.onChange} size={this.state.size}  style={{width:200,border:this.props.validate, borderRadius:this.props.borderRadius}} value={this.state.val !== "" ? moment(this.state.val) : null}/>)
            :(<RangePicker id={this.props.id} onChange={this.onChange}  size={this.state.size}   style={{width:200,border:this.props.validate, borderRadius:this.props.borderRadius}} value={this.state.val !== "" && this.state.val !== undefined ? moment(this.state.val) : null}/>)
        );
    }
}
//value={moment(this.state.val)}
export default Datepicker;
          
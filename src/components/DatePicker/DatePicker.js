
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
                startDate:'',
                endDate:'',
                val:props.defaultValue,
                size:props.size,
                dates:[],
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
        this.setState({
            startDate:dateString[0],
            endDate:dateString[1],
        })
    }

     disabledDate = current => {
        if (!this.state.dates || this.state.dates.length === 0) {
          return false;
        }
        const tooLate = this.state.dates[0] && current.diff(this.state.dates[0], 'days') > 89;
        const tooEarly = this.state.dates[1] && this.state.dates[1].diff(current, 'days') > 89;
        return tooEarly || tooLate;
      };

    render(){

        if(this.props.error === true){
            return  <Form.Item help={"Please select scrape date"} validateStatus="error"><RangePicker id={this.props.id} onChange={this.onChange}  size={this.state.size}   style={{width:200,border:this.props.validate, borderRadius:this.props.borderRadius}} value={this.state.val !== "" && this.state.val !== undefined ? moment(this.state.val) : null}/></Form.Item> 
        }
        return(this.props.defaultVal === false ?
            (<RangePicker id={this.props.id}  onChange={this.onChange} size={this.state.size}  disabledDate={this.disabledDate} style={{width:200,border:this.props.validate, borderRadius:this.props.borderRadius}}  value={this.state.val !== "" ? [moment(this.state.startDate),moment(this.state.endDate) ] : null}/>)
            :(<RangePicker id={this.props.id} onChange={this.onChange}  size={this.state.size}   onCalendarChange={(val) => {this.setState({
                dates:val,
            })}} disabledDate={this.disabledDate} style={{width:200,border:this.props.validate, borderRadius:this.props.borderRadius}} value={this.state.val !== "" && this.state.val !== undefined ? [moment(this.state.startDate),moment(this.state.endDate) ] : null}/>)
        );
    }
}
//value={moment(this.state.val)}
export default Datepicker;
          
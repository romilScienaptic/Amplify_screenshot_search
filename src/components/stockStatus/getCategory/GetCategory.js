import React from 'react';
import 'antd/dist/antd.css';
import { Select, Spin, Input, Form,message,Row,Col} from 'antd';

const { Option } = Select;

class GetCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: props.defaultValue,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== "")
            this.setState({ val: nextProps.value });
        else
            this.setState({ val: nextProps.defaultValue });
    }

    handleChange = (value) => {
        this.props.select(value, this.props.id);
    }
    render() {
        if (this.props.error == false && this.props.categoryArrayReceive == false) {
            return <Form.Item style={{marginBottom:"0em"}} validateStatus={'none'} onClick={()=>{this.props.checkErrorForCategory()}}><Input className="filter-text" style={{ width:190 }} placeholder={this.props.placeholder}/></Form.Item>
         }
 
        else if (this.props.error == true && this.props.categoryArrayReceive == false) {
             return  <Col><Form.Item help={"choose all mandatory filters"} style={{marginBottom:"0em"}} validateStatus="error"><Input className="filter-text" style={{ width:190 }} placeholder={this.props.placeholder}/></Form.Item></Col> 
          }
        else if (this.props.data.length <= 0) {
            return (
                <Select style={{ width: 190 }} defaultValue={this.props.defaultValue} style={{ width: 190 }} showSearch onChange={this.handleChange} placeholder={this.props.placeholder} value={this.state.val}>
                    {
                        <Option style={{ width: 190, height: 70, pointerEvents: "none" }}><Spin style={{ marginTop: 25, marginLeft: "5em" }} /></Option>
                    }
                </Select>
            )
        }
        else {
            return (
                <Select defaultValue={this.props.defaultValue} style={{ width: 190 }} showSearch onChange={this.handleChange} placeholder={this.props.placeholder} value={this.state.val}>
                    {
                        this.props.data.map((data, i) => {
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
export default GetCategory;
// import React from 'react';
// import axios from 'axios';
// import 'antd/dist/antd.css';
// import { Select, Spin, Input, Form,message } from 'antd';

// const { Option } = Select;

// class GetCountries extends React.PureComponent {
//     constructor(props) {
//         super(props);
//         this.state = {
//             marketData: [],
//             val:''
//         }
//     }

//     componentWillReceiveProps(nextProps) {
//                 if(nextProps.data  != this.props.data){
//                 this.setState({
//                     marketData: [],
//                 })
//         }
//         axios.get(`${process.env.REACT_APP_DOMAIN}/api/v1/stock_status/getCountries/${nextProps.data}`)
//             .then(response => {
//                 if(response.status === 200){
//                     this.setState({
//                         marketData: [...response.data],
//                     })
//                 }
//                 else{
//                     this.error();
//                 }
//             })
//             .catch(err => {
//                 this.error();
//             });

//             if(nextProps.value !== "")
//             this.setState({ val: nextProps.value});
//            else
//             this.setState({ val: nextProps.defaultValue});
//     }

//     handleChange=(value)=>{
//         this.props.select(value,this.props.id);
//     }
//     error = () => {
//         message.error('something went wrong! Please try agian');
//       };
      

//     render() {
//         if (this.props.data == 'undefined' && this.props.error === false) {
//            return <Form.Item validateStatus={'none'} onClick={()=>{this.props.checkErrorForCountry()}}><Input className="filter-text" style={{ width:190 }} placeholder={this.props.placeholder}/></Form.Item>
//         }

//        else if (this.props.data == 'undefined' && this.props.error === true) {
//             return  <Form.Item help={"Please choose market"} validateStatus="error"><Input className="filter-text" style={{ width:190 }} placeholder={this.props.placeholder}/></Form.Item> 
//          }

//        else if (this.state.marketData.length <= 0 && this.props.data != 'undefined') {
//             return (
//                 <Select style={{ width: 190,marginBottom:"1.8em" }} defaultValue={this.props.defaultValue} style={{ width: 190 }} showSearch onChange={this.handleChange} placeholder={this.props.placeholder} value={this.state.val}>
//                     {
//                          <Option style={{ width: 190, height:70, pointerEvents: "none"}}><Spin style={{  marginTop:25,marginLeft:"5em"  }}/></Option>
//                     }
//                 </Select>
//             )
//         }
//         else {
//             return (
//                 <Select defaultValue={this.props.defaultValue} style={{ width: 190,marginBottom:"1.8em"  }} showSearch onChange={this.handleChange} placeholder={this.props.placeholder} value={this.state.val}>
//                     {
//                         this.state.marketData.map((data, i) => {
//                             return (
//                                 <Option value={data} key={i}>{data}</Option>
//                             )
//                         })
//                     }
//                 </Select>
//             )
//         }
//     }
// }

// export default GetCountries;
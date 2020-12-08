import React from 'react';
import 'antd/dist/antd.css';
import './dropdown.css';
import { Select, Spin } from 'antd';

const { Option } = Select;

class Dropdown extends React.Component {
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
        if (this.props.data.length <= 0) {
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
export default Dropdown;
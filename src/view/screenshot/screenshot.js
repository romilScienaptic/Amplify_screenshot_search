import React from 'react';

class ScreenShot extends React.Component{
    constructor(props){
        super(props);

    }
    componentDidMount(){
        alert("image data" + this.props);
    }
    render(){
        return(
           <h1>Hello world</h1>
        )
    }
}

export default ScreenShot;
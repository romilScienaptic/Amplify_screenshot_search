import React from 'react';
import './App.css';
import "antd/dist/antd.css";
import HPLogo from './assets/images/Hp.png';
import { Row, Col } from 'antd';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Tab from './components/Tab/Tab';
import axios from 'axios';
import screenShot from './view/screenshot/screenshot';

class App extends React.Component {
    constructor(props){
      super(props);
      this.state={
        name:'',
      }
    }
  componentDidMount() {
      axios.get(process.env.REACT_APP_DOMAIN + '/api/v1/username')
      .then(response =>{
        this.setState({
          name:response.data.name,
        })
      })
      .catch(err => err);
  }
  render() {
    return (
      <div>
        <Router>
          <Row>
            <Col span={6} style={{ marginTop: "2%", marginBottom: "2%" }}><img src={HPLogo} style={{ width: "4em" }} alt="Hp logo" /><span style={{ color: "#0095d9", fontWeight: 600, fontSize: "16px", marginLeft: "2%" }}>Amplify Screenshot Search</span></Col>
            <Col span={13}></Col>
            <Col span={5}><h3 className="welcome-name">Welcome: { this.state.name}</h3></Col>
          </Row>
          <Switch>
            <Route path="/" exact component={Tab} />
            <Route path="/screenshot/:id" exact component={screenShot} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;

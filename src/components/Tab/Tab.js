import React from 'react';
import 'antd/dist/antd.css';
import { Tabs,Row } from 'antd';
import "./Tab.css";
import StockStatus from '../../view/stockStatus/StockStatus';
import DigitalSelf from '../../view/digitalSelf/DigitalSelf';
import BestPractise from '../../view/bestPractise/BestPractise';

const { TabPane } = Tabs;

class Tab extends React.Component {
    render() {
        return (
            <div className="card-container">
                <Tabs type="card" className="tab-parent" >
                    <TabPane tab="STOCK STATUS" key="1">
                        <StockStatus/>
                    </TabPane>

                    <TabPane tab="DIGITAL SHELF" key="2" >
                        <DigitalSelf/>
                    </TabPane>

                    <TabPane tab="BEST PRACTICES" key="3" >
                        <BestPractise/>
                    </TabPane>
                </Tabs>
                </div>
        )
    }
}
export default Tab;
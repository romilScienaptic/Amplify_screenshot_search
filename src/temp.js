import React from 'react';
import App from './App';

import {
    ConfigProvider,
    Pagination,
    DatePicker,
    TimePicker,
    Calendar,
    Popconfirm,
    Table,
    Modal,
    Button,
    Select,
    Transfer,
    Radio,
  } from 'antd';
  import enUS from 'antd/lib/locale/en_US';
  import zhCN from 'antd/lib/locale/zh_CN';
  import moment from 'moment';
  import 'moment/locale/zh-cn';
  
  moment.locale('en');
  
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {
          text: 'filter1',
          value: 'filter1',
        },
      ],
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
  ];
class Temp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: enUS,
    };
  }

  changeLocale = e => {
    const localeValue = e.target.value;
    this.setState({ locale: localeValue });
    if (!localeValue) {
      moment.locale('en');
    } else {
      moment.locale('zh-cn');
    }
  };

  render() {
    const { locale } = this.state;
    return (
      <div>
        <div className="change-locale">
          <span style={{ marginRight: 16 }}>Change locale of components: </span>
          <Radio.Group value={locale} onChange={this.changeLocale}>
            <Radio.Button key="en" value={enUS}>
              English
            </Radio.Button>
            <Radio.Button key="cn" value={zhCN}>
              中文
            </Radio.Button>
          </Radio.Group>
        </div>
        <ConfigProvider locale={locale}>
          <App
            key={locale ? locale.locale : 'en' /* Have to refresh for production environment */}
          />
        </ConfigProvider>
      </div>
    );
  }
}

export default Temp;

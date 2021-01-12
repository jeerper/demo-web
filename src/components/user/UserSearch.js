import React from 'react';
import { Form, Row, Col, Input, Select,Button,Icon,InputNumber  } from 'antd';
import styles from './index.less';

class UserSearch extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        expand:false,
    }
  }

  render(){
    const { form : {getFieldDecorator,resetFields,getFieldsValue},} = this.props;
    const { searchParams, onHandleSearch,onHandleReset} = this.props;
    const handleSearch = ()=>{
          onHandleSearch(getFieldsValue());
    }
    const handleReset = ()=>{
          resetFields();
          onHandleReset();
    }
    const formItemFormat = { }
    return (
      <div className={styles.main}>
        <Form className="ant-advanced-search-form" layout="inline">
            <Row>
              <Col span={5}>
                <Form.Item label="姓名" {...formItemFormat}>
                  {
                    getFieldDecorator(`name`, {
                        initialValue: searchParams.name || "",
                    })
                    (
                      <Input placeholder="请输入名称" />
                    )
                  }
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="年龄" {...formItemFormat}>
                  {
                    getFieldDecorator(`gtAge`, {
                        initialValue: searchParams.age || "",
                    })
                    (
                     <InputNumber min={1} max={120} />
                    )
                  }
                  <span style={{marginRight:'5px'}}>至</span>
                  {
                    getFieldDecorator(`ltAge`, {
                        initialValue: searchParams.age || "",
                    })
                    (
                     <InputNumber min={1} max={120} />
                    )
                  }
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="性别" {...formItemFormat}>
                  {
                    getFieldDecorator(`sex`, {
                        initialValue: searchParams.sex || "",
                    })
                    (
                      <Input placeholder="请输入性别" />
                    )
                  }
                </Form.Item>
              </Col>
              <Col span={5}>
                  <Button type="primary" onClick={handleSearch}>查询</Button>
                  <Button style={{ marginLeft: 8 }} onClick={handleReset}>重置</Button>
                  <a style={{ marginLeft: 8, fontSize: 12 }} onClick={()=> this.setState({expand:!this.state.expand})}>
                    更多 <Icon type={this.state.expand ? 'up' : 'down'} />
                  </a>
              </Col>
            </Row>
            <Row style={{display:this.state.expand ? '' : 'none'}}>
              <Col span={5}>
                  <Form.Item label="地址" {...formItemFormat}>
                      {
                        getFieldDecorator(`address`, {
                            initialValue: searchParams.address || "",
                        })
                          (
                              <Input placeholder="请输入地址名称" />
                            )
                      }
                  </Form.Item>
              </Col>
            </Row>
        </Form>
      </div>
    )
  }
}
export default Form.create()(UserSearch);
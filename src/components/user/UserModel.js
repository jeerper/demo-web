import React from 'react';
import { Form, Input, Radio,Button,Modal,InputNumber } from 'antd';
import styles from './index.less';

const RadioGroup = Radio.Group;
const { TextArea } = Input;

class UserSearch extends React.Component{
  constructor(props){
    super(props);
    //this.state = {
       // visible:false,
    // }
   }
   handleSubmit = ()=>{
     this.props.form.validateFields((err, values) => {
        if (!err) {
            this.props.onSubmit(values);
        }
     });
   }
   render(){
    const { form : {getFieldDecorator,resetFields,getFieldsValue,validateFields },} = this.props;
    const { userItem,visible,isView,onCancel } = this.props;
    const formItemFormat = {
          labelCol:{span:4},
          wrapperCol:{span:18},
    }
    let title = userItem.fid?"修改":"新增";
    if(isView) title = "查看"
    return (
      <div className={styles.main}>
          <Modal title={title} visible={visible} onOk={this.handleSubmit.bind(this)} onCancel={onCancel} okText="确认" cancelText="取消">
            <Form>
                {getFieldDecorator(`fid`, {initialValue: userItem.fid || "",})(<Input type="hidden" />)}
                <Form.Item label="姓名" {...formItemFormat}>
                  {
                    getFieldDecorator(`name`, {
                        initialValue: userItem.name || "",
                        rules:[
                            {required: true, message: '请输入姓名'},
                            {max: 50, message: '姓名不能超过50个字符'},
                        ]
                    })
                    (
                      <Input disabled={isView} placeholder="请输入名称" />
                    )
                  }
                </Form.Item>
                <Form.Item label="年龄" {...formItemFormat}>
                  {
                    getFieldDecorator(`age`, {
                        initialValue: userItem.age || "",
                        rules:[
                            {required: true, message: '请输入年龄'},
                        ]
                    })
                    (
                    <InputNumber disabled={isView} min={1} max={120} placeholder="请输入年龄" style={{width:'100%'}} />
                    )
                  }
                </Form.Item>
                <Form.Item label="性别" {...formItemFormat}>
                  {
                    getFieldDecorator(`sex`, {
                        initialValue: userItem.sex || "男",
                    })
                    (
                        <RadioGroup disabled={isView}>
                          <Radio value={'男'}>男</Radio>
                          <Radio value={'女'}>女</Radio>
                        </RadioGroup>
                    )
                  }
                </Form.Item>
                  <Form.Item label="地址" {...formItemFormat}>
                      {
                        getFieldDecorator(`address`, {
                            initialValue: userItem.address || "",
                            rules:[
                                {max: 255, message: '地址不能超过255个字符'},
                            ]
                        })
                          (
                              <TextArea disabled={isView} rows={4} placeholder={isView?"":"请输入地址"} />
                          )
                      }
                  </Form.Item>
            </Form>
          </Modal>
      </div>
    )
  }
}
export default Form.create()(UserSearch);
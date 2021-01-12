import React from 'react';
import { Button } from 'antd';
import styles from './index.less';
import { Modal  } from 'antd';

class UserToolBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    const {onAdd,onUpdate,onDelete} = this.props;
     const handleConfirm = ()=>{
         Modal.confirm({
             title: '系统提示',
             content: '确定要删除选中的数据？',
             okText: '确认',
             cancelText: '取消',
             onOk:()=> onDelete(),
         });
     }
    return (
      <div className={styles.main}>
        <Button icon='plus' type="primary" onClick={onAdd} style={{marginRight:'5px'}}>新增</Button>
        <Button icon='edit' onClick={onUpdate}  style={{marginRight:'5px'}}>编辑</Button>
        <Button icon='delete' onClick={handleConfirm.bind(null)}  style={{marginRight:'5px'}}>删除</Button>
      </div>
    )
  }
}
export default UserToolBar;
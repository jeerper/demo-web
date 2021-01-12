import React from 'react';
import * as config from '../../config/commonConfig';
import {  Table, Icon, Tooltip, Pagination } from 'antd';

class UserList extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const { list,pageIndex,total,rowSelection,onPageChange,onView} = this.props;
    
    const columns = [{
          title: '名称',
          dataIndex: 'name',
        },
        {
          title: '性别',
          dataIndex: 'sex',
        },
        {
          title: '年龄',
          dataIndex: 'age',
        },
        {
          title: '住址',
          dataIndex: 'address',
        },
        {
            title: '操作',
            render:(record)=>{
                return <a onClick={record => onView(record)}><Icon type="eye"/></a>;
            }
        }];
    return (
      <div>
        <Table rowKey={row=>row.fid} rowSelection={rowSelection} columns={columns} dataSource={list} bordered pagination={false}/>
        <Pagination style={{marginTop:'10px',float:'right'}} current={pageIndex} pageSize={config.PAGE_SIZE} total={total} onChange={onPageChange} />
      </div>
    )
  }
}
export default UserList;
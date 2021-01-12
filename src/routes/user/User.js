import React from 'react';
import { connect } from 'dva';
import { message  } from 'antd';
import styles from './index.less'
import {UserList,UserSearch,UserToolBar,UserModel} from '@/components/user/index'


class User extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const { dispatch,user } = this.props;
    const { list,total,pageIndex,selectedRows,selectedRowKeys,searchParams,userItem,visible,isView } = user;
    const userListProps1 = {
        nextSearchParams:searchParams,
        nextSelectedRows:selectedRows,
        nextselectedRowKeys: selectedRowKeys,
    }
    const userListProps = {
        list,
        total,
        pageIndex,
        rowSelection:{
            selectedRows,
            selectedRowKeys,
            onChange:(selectedRowKeys, selectedRows)=>{
                dispatch({
                     type:'user/updateState',
                     payload:{
                         selectedRowKeys,
                         selectedRows
                     }
                 });
            }
        },
        onView:(record)=>{
          dispatch({
              type:'user/updateState',
              payload:{
                  visible:true,
                  userItem:record,
                  isView:true,
              }
          });
        },
        onPageChange:(page)=>{
          dispatch({
              type:'user/getListData',
              payload:{
                  pageIndex:page,
                  searchParams
              }
          });
        }
    }
    const userSearch = {
        searchParams,
        onHandleSearch:(params)=>{
            dispatch({
                 type:'user/getListData',
                 payload:{
                     searchParams:params
                 }
             });
        },
        onHandleReset:()=>{
          dispatch({
              type:'user/updateState',
              payload:{
                  searchParams:{}
              }
          });
        },
    }
    const userToolbalProps = {
        onAdd:()=>{
            dispatch({
                 type:'user/updateState',
                 payload:{
                     visible:true,
                     userItem:{},
                 }
             });
        },
        onUpdate:()=>{
          if(selectedRows.length != 1){
              message.warning("请选择一条数据");
              return;
          }
          dispatch({
              type:'user/updateState',
              payload:{
                  visible:true,
                  userItem:selectedRows[0],
              }
          });
        },
        onDelete:()=>{
          if(selectedRows.length == 0){
              message.warning("请选择要删除的数据");
              return;
          }
          dispatch({
              type:'user/deleteObject',
              payload:{
                  ids:selectedRowKeys.join(','),
              }
          });
        },
    }
    const userModel = {
        userItem,
        visible,
        isView,
        onSubmit:(values)=>{
            let type = 'user/createObject';
            if(values["fid"]) type = 'user/updateObject';
            dispatch({
                 type,
                 payload:{
                     values
                 }
             });
        },
        onCancel:()=>{
          dispatch({
              type:'user/updateState',
              payload:{
                  visible:false,
                  userItem:{},
              }
          });
        }
    }
    return (
      <div className={styles.main}>
        <UserModel {...userModel}/>
        <UserSearch {...userSearch}/>
        <UserToolBar {...userToolbalProps}/>
        <UserList {...userListProps}{...userListProps1}/>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}
export default connect(mapStateToProps)(User);
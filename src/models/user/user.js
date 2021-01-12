import * as service from '@/services/user/userService';
import { message  } from 'antd';

export default {
    /** 命名空间，与文件名保持一致, 供route组件关联 */
    namespace: 'user',
    /** 声明状态 */
    state: {
        userItem:{},
        visible:false,
        isView:false,
        list:[],
        total:0,
        pageIndex:1,
        selectedRows:[],
        selectedRowKeys:[],
        searchParams:{},
    },
    /**
     * 功能：更新model的state的值, 要更新state只能写在reducers中
     *
     * reducers 聚合积累的结果是当前 model 的 state 对象。
     * 通过 actions 中传入的值，与当前 reducers 中的值进行运算获得新的值（也就是新的 state）。
     * 需要注意的是 Reducer 必须是纯函数，
     * 所以同样的输入必然得到同样的输出，它们不应该产生任何副作用。
     * 并且，每一次的计算都应该使用immutable data，这种特性简单理解就是每次操作都是返回一个全新的数据（独立，纯净），
     * 所以热重载和时间旅行这些功能才能够使用。
     */
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload };
        },
    },
    /**
     * 功能：完成异步请求数据的，只能写在effects里
     *
     * effects 被称为副作用，在我们的应用中，最常见的就是异步操作。
     * 它来自于函数编程的概念，之所以叫副作用是因为它使得我们的函数变得不纯，同样的输入不一定获得同样的输出。
     */
    effects: {
        *getListData({payload:{searchParams = {}}},{ call,put,select }) {
          let {list, isView} = yield select(state=>state.user);
          const data = yield call(service.getListData,{pageIndex,params:searchParams});
          if(data.code == '200'){
              yield put({
                  type:"updateState",
                  payload:{
                      pageIndex:data.current||1,
                      list:data.data ||[],
                      total:data.total
                  }
              });
          }
        },
        *updateObject({payload:{ values }},{ call,put,select }) {
          const data = yield call(service.updateObject,{ values });
          yield put({
              type:"updateState",
              payload:{
                  visible:false,
                  selectedRows:[],
                  selectedRowKeys:[],
              }
          });
          yield put({type:"reloadListData",payload:{}});
          message.info(data.message);
        },
        *deleteObject({payload:{ ids }},{ call,put,select }) {
          const data = yield call(service.deleteObject,ids);
          yield put({
              type:"updateState",
              payload:{
                  selectedRows:[],
                  selectedRowKeys:[],
              }
          });
          yield put({type:"reloadListData",payload:{}});
          message.info(data.message);
        },
        *createObject({payload:{ values }},{ call,put,select }) {
          const data = yield call(service.createObject,{ values });
          yield put({
              type:"updateState",
              payload:{
                  visible:false
              }
          });
          yield put({type:"reloadListData",payload:{}});
          message.info(data.message);
        },
        *reloadListData({payload:{ values }},{ call,put,select }) {
          const {pageIndex,searchParams} = yield select(state => state.user) ;
          yield put({type:"getListData",payload:{ pageIndex,searchParams }});
        },
    },
    /**
     * 功能：从源获取数据的方法
     *
     * 语义是订阅，用于订阅一个数据源，然后根据条件 dispatch(调用) 需要的 action(方法)。
     * 数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等
     */
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/user') {
                    dispatch({type:'getListData',payload:{ }});
                }
            });
        },
    },
};
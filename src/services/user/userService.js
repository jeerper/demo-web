import request from '@/utils/request';
import * as config from '@/config/commonConfig';

/**
 * 创建对象
 * @param data 对象
 */
export function createObject(data){
    return request('post',`${config.user_api.createObject}`,data.values,false);
}

/**
 * 删除对象
 * @param ids 对象ID，多个以逗号隔开
 */
export function deleteObject(ids){
    return request('post',`${config.user_api.deleteObject}`,{ ids },false);
}

/**
 * 更新对象
 * @param data 对象
 */
export function updateObject(data){
    return request('post',`${config.user_api.updateObject}`,data.values,false);
}

/**
 * 根据ID查询对象
 * @param id 对象ID
 */
export function getObjectById(id){
    return request('get',`${config.user_api.getObjectById}`,{ id },false);
}

/**
 *
 * @param pageIndex
 * @param pageSize
 * @param params
 */
export function getListData({pageIndex,pageSize = config.PAGE_SIZE,params}){
    return request('get',`${config.user_api.getListData}`,{pageIndex,pageSize,...params},false);
}



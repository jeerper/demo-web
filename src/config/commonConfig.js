const API = 'http://localhost:1111';
const config = {
    name: '三维BIM协同管理平台',
    prefix: 'bim',
    footerText: '三维BIM协同管理平台 © 2017 create by szewec',
    PAGE_SIZE: 5,
    /** 定义用户请求后台的url */
    user_api: {
        createObject: `${API}/user/posts`,
        deleteObject: `${API}/user/deletes`,
        updateObject: `${API}/user/update-by-id`,
        getObjectById:`${API}/user/gets-by-id`,
        getListData:  `${API}/user/gets`,
    },
};
export default config;

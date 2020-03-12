import {SAVE_USERINFO,CLEAR_USERINFO} from './mutations-type'
export default {
    [SAVE_USERINFO](state,userinfo){
        state.userinfo = userinfo
        sessionStorage.setItem('userinfo',JSON.stringify(userinfo))
    },
    [CLEAR_USERINFO](state){
        state.userinfo = ''
    }
}
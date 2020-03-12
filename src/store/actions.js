import { SAVE_USERINFO, CLEAR_USERINFO } from './mutations-type'
export default {
    'save_userinfo'({ commit }, userinfo) {
        commit(SAVE_USERINFO, userinfo)
    },
    'clear_userinfo'({ commit }) {
        commit(CLEAR_USERINFO)
        sessionStorage.removeItem('userinfo')
    }
}
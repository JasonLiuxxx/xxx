import http from './http'

export const login = (params) => http('/mp/v1_0/authorizations',params,'post')
export const checkLogin = (params) => http('/mp/v1_0/user/profile',params,'get')
export const getAllChannels = (params) => http('/mp/v1_0/channels',params,'get')
export const getTableData = (params) => http('/mp/v1_0/articles',params,'get')
export const deleteTableData = (params) => http(`/mp/v1_0/articles/${params}`,params,'delete')
export const submitPublish = (params) => http("/mp/v1_0/articles",params,'post')
export const getMedia = (params) => http("/mp/v1_0/user/images",params,'get')
export const deleteMedia = (params) => http(`/mp/v1_0/user/images/${params}`,params,'delete')
export const updatedMediaStatus= (params) => http(`/mp/v1_0/user/images/${params.id}`,{collect: params.collect},'put')
export const getFollowers = (params) => http("/mp/v1_0/statistics/followers",params,'get')

export const updatePhoto = (params) => http("/mp/v1_0/user/photo",params,'patch')
export const updateProfile = (params) => http("/mp/v1_0/user/profile",params,'patch')
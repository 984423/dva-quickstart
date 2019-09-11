import request from '../utils/request';
import qs from "qs";

export function query() {
  return request('/api/users');
}

export async function APPlist(query) {
  const queryString = qs.stringify(query);
  return request(`/mock/appListData?${queryString}`,{
    method:"GET"
  })
}

export async function APPRecomendData(query) {
  const queryString = qs.stringify(query);
  return request(`/mock/recomendData?${queryString}`,{
    method:"GET"
  })
}

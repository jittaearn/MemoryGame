import { RawAxiosRequestHeaders } from 'axios'

import { RequestConfig } from './interface/RequestConfig'

const makeRequestHeader = async (config?: RequestConfig) => {
  let headers: RawAxiosRequestHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  if (config?.headers) {
    headers = { ...headers, ...config.headers }
  }

  if (config?.accessToken) {
    headers.Authorization = config.accessToken
  }

  if (config?.lang) {
    headers['Accept-Language'] = config.lang === 'th' ? 'th' : 'en'
  }

  return headers
}

export default makeRequestHeader

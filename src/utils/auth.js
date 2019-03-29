import Cookies from 'js-cookie'

const TokenKey = 'merchantId'

export function getToken() {
  return Cookies.get('token_pfyAdmin')

}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove('token_pfyAdmin')
}

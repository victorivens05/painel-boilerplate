import { createSimpleStore } from 'react-simple-reducer'
import * as jwtDecode from 'jwt-decode'
import { createSelector } from 'reselect'

const TOKEN_KEY = 'token'

const token = localStorage.getItem(TOKEN_KEY) || null
const GlobalStore = createSimpleStore({
  token
}, {
  setToken (state, token: string) {
    state.token = token
    localStorage.setItem(TOKEN_KEY, token)
  },
  clearToken (state) {
    state.token = null
    localStorage.removeItem(TOKEN_KEY)
  }
})

type IState = ReturnType<typeof GlobalStore.useState>

const selectUsuarioLogado = createSelector(
  (s: IState) => s.token,
  token => {
    if (!token) return null
    const decodedToken = jwtDecode(token)
    const now = Date.now().valueOf() / 1000
    if (!decodedToken || !decodedToken.exp || decodedToken.exp < now) return null
    return decodedToken
  }
)

export {
  GlobalStore,
  selectUsuarioLogado,
}

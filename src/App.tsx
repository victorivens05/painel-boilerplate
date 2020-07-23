import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect
} from 'react-router-dom'
import { Login } from './Login'
import { GlobalStore } from './GlobalStore'
import "antd/dist/antd.css"
import Axios from 'axios'

function App () {
  return (
    <GlobalStore.Provider>
      <ConfigureAxios />
      <Router>
        <Switch>
          <Route path="/login"><Login /></Route>
          <Route path="/"><Redirect to="/login" /></Route>
        </Switch>
      </Router>
    </GlobalStore.Provider>
  )
}

const ConfigureAxios = () => {
  const { token } = GlobalStore.useState()
  const history = useHistory()

  useEffect(() => {
    Axios.defaults.baseURL = process.env.REACT_APP_API_URL
  }, [])

  useEffect(() => {
    if (token) {
      Axios.defaults.headers['Authorization'] = `Bearer ${token}`
    } else {
      Axios.defaults.headers['Authorization'] = null
    }
  }, [token])
  useEffect(() => {
    Axios.interceptors.response.use(response => response, error => {
      if (error.response?.status === 401) history.replace(`/`)
      return Promise.reject(error)
    })
  }, [history])
  return null
}

export default App

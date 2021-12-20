import PropTypes from 'prop-types'
import React, { useEffect } from "react"

import { isEmpty } from 'lodash'

import { Switch, BrowserRouter as Router } from "react-router-dom"
import { connect, useDispatch, useSelector } from "react-redux"

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes"

// Import all middleware
import AuthMiddleware from "./routes/middleware/Authmiddleware"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"
import { profileRequest } from './store/actions'
import httpServices from './services/httpServices'
import { apiGetUsers } from './services/apiFunction/Authen'


const App = () => {
  const user = useSelector((state) => state.Login)
  const [auth, setAuth] = React.useState([])
  const layout = useSelector((state) => state.Layout)
  function getLayout() {
    let layoutCls = VerticalLayout

    switch (layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  const Layout = getLayout()
  useEffect(() => { localStorage.removeItem("updated") }, [])

  const CallListUser = (u) => {
    apiGetUsers().then(res => {
      return res?.data?.data
    })
      .then(data => {
        const roleUser = data?.find(item => item?.username === u)?.roles
        setAuth(roleUser)
      })
  }
  const username = localStorage.getItem("username")

  React.useEffect(() => {
    if (!isEmpty(username)) {
      CallListUser(username)
    }
  }, [username, localStorage.getItem("updated")])

  // useEffect(() => {
  //   if (user?.data?.token || localStorage.getItem("authUser") != null) {
  //     httpServices.attachTokenToHeader(localStorage.getItem("authUser"))
  //     console.log(localStorage.getItem("authUser"), "TokenAppp")
  //     // dispatch(profileRequest());
  //   }
  // }, [user])

  return (
    <React.Fragment>
      <Router>

        <Switch>
          {authRoutes.map((route, idx) => (
            <AuthMiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
            />
          ))}

          {userRoutes.map((route, idx) => (
            <AuthMiddleware
              path={route.path}
              layout={Layout}
              component={auth?.includes(route.role) ? route.component : route?.not}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>

      </Router>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any
}

// const mapStateToProps = state => {
//   return {
//     layout: state.Layout,
//   }
// }

// export default connect(mapStateToProps, null)(App)
export default App
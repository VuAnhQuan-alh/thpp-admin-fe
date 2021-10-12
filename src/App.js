import PropTypes from 'prop-types'
import React, { useEffect } from "react"

import { Switch, BrowserRouter as Router } from "react-router-dom"
import { connect, useDispatch, useSelector } from "react-redux"

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes"

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"
import { profileRequest } from './store/actions'
import httpServices from './services/httpServices'


const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Login)
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


  useEffect(() => {
    if (user?.data?.token || localStorage.getItem("authUser") != null) {
      httpServices.attachTokenToHeader(localStorage.getItem("authUser"))
      // dispatch(profileRequest());
    }
  }, [user])

  return (
    <React.Fragment>
      <Router>

        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
            />
          ))}

          {userRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
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
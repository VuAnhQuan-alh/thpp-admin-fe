import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"
import httpServices from "../../services/httpServices"

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => {
  const user = useSelector((state) => state.Login)
  if (localStorage.getItem("authUser") !== null) {
    httpServices.attachTokenToHeader(localStorage.getItem("authUser"))
    console.log("userAth", localStorage.getItem("authUser"))
  }
  return (
    <Route
      render={props => {
        if (isAuthProtected && localStorage.getItem("authUser") == null) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
        if (!isAuthProtected && localStorage.getItem("authUser") !== null) {
          return (
            <Redirect
              to={{ pathname: "/", state: { from: props.location } }}
            />
          )
        }
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        )
      }}
    />
  )
}

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}

export default Authmiddleware

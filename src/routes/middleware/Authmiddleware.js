import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => {
  const user = useSelector((state) => state.Login)
  console.log("user", user)
  return (
    <Route
      // {...rest}

      render={props => {

        if (isAuthProtected && !localStorage.getItem("authUser") && !user?.data?.token) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
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

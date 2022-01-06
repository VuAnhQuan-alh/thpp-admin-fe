// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation"
import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react"
// Redux
import { connect, useDispatch, useSelector } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { Alert, Col, Container, Row } from "reactstrap"
// import images
import logo from "../../assets/images/logo-sm-dark.png"
// actions
import { apiError, loginUser } from "../../store/actions"
import { Field, Form, Formik } from "formik";
import InputField from "../../components/InputField";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Login)
  const [loginChange, setLoginChange] = useState(false)
  useEffect(() => {
    localStorage.removeItem("username")
    document.body.className = "authentication-bg";
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = "";
    };
  }, []);

  // useEffect(() => {
  //   const checkLogin = localStorage.getItem("login")
  //   console.log(checkLogin)
  // }, [loginChange])

  if (user?.data?.token) {
    console.log("user", user)
    return <Redirect to="/" />;
  }


  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div className="card overflow-hidden">
                <div className="bg-login text-center">
                  <div className="bg-login-overlay"></div>
                  <div className="position-relative">
                    <h5 className="text-white font-size-20">Welcome Back !</h5>
                    <p className="text-white-50 mb-0">Sign in to continue to Qovex.</p>
                    <Link to="/" className="logo logo-admin mt-4">
                      <img src={logo} alt="" height="30" />
                    </Link>
                  </div>
                </div>
                <div className="card-body pt-5">
                  <div className="p-2">
                    <Formik
                      initialValues={{
                        username: "",
                        password: ""
                      }}
                      onSubmit={(values) => {
                        dispatch(loginUser(values))
                      }}
                    >
                      {({ }) => (
                        <Form>
                          <Field
                            component={InputField}
                            name="username"
                            label="Tài khoản"
                          />

                          <Field
                            component={InputField}
                            name="password"
                            label="Mật khẩu"
                            type="password"
                          />
                          <div className="mt-3">
                            <button
                              className="btn btn-primary w-100 waves-effect waves-light"
                              type="submit"
                            >
                              Log In
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>

                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
                <p>Don't have an account ? <Link to="/register"
                  className="fw-medium text-primary"> Signup now </Link> </p>
                <p>© {new Date().getFullYear()} Qovex. Crafted with <i
                  className="mdi mdi-heart text-danger"></i> by Themesbrand
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError })(Login)
)

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
}
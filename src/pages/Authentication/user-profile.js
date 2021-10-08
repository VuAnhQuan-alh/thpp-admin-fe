// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation"
import PropTypes from 'prop-types'
import React, { useState } from "react"
// Redux
import { connect, useSelector } from "react-redux"
import { withRouter } from "react-router-dom"
import {
  Alert, Button, Card, CardBody, Col, Row
} from "reactstrap"
import avatar from "../../assets/images/users/avatar-1.jpg"
//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"





const UserProfile = props => {
  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [idx, setidx] = useState(1)
  const useProfile = useSelector((state) => state.Profile)
  // console.log("UserProfile", useProfile)
  const { resetProfileFlag } = props;

  function handleValidSubmit(event, values) {
    props.editProfile(values)
  }


  return (
    <React.Fragment>
      <div className="page-content">

        {/* Render Breadcrumb */}
        <Breadcrumb title="Qovex" breadcrumbItem="Profile" />

        <Row>
          <Col lg="12">
            {/* {props.error && props.error ? (
              <Alert color="danger">{props.error}</Alert>
            ) : null}
            {props.success && props.success ? (
              <Alert color="success">{props.success}</Alert>
            ) : null} */}

            <Card>
              <CardBody>
                <div className="d-flex">
                  <div className="ms-3">
                    <img
                      src={avatar}
                      alt=""
                      className="avatar-md rounded-circle img-thumbnail"
                    />
                  </div>
                  <div className="flex-1 align-self-center">
                    <div className="text-muted">
                      <h5>{name}</h5>
                      <p className="mb-1">{email}</p>
                      <p className="mb-0">Id no: #{idx}</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <h4 className="card-title mb-4">Change User Name</h4>

        <Card>
          <CardBody>
            <AvForm
              className="form-horizontal"
              onValidSubmit={(e, v) => {
                handleValidSubmit(e, v)
              }}
            >
              <div className="form-group">
                <AvField
                  name="username"
                  label="User Name"
                  value={name}
                  className="form-control"
                  placeholder="Enter User Name"
                  type="text"
                  required
                />
                <AvField name="idx" value={idx} type="hidden" />
              </div>
              <div className="text-center mt-4">
                <Button type="submit" color="danger">
                  Edit User Name
                </Button>
              </div>
            </AvForm>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  )
}

UserProfile.propTypes = {
  editProfile: PropTypes.func,
  error: PropTypes.any,
  success: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, { editProfile, resetProfileFlag })(UserProfile)
)

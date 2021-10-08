import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Row, Col, Collapse } from "reactstrap"
import { Link, withRouter } from "react-router-dom"
import classname from "classnames"

//i18n
import { withTranslation } from "react-i18next"

import { connect } from "react-redux"

const Navbar = props => {
  const [dashboard, setdashboard] = useState(false)
  const [ui, setui] = useState(false)
  const [app, setapp] = useState(false)
  const [email, setemail] = useState(false)
  const [task, settask] = useState(false)
  const [component, setcomponent] = useState(false)
  const [form, setform] = useState(false)
  const [table, settable] = useState(false)
  const [chart, setchart] = useState(false)
  const [icon, seticon] = useState(false)
  const [map, setmap] = useState(false)
  const [extra, setextra] = useState(false)

  useEffect(() => {
    var matchingMenuItem = null
    var ul = document.getElementById("navigation")
    var items = ul.getElementsByTagName("a")
    for (var i = 0; i < items.length; ++i) {
      if (props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  })
  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    if (parent) {
      parent.classList.add("active") // li
      const parent2 = parent.parentElement
      parent2.classList.add("active") // li
      const parent3 = parent2.parentElement
      if (parent3) {
        parent3.classList.add("active") // li
        const parent4 = parent3.parentElement
        if (parent4) {
          parent4.classList.add("active") // li
          const parent5 = parent4.parentElement
          if (parent5) {
            parent5.classList.add("active") // li
            const parent6 = parent5.parentElement
            if (parent6) {
              parent6.classList.add("active") // li
            }
          }
        }
      }
    }
    return false
  }

  return (
    <React.Fragment>
      <div className="topnav">
        <nav
          className="navbar navbar-light navbar-expand-lg topnav-menu"
          id="navigation"
        >
          <Collapse
            isOpen={props.leftMenu}
            className="navbar-collapse"
            id="topnav-menu-content"
          >
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle arrow-none"
                  onClick={e => {
                    e.preventDefault()
                    setdashboard(!dashboard)
                  }}
                  to="dashboard"
                >
                  {props.t("Dashboard")}{" "}<div className="arrow-down"></div>
                </Link>
                <div
                  className={classname("dropdown-menu", { show: dashboard })}
                >
                  <Link to="/dashboard" className="dropdown-item">
                    {props.t("Dashboard")} 1
                    </Link>
                  <Link to="/dashboard2" className="dropdown-item">
                    {props.t("Dashboard")} 2
                    </Link>
                </div>
              </li>

              <li className="nav-item dropdown">
                <Link
                  to="/#"
                  onClick={e => {
                    e.preventDefault()
                    setapp(!app)
                  }}
                  className="nav-link dropdown-togglez arrow-none"
                >
                  {props.t("Apps")} <div className="arrow-down"></div>
                </Link>
                <div className={classname("dropdown-menu", { show: app })}>
                  <Link to="calendar" className="dropdown-item">
                    {props.t("Calendar")}
                  </Link>
                  <div className="dropdown">
                    <Link
                      to="/#"
                      className="dropdown-item dropdown-toggle arrow-none"
                      onClick={e => {
                        e.preventDefault()
                        setemail(!email)
                      }}
                    >
                      {props.t("Email")} <div className="arrow-down"></div>
                    </Link>
                    <div
                      className={classname("dropdown-menu", { show: email })}
                    >
                      <Link to="email-inbox" className="dropdown-item">
                        {props.t("Inbox")}
                      </Link>
                      <Link to="email-read" className="dropdown-item">
                        {props.t("Read Email")}
                      </Link>
                    </div>
                  </div>


                  <div className="dropdown">
                    <Link
                      to="/#"
                      className="dropdown-item dropdown-toggle arrow-none"
                      onClick={e => {
                        e.preventDefault()
                        settask(!task)
                      }}
                    >
                      {props.t("Tasks")} <div className="arrow-down"></div>
                    </Link>
                    <div
                      className={classname("dropdown-menu", { show: task })}
                    >
                      <Link to="/tasks-list" className="dropdown-item">
                        {props.t("Task List")}
                      </Link>
                      <Link to="/tasks-kanban" className="dropdown-item">
                        {props.t("Kanban Board")}
                      </Link>
                      <Link to="/tasks-create" className="dropdown-item">
                        {props.t("Create Task")}
                      </Link>
                    </div>
                  </div>

                </div>
              </li>
            </ul>
          </Collapse>
        </nav>
      </div>
    </React.Fragment>
  )
}

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout
  return { leftMenu }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Navbar))
)
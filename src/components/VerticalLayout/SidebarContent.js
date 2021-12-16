import PropTypes from "prop-types"
import React, { useEffect, useRef, useCallback, useState } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import { apiGetUsers } from "../../services/apiFunction/Authen"
import { checkKeyNull } from "../../helpers/functions"

const SidebarContent = props => {
  const [dataUser, setDataUser] = useState([])
  const ref = useRef()
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }
    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement
      if (parent2) {
        parent2.classList.add("mm-show") // ul tag
        const parent3 = parent2.parentElement // li tag
        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false
    }
    scrollElement(item);
    return false
  }, []);
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname
    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName.includes(items[i].pathname)) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname, activateParentDropdown])
  useEffect(() => {
    ref.current.recalculate()
  }, []);
  const scrollElement = (item) => {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  const listMenuAdmin = [
    {
      role: "ADMINISTRATION",
      item: <Link to="/Quan-tri">{props.t("Quản trị")}</Link>
    },
    {
      role: "SALES_REPORT",
      item: <Link to="/Bao-cao-doanh-thu">{props.t("Báo cáo doanh thu")}</Link>
    },
    {
      role: "TRANSACTION_CONTROL",
      item: <Link to="/Danh-sach-giao-dich">{props.t("Danh sách giao dịch")}</Link>
    },
    {
      role: "TRANSACTION_LIST",
      item: <Link to="/Doi-soat-giao-dich">{props.t("Đối soát giao dịch")}</Link>
    }
  ]
  const CallListUser = () => {
    apiGetUsers(checkKeyNull()).then(res => {
      return res?.data?.data
    })
      .then(data => {
        const user = localStorage.getItem("username")
        const roles = data?.find(item => item?.username === user)?.roles
        const menuUser = listMenuAdmin.filter(item => roles.some(role => role === item.role))
        setDataUser(menuUser)
      })
  }
  useEffect(() => {
    CallListUser()
  }, [])
  return (
    <React.Fragment>
      <SimpleBar ref={ref} className="vertical-simplebar">
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li><Link to="/Doi-soat-giao-dich">{props.t("Đối soát giao dịch")}</Link></li>
            <li><Link to="/Danh-sach-giao-dich">{props.t("Danh sách giao dịch")}</Link></li>
            <li><Link to="/Bao-cao-doanh-thu">{props.t("Báo cáo doanh thu")}</Link></li>
            <li><Link to="/Quan-tri">{props.t("Quản trị")}</Link></li>
            <li className="menu-title">{props.t("Menu")} </li>
            {dataUser.map((i, idx) => <li key={idx}>{i.item}</li>)}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
import React from "react";
import { Link } from "react-router-dom";

export const LeftPanel = (props) => {
  return (
    <aside id="left-panel" className="left-panel">
      <nav className="navbar navbar-expand-sm navbar-default">
        <div id="main-menu" className="main-menu collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li className={props.active === "dashboard" ? "active" : ""}>
              <Link to="/dashboard">
                <i className="menu-icon fa fa-laptop" />
                Dashboard{" "}
              </Link>
            </li>
            <li className="menu-title">Admin Panel</li>
            {/* /.menu-title */}
            <li className="menu-item-has-children dropdown">
              <Link to="/students">
                {" "}
                <i className="menu-icon fa fa-cogs" />
                Students
              </Link>
              <ul className="sub-menu children dropdown-menu">
                {" "}
                <li>
                  <i className="fa fa-puzzle-piece" />
                  <a href="ui-buttons.html">Buttons</a>
                </li>
                <li>
                  <i className="fa fa-id-badge" />
                  <a href="ui-badges.html">Badges</a>
                </li>
                <li>
                  <i className="fa fa-bars" />
                  <a href="ui-tabs.html">Tabs</a>
                </li>
                <li>
                  <i className="fa fa-id-card-o" />
                  <a href="ui-cards.html">Cards</a>
                </li>
                <li>
                  <i className="fa fa-exclamation-triangle" />
                  <a href="ui-alerts.html">Alerts</a>
                </li>
                <li>
                  <i className="fa fa-spinner" />
                  <a href="ui-progressbar.html">Progress Bars</a>
                </li>
                <li>
                  <i className="fa fa-fire" />
                  <a href="ui-modals.html">Modals</a>
                </li>
                <li>
                  <i className="fa fa-book" />
                  <a href="ui-switches.html">Switches</a>
                </li>
                <li>
                  <i className="fa fa-th" />
                  <a href="ui-grids.html">Grids</a>
                </li>
                <li>
                  <i className="fa fa-file-word-o" />
                  <a href="ui-typgraphy.html">Typography</a>
                </li>
              </ul>
            </li>
            <li className={props.active === "billing" ? "active" : ""}>
              <Link to="/invoice">
                {" "}
                <i className="menu-icon fa fa-table" />
                Billing
              </Link>
              <ul className="sub-menu children dropdown-menu">
                <li>
                  <i className="fa fa-table" />
                  <a href="tables-basic.html">Basic Table</a>
                </li>
                <li>
                  <i className="fa fa-table" />
                  <a href="tables-data.html">Data Table</a>
                </li>
              </ul>
            </li>
            <li className={props.active === "result" ? "active" : ""}>
              <Link
                to="/result"
                className="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {" "}
                <i className="menu-icon fa fa-th" />
                Result
              </Link>
              <ul className="sub-menu children dropdown-menu">
                <li>
                  <i className="menu-icon fa fa-th" />
                  <a href="forms-basic.html">Basic Form</a>
                </li>
                <li>
                  <i className="menu-icon fa fa-th" />
                  <a href="forms-advanced.html">Advanced Form</a>
                </li>
              </ul>
            </li>
            <li className={props.active === "subject" ? "active" : ""}>
              <Link to="/subjects">
                {" "}
                <i className="menu-icon fa fa-table" />
                Subjects
              </Link>
              <ul className="sub-menu children dropdown-menu">
                <li>
                  <i className="fa fa-table" />
                  <a href="tables-basic.html">Basic Table</a>
                </li>
                <li>
                  <i className="fa fa-table" />
                  <a href="tables-data.html">Data Table</a>
                </li>
              </ul>
            </li>
            <li className={props.active === "settings" ? "active" : ""}>
              <Link to="/settings">
                {" "}
                <i className="menu-icon fa fa-cog" />
                Settings
              </Link>
            </li>
            {/* <li className="menu-title">Icons</li>
                        <li className="menu-item-has-children dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-tasks" />Icons</a>
                            <ul className="sub-menu children dropdown-menu">
                                <li><i className="menu-icon fa fa-fort-awesome" /><a href="font-fontawesome.html">Font Awesome</a></li>
                                <li><i className="menu-icon ti-themify-logo" /><a href="font-themify.html">Themefy Icons</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="widgets.html"> <i className="menu-icon ti-email" />Widgets </a>
                        </li>
                        <li className="menu-item-has-children dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-bar-chart" />Charts</a>
                            <ul className="sub-menu children dropdown-menu">
                                <li><i className="menu-icon fa fa-line-chart" /><a href="charts-chartjs.html">Chart JS</a></li>
                                <li><i className="menu-icon fa fa-area-chart" /><a href="charts-flot.html">Flot Chart</a></li>
                                <li><i className="menu-icon fa fa-pie-chart" /><a href="charts-peity.html">Peity Chart</a></li>
                            </ul>
                        </li>
                        <li className="menu-item-has-children dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-area-chart" />Maps</a>
                            <ul className="sub-menu children dropdown-menu">
                                <li><i className="menu-icon fa fa-map-o" /><a href="maps-gmap.html">Google Maps</a></li>
                                <li><i className="menu-icon fa fa-street-view" /><a href="maps-vector.html">Vector Maps</a></li>
                            </ul>
                        </li>
                        <li className="menu-title">Extras</li>
                        <li className="menu-item-has-children dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-glass" />Pages</a>
                            <ul className="sub-menu children dropdown-menu">
                                <li><i className="menu-icon fa fa-sign-in" /><a href="page-login.html">Login</a></li>
                                <li><i className="menu-icon fa fa-sign-in" /><a href="page-register.html">Register</a></li>
                                <li><i className="menu-icon fa fa-paper-plane" /><a href="pages-forget.html">Forget Pass</a></li>
                            </ul>
                        </li> */}
          </ul>
        </div>
        {/* /.navbar-collapse */}
      </nav>
    </aside>
  );
};

import React from 'react';
import logo from './../../../images/logo.png';
import './header.css';

export class Header extends React.Component {
    constructor() {
        super();
      
    }

    clickHandler=()=>{
        this.props.sidebar();
    }
    render() {

        return (
            <header id="header" className="header">
                <div className="top-left">
                    <div className="navbar-header">
                        {/* <img className="user-avatar rounded-circle" src={logo} alt="User Avatar" /> */}
                        {/* <a className="navbar-brand logo" href="./"><img  className="logo" src={logo} alt="Logo" /></a> */}
                        <a onClick={this.clickHandler} id="menuToggle" className="menutoggle"><i className="fa fa-bars" /></a>
                    </div>
                </div>
                <div className="top-right">
                    <div className="header-menu">
                        <div className="header-left">
                            <button className="search-trigger"><i className="fa fa-search" /></button>
                            <div className="form-inline">
                                <form className="search-form">
                                    <input className="form-control mr-sm-2" type="text" placeholder="Search ..." aria-label="Search" />
                                    <button className="search-close" type="submit"><i className="fa fa-close" /></button>
                                </form>
                            </div>


                        </div>
                        <div className="user-area dropdown float-right">
                            <a href="#" className="dropdown-toggle active" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img className="user-avatar rounded-circle" src={logo} alt="User Avatar" />
                            </a>
                            <div className="user-menu dropdown-menu">
                                <a className="nav-link" href="#"><i className="fa fa- user" />My Profile</a>
                                <a className="nav-link" href="#"><i className="fa fa- user" />Notifications <span className="count">13</span></a>
                                <a className="nav-link" href="#"><i className="fa fa -cog" />Settings</a>
                                <a className="nav-link" href="#"><i className="fa fa-power -off" />Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }

}


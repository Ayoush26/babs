import React from 'react';
import { LeftPanel } from './../common/leftPanel/leftPanel';
import { Header } from './../common/header/header';
import { PrintBill } from './../printBill/printBill';


export class ViewBill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    changeSidebar = () => {
        this.setState(preState => {
            return {
                isOpen: !preState.isOpen
            }
        })
    }
    render() {
        return <>
            <div className={this.state.isOpen?'open':''}>
                <LeftPanel></LeftPanel>
                <div id="right-panel" className="right-panel">
                    <Header sidebar={this.changeSidebar} ></Header>
                    <PrintBill view={true}></PrintBill>
                </div>
            </div>
        </>
    }
}
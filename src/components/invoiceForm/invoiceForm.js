import React from 'react';
import { LeftPanel } from './../common/leftPanel/leftPanel';
import { Header } from './../common/header/header';
import { Invoice } from '../invoice/invoice';

export class InvoiceForm extends React.Component {
    constructor() {
        super();
        this.state={
            isOpen: false
        }
    }
    changeSidebar=()=>{
        this.setState(preState=>{
            return{
                isOpen: !preState.isOpen
            }
        })
    }
    render() {
        return (
            <>
                <div className={this.state.isOpen?'open':''}>
                    <LeftPanel active={'billing'}></LeftPanel>
                    <div id="right-panel" className="right-panel">
                        <Header sidebar={this.changeSidebar}></Header>
                        <div className="content">
                            <Invoice></Invoice>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
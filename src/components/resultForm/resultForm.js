import React from 'react';
import { LeftPanel } from '../common/leftPanel/leftPanel';
import { Form } from '../forms/forms';
import { Header } from './../common/header/header';


export class resultForm extends React.Component {
    constructor(){
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
    render(){
        return (
            <>
                <div className={this.state.isOpen?'open':''}>
                    <LeftPanel active={'result'}></LeftPanel>
                    <div id="right-panel" className="right-panel">
                        <Header  sidebar={this.changeSidebar} isOpen={this.state.isOpen}></Header>
                        <Form></Form>
                    </div>
                </div>
            </>
        )
    }
}
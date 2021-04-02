import React from 'react';
import { LeftPanel } from './../common/leftPanel/leftPanel';
import { Header } from './../common/header/header';
import { ResultCard } from '../resultCard/resultCard';


export class ViewResult extends React.Component {
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
                    <LeftPanel></LeftPanel>
                    <div id="right-panel" className="right-panel">
                        <Header sidebar={this.changeSidebar}></Header>
                        <div className="content">
                            <ResultCard view={true}></ResultCard>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
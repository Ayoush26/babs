import React from 'react';
import { LeftPanel } from '../common/leftPanel/leftPanel';
import { RightPanel } from '../common/rightPanel/rightPanel';

export class dashboard extends React.Component{
   constructor(){
       super();
       this.state={
           isOpen: false
       }
   }
   changeSidebar=()=>{
       this.setState((preState)=>{
            return{
                isOpen: !preState.isOpen
            }
       })
   }
   render(){
       let result;
        this.props.location.search==='?result=true'?result=true: result=false;
    return(
        <div className={this.state.isOpen?'open':''}>
         <LeftPanel active={'dashboard'}></LeftPanel>
        <RightPanel result={result?true:false} changeSidebar={this.changeSidebar} ></RightPanel>
        </div>
     )
   }
}
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
       let result='';
        if(this.props.location.search==='?result=true'){
            result = 'result'
        }else if(this.props.location.search==='?marksheet=true'){
            result = 'marksheet'
        }
    return(
        <div className={this.state.isOpen?'open':''}>
         <LeftPanel active={'dashboard'}></LeftPanel>
        <RightPanel result={result} changeSidebar={this.changeSidebar} ></RightPanel>
        </div>
     )
   }
}
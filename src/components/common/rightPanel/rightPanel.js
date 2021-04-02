import React from 'react';
import { Result } from '../../result/result';
import { Transaction } from '../../transaction/transaction';
import { Header } from '../header/header';

export class RightPanel extends React.Component {
    constructor(){
      super();
      this.state={
        isTransaction: true
      }
    }
    handleTransaction=()=>{
      this.setState({
        isTransaction:true
      })
    }
    handleResult=()=>{
      this.setState({
        isTransaction:false
      })
    }

    componentDidMount(){
      if(this.props.result){
        this.setState({
          isTransaction:false
        })
      }
    }

    render(){
      let activebutton = 'btn-primary active';
      return (
        <div id="right-panel" className="right-panel">
            <Header sidebar={this.props.changeSidebar} ></Header>
            <div className="content">
              <button onClick= {this.handleTransaction} className={`btn m-1 ${this.state.isTransaction?activebutton:null}`} >Transactions</button>
              <button onClick= {this.handleResult} className={`btn m-1 ${this.state.isTransaction?null:activebutton}`}>Result</button>
              {this.state.isTransaction?<Transaction></Transaction>:<Result></Result>}
            </div>
        </div>
      )
    }
}
import React from 'react';
import { Result } from '../../result/result';
import { Transaction } from '../../transaction/transaction';
import { Header } from '../header/header';
import { Marksheet } from './../../marksheet/marksheet';


export class RightPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      component: 'transaction'
    }
  }
  handleTransaction = () => {
    this.setState({
      component: 'transaction'
    })
  }
  handleResult = () => {
    this.setState({
      component: 'result'
    })
  }
  handleMarksheet = () => {
    this.setState({
      component: 'marksheet'
    })
  }

  componentDidMount() {
    if (this.props.result==='result') {
      this.setState({
        component: 'result'
      })
    }
    else if(this.props.result === 'marksheet') {
      this.setState({
        component: 'marksheet'
      })
    }
  }

  render() {
    let activebutton = 'btn-primary active';
    let component = this.state.component;
    switch (component) {
      // case 'result':
      //   component = (<Result></Result>)
      //   break;
      // case 'transaction':
      //   component = (<Transaction></Transaction>)
      //   break;
      default:
        component = (<Marksheet></Marksheet>)
    }
    return (
      <div id="right-panel" className="right-panel">
        <Header sidebar={this.props.changeSidebar} ></Header>
        <div className="content">
          {/* <button onClick={this.handleTransaction} className={`btn m-1 ${this.state.component === 'transaction' ? activebutton : null}`} >Transactions</button>
          <button onClick={this.handleResult} className={`btn m-1 ${this.state.component === 'result' ? activebutton : null}`}>Result</button> */}
          <button onClick={this.handleMarksheet} className={`btn m-1 ${ activebutton}`}>Marksheet</button>
          {component}
        </div>
      </div>
    )
  }
}
import React from 'react';
import Axios from 'axios';
import { Loader } from '../common/loader/loader';
import { withRouter } from 'react-router-dom';
import { util } from './../../util/moment';

class TransactionWithoutRouter extends React.Component {
    constructor() {
        super();
        this.state = {
            transactions: [],
            isLoading: false
        }
    }

    componentDidMount() {
        this.setState(prevState => {
            return {
                isLoading: !prevState.isLoading
            }
        }, () => {
            Axios.get(`${ process.env.REACT_APP_HOST}/bill`)
                .then(data => {
                    const transactions = data.data.data;
                    this.setState({
                        transactions
                    })

                }).catch(err => {
                    console.log(err.response)
                }).finally(()=>{
                    this.setState((prevState)=>{
                        return {
                            isLoading: !prevState.isLoading
                        }
                    })
                })
        })
    }

    handleClick = (id)=>{
        this.props.history.push(`/bill/${id}`);
    }

    handlePrint = (id)=> {
        this.props.history.push(`/print/${id}`)
    }
    render() {

        const tableContent = this.state.transactions.map((transaction, index) => {
            return (<tr key={transaction._id}>
                <td className="serial">{index + 1}</td>
                <td className="avatar">
                    #{transaction.BillNo}
                </td>
                <td>{transaction.Name} </td>
                <td>  <span className="name">Rs {transaction.Total}</span> </td>
                <td> <span className="product">Rs {transaction.Total - transaction.DueAmount}</span> </td>
                <td><span className="count">Rs {transaction.DueAmount}</span></td>
                <td>{util.formatDate(transaction.createdAt)}</td>
                <td>{util.formatTime(transaction.createdAt)}</td>
                <td>
                    <span onClick={this.handleClick.bind(this,transaction._id)} className="badge badge-complete">View Details</span>
                </td>
                <td>
                    <button onClick = {this.handlePrint.bind(this,transaction._id)} className="btn btn-info">Print</button>
                </td>
            </tr>)
        })

        return (
            this.state.isLoading ?
                <Loader></Loader> :
                (<div className="orders">
                   <div className="row">
                   <div className="col-xl-4">
                           
                        </div> {/* /.col-md-4 */}
                        <div className="col-xl-4">
                            
                        </div> {/* /.col-md-4 */}
                        <div className="col-xl-4">
                        <div className="row">
                                <div className="col-lg-12 col-xl-12">
                                    <div className="card bg-flat-color-3  ">
                                        <div className="card-body">
                                            <h4 className="card-title m-0  white-color ">Today's Date: </h4>
                                        </div>
                                        <div className="card-body">
                                            <div id="flotLine5" className="flot-line" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> {/* /.col-md-4 */}
                   </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="box-title">Transaction History</h4>
                                </div>
                                <div className="card-body--">
                                    <div className="table-stats order-table ov-h">
                                        <table className="table ">
                                            <thead>
                                                <tr>
                                                    <th className="serial">SN</th>

                                                    <th>Bill No</th>
                                                    <th>Name</th>
                                                    <th>Total Amount</th>
                                                    <th>Paid Amount</th>
                                                    <th>Due Amount</th>
                                                    <th>Created At</th>
                                                    <th>Created Time</th>
                                                    <th>Details</th>
                                                    <th>More</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableContent}
                                            </tbody>
                                        </table>
                                    </div> {/* /.table-stats */}
                                </div>
                            </div> {/* /.card */}
                        </div>  {/* /.col-lg-8 */}
                        
                    </div>
                </div>)
        )
    }
}

export const Transaction = withRouter(TransactionWithoutRouter);
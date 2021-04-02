import React from 'react';
import logo from './../../images/logo.png';
import Axios from 'axios';
import './printBill.css';
import { withRouter } from 'react-router-dom';

class PrintBillWithoutRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transaction: {

            }
        }
    }
    componentDidMount() {
        if (!this.props.view) {
            // Axios.get(`http://localhost:8080/bill/first`)
            //     .then(data=>{
            //         const transaction = data.data.data;
            //         this.setState((preState)=>{
            //             return {
            //                 transaction: transaction
            //             }
            //         })
            //     })
            //     .catch(err=>console.log(err.response));
            const id = this.props.match.params.id;
            Axios.get(`${process.env.REACT_APP_HOST}/bill/${id}`)
                .then(data => {
                    const transaction = data.data.data;
                    this.setState((preState) => {
                        return {
                            transaction: transaction
                        }
                    },()=>{
                        window.print()
                    })
                }).catch(err => console.log(err.response));
            
        }
        const id = this.props.match.params.id;
        Axios.get(`${process.env.REACT_APP_HOST}/bill/${id}`)
            .then(data => {
                const transaction = data.data.data;
                this.setState((preState) => {
                    return {
                        transaction: transaction
                    }
                })
            }).catch(err => console.log(err.response));
    }
    render() {
        console.log(this.state)
        return (<div className="container">

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body p-0">
                            <h2 className="text-center p-2"><em>BUDHHA &nbsp; ADARSHA &nbsp; BOARDING &nbsp; SCHOOL</em></h2>
                            <p className="text-center p-2"> Dip Path, Dharan-9, Ph No. &nbsp; 532354</p>
                            <div className="row p-5">
                                <div className="col-md-6">
                                    <img src={logo} alt="Logo" />
                                </div>
                                <div className="col-md-6 text-right">
                                    <p className="font-weight-bold mb-1">B. No. #{this.state.transaction.BillNo}</p>
                                    <p className="text-bold">Date: 1/31/2021</p>
                                </div>
                            </div>
                            <div className="row pb-5 p-5">
                                <div className="col-md-6">
                                    <p className="mb-1">Name: {this.state.transaction.Name}</p>
                                    <br />
                                    <p className="mb-1">Class: {this.state.transaction.Class}</p>

                                </div>
                                <div className="col-md-6 text-right">

                                    <br />
                                    <br />
                                    <p>Roll No: {this.state.transaction.Roll}</p>
                                </div>
                            </div>
                            <div className="row p-5">
                                <div className="col-md-12">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="border-0 text-uppercase small font-weight-bold">SN</th>

                                                <th className="border-0 text-uppercase small font-weight-bold">Particulars</th>

                                                <th className="border-0 text-uppercase small font-weight-bold">Rs</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Admission Fee</td>
                                                <td>{this.state.transaction.Admission === 0 ? '' : this.state.transaction.Admission}</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>School Fee</td>
                                                <td>{this.state.transaction.School === 0 ? '' : this.state.transaction.School}</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Game Fee</td>
                                                <td>{this.state.transaction.Game === 0 ? '' : this.state.transaction.Game}</td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>Computer Fee</td>
                                                <td>{this.state.transaction.Computer === 0 ? '' : this.state.transaction.Computer}</td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>Stationery Fee</td>
                                                <td>{this.state.transaction.Stationery === 0 ? '' : this.state.transaction.Stationery}</td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>Maintenance Fee</td>
                                                <td>{this.state.transaction.Maintenance === 0 ? '' : this.state.transaction.Maintenance}</td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>First Aid</td>
                                                <td>{this.state.transaction.FirstAid === 0 ? '' : this.state.transaction.FirstAid}</td>
                                            </tr>
                                            <tr>
                                                <td>8</td>
                                                <td>Entertainment Fee</td>
                                                <td>{this.state.transaction.Entertainment === 0 ? '' : this.state.transaction.Entertainment}</td>
                                            </tr>
                                            <tr>
                                                <td>9</td>
                                                <td>Examination Fee({this.state.transaction.ExamType})</td>
                                                <td>{this.state.transaction.Examination === 0 ? '' : this.state.transaction.Examination}</td>
                                            </tr>
                                            <tr>
                                                <td>10</td>
                                                <td>Library Fee</td>
                                                <td>{this.state.transaction.Library === 0 ? '' : this.state.transaction.Library}</td>
                                            </tr>
                                            <tr>
                                                <td>11</td>
                                                <td>Utility</td>
                                                <td>{this.state.transaction.Utility === 0 ? '' : this.state.transaction.Utility}</td>
                                            </tr>
                                            <tr>
                                                <td>12</td>
                                                <td>Transportation</td>
                                                <td>{this.state.transaction.Transportation === 0 ? '' : this.state.transaction.Transportation}</td>
                                            </tr>
                                            <tr>
                                                <td>13</td>
                                                <td>Previous Dues</td>
                                                <td>{this.state.transaction.Dues === 0 ? '' : this.state.transaction.Dues}</td>
                                            </tr>
                                            <tr>
                                                <td>14</td>
                                                <td>MIscellaneous</td>
                                                <td>{this.state.transaction.Miscellaneous === 0 ? '' : this.state.transaction.Miscellaneous}</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td className="text-right">Total</td>
                                                <td>{this.state.transaction.Total}</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td className="text-right">Paid Amount</td>
                                                <td>{this.state.transaction.Paid}</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td className="text-right">Due Amount</td>
                                                <td>{this.state.transaction.DueAmount}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export const PrintBill = withRouter(PrintBillWithoutRouter);
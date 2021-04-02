import React from 'react';
import logo from './../../images/logo.png';
import './invoice.css';
import Axios from 'axios';
import { notify } from '../../util/notify';
import { withRouter } from 'react-router-dom';

const defaultForm = {
    Name: '',
    Class: 'Nursery',
    Roll: '',
    Admission: 0,
    School: 0,
    Game: 0,
    Computer: 0,
    Stationery: 0,
    Maintenance: 0,
    FirstAid: 0,
    Entertainment: 0,
    Examination: 0,
    ExamType: '',
    Library: 0,
    Utility: 0,
    Transportation: 0,
    Dues: 0,
    Miscellaneous: 0,
    Paid: 0,
    BillNo: 1
}

 class InvoiceWithoutRouter extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {
                ...defaultForm
            },
            isSubmitting: false,
            total: 0,
            dueAmount: 0
        }
    }

    componentDidMount(){
        Axios.get(`${process.env.REACT_APP_HOST}/bill`)
            .then(data=>{
                let BillNo = data.data.data[0].BillNo?data.data.data[0].BillNo:1;
                BillNo = Number(BillNo) + 1;
                this.setState((prevState)=>{
                    return {
                        data: {
                            ...prevState.data,
                            BillNo
                        }
                    }
                })
            })
            .catch(err=>console.log(err.response))
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState((prevState) => {
            return (
                {
                    data: {
                        ...prevState.data,
                        [name]: value
                    },
                    ...prevState.dueAmount
                }
            )
        }, () => {
            const { Admission, School, Game, Computer, Stationery, Maintenance, FirstAid, Entertainment, Examination, Library, Utility, Transportation, Dues, Miscellaneous, Paid } = this.state.data;
            const total = Number(Admission) + Number(School) + Number(Game) + Number(Computer) + Number(Stationery) + Number(Maintenance) + Number(FirstAid) + Number(Entertainment) + Number(Examination) + Number(Library) + Number(Utility) + Number(Transportation) + Number(Dues) + Number(Miscellaneous);
            let dueAmount = 0;
            if (Paid) {
                dueAmount = total - Paid;
            }
            this.setState((prevState) => {
                return {
                    data: {
                        ...prevState.data
                    },
                    total: total,
                    dueAmount: dueAmount
                }
            })
        })




    }

    handleClick = () => {
        const data = this.state.data;
        data.total = this.state.total;
        data.dueAmount = this.state.dueAmount;

        this.setState({
            isSubmitting: true
        })
        console.log(data);

        Axios.post(`${process.env.REACT_APP_HOST}/bill`,
            data,
            {
                headers: { 'Content-Type': 'application/json' },
                responseType: 'json'
            }
        ).then(data => {
            notify.success('Bill Created Succesfully');
            this.props.history.push('/dashboard');
        })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        let btn = this.state.isSubmitting ?
            <button disabled={true} className="btn btn-primary">Generating...</button> :
            <button onClick={this.handleClick} className="btn btn-primary">Generate Bill</button>
        return (
            <div className="container">

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body p-0">
                                <h2 className="text-center p-2"><em>BUDHHA &nbsp; ADARSHA &nbsp; BOARDING &nbsp; SCHOOL</em></h2>
                                <p className="text-center p-2"> Dip Path, Dharan-9, Ph No. &nbsp; 532354</p>
                                <div className="row p-5">
                                    <div className="col-md-6">
                                        <img className="logo" src={logo} alt="Logo" />
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <p className="font-weight-bold mb-1">B. No. #{this.state.data.BillNo}</p>
                                        <p className="text-bold">Date: 1/31/2021</p>
                                    </div>
                                </div>
                                <div className="row pb-5 p-5">
                                    <div className="col-md-6">
                                        <p className="mb-1">Name: <input type="text" name="Name" onChange={this.handleChange}></input></p>
                                        <br />
                                        <p className="mb-1">Class: <select onChange={this.handleChange} name="Class" >
                                            <option value="Nursery">Nursery</option>
                                            <option value="KG">KG</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </select></p>

                                    </div>
                                    <div className="col-md-6 text-right">

                                        <br />
                                        <br />
                                        <p>Roll No: <input type="number" name="Roll" onChange={this.handleChange}></input></p>
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
                                                    <td><input type="number" onChange={this.handleChange} name="Admission" ></input></td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>School Fee</td>
                                                    <td><input type="number" onChange={this.handleChange} name="School"></input></td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>Game Fee</td>
                                                    <td><input type="number" onChange={this.handleChange} name="Game"></input></td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>Computer Fee</td>
                                                    <td><input type="number" onChange={this.handleChange} name="Computer"></input></td>
                                                </tr>
                                                <tr>
                                                    <td>5</td>
                                                    <td>Stationery Fee</td>
                                                    <td><input type="number" onChange={this.handleChange} name="Stationery"></input></td>
                                                </tr>
                                                <tr>
                                                    <td>6</td>
                                                    <td>Maintenance Fee</td>
                                                    <td><input type="number" onChange={this.handleChange} name="Maintenance"></input></td>
                                                </tr>
                                                <tr>
                                                    <td>7</td>
                                                    <td>First Aid</td>
                                                    <td><input type="number" onChange={this.handleChange} name="FirstAid"></input></td>
                                                </tr>
                                                <tr>
                                                    <td>8</td>
                                                    <td>Entertainment Fee</td>
                                                    <td><input type="number" onChange={this.handleChange} name="Entertainment"></input></td>
                                                </tr>
                                                <tr>
                                                    <td>9</td>
                                                    <td>Examination Fee<select onChange={this.handleChange} name="ExamType" >
                                                        <option value=""></option>
                                                        <option value="1st">1st</option>
                                                        <option value="2nd">2nd</option>
                                                        <option value="3rd">3rd</option>
                                                        <option value="4th">4th</option>
                                                        
                                                    </select></td>
                                                    <td><input type="number" onChange={this.handleChange} name="Examination"></input></td>
                                                </tr>
                                                <tr>
                                                    <td>10</td>
                                                    <td>Library Fee</td>
                                                    <td><input type="number" onChange={this.handleChange} name="Library"></input></td>
                                                </tr>
                                                <tr>
                                                    <td>11</td>
                                                    <td>Utility</td>
                                                    <td><input type="number" onChange={this.handleChange} name="Utility"></input></td>
                                                </tr>
                                                <tr>
                                                    <td>12</td>
                                                    <td>Transportation</td>
                                                    <td><input type="number" onChange={this.handleChange} name="Transportation"></input></td>
                                                </tr>
                                                <tr>
                                                    <td>13</td>
                                                    <td>Previous Dues</td>
                                                    <td><input type="number" onChange={this.handleChange} name="Dues"></input></td>
                                                </tr>
                                                <tr>
                                                    <td>14</td>
                                                    <td>MIscellaneous</td>
                                                    <td><input type="number" onChange={this.handleChange} name="Miscellaneous"></input></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td className="text-right">Total</td>
                                                    <td>{this.state.total}</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td className="text-right">Paid Amount</td>
                                                    <td><input type="number" name="Paid" onChange={this.handleChange}></input></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td className="text-right">Due Amount</td>
                                                    <td>{this.state.dueAmount}</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td className="text-left">{btn}</td>

                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 

export const Invoice = withRouter(InvoiceWithoutRouter);
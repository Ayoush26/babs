import axios from 'axios';
import React, { Component } from 'react';
import './signTable.css';
import logo from './../../images/logo.png';

export class SignTable extends Component {
    constructor() {
        super();
        this.state ={
            class :'Nursery',
            results: []
        }
    }

    componentDidMount(){
        this.setState(()=>{
            return{
                class : this.props.location.search.split("=")[1]
            }
        },async()=>{
            const {data}= await axios.get(`${process.env.REACT_APP_HOST}/marksheet/${this.state.class}`)
            this.setState((preState)=>{
                return{
                    ...preState,
                    results: data.data
                }
            })
        })
    }
    
    render() {
        console.log(this.state)
        const tableContent = this.state.results.map(result=>{
            return <tr key={result._id}>
            <td>{result.Roll}</td>
            <td>{result.Name}</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        })

        return (
            <>
                <div style={{width:"70%"}}>
                    <div className="card-body p-0">
                                        <h3 className="text-center p-2">BUDDHA &nbsp; ADARSHA &nbsp; BOARDING &nbsp; SCHOOL</h3>
                                        <h5 className="text-center p-2"> DHARAN-9, DIP PATH, SUNSARI, KOSHI, NEPAL</h5>
                                        
                                        <div className="row p-2">
                                            <div className="col-md-5 text-center">
                                                <img src={logo} alt="Logo" />
                                            </div>
                                            <div className="col-md-7 text-left">
                                                <h2>Class {this.state.class}</h2>
                                            </div>
                                        </div>
                    </div>
                </div>
                <div>
                    <h4 style={{margin:"10px",paddingLeft:"50px"}}>Class {this.state.class}</h4>
                </div>
                <div style={{ margin: "20px", padding: "40px" }}>    
                    <table style={{width:"70%",border:"1px solid black"}}>
                       <thead>
                       <tr>
                            <th>Roll</th>
                            <th>Name</th>
                            <th>Parent's Name</th>
                            <th>Mobile Number</th>
                            <th>Signature</th>
                        </tr>
                       </thead>
                       <tbody>
                            {tableContent}
                       </tbody>
                        
                    </table>
                </div>
            </>
        )
    }
}
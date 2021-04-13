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
            const {data}= await axios.get(`${process.env.REACT_APP_HOST}/result/class/${this.state.class}`)
            this.setState((preState)=>{
                return{
                    ...preState,
                    results: data
                }
            })
        })
    }
    
    render() {
        console.log(this.state)
        const tableContent = this.state.results.map(result=>{
            return <tr key={result._id}>
            <td className="tableDimension">{result.Roll}</td>
            <td className="tableDimension">{result.data.Name}</td>
            <td className="tableDimension"></td>
            <td className="tableDimension"></td>
            <td className="tableDimension" ></td>
        </tr>
        })

        return (
            <>
                <div style={{width:"80%"}}>
                    <div className="card-body p-0">
                                        <h3 className="text-center p-2">BUDDHA &nbsp; ADARSHA &nbsp; BOARDING &nbsp; SCHOOL</h3>
                                        <h5 className="text-center p-2"> DHARAN-9, DIP PATH, SUNSARI, KOSHI, NEPAL</h5>
                                        
                                        <div className="row p-2">
                                            <div className="col-md-5 text-center">
                                                <img src={logo} alt="Logo" />
                                            </div>
                                           
                                        </div>
                    </div>
                </div>
                <div>
                    <h4 style={{margin:"10px",paddingLeft:"50px"}}>Class: {this.state.class}</h4>
                </div>
                <div style={{ margin: "20px", padding: "40px" }}>    
                    <table style={{width:"80%",border:"1px solid black"}}>
                       <thead>
                       <tr>
                            <th className="tableHead">Roll</th>
                            <th className="tableHead" >Name</th>
                            <th className="tableHead">Parent's Name  &nbsp; &nbsp; &nbsp; &nbsp;</th>
                            <th className="tableHead">Mobile No.</th>
                            <th className="tableHead">Sign &nbsp; &nbsp;</th>
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
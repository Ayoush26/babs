import axios from 'axios';
import React, { Component } from 'react';
import './sheetTable.css';
import logo from './../../images/logo.png';

export class SheetTable extends Component {
    constructor() {
        super();
        this.state = {
            class: 'Nursery',
            results: [{
                marksInfo: {

                }
            }],
            subjects: []
        }
    }

    componentDidMount() {
        this.setState(() => {
            return {
                class: this.props.location.search.split("=")[1]
            }
        }, async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_HOST}/marksheet/${this.state.class}`);
            const subjectData = await axios.get(`${process.env.REACT_APP_HOST}/subject/${this.state.class}`);
            const subjects = subjectData.data.data
            let subjectName = []
            subjects.forEach((subject) => {
                let name = `${subject.Name}`
                subjectName.push(name);
                name = '';
            })
            console.log(subjectName)
            this.setState((preState) => {
                return {
                    ...preState,
                    results: data.data,
                    subjects: subjectName
                }
            })
        })
    }

    render() {
        console.log(this.state)
        const tableContent = this.state.results.map((result,index)=> {
            return <tr key={result._id}>
                <td className="tableDimension">{index+1}</td>
                <td className="tableDimension">{result.Name}</td>
                <td className="tableDimension">{result.Roll}</td>
                {this.state.subjects.map((subject, index) => {

                    return <td className="tableDimension" key={index}>{result.marksInfo[subject]}</td>
                })}
                <td className="tableDimension">{result.percentage}</td>

            </tr>
        })

        return (
            <>
                <div style={{ width: "100%" }}>
                    <div className="card-body p-0">
                        <h3 className="text-center p-2">BUDDHA &nbsp; ADARSHA &nbsp; BOARDING &nbsp; SCHOOL</h3>
                        <h5 className="text-center p-2"> DHARAN-9, DIP PATH, SUNSARI, KOSHI, NEPAL</h5>

                        <div className="row p-2">
                            <div className="col-md-4 text-center">

                            </div>
                            <div className="col-md-4 text-center">
                                <img src={logo} alt="Logo" />
                            </div>
                            <div className="col-md-4 text-center">

                            </div>

                        </div>
                    </div>
                </div>
                <div>
                    <h4 style={{ margin: "10px", paddingLeft: "50px" }}>Class: {this.state.class}</h4>
                </div>
                <div style={{ margin: "20px", padding: "40px" }}>
                    <table style={{ width: "100%", border: "1px solid black" }}>
                        <thead>
                            <tr>
                                <th className="tableHead">Rank</th>
                                <th className="tableHead" >Name</th>
                                <th className="tableHead">Roll</th>
                                {this.state.subjects.map((subject, index) => {
                                    return <th key={index} className="tableHead">{subject === 'Handwriting' ? 'HW' : subject}</th>
                                })}
                                <th className="tableHead">%</th>
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
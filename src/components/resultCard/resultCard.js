import './resultCard.css';
import React from 'react';
import logo from './../../images/logo.png';
import { withRouter } from 'react-router-dom';
import Axios from 'axios'

class ResultCardWithoutRouter extends React.Component {
    constructor() {
        super();
        this.state = {
            marksInfo: [],
            result: {
                fullMarksArray: []
            }
        }
    }
    componentDidMount() {

        Axios.get(`${process.env.REACT_APP_HOST}/result/${this.props.match.params.id}`)
            .then(data => {
                this.setState(preState => {
                    return {
                        ...preState,
                        result: data.data.data.data,
                        marksInfo: data.data.data.data.marksInfo

                    }
                }, () => {
                    if (!this.props.view) {
                        window.print()
                    }
                })
            }).catch(e => console.log(e.response))
    }
    render() {
        console.log(this.state.marksInfo)
        const text = `Buddha Addharsha`;
        const beginAlarm = function () { console.log('start alarm'); };
        const options = {
            chunkWidth: 200,
            chunkHeight: 60,
            textAlign: 'left',
            textBaseline: 'bottom',
            globalAlpha: 0.17,
            font: '18px Microsoft Yahei',
            rotateAngle: -0.26,
            fillStyle: '#07ad94'
        }
        return (<>
            <div className="">
               

                <div style={{marginTop:'80px'}} className="wrapper row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body p-0">
                                <h1 className="text-center p-2">BUDDHA &nbsp; ADARSHA &nbsp; BOARDING &nbsp; SCHOOL</h1>
                                <h2 className="text-center p-2"> DHARAN-9, DIP PATH, SUNSARI, KOSHI, NEPAL</h2>
                                <h2 className="text-center p-2">FINAL TERM EXAM 2078 BS</h2>
                                {/* {this.state.result.term}   */}
                                <div className="row p-2">
                                    <div className="col-md-5 text-center">
                                        <img src={logo} alt="Logo" />
                                    </div>
                                    <div className="col-md-7 text-left">
                                        <h2>GRADE SHEET</h2>
                                    </div>
                                </div>
                                <div className="row  p-5">
                                    <div className="col-md-1">

                                    </div>
                                    <div className="col-md-4">
                                        <p className="mb-1 text-left">Class: {this.state.result.class}</p>
                                        <br />
                                        <p className="mb-1 text-left">Name: {this.state.result.Name}</p>

                                    </div>
                                    <div className="col-md-4 text-right">


                                    </div>
                                    <div className="col-md-3 text-left">
                                        <p>Roll No: {this.state.result.Roll}</p>

                                        <p>A.Y. {this.state.result.annualYear}</p>
                                    </div>
                                </div>
                                <div className="row p-1">
                                    <div className="col-md-1"></div>
                                    <div className="col-md-10">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="border text-uppercase small font-weight-bold text-center">Subjects</th>

                                                    <th className="border text-uppercase small font-weight-bold text-center">Total Marks</th>

                                                    <th className="border text-uppercase small font-weight-bold text-center">Marks Obtained</th>

                                                    <th className="border text-uppercase small font-weight-bold text-center">GPA</th>

                                                    <th className="border text-uppercase small font-weight-bold text-center">Grade</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.marksInfo.map((markInfo, index) => {
                                                    return (
                                                        <tr style={this.state.result.subjectsArray.length > 8 ? { font: "small-caption" } : null} key={index}>
                                                            <td className="text-center">{this.state.result.subjectsArray[index]}</td>
                                                            <td className="text-center">{this.state.result.fullMarksArray[index]}</td>
                                                            <td className="text-center">{markInfo[this.state.result.subjectsArray[index]].marks}</td>
                                                            <td className="text-center">{markInfo[this.state.result.subjectsArray[index]].gpa}</td>
                                                            <td className="text-center">{markInfo[this.state.result.subjectsArray[index]].grade}</td>
                                                        </tr>
                                                    )
                                                })}

                                                <tr>
                                                    <th className="border text-uppercase small font-weight-bold text-center">Total</th>

                                                    <th className="border text-uppercase small font-weight-bold text-center">{this.state.result.totalMarks}</th>

                                                    <th className="border text-uppercase small font-weight-bold text-center">{this.state.result.Total}</th>

                                                    <th className="border text-uppercase small font-weight-bold text-center"></th>

                                                    <th className="border text-uppercase small font-weight-bold text-center">{this.state.result.AvgGrade}</th>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div>

                            </div>
                            <div className="row p-5">
                                <div className="col-md-1">

                                </div>
                                <div className="col-md-6">


                                </div>
                                <div className="col-md-4 ">

                                    <p className="mb-1 text-left">Total GPA Obtained: &nbsp;&nbsp;&nbsp;&nbsp; <span style={{ fontWeight: 'bold' }}>{this.state.result.AvgGPA}</span></p>
                                    <br />
                                    <p className="mb-1 text-left">Percentage: &nbsp;&nbsp;&nbsp;&nbsp;   <span style={{ fontWeight: 'bold' }}>  {this.state.result.percentage}%</span></p><br />
                                    <p className="mb-1 text-left">Attendance:   &nbsp;&nbsp;&nbsp;&nbsp;  {this.state.result.rank}</p>

                                </div>

                            </div>
                            <div className="row " style={{ marginTop: '30px' }}>
                                <div className="col-md-1"></div>
                                <div className="col-md-1"></div>
                                <div className="col-md-2 bt">
                                    <p className="text-center">Principal</p>
                                </div>
                                <div className="col-md-1"></div>

                                <div className="col-md-2 bt">
                                    <p className="text-center">School's Seal</p>
                                </div>
                                <div className="col-md-1"></div>
                                <div className="col-md-2 bt">
                                    <p className="text-center">Class Teacher</p>
                                </div>
                                <div className="col-md-1"></div>
                                <div className="col-md-1"></div>
                            </div>
                        </div>
                    </div>
                </div>

    
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <div style={{border:'none'}} className="wrapper row">
                    <div className="col-12">
                        <div className='card'>

                            <div className="row p-5">
                                <div className="col-md-1">

                                </div>

                                <div className="col-md-10 sm-table">
                                    <p className="text-center">Marks and Grade Points</p>
                                    <table className="table large">
                                        <thead>
                                            <tr>
                                                <th>Percentage(%)</th>
                                                <th>Grade</th>
                                                <th>Point</th>
                                                <th>Remarks</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>90-100</td>
                                                <td>A+</td>
                                                <td>4.0</td>
                                                <td>Outstanding</td>
                                            </tr>
                                            <tr>
                                                <td>80-90</td>
                                                <td>A</td>
                                                <td>3.6</td>
                                                <td>Excellent</td>
                                            </tr>
                                            <tr>
                                                <td>70-80</td>
                                                <td>B+</td>
                                                <td>3.2</td>
                                                <td>Very Good</td>
                                            </tr>
                                            <tr>
                                                <td>60-70</td>
                                                <td>B</td>
                                                <td>2.8</td>
                                                <td>good</td>
                                            </tr>
                                            <tr>
                                                <td>50-60</td>
                                                <td>C+</td>
                                                <td>2.4</td>
                                                <td>Satisfactory</td>
                                            </tr>
                                            <tr>
                                                <td>40-50</td>
                                                <td>C</td>
                                                <td>2</td>
                                                <td>Acceptable</td>
                                            </tr>
                                            <tr>
                                                <td>30-40</td>
                                                <td>D+</td>
                                                <td>1.6</td>
                                                <td>Partly Acceptable</td>
                                            </tr>
                                            <tr>
                                                <td>20-30</td>
                                                <td>D</td>
                                                <td>1.2</td>
                                                <td>Insufficient</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                                <div className="col-md-1 text-left">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>)
    }
}

export const ResultCard = withRouter(ResultCardWithoutRouter);
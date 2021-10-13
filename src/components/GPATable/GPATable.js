import axios from 'axios';
import React, { Component } from 'react';
import './GPATable.css';
import logo from './../../images/logo.png';
import grade from './../../util/grade';
import mpg from '../../util/mpg';
import ReactWaterMark from 'react-watermark-component';




export class GPATable extends Component {
    constructor() {
        super();
        this.state = {
            class: '10',
            roll: 1,
            results: [{
                Name: '',
                Roll: '',
                class: '',
                marksInfo: {

            
                },
                percentage:''
            }, {
                Name: '',
                Roll: '',
                class: '',
                marksInfo: {

                },
                percentage:''
            }, {
                Name: '',
                Roll: '',
                marksInfo: {

                }
            }, {
                Name: '',
                Roll: '',
                marksInfo: {

                }
            }, {
                Name: '',
                Roll: '',
                marksInfo: {

                }
            }, {
                Name: '',
                Roll: '',
                marksInfo: {

                }
            }, {
                Name: '',
                Roll: '',
                marksInfo: {

                }
            }, {
                Name: '',
                Roll: '',
                marksInfo: {

                }
            }, {
                Name: '',
                Roll: '',
                marksInfo: {

                }
            }, {
                Name: '',
                Roll: '',
                marksInfo: {

                }
            }, {
                Name: '',
                Roll: '',
                marksInfo: {

                }
            }, {
                Name: '',
                Roll: '',
                marksInfo: {

                }
            }, {
                Name: '',
                Roll: '',
                marksInfo: {

                }
            }, {
                Name: '',
                Roll: '',
                marksInfo: {

                }
            },{
                Name: '',
                Roll: '',
                class: '',
                marksInfo: {

                },
                percentage:''
            },
            {
                Name: '',
                Roll: '',
                class: '',
                marksInfo: {

                },
                percentage:''
            },
            {
                Name: '',
                Roll: '',
                class: '',
                marksInfo: {

                },
                percentage:''
            },
            {
                Name: '',
                Roll: '',
                class: '',
                marksInfo: {

                },
                percentage:''
            },
            {
                Name: '',
                Roll: '',
                class: '',
                marksInfo: {

                },
                percentage:''
            },
            {
                Name: '',
                Roll: '',
                class: '',
                marksInfo: {

                },
                percentage:''
            },
            {
                Name: '',
                Roll: '',
                class: '',
                marksInfo: {

                },
                percentage:''
            },
            {
                Name: '',
                Roll: '',
                class: '',
                marksInfo: {

                },
                percentage:''
            },
            {
                Name: '',
                Roll: '',
                class: '',
                marksInfo: {

                },
                percentage:''
            },
            {
                Name: '',
                Roll: '',
                class: '',
                marksInfo: {

                },
                percentage:''
            },
            {
                Name: '',
                Roll: '',
                class: '',
                marksInfo: {

                },
                percentage:''
            },
            {
                Name: '',
                Roll: '',
                class: '',
                marksInfo: {

                },
                percentage:''
            },
            {
                Name: '',
                Roll: '',
                class: '',
                marksInfo: {

                },
                percentage:''
            },
            {
                Name: '',
                Roll: '',
                class: '',
                marksInfo: {

                },
                percentage:''
            }
            ],

            subjects: [],
            FullMarks: {
                
            }
        }
    }

    componentDidMount() {
        this.setState(() => {
            return {
                roll: this.props.location.search.split("&")[2],
                class: this.props.location.search.split("&")[1]
                
            }
        }, async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_HOST}/marksheet/${this.state.class}`);
            console.log(data.data);
            const subjectData = await axios.get(`${process.env.REACT_APP_HOST}/subject/${this.state.class}`);
            const subjects = subjectData.data.data
            console.log(subjects)
            let subjectName = []
            subjects.forEach((subject) => {
                let name = `${subject.Name}`
                subjectName.push(name);
                name = '';
            })
            let FullMarks = {};
            subjects.forEach((subject) => {
                FullMarks[subject.Name]=subject.FullMarks;
                
            })
            this.setState((preState) => {
                return {
                    ...preState,
                    results: data.data,
                    subjects: subjectName,
                    FullMarks
                }
            })
        })
    }
    getAvgGPA = (value) => {
        let sum = 0;
        this.state.subjects.forEach((subject, index) => {
            sum += subject === 'Health' || subject === 'Moral' ? Number(this.state.results[value].marksInfo[subject] / 12.5) * 2 : Number(this.state.results[value].marksInfo[subject] / 25) * 4

        })
        console.log(sum)
        return sum / 32;
    }

    render() {
        
        const roll = this.state.roll

        // const tableContent = this.state.results.map((result,index)=> {
        //     return <tr key={result._id}>
        //         <td className="tableDimension">{result.Roll}</td>
        //         <td className="tableDimension">{result.Name}</td>

        //         {this.state.subjects.map((subject, index) => {

        //             return <td className="tableDimension" key={index}>{result.marksInfo[subject]}</td>
        //         })}
        //         <td className="tableDimension">{result.percentage}</td>
        //         <td className="tableDimension">{grade(result.percentage)}</td>
        //     </tr>
        // })
        console.log(this.props.location.search)
        let contentCss = this.state.subjects.length===10? { borderLeft: '1px solid black', borderRight: '1px solid black', padding: '6px' }:(this.state.subjects.length<8?{ borderLeft: '1px solid black', borderRight: '1px solid black', padding: '11px' }:{ borderLeft: '1px solid black', borderRight: '1px solid black', padding: '10px' })
        let total1 = 0;
        let totalGPA1=0;
        let totalMarks=0;
        const tableContent1 = this.state.subjects.map((subject, index) => {
            total1 = total1 + Number(this.state.results[roll-1].marksInfo[subject])
            totalGPA1 = totalGPA1 + Number(mpg(this.state.results[roll-1].marksInfo[subject],this.state.FullMarks[subject]).gradePoint)
            totalMarks = totalMarks + Number(this.state.FullMarks[subject])
            return <tr key={index}>

                <td style={contentCss} key={index} className="text-center">{subject === ' सेरोफेरो' ? 'Serofero' : subject}</td>
                <td style={contentCss} key={index} className="text-center">{this.state.FullMarks[subject]}</td>
                <td style={contentCss} key={index} className="text-center">{this.state.results[roll - 1].marksInfo[subject]}</td>
                <td style={contentCss} key={index} className="text-center">{mpg(this.state.results[roll-1].marksInfo[subject],this.state.FullMarks[subject]).gradePoint}</td>
                {/* <td key={index} className="text-center">{this.state.results.marksInfo[subject]}</td> */}
                {/* <td key={index} className="text-center">{subject==='Health'||subject==='Moral'?2:4}</td> */}
                <td style={contentCss} key={index} className="text-center">{mpg(this.state.results[roll-1].marksInfo[subject],this.state.FullMarks[subject]).grade}</td>
                {/* <td key={index} className="text-center">{subject==='Health'||subject==='Moral'?this.state.results.marksInfo[subject]/12.5:this.state.results.marksInfo[subject]/25}</td>
                 <td key={index} className="text-center">{subject==='Health'||subject==='Moral'?(this.state.results.marksInfo[subject]/12.5)*2:(this.state.results.marksInfo[subject]/25)*4}</td> */}
            </tr>
        })
        let total2 = 0;
        let totalGPA2=0;
        const tableContent2 = this.state.subjects.map((subject, index) => {
            total2 = total2 + Number(this.state.results[roll].marksInfo[subject])
            totalGPA2 = totalGPA2 + Number(mpg(this.state.results[roll].marksInfo[subject],this.state.FullMarks[subject]).gradePoint);
            return <tr key={index}>

                <td style={contentCss} key={index} className="text-center">{subject}</td>
                <td style={contentCss} key={index} className="text-center">{this.state.FullMarks[subject]}</td>
                <td style={contentCss} key={index} className="text-center">{this.state.results[roll].marksInfo[subject]}</td>
                <td style={contentCss} key={index} className="text-center">{mpg(this.state.results[roll].marksInfo[subject],this.state.FullMarks[subject]).gradePoint}</td>
                {/* <td key={index} className="text-center">{this.state.results.marksInfo[subject]}</td> */}
                {/* <td key={index} className="text-center">{subject==='Health'||subject==='Moral'?2:4}</td> */}
                <td style={contentCss} key={index} className="text-center">{mpg(this.state.results[roll].marksInfo[subject],this.state.FullMarks[subject]).grade}</td>
                {/* <td key={index} className="text-center">{subject==='Health'||subject==='Moral'?this.state.results.marksInfo[subject]/12.5:this.state.results.marksInfo[subject]/25}</td>
                 <td key={index} className="text-center">{subject==='Health'||subject==='Moral'?(this.state.results.marksInfo[subject]/12.5)*2:(this.state.results.marksInfo[subject]/25)*4}</td> */}
            </tr>
        })

        const padBlock = this.state.subjects.length===10?{ padding: '4px' }:(this.state.subjects.length<8?{ padding: '11px' }:{ padding: '8px' })
        

        return (
            <>

                




                <div className=" main">

                    <div className="floatLeft">
                        <div className="card-body p-0">
                            <h1 className="text-center p-1 ">BUDDHA &nbsp; ADARSHA &nbsp; BOARDING &nbsp; SCHOOL</h1>
                            <h2 className="text-center ">DIP PATH, DHARAN-9, SUNSARI, NEPAL</h2>
                            <h2 className="text-center ">SECOND TERM EXAM 2078 BS</h2>
                            <h2 className="text-center">GRADE SHEET</h2>

                            <div className="row ">
                                <div className="col-md-4 text-center">

                                </div>
                                <div className="col-md-4 text-center">
                                    <img style={{ maxWidth: '50%', maxHeight: '60%' }} src={logo} alt="Logo" />
                                </div>
                                <div className="col-md-4 text-center">

                                </div>

                            </div>
                        </div>
                        <div className="row  p-1">
                            <div className="col-md-1">

                            </div>
                            <div className="col-md-7">
                                <p className="mb-1 text-left">Class: {this.state.results[roll - 1].class}</p>

                                <p className="mb-1 text-left">Name: {this.state.results[roll - 1].Name}</p>

                            </div>
                            
                            <div className="col-md-4 text-left">
                                <p className="mb-1 text-left">Roll No: {this.state.results[roll - 1].Roll}</p>

                                <p className="mb-1 text-left">A.Y: 2021-2022</p>
                            </div>
                        </div>

                        <div className="row p-1">
                            <div className="col-md-1"></div>
                            <div className="col-md-10">
                                <table style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th className="border text-uppercase font-weight-bold text-center " style={padBlock}>Subjects</th>
                                            <th className="border text-uppercase font-weight-bold text-center " style={padBlock} >Total </th>
                                            <th className="border text-uppercase font-weight-bold text-center " style={padBlock} >Marks</th>
                                            <th className="border text-uppercase font-weight-bold text-center " style={padBlock}>GPA</th>
                                            {/* <th className="tableHead">Marks Obt</th>
                                <th className="tableHead">Credit Hrs</th> */}
                                            <th className="border text-uppercase font-weight-bold text-center " style={padBlock}>Grade</th>
                                            {/* <th className="tableHead">GPA</th>
                                <th className="tableHead">Total GPA</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableContent1}
                                        <tr>
                                            <th style={padBlock} className="border text-uppercase font-weight-bold text-center">Total</th>

                                            <th style={padBlock} className="border text-uppercase font-weight-bold text-center">{totalMarks}</th>

                                            <th style={padBlock} className="border text-uppercase font-weight-bold text-center">{total1}</th>

                                            <th style={padBlock} className="border text-uppercase font-weight-bold text-center"></th>

                                            <th style={padBlock} className="border text-uppercase font-weight-bold text-center">{grade(this.state.results[roll-1].percentage)}</th>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>
                            <div className="col-md-1"></div>
                        </div>
                        <div className="row p-2">
                            <div className="col-md-1">

                            </div>
                            <div className="col-md-5">


                            </div>
                            <div className="col-md-5 ">

                                <p className="mb-1 text-right">Total GPA Obtained: &nbsp;&nbsp;&nbsp;&nbsp; <span style={{ fontWeight: 'bold' }}>{(totalGPA1/this.state.subjects.length).toFixed(1)}</span></p>

                                <p className="mb-1 text-right">Percentage: &nbsp;&nbsp;&nbsp;&nbsp;   <span style={{ fontWeight: 'bold' }}> {this.state.results[roll-1].percentage}%</span></p>
                                

                            </div>

                        </div>

                        <div className="row " style={this.state.subjects.length<8?{ marginTop: '60px' }:{ marginTop: '30px' }}>
                            <div className="col-md-1"></div>
                            <div className="col-md-1"></div>
                            <div className="col-md-2 bt">
                                <p style={{ borderTop: '1px solid black' }} className="text-center">Class Teacher</p>
                            </div>
                            <div className="col-md-1"></div>

                            <div className="col-md-2 bt">
                                <p style={{ borderTop: '1px solid black' }} className="text-center">School's Seal</p>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-2 bt">
                                <p style={{ borderTop: '1px solid black' }} className="text-center">Principal</p>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-1"></div>
                        </div>
                    </div>



                    <div className="floatRight">
                        <div className="card-body p-0">
                            <h1 className="text-center p-1 ">BUDDHA &nbsp; ADARSHA &nbsp; BOARDING &nbsp; SCHOOL</h1>
                            <h2 className="text-center "> DIP PATH, DHARAN-9, SUNSARI, NEPAL</h2>
                            <h2 className="text-center ">SECOND TERM EXAM 2078 BS</h2>
                            <h2 className="text-center">GRADE SHEET</h2>

                            <div className="row p-1 ">
                                <div className="col-md-4 text-center">

                                </div>
                                <div className="col-md-4 text-center">
                                    <img style={{ maxWidth: '50%', maxHeight: '60%' }} src={logo} alt="Logo" />
                                </div>
                                <div className="col-md-4 text-center">

                                </div>

                            </div>
                        </div>
                        <div className="row  p-1">
                            <div className="col-md-1">

                            </div>
                            <div className="col-md-7">
                                <p className="mb-1 text-left">Class: {this.state.results[roll ].class}</p>

                                <p className="mb-1 text-left">Name: {this.state.results[roll ].Name}</p>

                            </div>
                           
                            <div className="col-md-4 text-left">
                                <p className="mb-1 text-left">Roll No: {this.state.results[roll].Roll}</p>

                                <p className="mb-1 text-left">A.Y: 2021-2022</p>
                            </div>
                        </div>

                        <div className="row p-1">
                            <div className="col-md-1"></div>
                            <div className="col-md-10">
                                <table style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th className="border text-uppercase font-weight-bold text-center " style={padBlock}>Subjects</th>
                                            <th className="border text-uppercase font-weight-bold text-center " style={padBlock} >Total </th>
                                            <th className="border text-uppercase font-weight-bold text-center " style={padBlock} >Marks</th>
                                            <th className="border text-uppercase font-weight-bold text-center " style={padBlock}>GPA</th>
                                            {/* <th className="tableHead">Marks Obt</th>
                                <th className="tableHead">Credit Hrs</th> */}
                                            <th className="border text-uppercase font-weight-bold text-center " style={padBlock}>Grade</th>
                                            {/* <th className="tableHead">GPA</th>
                                <th className="tableHead">Total GPA</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableContent2}
                                        <tr>
                                            <th style={padBlock} className="border text-uppercase font-weight-bold text-center">Total</th>

                                            <th style={padBlock} className="border text-uppercase font-weight-bold text-center">{totalMarks}</th>

                                            <th style={padBlock} className="border text-uppercase font-weight-bold text-center">{total2}</th>

                                            <th style={padBlock} className="border text-uppercase font-weight-bold text-center"></th>

                                            <th style={padBlock} className="border text-uppercase font-weight-bold text-center">{grade(this.state.results[roll].percentage)}</th>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>
                            <div className="col-md-1"></div>
                        </div>
                        <div className="row p-2">
                            <div className="col-md-1">

                            </div>
                            <div className="col-md-5">


                            </div>
                            <div className="col-md-5 ">

                                <p className="mb-1 text-right">Total GPA Obtained: &nbsp;&nbsp;&nbsp;&nbsp; <span style={{ fontWeight: 'bold' }}>{(totalGPA2/this.state.subjects.length).toFixed(1)}</span></p>

                                <p className="mb-1 text-right">Percentage: &nbsp;&nbsp;&nbsp;&nbsp;   <span style={{ fontWeight: 'bold' }}> {this.state.results[roll].percentage}%</span></p>
                            

                            </div>

                        </div>

                        <div className="row " style={this.state.subjects.length<8?{ marginTop: '60px' }:{ marginTop: '30px' }}>
                            <div className="col-md-1"></div>
                            <div className="col-md-1"></div>
                            <div className="col-md-2 bt">
                                <p style={{ borderTop: '1px solid black' }} className="text-center">Class Teacher</p>
                            </div>
                            <div className="col-md-1"></div>

                            <div className="col-md-2 bt">
                                <p style={{ borderTop: '1px solid black' }} className="text-center">School's Seal</p>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-2 bt">
                                <p style={{ borderTop: '1px solid black' }} className="text-center">Principal</p>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-1"></div>
                        </div>
                    </div>
                </div>

                <br></br>
                <br></br>


                <br></br>

                                

            </>
        )
    }
}
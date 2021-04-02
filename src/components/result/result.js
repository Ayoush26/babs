import React from 'react';
import Axios from 'axios';
import { Loader } from '../common/loader/loader';
import { withRouter } from 'react-router-dom';
import { util } from './../../util/moment';

class ResultWithoutRouter extends React.Component {
    constructor() {
        super();
        this.state = {
            results: [],
            isLoading: false
        }
    }

    componentDidMount() {
        this.setState(prevState => {
            return {
                isLoading: !prevState.isLoading
            }
        }, () => {
            Axios.get(`${process.env.REACT_APP_HOST}/result`)
                .then(data => {
                    const results = data.data.data;
                    this.setState({
                        results
                    })

                }).catch(err => {
                    console.log(err.response)
                }).finally(() => {
                    this.setState((prevState) => {
                        return {
                            isLoading: !prevState.isLoading
                        }
                    })
                })
        })
    }

    handleClick = (id) => {
        this.props.history.push(`/result/${id}`);
    }

    handlePrint = (id) => {
        this.props.history.push(`/printResult/${id}`)
    }
    render() {

        const tableContent = this.state.results.map((result, index) => {
            return (<tr key={result._id}>
                <td className="serial">{index + 1}</td>

                <td>{result.data.Name} </td>
                <td>{result.data.term}</td>
                <td>{result.data.class}</td>
                <td>{result.data.Roll}</td>
                <td>{result.data.AvgGPA}</td>
                <td>{result.data.AvgGrade}</td>
                <td>{result.data.percentage} %</td>
                <td>
                    <span onClick={this.handleClick.bind(this, result._id)} className="badge badge-complete">Details</span>
                </td>

                <td>
                    <button onClick={this.handlePrint.bind(this, result._id)} className="btn btn-info">Print</button>
                </td>

            </tr>)
        })

        return (
            this.state.isLoading ?
                <Loader></Loader> :
                (<div className="orders">
                    <div className="row">
                        <div className="col-xl-4">
                            <h3>Recent Results</h3>
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
                                    <h4 className="box-title">Result</h4>
                                </div>
                                <div className="card-body--">
                                    <div className="table-stats order-table ov-h">
                                        <table className="table ">
                                            <thead>
                                                <tr>
                                                    <th className="serial">SN</th>


                                                    <th>Name</th>
                                                    <th>Term</th>
                                                    <th>Class</th>
                                                    <th>Roll No</th>
                                                    <th>Avg GPA</th>
                                                    <th>Avg Grade</th>
                                                    <th>Percentage</th>
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

export const Result = withRouter(ResultWithoutRouter);
import React from 'react';
import Axios from 'axios';
import { Loader } from '../common/loader/loader';
import { withRouter } from 'react-router-dom';
import { util } from './../../util/moment';
import { notify } from '../../util/notify';

class ResultWithoutRouter extends React.Component {
    constructor() {
        super();
        this.state = {
            results: [],
            isLoading: false,
            class: 'All'
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
    handleClass = (value) => {
        this.setState(() => {
            return {
                isLoading: true
            }
        }, async () => {
            try {
                const { data } = await Axios.get(`${process.env.REACT_APP_HOST}/result/class/${value}`)
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        class: value,
                        results: data,
                        isLoading: false
                    }
                })
            } catch (e) {
                console.log(e)
            }
        })
    }
    handleAll = () => {
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
                            ...prevState,
                            class: 'All',
                            isLoading: !prevState.isLoading
                        }
                    })
                })
        })
    }
    handleDelete = async (id) => {
        try {
            const check = window.confirm('Are you sure you want to delete?');
            if (check) {
                const result = await Axios.delete(`${process.env.REACT_APP_HOST}/result/delete/${id}`)
                notify.success(result.data.msg)
                if (this.state.class !== 'All') {
                    const { data } = await Axios.get(`${process.env.REACT_APP_HOST}/result/class/${this.state.class}`)
                    this.setState((prevState) => {
                        return {
                            ...prevState,
                            results: data,
                        }
                    })
                } else {
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
                                    ...prevState,
                                    class: 'All'
                                }
                            })
                        })

            }
        } else {
            return
        }
    } catch(e) {
        console.log(e)
    }
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
                <button onClick={this.handleDelete.bind(this, result._id)} className="btn btn-danger m-1">Delete</button>

            </td>

        </tr>)
    })

    let activebutton = 'btn-primary active';
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

                <div className="row " style={{ marginBottom: "10px" }}>
                    <div className="col-lg-12 col-xl-12">
                        <button onClick={this.handleAll} className={`btn m-1 ${this.state.class === 'All' ? activebutton : null}`}>All</button>
                        <button onClick={this.handleClass.bind(this, 'Nursery')} className={`btn m-1 ${this.state.class === 'Nursery' ? activebutton : null}`}>Nursery</button>
                        <button onClick={this.handleClass.bind(this, 'KG')} className={`btn m-1 ${this.state.class === 'KG' ? activebutton : null}`}>KG</button>
                        <button onClick={this.handleClass.bind(this, '1')} className={`btn m-1 ${this.state.class === '1' ? activebutton : null}`}>1</button>
                        <button onClick={this.handleClass.bind(this, '2')} className={`btn m-1 ${this.state.class === '2' ? activebutton : null}`}>2</button>
                        <button onClick={this.handleClass.bind(this, '3')} className={`btn m-1 ${this.state.class === '3' ? activebutton : null}`}>3</button>
                        <button onClick={this.handleClass.bind(this, '4')} className={`btn m-1 ${this.state.class === '4' ? activebutton : null}`}>4</button>
                        <button onClick={this.handleClass.bind(this, '5')} className={`btn m-1 ${this.state.class === '5' ? activebutton : null}`}>5</button>
                        <button onClick={this.handleClass.bind(this, '6')} className={`btn m-1 ${this.state.class === '6' ? activebutton : null}`}>6</button>
                        <button onClick={this.handleClass.bind(this, '7')} className={`btn m-1 ${this.state.class === '7' ? activebutton : null}`}>7</button>
                        <button onClick={this.handleClass.bind(this, '8')} className={`btn m-1 ${this.state.class === '8' ? activebutton : null}`}>8</button>
                        <button onClick={this.handleClass.bind(this, '9')} className={`btn m-1 ${this.state.class === '9' ? activebutton : null}`}>9</button>
                        <button onClick={this.handleClass.bind(this, '10')} className={`btn m-1 ${this.state.class === '10' ? activebutton : null}`}>10</button>
                    </div>
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
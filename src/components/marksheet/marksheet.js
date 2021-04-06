import React from 'react';
import Axios from 'axios';
import { Loader } from '../common/loader/loader';
import { withRouter } from 'react-router-dom';
import { notify } from '../../util/notify';

class MarksheetWithoutRouter extends React.Component {
    constructor() {
        super();
        this.state = {
            results: [],
            isLoading: false,
            class: 'Nursery'
        }
    }

    componentDidMount() {
        this.setState(prevState => {
            return {
                isLoading: !prevState.isLoading
            }
        }, () => {
            Axios.get(`${process.env.REACT_APP_HOST}/marksheet/${this.state.class}`)
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



    handlePrint = async (id) => {
        try {
            const check = window.confirm('Are you sure you want to delete?')
            if (check) {
                const prevClass = this.state.class
                await Axios.delete(`${process.env.REACT_APP_HOST}/marksheet/delete/${id}`)
                notify.success('Succesfully Deleted')
                const {data} = await Axios.get(`${process.env.REACT_APP_HOST}/marksheet/${prevClass}`);
                const results = data.data;
                this.setState((prevState)=>{
                    return {
                        ...prevState,
                        results,
                        class: prevClass
                    }
                })
                
            } else {
                return
            }
        } catch (e) {
            console.log(e)
        }
    }
    handleClass = (value) => {
        this.setState(() => {
            return {
                isLoading: true
            }
        }, async () => {
            try {
                const { data } = await Axios.get(`${process.env.REACT_APP_HOST}/marksheet/${value}`)
                const results = data.data
                this.setState((preState) => {
                    return {
                        ...preState,
                        class: value,
                        results,
                        isLoading: false
                    }
                })

            } catch (e) {
                console.log(e)
            }
        })
    }

    render() {

        const tableContent = this.state.results.map((result, index) => {
            return (<tr key={result._id}>
                <td className="serial">{index + 1}</td>

                <td>{result.Name} </td>
                <td>{result.class}</td>
                <td>{result.Roll}</td>


                <td>
                    <button onClick={this.handlePrint.bind(this, result._id)} className="btn btn-danger">Delete</button>
                </td>

            </tr>)
        })

        let activebutton = 'btn-primary active';
        return (
            this.state.isLoading ?
                <Loader></Loader> :
                (<>
                    <div className="orders">
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
                                        <h4 className="box-title">Marksheet</h4>
                                    </div>
                                    <div className="card-body--">
                                        <div className="table-stats order-table ov-h">
                                            <table className="table ">
                                                <thead>
                                                    <tr>
                                                        <th className="serial">SN</th>


                                                        <th>Name</th>
                                                        <th>class</th>
                                                        <th>Roll No</th>

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
                    </div></>)
        )
    }
}

export const Marksheet = withRouter(MarksheetWithoutRouter);
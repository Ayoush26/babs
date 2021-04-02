import React from 'react';

import { Loader } from '../common/loader/loader';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { notify } from '../../util/notify';
import Modal from 'react-modal';



class SubjectTableWithoutRouter extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            isAdding: false,
            isEditing: false,
            subject: {
                name: '',
                fullMarks: 100,
                class: 'Nursery'
            },
            modalIsOpen: false,
            currentSubjectName: '',
            currentSubjectMarks: '',
            subjectId: ''    
        }
    }


    handleClick = () => {
        this.setState({
            isAdding: true
        })
    }

    addSubject = () => {


        this.setState((preState) => {
            return {
                ...preState,
                subject: {
                    ...preState.subject,
                    class: this.props.class
                }
            }
        }, () => {
            axios.post(`${process.env.REACT_APP_HOST}/subject`, this.state.subject, {
                headers: { 'Content-Type': 'application/json' },
                responseType: 'json'
            }).then((data) => {
                this.setState({
                    isAdding: false
                })
                notify.success('Subject Added Successfully');
                this.props.click(this.state.subject.class);
            }).catch((e) => {
                console.log(e.response)
            })
        })
    }
    changeHandler = (e) => {
        const { name, value } = e.target
        this.setState((preState) => {
            return {
                ...preState,
                subject: {
                    ...preState.subject,
                    [name]: value
                }
            }
        })
    }

    edit = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_HOST}/subject/id/${this.state.subjectId}`, this.state.subject, {
                headers: { 'Content-Type': 'application/json' },
                responseType: 'json'
            })
            notify.success(data.msg);
            this.setState({
                modalIsOpen: false
            })
            this.props.click(this.state.subject.class)
        } catch (e) {
            console.log(e)
        }
    }


    onDelete = async (id) => {
        try {

           const check = window.confirm("Are you sure you want to delete?")
           if(check){
            const data = await axios.delete(`${process.env.REACT_APP_HOST}/subject/${id}`)
            notify.success(data.data.msg)
            this.props.click(this.props.class)
           }else{
               return;
           }
        } catch (e) {
            console.log(e)
        }
    }

    openModal = (index, id) => {
        this.setState((preState) => {
            return {
                ...preState,
                currentSubjectName: this.props.subjects[index].Name,
                currentSubjectMarks: this.props.subjects[index].FullMarks,
                subject: {
                    ...preState.subject,
                    name: this.props.subjects[index].Name,
                    fullMarks: this.props.subjects[index].FullMarks,
                    class: this.props.class
                },
                subjectId: id,
                modalIsOpen: true
            }
        })
    }


    closeModal = () => {
        this.setState((preState) => {
            return {
                ...preState,
                modalIsOpen: false
            }
        })
    }

    render() {
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
            }
        };
        const tableContent = this.props.subjects.map((subject, index) => {
            return (<tr key={subject._id}>
                <td className="serial">{index + 1}</td>

                <td>{subject.Name}</td>
                <td>{subject.FullMarks}</td>
                <td>
                    <button onClick={this.openModal.bind(this, index, subject._id)} className="btn btn-info m-1">Edit</button>
                    <button onClick={this.onDelete.bind(this, subject._id)} className="btn btn-danger">Delete</button>
                </td>

            </tr>)
        }
        )

        const addRow = <tr>
            <td>#</td>
            <td><input onChange={this.changeHandler} type="text" name="name"></input></td>
            <td><select onChange={this.changeHandler} name="fullMarks"><option value={100}>100</option><option value={50}>50</option></select></td>
            <td>
                <button onClick={this.addSubject} className="btn btn-warning m-1">Save Changes</button>
                <button onClick={() => {
                    this.setState({
                        isAdding: false
                    })
                }} className="btn btn-danger">X</button>
            </td>
        </tr>
        console.log(this.state)
        return (
            this.state.isLoading ?
                <Loader></Loader> :
                (<><div className="orders">
                    <br /><br></br>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 >Class: {this.props.class}</h4>
                                    <button onClick={this.handleClick} className={`btn btn-success`} style={{ float: 'right' }}>Add</button>

                                </div>

                                <div className="card-body--">
                                    <div className="table-stats order-table ov-h">
                                        <table className="table ">
                                            <thead>
                                                <tr>
                                                    <th className="serial">SN</th>


                                                    <th>Name</th>
                                                    <th>Full Marks</th>

                                                    <th>More</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.isAdding ? addRow : null}
                                                {tableContent}
                                            </tbody>
                                        </table>
                                    </div> {/* /.table-stats */}
                                </div>
                            </div> {/* /.card */}
                        </div>  {/* /.col-lg-8 */}

                    </div>
                </div>

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Edit Subject"
                    >

                        {/* <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2> */}

                        <form className="form-group">
                            <label><h5>Name:</h5></label>
                            <input name="name" onChange={this.changeHandler} defaultValue={this.state.currentSubjectName} className="form-control" ></input>
                            <label><h5 className="pt-1">Full Marks:</h5></label>
                            <input type="number" name="fullMarks" onChange={this.changeHandler} defaultValue={this.state.currentSubjectMarks} className="form-control" ></input>
                        </form>
                        <button onClick={this.edit} className="btn btn-warning">Save Changes</button>
                        <button className="btn btn-danger m-1" onClick={this.closeModal}>Close</button>
                    </Modal>
                </>)
        )
    }
}

export const SubjectTable = withRouter(SubjectTableWithoutRouter);
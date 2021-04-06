
import React from 'react';
import Axios from 'axios';
import { notify } from '../../util/notify';
import { withRouter } from 'react-router-dom';

// const defaultForm={
//     Roll: '',
//     Name: '',
//     class: '7',
//     Wonder: '',
//     EPH: '',
//     English: '',
//     Nepali: '',
//     Science: '',
//     Social: '',
//     Math: '',
//     Grammar: '',
//     Account: ''
// }

class FormWithoutRouter extends React.Component {
    constructor() {
        super();
        this.state = {
            class: 'Nursery',
            sheet: 'marksheet',
            isLoading: false,
            term: 'First',
            annualYear: '2020-2021',
            subjects: {},
            fullMarks: {},
            Name: '',
            Roll: ''
        }
    }


    componentDidMount = async () => {
        try {
            const subjects = await Axios.get(`${process.env.REACT_APP_HOST}/subject/${this.state.class}`);
            let newSubjects = {};
            let newFullMarks = {}
            subjects.data.data.map((subject) => {
                newSubjects[subject.Name] = 0;
                newFullMarks[subject.Name] = subject.FullMarks
            })
            this.setState((preState) => {
                return {
                    ...preState,
                    subjects: newSubjects,
                    fullMarks: newFullMarks
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
    handleChange = (e) => {
        const { name, value } = e.target
        this.setState((preState) => {
            return {
                ...preState,
                [name]: value
            }
        }, async () => {
            if (this.state.sheet !== 'marksheet') {
                try {
                    const {data} = await Axios.get(`${process.env.REACT_APP_HOST}/marksheet/${this.state.class}/${this.state.Roll}`)
                    const marksInfo = data.data.marksInfo;
                    
                    this.setState((prevState)=>{
                        return{
                            ...prevState,
                            Name: data.data.Name?data.data.Name:prevState.Name,
                            subjects: marksInfo
                        }
                    },()=>{
                       console.log(this.state.subjects) 
                    })
                }catch(e){
                    console.log(e)
                }
            }

        })
    }
    handleSubject = (e) => {
        const { name, value } = e.target
        this.setState((preState) => {
            return {
                ...preState,
                subjects: {
                    ...preState.subjects,
                    [name]: value
                }
            }
        })
    }
    handleClick = (e) => {
        e.preventDefault();
        this.setState((preState) => {
            return {
                ...preState,
                isLoading: true
            }
        }, () => {
            Axios.post(`${process.env.REACT_APP_HOST}/sheet`, this.state, {
                headers: { 'Content-Type': 'application/json' },
                responseType: 'json'
            }).then(data => {
                notify.success(data.data.msg)
                this.setState({
                    isLoading: false
                })
                this.props.history.push('/dashboard');
            }).catch(err => console.log(err.response))
        })
    }

    createResult = (e) => {
        e.preventDefault();
        this.setState((preState) => {
            return {
                ...preState,
                isLoading: true
            }
        }, () => {
            Axios.post(`${process.env.REACT_APP_HOST}/result`, this.state, {
                headers: { 'Content-Type': 'application/json' },
                responseType: 'json'
            }).then(data => {
                notify.success(data.data.msg)
                this.props.history.push('/dashboard?result=true')
            }).catch(err => console.log(err.response))
        })
    }

    handleClass = async (e) => {
        const { name, value } = e.target;
        try {
            const subjects = await Axios.get(`${process.env.REACT_APP_HOST}/subject/${value}`);
            let newSubjects = {};
            let newFullMarks = {};
            subjects.data.data.map((subject) => {
                newSubjects[subject.Name] = 0;
                newFullMarks[subject.Name] = subject.FullMarks;
            })
            this.setState((preState) => {
                return {
                    ...preState,
                    [name]: value,
                    subjects: newSubjects,
                    fullMarks: newFullMarks
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
    render() {
        console.log(this.state);



        const subjectArrayDefault = Object.keys(this.state.subjects)

        let subjects = subjectArrayDefault.map((subject, index) => {
            return (<div key={index} className="form-group"><label htmlFor="street" className=" form-control-label">{subject}<h4 style={{ display: 'inline' }}>&nbsp;({this.state.fullMarks[subject]})</h4></label>{this.state.fullMarks[subject] === 'Grade' ? <select value={this.state.subjects[subject]} className="form-control" onChange={this.handleSubject} name={subject}>
                <option value='A+'>A+</option>
                <option value='A'>A</option>
                <option value='B+'>B+</option>
                <option value='B'>B</option>
                <option value='C+'>C+</option>
                <option value='C'>C</option>
                <option value='D+'>D+</option>
                <option value='D'>D</option>
            </select> : <input type="number" value={this.state.subjects[subject]===0?'':this.state.subjects[subject]} className="form-control" onChange={this.handleSubject} name={subject} />}</div>)
        })

        let btnM = this.state.isLoading ? <button id="payment-button" disabled={true} onClick={this.handleClick} type="submit" className="btn btn-lg btn-info btn-block">
            &nbsp;
                <span id="payment-button-amount">Adding</span>

        </button> : <button id="payment-button" onClick={this.handleClick} type="submit" className="btn btn-lg btn-info btn-block">
            &nbsp;
                    <span id="payment-button-amount">Add to Marksheet</span>

        </button>

        let btnR = this.state.isLoading ? <button id="payment-button" disabled={true} type="submit" className="btn btn-lg btn-info btn-block">
            &nbsp;
            <span id="payment-button-amount">Generating</span>

        </button> : <button id="payment-button" onClick={this.createResult} type="submit" className="btn btn-lg btn-info btn-block">
            &nbsp;
                                <span id="payment-button-amount">Generate ResultCard</span>

        </button>
        return (
            <div className="content">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-header">
                                    <strong className="card-title">Student Info</strong>
                                </div>
                                <div className="card-body">
                                    {/* Credit Card */}
                                    <div id="pay-invoice">
                                        <div className="card-body">
                                            <div className="card-title">
                                                <h3 className="text-center">Student Details</h3>
                                            </div>
                                            <hr />
                                            <form action="#" method="post" noValidate="novalidate">
                                                <div className="form-group text-center">
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item"><i className="text-muted fa fa-cc-visa fa-2x" /></li>
                                                        <li className="list-inline-item"><i className="fa fa-cc-mastercard fa-2x" /></li>
                                                        <li className="list-inline-item"><i className="fa fa-cc-amex fa-2x" /></li>
                                                        <li className="list-inline-item"><i className="fa fa-cc-discover fa-2x" /></li>
                                                    </ul>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label mb-1">Sheet</label>
                                                    <select name="sheet" onChange={this.handleChange} className='form-control'>
                                                        <option value="marksheet">Marksheet</option>
                                                        <option value="resultCard">ResultCard</option>

                                                    </select>
                                                </div>
                                                {this.state.sheet === 'resultCard' ? <div className="row">
                                                    <div className="col-6">
                                                        <div className="form-group">
                                                            <label className="control-label mb-1">Term</label>
                                                            <select name="term" onChange={this.handleChange} className='form-control'>
                                                                <option value="First">First</option>
                                                                <option value="Second">Second</option>
                                                                <option value="Third">Third</option>
                                                                <option value="Final">Final</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <label htmlFor="x_card_code" className="control-label mb-1">A.Y</label>
                                                        <div className="input-group">
                                                            <select name="annualYear" onChange={this.handleChange} className='form-control'>
                                                                <option value="2020-2021">2020-2021</option>
                                                                <option value="2021-2022">2021-2022</option>
                                                                <option value="2022-2023">2022-2023</option>
                                                                <option value="2023-2024">2023-2024</option>
                                                            </select>

                                                        </div>
                                                    </div>
                                                </div> : null}

                                                <div className="form-group has-success">
                                                    <label htmlFor="cc-name" className="control-label mb-1">Name</label>
                                                    <input defaultValue={this.state.Name} id="cc-name" onChange={this.handleChange} name="Name" type="text" className="form-control cc-name valid" data-val="true" data-val-required="Please enter the name on card" autoComplete="cc-name" aria-required="true" aria-invalid="false" aria-describedby="cc-name" />
                                                    <span className="help-block field-validation-valid" data-valmsg-for="cc-name" data-valmsg-replace="true" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="cc-number" className="control-label mb-1">Roll number</label>
                                                    <input id="cc-number" onChange={this.handleChange} name="Roll" type="number" className="form-control cc-number identified visa" defaultValue data-val="true" data-val-required="Please enter the card number" data-val-cc-number="Please enter a valid card number" />
                                                    <span className="help-block" data-valmsg-for="cc-number" data-valmsg-replace="true" />
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="form-group">
                                                            <label htmlFor="cc-exp" className="control-label mb-1">Class</label>
                                                            <select name="class" onChange={this.handleClass} className='form-control'>
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
                                                            </select>
                                                        </div>
                                                    </div>
                                                    {this.state.sheet === 'marksheet' ? null : <div className="col-6">
                                                        <label htmlFor="x_card_code" className="control-label mb-1">Rank</label>
                                                        <div className="input-group">
                                                            <input onChange={this.handleChange} id="x_card_code" name="rank" type="number" className="form-control cc-cvc" />
                                                            <div className="input-group-addon">
                                                                <span className="fa fa-question-circle fa-lg" data-toggle="popover" data-container="body" data-html="true" data-title="Security Code" data-content="<div class='text-center one-card'>The 3 digit code on back of the card..<div class='visa-mc-cvc-preview'></div></div>" data-trigger="hover" />
                                                            </div>
                                                        </div>
                                                    </div>}
                                                </div>
                                                <div>

                                                    {this.state.sheet === 'marksheet' ? btnM : btnR}
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div> {/* .card */}
                        </div>{/*/.col*/}
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-header"><strong>Subjects</strong></div>
                                <div className="card-body card-block">

                                    {subjects}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export const Form = withRouter(FormWithoutRouter);
import React from 'react';
import './login.css';
import { notify } from './../../util/notify';

import httpClient from './../../util/httpClient';

export class Login extends React.Component {
    constructor(){
        super();
        this.state={
            data:{

            },
            isSubmitting: false,
            remember_me: false
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            isSubmitting: true
        })

        httpClient.post(
           '/', this.state.data
        ).then(data=>{
            this.props.history.push('/dashboard');
        }).catch(err=>{
            const msg = err.response.data.msg;
            notify.error(msg);
            this.setState({
                isSubmitting: false
            })
        })

    }

    handleChange = e => {
        let { name , value } = e.target;
        this.setState( (preState)=>{
            return {
                data:{
                    ...preState.data,
                    [name]: value
                }
            }
        })
    }

    render(){
        let btn = this.state.isSubmitting
            ? <button disabled={true} className="btn btn-info btn-block">Logging in...</button>
            : <button className="btn btn-primary btn-block" type="submit">Log in</button>

        return <>
                <div className="login-form" onSubmit = {this.handleSubmit}>
                    <form>
                        <h2 className="text-center">Billing System</h2>
                            <div className="form-group">
                                <input className="form-control" onChange={this.handleChange} type="text" name="username" placeholder="Username"></input>
                           </div>
                           <div className="form-group">
                                <input className="form-control" onChange={this.handleChange} type="password" name="password" placeholder="password"></input>
                           </div>
                           <div className="form-group">
                               {btn}
                           </div>
                    </form>
                </div>
            </>
    }
}
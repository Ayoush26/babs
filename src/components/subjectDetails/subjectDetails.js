import axios from 'axios';
import React from 'react';
import { Loader } from '../common/loader/loader';
import { SubjectTable } from '../subjectTable/subjectTable';

export class SubjectDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            class:'Nursery',
            subjects:[],
            isLoading: false
        }
    }

    async componentDidMount(){
       this.setState(()=>{
           return{
               isLoading: true
           }
       },async()=>{
        try{
            const data = await axios.get(`${process.env.REACT_APP_HOST}/subject/${this.state.class}`)
            const subjects = data.data.data
            this.setState((preState)=>{
                return{
                    ...preState,
                    subjects: subjects,
                    isLoading: false
                }
            })
        }catch(e){
            console.log(e)
        }
       })
    }

    handleClick=(value)=>{
        this.setState(()=>{
            return{
                isLoading: true
            }
        },async()=>{
            try{
                const data = await axios.get(`${process.env.REACT_APP_HOST}/subject/${value}`)
                const subjects = data.data.data
                this.setState((preState)=>{
                    return{
                        ...preState,
                        class: value,
                        subjects: subjects,
                        isLoading: false
                    }
                })
            }catch(e){
                console.log(e)
            }
        })
    }

    render() {
        let activebutton = 'btn-primary active';
        return (
            <div className="content">
                <button onClick = {this.handleClick.bind(this,'Nursery')} className={`btn m-1 ${this.state.class==='Nursery'?activebutton:null}`}>Nursery</button>
                <button onClick = {this.handleClick.bind(this,'KG')} className={`btn m-1 ${this.state.class==='KG'?activebutton:null}`}>KG</button>
                <button onClick = {this.handleClick.bind(this,'1')} className={`btn m-1 ${this.state.class==='1'?activebutton:null}`}>1</button>
                <button onClick = {this.handleClick.bind(this,'2')} className={`btn m-1 ${this.state.class==='2'?activebutton:null}`}>2</button>
                <button onClick = {this.handleClick.bind(this,'3')} className={`btn m-1 ${this.state.class==='3'?activebutton:null}`}>3</button>
                <button onClick = {this.handleClick.bind(this,'4')} className={`btn m-1 ${this.state.class==='4'?activebutton:null}`}>4</button>
                <button onClick = {this.handleClick.bind(this,'5')} className={`btn m-1 ${this.state.class==='5'?activebutton:null}`}>5</button>
                <button onClick = {this.handleClick.bind(this,'6')} className={`btn m-1 ${this.state.class==='6'?activebutton:null}`}>6</button>
                <button onClick = {this.handleClick.bind(this,'7')} className={`btn m-1 ${this.state.class==='7'?activebutton:null}`}>7</button>
                <button onClick = {this.handleClick.bind(this,'8')} className={`btn m-1 ${this.state.class==='8'?activebutton:null}`}>8</button>
                <button onClick = {this.handleClick.bind(this,'9')} className={`btn m-1 ${this.state.class==='9'?activebutton:null}`}>9</button>
                <button onClick = {this.handleClick.bind(this,'10')} className={`btn m-1 ${this.state.class==='10'?activebutton:null}`}>10</button>
                {this.state.isLoading?<Loader></Loader>: <SubjectTable subjects={this.state.subjects} class={this.state.class} click={this.handleClick} ></SubjectTable>}
            </div>
        )
    }
}
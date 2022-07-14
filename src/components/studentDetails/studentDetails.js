import React, { useEffect, useState } from "react";
import { Loader } from "../common/loader/loader";
import { StudentTable } from "../studentTable/studentTable";

export const StudentDetials = () => {
  const [state, setState] = useState({
    isLoading: false,
    class: "Nursery",
  });

  // async componentDidMount(){
  //    this.setState(()=>{
  //        return{
  //            isLoading: true
  //        }
  //    },async()=>{
  //     try{
  //         const data = await axios.get(`${process.env.REACT_APP_HOST}/subject/${state.class}`)
  //         const subjects = data.data.data
  //         this.setState((preState)=>{
  //             return{
  //                 ...preState,
  //                 subjects: subjects,
  //                 isLoading: false
  //             }
  //         })
  //     }catch(e){
  //         console.log(e)
  //     }
  //    })
  // }

  const handleClick = (value) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      class: value,
    }));
  };

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      isLoading: false,
    }));
  }, [state.class]);

  let activebutton = "btn-primary active";
  return (
    <div className="content">
      <button
        disabled={state.class === "Nursery"}
        onClick={handleClick.bind(null, "Nursery")}
        className={`btn m-1 ${state.class === "Nursery" ? activebutton : null}`}
      >
        Nursery
      </button>
      <button
        disabled={state.class === "KG"}
        onClick={handleClick.bind(null, "KG")}
        className={`btn m-1 ${state.class === "KG" ? activebutton : null}`}
      >
        KG
      </button>
      <button
        disabled={state.class === "1"}
        onClick={handleClick.bind(null, "1")}
        className={`btn m-1 ${state.class === "1" ? activebutton : null}`}
      >
        1
      </button>
      <button
        disabled={state.class === "2"}
        onClick={handleClick.bind(null, "2")}
        className={`btn m-1 ${state.class === "2" ? activebutton : null}`}
      >
        2
      </button>
      <button
        disabled={state.class === "3"}
        onClick={handleClick.bind(null, "3")}
        className={`btn m-1 ${state.class === "3" ? activebutton : null}`}
      >
        3
      </button>
      <button
        disabled={state.class === "4"}
        onClick={handleClick.bind(null, "4")}
        className={`btn m-1 ${state.class === "4" ? activebutton : null}`}
      >
        4
      </button>
      <button
        disabled={state.class === "5"}
        onClick={handleClick.bind(null, "5")}
        className={`btn m-1 ${state.class === "5" ? activebutton : null}`}
      >
        5
      </button>
      <button
        disabled={state.class === "6"}
        onClick={handleClick.bind(null, "6")}
        className={`btn m-1 ${state.class === "6" ? activebutton : null}`}
      >
        6
      </button>
      <button
        disabled={state.class === "7"}
        onClick={handleClick.bind(null, "7")}
        className={`btn m-1 ${state.class === "7" ? activebutton : null}`}
      >
        7
      </button>
      <button
        disabled={state.class === "8"}
        onClick={handleClick.bind(null, "8")}
        className={`btn m-1 ${state.class === "8" ? activebutton : null}`}
      >
        8
      </button>
      <button
        disabled={state.class === "9"}
        onClick={handleClick.bind(null, "9")}
        className={`btn m-1 ${state.class === "9" ? activebutton : null}`}
      >
        9
      </button>
      <button
        disabled={state.class === "10"}
        onClick={handleClick.bind(null, "10")}
        className={`btn m-1 ${state.class === "10" ? activebutton : null}`}
      >
        10
      </button>
      {state.isLoading ? (
        <Loader></Loader>
      ) : (
        <StudentTable level={state.class} />
      )}
    </div>
  );
};

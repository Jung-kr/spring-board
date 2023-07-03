import { React, useEffect, useState } from "react";
import BoardList from "../components/BoardList/BoardList";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Main = () => {
  const [data, setData] = useState("")
  const handleInputBtnClick = (e) => {
    e.preventDefault();

  }
  useEffect(() => {
    const getBoardList = async () => {
        console.log('getBoardList()');
        let response = await axios.get("/board/all");
        console.log('main/response: ', response);
        setData(response.data.response);
    };
    getBoardList();
  }, [])
  return (
    <>
            <br/>
            <br/>
       <BoardList data={data}/>
       <Link to={"/create-board"} >
        <input type='button' value='게시글 작성'/>
       </Link>
    </>
  );
};

export default Main;
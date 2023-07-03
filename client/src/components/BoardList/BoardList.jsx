import React from "react";
import { Link } from 'react-router-dom';


const BoardList = (props) => {
   console.log('boerdList/props: ', props);
   console.log('boerdList/props.data: ', props.data);
  return (
    
    <>
    <h2 className="text-center">게시판</h2>
    <div className ="row">
    <table className="table text-center table-bordered">
        <thead>
            <tr>
                <th>글 번호</th>
                <th>제목 </th>
                <th>작성자 </th>
                <th>조회수 </th>
            </tr>
        </thead>
        <tbody>
        {Array.isArray(props.data) ?
        props.data.map((board) => (
            <tr className="text-center" key = {board.id}>
                <td> {board.id} </td>
                <Link
                  to = {"/detail"}
                    state = {{
                      id: board.id,
                    }}
                  >
                  <td>{board.title}</td>
                </Link>
                <td> {board.writer} </td>
                <td> {board.countVisit} </td>
            </tr>
      
        ))
        : null}
        </tbody>
    </table>
    </div>
    </>
  );
};

export default BoardList;
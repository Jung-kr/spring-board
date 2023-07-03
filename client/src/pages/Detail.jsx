// # frontend/src/pages/Detail.jsx
import React, {useEffect, useState} from "react"
import axios from 'axios';
import { useNavigate, useLocation, Link } from "react-router-dom";

const Detail = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [writer, setWriter] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.state.id; // 상세보기하려는 게시글의 id값
    console.log('Detail/id: ', id);
    const handleDeleteBtnClick = async (e) => {
        e.preventDefault();
        const request_data = {id: id};
        let response = await axios({
            method: 'delete',
            url: '/board/delete',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(request_data)
        });
        console.log('Detail/handleDeleteBtnClick/response: ', response);
        navigate("/", { });
    };

    useEffect(() => {
        const getDetailBoard = async () => {
            let response = await axios.get(`/board/detail/${id}`);
            console.log('Detail/response: ', response);
            console.log('Detail/response.data: ', response.data);
            console.log('Detail/response.data.data: ', response.data.data);
            setTitle(response.data.response.title);
            setContent(response.data.response.content);
            setWriter(response.data.response.writer);
        }
        getDetailBoard();
    }, [])
    
    return (
        <>
        <br/>
        <br/>        
                <div>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className ="text-center"> 게시글 상세보기</h3>
                    <div className = "card-body">
                    
                            <div className = "row">      
                                <label> [제목] </label> {title}
                            </div>
                            <br/>
                            <div className = "row">      
                                <label> [작성자] </label> {writer}
                            </div>
                            <br/>
                            <div className = "row">
                                <label> [내용] </label>  <br></br>
                                <textarea value={content} readOnly/> 
                            </div >
                            <br/>
                            
            <Link
                to = {"/"}
                state = {{ }}
            > | 게시글 목록 | </Link>
            <input type="button" onClick={handleDeleteBtnClick} value="삭제 하기"/>
            <Link
                to = {"/update-board"}
                state = {{
                    id: id,
                    title: title,
                    content: content,
                }}
            > | 게시글 수정 | </Link>
                    </div>
                </div>

            </div>


        </>
    )
}

export default Detail;
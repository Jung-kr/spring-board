// # frontend/src/pages/UpdateBoard.jsx
import { React, useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";

const UpdateBoard = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    let location = useLocation();
    let navigate = useNavigate(); // 다른 component 로 이동할 때 사용
    console.log('UpdateBoard/location.state: ', location.state);
    const id = location.state.id;  // 게시글 수정 이후 돌아갈 게시글의 id
    const old_title = location.state.title;
    const old_content = location.state.content;

    const resetInput = () => {
        setContent("");
        setTitle("");
        document.getElementById('input_title').value = '';
        document.getElementById('textarea_content').value = '';
    }

    const handleInputClick = async (e) => {
        e.preventDefault();
        document.getElementById('input_title').value = '';
        document.getElementById('textarea_content').value = '';
        console.log('writeBoard');
        const request_data = {id: id, title: title, content: content};
        console.log('req_data: ', request_data);
        try{
            let response = await axios({
				method: 'put',
				url: '/board/update',
				headers: {'Content-Type': 'application/json' },
				data: JSON.stringify(request_data)
			});
            console.log('writeBoard/response: ', response);
            console.log('writeBoard/response.status: ', response.status);
            navigate("/detail", { state : { id: id } });
        } catch (err) {
            console.log('CreateBoard/handleInput/err: ', err);
            resetInput();
        }
    }
    useEffect(() => {
            console.log('UpdateBoard/useEffect()');
	          setTitle(old_title);
            setContent(old_content);
            console.log('title: ', title);
            console.log('content: ', content);
        }, [])
    return (
        <>
            <br/>
            <br/>
            
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">게시글 수정하기</h3>
                            <div className = "card-body">
                                <form>

                                    <div className = "form-group">
                                        <label> 제목  </label>
                                        <input id='input_title' type="text" className="form-control" placeholder="수정할 제목을 입력해주세요" onChange={(e) => setTitle(e.target.value) } value={title} />
                                    </div>
                                    <br></br>
                                    <div className = "form-group">
                                        <label> 내용  </label>
                                        <textarea id='textarea_content' type="text" className="form-control" placeholder="수정할 내용을 입력해주세요" onChange={(e) => setContent(e.target.value) } value={content} />
                                    </div>
                                    <br></br>
                                    <input type="button" value="게시글 수정" onClick={handleInputClick}/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default UpdateBoard;
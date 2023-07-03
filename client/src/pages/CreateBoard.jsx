import React, {useState} from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const CreateBoard = () => {

    const [title, setTitle] = useState("");
    const [writer, setWriter] = useState("");
    const [content, setContent] = useState("");
    let navigate = useNavigate(); // 다른 component 로 이동할 때 사용

    const resetInput = () => {
        setContent("");
        setTitle("");
        setWriter("");
        document.getElementById('input_title').value = '';
        document.getElementById('textarea_content').value = '';
    }
    const handleInputClick = async (e) => {
        document.getElementById('input_title').value = '';
        document.getElementById('textarea_content').value = '';
        console.log('writeBoard');
        const request_data = {title: title, content: content, writer: writer};
        console.log('req_data: ', request_data);
        try{
            let response = await axios({
				method: 'post',
				url: '/board/create',
				headers: {'Content-Type': 'application/json'},
				data: JSON.stringify(request_data)
			});
            console.log('writeBoard/response: ', response);
            console.log('writeBoard/response.status: ', response.status);
            navigate("/", {});
        } catch (err) {
            console.log('CreateBoard/handleInput/err: ', err);
            resetInput();
        }
    }
    return (
        <>
            <br/>
            <br/>
            <br/>
         
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">게시글 등록</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> 작성자 </label>
                                        <input id='input_title' type="text" className="form-control" placeholder="작성자를 입력해주세요"  onChange={(e) => setWriter(e.target.value) } value={writer}></input>
                                    </div>
                                    <br></br>
                                    <div className = "form-group">
                                        <label> 제목  </label>
                                        <input id='input_title' type="text" className="form-control" placeholder="제목을 입력해주세요" onChange={(e) => setTitle(e.target.value) } value={title} />
                                    </div>
                                    <br></br>
                                    <div className = "form-group">
                                        <label> 내용  </label>
                                        <textarea id='textarea_content' type="text" className="form-control" placeholder="내용을 입력해주세요" onChange={(e) => setContent(e.target.value) } value={content} />
                                    </div>
                                    <br></br>
                                    <input type="button" value="저장" onClick={handleInputClick}/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default CreateBoard;
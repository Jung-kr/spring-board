// # main/frontend/src/compoents/BoardBox/BoardBox.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BoardBox = (props) => {
    console.log('beerBox/props: ', props);
    console.log('beerBox/props.title: ', props.title);
    return(
    <>
    
       <h2>{props.id}</h2>
        <Link
            to = {"/detail"}
             state = {{
                id: props.id,
             }}
        >
            <h1>{props.title}</h1>
 
        </Link>
    </>
    )
}

export default BoardBox;
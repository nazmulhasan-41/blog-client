import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArticleDetails_ShowComment from './ArticleDetails_ShowComment/ArticleDetails_ShowComment';

const ArticleDetails = () => {
    //call from singleArticle

    const { articleObj } = useParams();
    const loggedInUser=localStorage.getItem('loggedInUser');

    const jsonParsedArticle = JSON.parse(articleObj);
    const { articleCategory, articleText, date, userEmail, _id } = jsonParsedArticle;

    const [likeStatus,setLikeStatus]=useState('like');

    useEffect(()=>{

        const fileredObj=JSON.stringify({articleId:_id, loggedInUser});

        fetch(`http://localhost:5000/likeStatus/${fileredObj}`)
            .then(response => response.json())
            .then(data => 
                {
                    data.length>0 ? setLikeStatus('liked'): console.log('') 
                });
        
    },[])


    const addLikeHandler=()=>{
        if(likeStatus=='liked')
        {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ articleId:_id,loggedInUser })
            };
            fetch('http://localhost:5000/deleteLike', requestOptions)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    setLikeStatus('like')
                });

           
        }
        else{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ articleId:_id,loggedInUser })
            };
            fetch('http://localhost:5000/addLike', requestOptions)
                .then(response => response.json())
                .then(data => setLikeStatus('liked'));

        }  

    }

    return (
        <div>
            {_id}<br/>
            {articleCategory}<br/><br/>
            {articleText}<br/>
            {date}<br/>

            {userEmail}<br/>
            
        <button onClick={()=>addLikeHandler()} >{likeStatus}</button>
        <button>Add comment</button>
        <div>
            <ArticleDetails_ShowComment _id={_id}></ArticleDetails_ShowComment>
        </div>
        </div>
    );
};

export default ArticleDetails;
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import ArticleDetails_AddComment from './ArticleDetails_AddComment/ArticleDetails_AddComment';
import ArticleDetails_ShowComment from './ArticleDetails_ShowComment/ArticleDetails_ShowComment';

const ArticleDetails = () => {
    //call from singleArticle

    const { articleObj } = useParams();
    const loggedInUser=localStorage.getItem('loggedInUser');

    const jsonParsedArticle = JSON.parse(articleObj);
    const { articleCategory, articleText, date, userEmail, _id } = jsonParsedArticle;

    const [likeStatus,setLikeStatus]=useState('like');

    const [comments,setComments]=useState([]);
    const [renderFlag,setRenderFlag]=useState(true);
    const [likesCount,setLikesCount]=useState(0);

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
    
    
    const {   formState: { errors } } = useForm();
    const submitCommentHandler = (data,event) => 
    {
        // console.log(data);

        //Add comment in DB

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ articleId:_id,loggedInUser , commentText :data.commentText, commentTime: (new Date()).toDateString()})
        };
        fetch('http://localhost:5000/addComment', requestOptions)
            .then(response => response.json())
            .then(data => setRenderFlag((prev)=>!prev));

        event.target.reset();

    }
    
    //bring all comments
    useEffect(()=>{

        const fileredObj=JSON.stringify({articleId:_id});

        fetch(`http://localhost:5000/getComments/${fileredObj}`)
            .then(response => response.json())
            .then(data => 
                {
                    // data.length>0 ? setLikeStatus('liked'): console.log('') 
                    // console.log(data)
                    setComments(data)
                });

    },[renderFlag]);

    useEffect(()=>{
        //Get total like count
        const fileredObj=JSON.stringify({articleId:_id});

        fetch(`http://localhost:5000/getTotalLikes/${fileredObj}`)
            .then(response => response.json())
            .then(data => setLikesCount(data.length));

    },[likeStatus])


    return (
        <div>
            {_id}<br/>
            {articleCategory}<br/><br/>
            {articleText}<br/>
            {date}<br/>

            {userEmail}<br/>
            
        <button onClick={()=>addLikeHandler()} >{likeStatus}</button>

        Total likes: {likesCount}

        <ArticleDetails_AddComment submitCommentHandler={submitCommentHandler}></ArticleDetails_AddComment>

        <div>
            <ArticleDetails_ShowComment comments={comments}></ArticleDetails_ShowComment>
        </div>
        </div>
    );
};

export default ArticleDetails;
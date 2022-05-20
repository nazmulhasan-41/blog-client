import React, { useEffect, useState } from 'react';
import SingleArticle from './SingleArticle/SingleArticle';

const ViewMyArticleSection = () => {
    var LoggedInUser = localStorage.getItem('loggedInUser');

    const [myArticles, setMyArticles] = useState([]);
    const [flip,setFlip]=useState(true);
    const [updateFlip,setUpdateFlip]=useState(true);

    useEffect(() => {

        var filteredObj = {
            userEmail: LoggedInUser
        }
        var stringifyObj = JSON.stringify(filteredObj);

        fetch(`http://localhost:5000/getArticles/${stringifyObj}`)
            .then(response => response.json())
            .then(result => {
                setMyArticles(result)
            })

    }, [flip,updateFlip]);

    const deleteArticle = (articleId) => {

        fetch(`http://localhost:5000/deleteArticle/${articleId}`, { method: 'DELETE' })
        .then((response) =>response.json() )
        .then(result=>{
            setFlip((prevFlip)=>!prevFlip)
        })

    }

    const updateArticle = (artId,updatedArticle) => {

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedArticle)
        };
        console.log(requestOptions);

        fetch(`http://localhost:5000/updateArticle/${artId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setUpdateFlip((prevFlip)=>!prevFlip)

            });

    }

    return (
        <div className='articlesList'>
            {
                myArticles.map(article => (
                    <SingleArticle
                        article={article}
                        deleteArticle={deleteArticle}
                        updateArticle={updateArticle}
                    ></SingleArticle>

                ))
            }
        </div>
    );
};

export default ViewMyArticleSection;
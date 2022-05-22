import { stringToByteArray } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import SingleArticle from '../BlogByCategorySection/SingleArticle/SingleArticle';

const BlogPopularSection = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {

        // var filteringObj = JSON.stringify({ articleCategory: selectedCategory });

        fetch('http://localhost:5000/getArticlesJoinendLikes')
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                sortArray(result)
                setArticles(result)
            })
    },[])

    // sort artilcles by like count
    const sortArray=(articlesArray)=>{
        articlesArray.sort((a, b) => {
            return b.likesField.length - a.likesField.length;
        });

    }
     
  
    return (
        <div>
            <h1>BlogPopularSection</h1>
            {
                articles.map(article => (
                    <>
                        <SingleArticle article={article}></SingleArticle>

                        {/* {article.articleText} */}
                        Likes COunt: {article.likesField.length}

                    </>
                ))
            }
        </div>
    );
};

export default BlogPopularSection;
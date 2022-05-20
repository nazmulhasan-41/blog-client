import React from 'react';
import { Link } from 'react-router-dom';

const SingleArticle = ({ article }) => {
    //call from BlogByCAtegorySection

    const stringifyArticleObj=JSON.stringify(article);

    return (
        <div>
            <li>
                <Link to={`/articleDetails/${stringifyArticleObj}`}>
                {
                    article._id
                }
                </Link>
                <br/>
                {article.articleCategory}<br/>
                {article.articleText}<br/>
                {article.date}<br/>

            </li>

        </div>
    );
};

export default SingleArticle;
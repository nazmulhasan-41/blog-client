import React from 'react';
import ArticleDetails_ShowSingleComment from './ArticleDetails_ShowSingleComment/ArticleDetails_ShowSingleComment';

const ArticleDetails_ShowComment = ({comments}) => {
    // call from ArticleDetails
    //call from ArticleDetails
    return (
        <div>
            {
                comments.map(comment=><li><ArticleDetails_ShowSingleComment comment={comment}></ArticleDetails_ShowSingleComment></li>)
            }
        </div>
    );
};

export default ArticleDetails_ShowComment;
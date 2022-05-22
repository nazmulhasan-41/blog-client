import React from 'react';

const ArticleDetails_ShowSingleComment = ({comment}) => {
        const {loggedInUser , commentText , commentTime}=comment;

    return (
        <div>
            {loggedInUser}---{commentTime}===={commentText}
            
        </div>
    );
};

export default ArticleDetails_ShowSingleComment;
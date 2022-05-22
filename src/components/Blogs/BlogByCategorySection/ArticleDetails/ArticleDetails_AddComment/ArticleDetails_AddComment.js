import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ArticleDetails_AddComment = ({ submitCommentHandler }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <div>

            <form onSubmit={handleSubmit(submitCommentHandler)}>
                {/* register your input into the hook by invoking the "register" function */}
                <textarea placeholder='Write your comment' {...register("commentText")} />
                {errors.commentText && <span>This field is required</span>}

                <input type="submit" />
            </form>


        </div>
    );
};

export default ArticleDetails_AddComment;
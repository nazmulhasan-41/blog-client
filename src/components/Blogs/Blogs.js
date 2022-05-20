import React from 'react';
import BlogByCategorySection from './BlogByCategorySection/BlogByCategorySection';
import BlogCategorySection from './BlogCategorySection/BlogCategorySection';
import BlogPopularSection from './BlogPopularSection/BlogPopularSection';
import BlogSlideSection from './BlogSlideSection/BlogSlideSection';

const Blogs = () => {
    return (
        <div>

            <div className='slideSection'>
                <BlogSlideSection></BlogSlideSection>
            </div>

            <div className='categoriesSec'>
                <BlogCategorySection></BlogCategorySection>
            </div>

            <div className='blogsBYCategories'>
                <BlogByCategorySection></BlogByCategorySection>
            </div>
            <div className='popular'>
                <BlogPopularSection></BlogPopularSection>
            </div>
        </div>
    );
};

export default Blogs;
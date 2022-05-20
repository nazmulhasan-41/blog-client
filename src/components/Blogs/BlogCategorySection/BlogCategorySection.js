import React, { useEffect, useState } from 'react';

const BlogCategorySection = () => {
    const [categories,setCategories]=useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/getAllCategories')
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                setCategories(result)
            })
    }, [])

    return (
        <div>
            BlogCategorySection

            {
                categories.map(category=>(
                    <li>{category.categoryName}</li>
                ))
            }

            
        </div>
    );
};

export default BlogCategorySection;
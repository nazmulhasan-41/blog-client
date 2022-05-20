import React, { useEffect, useState } from 'react';
import SelectArticleCategory from './SelectArticleCategory/SelectArticleCategory';
import SingleArticle from './SingleArticle/SingleArticle';

const BlogByCategorySection = () => {

    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({ $exists: true });

    useEffect(() => {

        var filteringObj = { articleCategory: selectedCategory }
        const myJSON = JSON.stringify(filteringObj);

        fetch(`http://localhost:5000/getArticles/${myJSON}`)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                setArticles(result)
            })
    }, [selectedCategory])

    useEffect(() => {
        // const fruits = ["Banana", "Orange", "Apple", "Mango"];
        // fruits.push("Kiwi");fruits.includes("Mango");
        fetch('http://localhost:5000/getAllCategories')
            .then(response => response.json())
            .then(result => {

                var newCategories = []

                result.map(res => {
                    newCategories.includes(res.categoryName) ? console.log('') : newCategories.push(res.categoryName);
                }
                )
                setCategories(newCategories);
            })
    }, [])


    const selectCategoryHandler = (catg) => {
        // console.log(catg)
        setSelectedCategory(catg);
    }

    return (
        <div style={{ backgroundColor: 'GrayText' }}>
            <h3>BlogByCategorySection</h3>

            <h5>Category List</h5>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={()=>selectCategoryHandler({ $exists: true })}>All</button>
                {
                    categories.map(category => (
                        <SelectArticleCategory
                            category={category}
                            selectCategoryHandler={selectCategoryHandler}
                        ></SelectArticleCategory>

                    ))
                }

            </div>


            {
                articles.map(article => (
                    <SingleArticle article={article}></SingleArticle>
                ))
            }
        </div>
    );
};

export default BlogByCategorySection;
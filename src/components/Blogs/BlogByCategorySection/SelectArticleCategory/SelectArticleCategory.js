import React from 'react';

const SelectArticleCategory = ({category,selectCategoryHandler}) => {
    return (
        <div>
            <button onClick={()=>selectCategoryHandler(category)} style={{margin:'10px'}}>{category}</button>
        </div>
    );
};

export default SelectArticleCategory;
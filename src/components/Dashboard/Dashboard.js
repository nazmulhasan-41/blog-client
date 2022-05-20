import React from 'react';
import AddArticleSection from './AddArticleSection/AddArticleSection';
import ViewMyArticleSection from './ViewMyArticleSection/ViewMyArticleSection';


const Dashboard = () => {
    
    return (
        <div>
            <AddArticleSection></AddArticleSection>
            
            <ViewMyArticleSection></ViewMyArticleSection>
            
        </div>
    );
};

export default Dashboard;
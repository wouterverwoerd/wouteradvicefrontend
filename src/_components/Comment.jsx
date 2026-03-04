import React from 'react';


function Comment({title}) {
    return (
            <div className="commentClass">
            <h1>My comment {title}</h1>

            </div>
    );
}

export { Comment };
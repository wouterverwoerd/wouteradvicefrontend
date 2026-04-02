import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ideaService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [ideas, setIdeas] = useState(null);
    const baseUrl = "https://wouterverwoerd.github.io/advicefiles/";


    useEffect(() => {
        ideaService.getAll().then(x => setIdeas(x));
    }, []);

    function deleteIdea(id) {
        setIdeas(ideas.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        ideaService.delete(id).then(() => {
            setIdeas(ideas => ideas.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Things to think about</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Idea</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Description</th>
                        <th style={{ width: '30%' }}>Idea Date</th>
                        <th style={{ width: '10%' }}>Idea Filename</th>
                    </tr>
                </thead>
                <tbody>
                    {ideas && ideas.map(idea =>
                        <tr key={idea.id}>
                            <td>{idea.description}</td>
                            <td>{idea.ideaDate}</td>
                            <td>{idea.ideaFilename}
                                <a href={`${baseUrl}${idea.ideaFilename}`} rel="noopener noreferrer" target='_blank'><img width={`150px`} src={`${baseUrl}${idea.ideaFilename}`}
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src = "https://wouterverwoerd.github.io/advicefiles/noimage.jpg";
                                    }}
                                /></a></td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${idea.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteIdea(idea.id)} className="btn btn-sm btn-danger btn-delete-idea" disabled={idea.isDeleting}>
                                    {idea.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!ideas &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {ideas && !ideas.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Ideas To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };
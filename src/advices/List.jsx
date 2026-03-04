import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { adviceService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [advices, setAdvices] = useState(null);

    useEffect(() => {
        adviceService.getAll().then(x => setAdvices(x));
    }, []);

    function deleteAdvice(id) {
        setAdvices(advices.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        adviceService.delete(id).then(() => {
            setAdvices(advices => advices.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Advices</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Advice</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '40%' }}>Content</th>
                        <th style={{ width: '10%' }}>Filename</th>
                        <th style={{ width: '20%' }}>From UserID</th>
                        <th style={{ width: '20%' }}>To UserID</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {advices && advices.map(advice =>
                        <tr key={advice.id}>
                            <td>{advice.content}</td>
                            <td>{advice.filename}</td>
                            <td>{advice.userid}</td>
                            <td>{advice.touserid}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${advice.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteAdvice(advice.id)} className="btn btn-sm btn-danger btn-delete-advice" disabled={advice.isDeleting}>
                                    {advice.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!advices &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {advices && !advices.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Advices To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };
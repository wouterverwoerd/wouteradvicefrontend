import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { eventService } from '@/_services';

function Home() {
    const { path } = "/events";
    const [events, setEvents] = useState(null);
    const baseUrl = "http://localhost/files/";

    useEffect(() => {
        eventService.getCombined().then(x => setEvents(x));
    }, []);

    //
    const [events2, setEvents2] = useState(null);

    useEffect(() => {
        eventService.getCombined2().then(x => setEvents2(x));
    }, []);
    
    return (
        <div>
            <h1>Advice given and acted upon</h1>
            <p>Keeping track of what happened to the advice given to people.</p>
            <h1>Advice Instances</h1>
            <Link to={`advices/add`} className="btn btn-sm btn-success mb-2">Add Advice Instance</Link>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '50%' }}>Content</th>
                        <th style={{ width: '10%' }}>Edit</th>
                        <th style={{ width: '40%' }}>Events</th>
                    </tr>
                </thead>
                <tbody>
                    {events2 && events2.map(event2 =>
                        <tr key={event2.adviceID}>
                            <td>{event2.adviceDescription}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`advices/edit/${event2.adviceID}`} className="btn btn-sm btn-primary mr-1">Advice Details</Link>
                            </td>
                            {event2.Events.length > 0 &&
                                    <table className="table">
                                        {event2.Events && event2.Events.map(event3 =>
                                            <tr key={event3.eventID}>
                                                <td>{event3.eventDate}</td>
                                                <td>{event3.eventDescription}</td>
                                                <td style={{ whiteSpace: 'nowrap' }}>
                                                    <Link to={`events/edit/${event3.eventID}`} className="btn btn-sm btn-primary mr-1">Event Details</Link>
                                                </td>
                                            </tr>
                                    )}
                                    <tr>
                                        <td style={{ whiteSpace: 'nowrap' }}>
                                            <Link to={`events/add`} className="btn btn-sm btn-primary mr-1">Add Event</Link>
                                        </td>
                                    </tr>
                                    </table>
                            }
                            {!event2.Events.length &&
                                <table className="table table-striped">
                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            <div className="p-2">No Events To Display</div>
                                        </td>
                                        <td style={{ whiteSpace: 'nowrap' }}>
                                            <Link to={`events/add`} className="btn btn-sm btn-primary mr-1">Add Event</Link>
                                        </td>
                                    </tr>
                                </table>
                            }
                            
                        </tr>
                    )}
                    {!events2 &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {events2 && !events2.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Events To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>

        </div>
    );
}

export { Home };
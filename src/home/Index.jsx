import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { eventService } from '@/_services';

function Home() {
    const { path } = "/events";
    const [events, setEvents] = useState(null);
    const baseUrl = "https://wouterverwoerd.github.io/advicefiles/";

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

            
            {events2 && events2.map(event2 =>
                <div class="advicecontainer" style={{ border: '1px solid black', padding: '10px', margin: '10px', display: 'inline-block', width: '100%', clear: 'both' }}>
                    <div style={{ float: 'left', width: '33%' }}>{event2.adviceDescription}</div>
                    <div style={{ float: 'left', width: '33%', margin: '10px' }}><a href={`${baseUrl}${event2.adviceFilename}`} rel="noopener noreferrer" target='_blank'><img width={`150px`} src={`${baseUrl}${event2.adviceFilename}`}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = "https://wouterverwoerd.github.io/advicefiles/noimage.jpg";
                                }}
                            /></a></div>
                    <div style={{ whiteSpace: 'nowrap', float: 'left', width: '10%' }}>
                                <Link to={`advices/edit/${event2.adviceID}`} className="btn btn-sm btn-primary mr-1">Advice Details</Link>
                    </div>
                            {event2.Events.length > 0 &&
                        <div className="table" style={{ }}>
                                        {event2.Events && event2.Events.map(event3 =>
                                            <div style={{ display: 'inline-block', width: '100%', clear: 'both', padding: '10px', margintop: '10px', border: '1px solid black' }}>
                                                <div style={{ float: 'left', width: '10%' }}>{event3.eventDate}</div>
                                                <div style={{ float: 'left', width: '30%' }}>{event3.eventDescription}</div>
                                                <div style={{ float: 'left', width: '30%' }}><a href={`${baseUrl}${event3.eventFilename}`} rel="noopener noreferrer" target='_blank'><img width={`150px`} src={`${baseUrl}${event3.eventFilename}`}
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null; // prevents looping
                                                        currentTarget.src = "https://wouterverwoerd.github.io/advicefiles/noimage.jpg";
                                                    }}
                                                /></a></div>
                                                <div style={{ whiteSpace: 'nowrap', float: 'left', width: '10%' }}>
                                                    <Link to={`events/edit/${event3.eventID}`} className="btn btn-sm btn-primary mr-1">Event Details</Link>
                                                </div>
                                            </div>
                                        )}
                                    <div style={{ display: 'inline-block', width: '100%', clear: 'both' }}>
                                                    <div>
                                                        <Link to={`events/add`} className="btn btn-sm btn-primary mr-1">Add Event</Link>
                                                    </div>
                                    </div>
                               </div>
                            }
                            {!event2.Events.length &&
                                <div className="table table-striped">
                                    <div>
                                        
                                            <div className="p-2">No Events To Display</div>
                                        
                                        <div>
                                            <Link to={`events/add`} className="btn btn-sm btn-primary mr-1">Add Event</Link>
                                        </div>
                                    </div>
                                </div>
                            }
                            
                        </div>
                    )}
                    {!events2 &&
                        <div>
                            <div colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </div>
                        </div>
                    }
                    {events2 && !events2.length &&
                        <div>
                            <div colSpan="4" className="text-center">
                                <div className="p-2">No Events To Display</div>
                            </div>
                        </div>
                    }
                </div>

    );
}

export { Home };
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { eventService, alertService, userService, adviceService } from '@/_services';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;


    // form validation rules 
    const validationSchema = Yup.object().shape({
        description: Yup.string()
            .required('Description is required'),
        eventDate: Yup.string()
            .required('Event Date is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createEvent(data)
            : updateEvent(id, data);
    }

    function createEvent(data) {
        return eventService.create(data)
            .then(() => {
                alertService.success('Event added', { keepAfterRouteChange: true });
                history.push('/home');
            })
            .catch(alertService.error);
    }

    function updateEvent(id, data) {
        return eventService.update(id, data)
            .then(() => {
                alertService.success('Event updated', { keepAfterRouteChange: true });
                history.push('/home');
            })
            .catch(alertService.error);
    }

    const [adviceoptions, setAdviceOptions] = useState([]);

    const [useroptions, setUserOptions] = useState([]);

    useEffect(() => {
        if (!isAddMode) {
            // get event and set form fields
            eventService.getById(id).then(event => {
                console.log(event);
                const fields = ['description', 'eventDate', 'userid', 'adviceid', 'eventFilename'];
                fields.forEach(field => setValue(field, event[field]));

                const userresults = [];
                console.log(event);
                userresults.push({
                    key: event.userid,
                    value: event.userid,
                });
                setUserOptions([
                    ...userresults
                ]);

                const adviceresults = [];
                console.log(event);
                adviceresults.push({
                    key: event.adviceid,
                    value: event.adviceid,
                });
                setAdviceOptions([
                    ...adviceresults
                ]);

            });

        }
        if (isAddMode) {
            userService.getAll().then(user => {

                const results = [];
                // Store results in the results array
                user.forEach((value) => {
                    results.push({
                        key: value.email,
                        value: value.id,
                    });
                });
                console.log(results);
                // Update the options state
                setUserOptions([
                    { key: 'Select a user', value: '' },
                    ...results
                ])
                // console.log(useroptions);

            });
            adviceService.getAll().then(advice => {

                const results = [];
                // Store results in the results array
                advice.forEach((value) => {
                    results.push({
                        key: value.content,
                        value: value.id,
                    });
                });
                console.log(results);
                // Update the options state
                setAdviceOptions([
                    { key: 'Select advice', value: '' },
                    ...results
                ])
                // console.log(useroptions);

            })
        }
    }, []);

    var curr = new Date();
    curr.setDate(curr.getDate() + 0);
    var date = curr.toISOString().substring(0, 10);

    // console.log("x");
    const queryString = window.location.search;

    // Create a URLSearchParams object to work with the query string
    const params = new URLSearchParams(queryString);

    // Get the value of a specific query parameter (e.g., "id")
   var adviceId = params.get('adviceid');

   console.log(adviceId);


    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Event' : 'Edit Event'}</h1>
            <div className="form-row">
                <div className="form-group col-7">
                    <label>Description</label>
                    <textarea rows={5} cols={50} name="description" type="text" ref={register} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.description?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Event Date</label>
                    <input defaultValue={date} name="eventDate" type="text" ref={register} className={`form-control ${errors.eventDate ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.eventDate?.message}</div>
                </div>
                <div className="form-group col">
                    <label>User ID</label>
                    <select name="userid" ref={register} className={`form-control ${errors.role ? 'is-invalid' : ''}`}>
                        {useroptions.map((option) => {
                            return (
                                <option key={option.value} value={option.value}>
                                    {option.key}
                                </option>
                            );
                        })}
                    </select>
                    <div className="invalid-feedback">{errors.userid?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Advice ID</label>
                    <select value={adviceId} name="adviceid" ref={register} className={`form-control ${errors.role ? 'is-invalid' : ''}`}>
                        {adviceoptions.map((option) => {
                            return (
                                <option key={option.value} value={option.value}>
                                    {option.key}
                                </option>
                            );
                        })}
                    </select>
                    <div className="invalid-feedback">{errors.adviceid?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-7">
                    <label>Filename</label>
                    <input defaultValue="NoFile" name="eventFilename" type="text" ref={register} className={`form-control ${errors.eventFilename ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.eventFilename?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={isAddMode ? '/home' : '/home'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export { AddEdit };








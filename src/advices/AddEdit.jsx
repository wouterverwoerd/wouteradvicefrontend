import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { adviceService, alertService, userService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    // form validation rules 
    const validationSchema = Yup.object().shape({
        content: Yup.string()
            .required('Content is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createAdvice(data)
            : updateAdvice(id, data);
    }

    function createAdvice(data) {
        return adviceService.create(data)
            .then(() => {
                alertService.success('Advice added', { keepAfterRouteChange: true });
                history.push('/home');
            })
            .catch(alertService.error);
    }

    function updateAdvice(id, data) {
        return adviceService.update(id, data)
            .then(() => {
                alertService.success('Advice updated', { keepAfterRouteChange: true });
                history.push('/home');
            })
            .catch(alertService.error);
    }

    const [options, setOptions] = useState([]);
    const [tooptions, setToOptions] = useState([]);

    useEffect(() => {
        if (!isAddMode) {
            // get advice and set form fields
            adviceService.getById(id).then(advice => {
                const fields = ['content', 'filename', 'userid', 'touserid'];
                fields.forEach(field => setValue(field, advice[field]));
                const results = [];
                const toresults = [];
                console.log(advice);
                results.push({
                    key: advice.userid,
                    value: advice.userid,
                });
                toresults.push({
                    key: advice.touserid,
                    value: advice.touserid,
                });
                setOptions([
                    ...results
                ]);
                setToOptions([
                    ...toresults
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
                setOptions([
                    { key: 'Select a user', value: '' },
                    ...results
                ]);
               // console.log(useroptions);

                const toresults = [];
                // Store results in the results array
                user.forEach((value) => {
                    toresults.push({
                        key: value.email,
                        value: value.id,
                    });
                });
                console.log(toresults);
                // Update the options state
                setToOptions([
                    { key: 'Select a to user', value: '' },
                    ...toresults
                ])

            })
        }
        
    }, []);

    
    const [selectedFile, setSelectedFile] = useState(null);

    // Event handler to capture file selection
    const handleFileChange = (event) => {
        // Get the selected file(s) from the input element
        const files = event.target.files;
        if (files && files.length > 0) {
            // Store the first selected file in the state
            setSelectedFile(files[0].name);
            setValue('filename', selectedFile.name);
        } else {
            setSelectedFile(null);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Advice' : 'Edit Advice'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Content</label>
                    <input name="content" type="text" ref={register} className={`form-control ${errors.content ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.content?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-7">
                    <label>Filename</label>
                    <input value={selectedFile} name="filename" type="text" ref={register} className={`form-control ${errors.filename ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.filename?.message}</div>
                </div>

                <div className="form-group col-2">
                <label>Filename</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-1">
                    <label>From User ID</label>
                    <select name="userid" ref={register} className={`form-control ${errors.role ? 'is-invalid' : ''}`}>
                        {options.map((option) => {
                            return (
                                <option key={option.value} value={option.value}>
                                    {option.key}
                                </option>
                            );
                        })}
                    </select>
                    <div className="invalid-feedback">{errors.userid?.message}</div>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-1">
                    <label>To User ID</label>
                    <select name="touserid" ref={register} className={`form-control ${errors.role ? 'is-invalid' : ''}`}>
                        {tooptions.map((tooption) => {
                            return (
                                <option key={tooption.value} value={tooption.value}>
                                    {tooption.key}
                                </option>
                            );
                        })}
                    </select>
                    <div className="invalid-feedback">{errors.touserid?.message}</div>
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








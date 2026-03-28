import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { ideaService, alertService, userService, adviceService } from '@/_services';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;


    // form validation rules 
    const validationSchema = Yup.object().shape({
        description: Yup.string()
            .required('Description is required'),
        ideaDate: Yup.string()
            .required('Idea Date is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createIdea(data)
            : updateIdea(id, data);
    }

    function createIdea(data) {
        return ideaService.create(data)
            .then(() => {
                alertService.success('Idea added', { keepAfterRouteChange: true });
                history.push('/home');
            })
            .catch(alertService.error);
    }

    function updateIdea(id, data) {
        return ideaService.update(id, data)
            .then(() => {
                alertService.success('Idea updated', { keepAfterRouteChange: true });
                history.push('/home');
            })
            .catch(alertService.error);
    }

    const [adviceoptions, setAdviceOptions] = useState([]);

    const [useroptions, setUserOptions] = useState([]);

    useEffect(() => {
        if (!isAddMode) {
            // get event and set form fields
            ideaService.getById(id).then(idea => {
                console.log(idea);
                const fields = ['description', 'ideaDate', 'ideaFilename'];
                fields.forEach(field => setValue(field, idea[field]));


            });

        }
    }, []);

    var curr = new Date();
    curr.setDate(curr.getDate() + 0);
    var date = curr.toISOString().substring(0, 10);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Idea' : 'Edit Idea'}</h1>
            <div className="form-row">
                <div className="form-group col-7">
                    <label>Description</label>
                    <textarea rows={5} cols={50} name="description" type="text" ref={register} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.description?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Idea Date</label>
                    <input defaultValue={date} name="ideaDate" type="text" ref={register} className={`form-control ${errors.ideaDate ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.ideaDate?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-7">
                    <label>Filename</label>
                    <input defaultValue="NoFile" name="ideaFilename" type="text" ref={register} className={`form-control ${errors.ideaFilename ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.ideaFilename?.message}</div>
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








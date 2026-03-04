import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Nav, Alert, Comment, Button } from '@/_components';
import { Home } from '@/home';
import { Users } from '@/users';
import { Advices } from '@/advices';
import { Events } from '@/events';


function App() {
    const { pathname } = useLocation();  

    // Add Task
    const AddTask = ({ onAdd }) => {
        // const id = Math.floor(Math.random() * 10000) + 1
        // const newTask = { id, ...task }
        // setTasks([...tasks, newTask])
        console.log(0);
    }

    // <Comment title="param1" />
    // <Button
    //    color={true ? 'red' : 'green'}
    //    text={true ? 'Close' : 'Add'}
    //    onClick={AddTask}
    // />

    return (
        <div className="app-container bg-light">
            <Nav />
            <Alert />
            <div className="container pt-4 pb-4">
                <Switch>
                    <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                    <Route exact path="/" component={Home} />
                    <Route path="/users" component={Users} />
                    <Route path="/advices" component={Advices} />
                    <Route path="/events" component={Events} />
                    <Redirect from="*" to="/" />
                </Switch>
            </div>
        </div>
    );
}

export { App }; 
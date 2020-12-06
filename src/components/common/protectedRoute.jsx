
import { compact } from 'lodash';
import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getCurrentUser } from '../../services/authService';

const ProtectedRoute =({path, component: Component, render,...rest })=>
{
    return(
        <Route 
        {...rest}
        render ={props =>{
            if(!getCurrentUser) return <Redirect to='/Landing'/>;
            return Component?<Component {...props}/>: render(props)
        }}
        />

        
    );
}
export default ProtectedRoute;
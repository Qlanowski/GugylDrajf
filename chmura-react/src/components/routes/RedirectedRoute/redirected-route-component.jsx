
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export function RedirectedRoute({component: Component, isLoggedIn, shouldBeLoggedIn, ...rest}) {


    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn === shouldBeLoggedIn ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                    )
            }
        />
    )
}

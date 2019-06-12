import React from "react";
import { HeaderButton } from '../header-button/header-button-component'
import Button from '@material-ui/core/Button'

export function HeaderButtons(props) {
    const links = props.isLogged ? props.loggedInLinks : props.loggedOutLinks;
    return (
        <div>
            {
                links.map((item, index) =>
                    <HeaderButton link={item.path} name={item.name} key={index} />
                )
            }
            {
                props.isLogged && <Button onClick={props.logout} color="inherit">Log out</Button>
            }
        </div>
    );
}
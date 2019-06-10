import React from "react";
import { HeaderButton } from '../header-button/header-button-component'


export function HeaderButtons(props) {
    return props.isLogged ? (<div></div>) : (
        <div>
            {
                props.links.map((item, index) =>
                    <HeaderButton link={item.path} name={item.name} key={index} />
                )
            }
        </div>
    );
}
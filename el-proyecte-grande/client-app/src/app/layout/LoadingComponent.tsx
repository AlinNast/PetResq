import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
    inverted?: boolean;
}


export default function LoadingComponent({inverted = true}: Props) {
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader>
            <img src="\assets\loading.gif"></img>
            </Loader>
        </Dimmer>
    )
}
import { React } from "react";
import { FormControl, InputGroup } from "react-bootstrap";

function Input(props) {
    return (
        <div id={props.name}>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">{props.name}</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    aria-label={props.name}
                    aria-describedby="inputGroup-sizing-default"
                    id={props.name}
                />
            </InputGroup>
        </div>
    )
}

export default Input;

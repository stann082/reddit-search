import * as React from "react";
import { FormControl, InputGroup } from "react-bootstrap";

const Input: React.FC<{title: string}> = ({title}) => {
    return (
        <div id={title}>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">{title}</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    aria-label={title}
                    aria-describedby="inputGroup-sizing-default"
                    id={title}
                />
            </InputGroup>
        </div>
    )
};

export default Input;

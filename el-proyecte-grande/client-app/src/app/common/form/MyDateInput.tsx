import { useField } from "formik";
import React from "react";
import { Form, Label } from "semantic-ui-react";
import { StringLiteralLike } from "typescript";
import DatePicker, {ReactDatePicker, ReactDatePickerProps} from 'react-datepicker';

interface Props {
    placeholder: string;
    name: string;
    label?: string;
}


export default function MyDateInput (props: Partial<ReactDatePickerProps>) { //partial makes mandatory properties to be optional
    const [field, meta, helpers] = useField(props.name!);
    return (
        <Form.Field error={meta.touched && !!meta.error}> {/* the double ! is a cast for boolean*/}
            <DatePicker 
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}
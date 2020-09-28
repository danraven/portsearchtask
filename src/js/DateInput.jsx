import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { useFormContext } from 'react-hook-form';
import { TextField, TextLabel } from 'js/UI';
import 'react-datepicker/dist/react-datepicker.css';

function DateInput(props) {
    const { format, placeholder, name, label, minDate, maxDate } = props;
    const [selectedDate, setSelectedDate] = useState();
    const { register, unregister, setValue } = useFormContext();
    const onDateChange = useCallback(date => {
        setSelectedDate(date);
        setValue(name, date);
    }, [setValue, name]);

    useEffect(() => {
        register({ name }, { required: true });
        return () => unregister(name);
    }, [name, register, unregister]);

    return <div>
        {!!label && <TextLabel>{label}</TextLabel>}
        <DatePicker
            selected={selectedDate}
            customInput={<TextField name={name}/>}
            onChange={onDateChange}
            dateFormat={format}
            placeholderText={placeholder}
            minDate={minDate}
            maxDate={maxDate}
            showPopperArrow={false}
        />
    </div>;
}

DateInput.propTypes = {
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    format: PropTypes.string,
    label: PropTypes.string
};

DateInput.defaultProps = {
    format: 'yyyy-MM-dd'
};

export default DateInput;

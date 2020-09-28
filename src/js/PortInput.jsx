import React, { useState, useEffect, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useCombobox } from 'downshift';
import PropTypes from 'prop-types';
import { TextField, TextLabel, AutocompleteList, AutocompleteWrapper, AutocompleteItem } from 'js/UI';
import Api from 'js/Api';

function itemToString(item) {
    return item.name;
}

function PortInput(props) {
    const { placeholder, name, label, timeout, minLength } = props;
    const [itemList, setItemList] = useState([]);
    const { register, unregister, setValue: setFormValue } = useFormContext();
    let timer = null;

    const onInputValueChange = useCallback(({ type, inputValue }) => {
        setItemList([]);
        clearTimeout(timer);
        if (type !== useCombobox.stateChangeTypes.InputChange) {
            return;
        }
        setFormValue(name, null);
        if (inputValue.length >= minLength) {
            timer = setTimeout(() => Api.searchPorts(inputValue).then(list => setItemList(list.results)), timeout);
        }
    }, [minLength, name, setFormValue, timeout, timer]);

    const onSelectedItemChange = useCallback(({ selectedItem }) => {
        setItemList([]);
        setFormValue(name, selectedItem ? selectedItem.id : null);
    }, [setFormValue, name]);

    const { highlightedIndex, getLabelProps, getMenuProps, getInputProps, getComboboxProps, getItemProps } = useCombobox({
        items: itemList,
        onInputValueChange,
        itemToString,
        onSelectedItemChange
    });

    useEffect(() => {
        register({ name }, { required: true });
        return () => unregister(name);
    }, [name, register, unregister]);

    return <div>
        {!!label && <TextLabel {...getLabelProps()}>{label}</TextLabel>}
        <AutocompleteWrapper {...getComboboxProps()}>
            <TextField {...getInputProps()} placeholder={placeholder}/>
            <AutocompleteList hidden={!itemList.length} {...getMenuProps()}>
                {itemList.map((item, index) => <AutocompleteItem
                    key={item.id}
                    highlight={highlightedIndex === index}
                    {...getItemProps({ item, index })}
                >{item.name}</AutocompleteItem>)}
            </AutocompleteList>
        </AutocompleteWrapper>
    </div>;
}

PortInput.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    timeout: PropTypes.number,
    minLength: PropTypes.number
};

PortInput.defaultProps = {
    timeout: 300,
    minLength: 2
};

export default PortInput;

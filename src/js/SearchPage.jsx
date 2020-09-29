import React, { useState, useCallback } from 'react';
import PortInput from 'js/PortInput';
import DateInput from 'js/DateInput';
import Api from 'js/Api';
import RateChart from 'js/RateChart';
import { useForm, FormProvider } from 'react-hook-form';
import { TitleHeading, FormFields, ContentWrapper, Submit, InfoBar } from 'js/UI';

const FetchStates = {
    INIT: 0,
    FETCHED: 1,
    FETCHING: 2,
    ERROR: 3
};

function formatDate(dateObj) {
    return dateObj.toISOString().split('T')[0];
}

function displayInfo(fetchState, dataLength) {
    switch (fetchState) {
        case FetchStates.FETCHING:
            return 'Fetching data...';
        case FetchStates.ERROR:
            return 'Error during data retrieval.';
        case FetchStates.FETCHED:
            return `Found ${dataLength} records.`;
        default:
            return 'Unknown state';
    }
}

function SearchPage() {
    const form = useForm();
    const nowDate = new Date();
    const fromDate = form.watch('dateFrom');
    const toDate = form.watch('dateTo', nowDate);
    const [rates, setRates] = useState([]);
    const [fetchState, setFetchState] = useState(FetchStates.INIT);

    const onSubmit = useCallback(values => {
        setFetchState(FetchStates.FETCHING);
        const { portFrom, portTo, dateFrom, dateTo } = values;
        Api.getRates(portFrom, portTo, formatDate(dateFrom), formatDate(dateTo))
            .catch(() => {
                setFetchState(FetchStates.ERROR);
            })
            .then(result => {
                setRates(result.rates.reduce((acc, [name, rate]) => {
                    if (rate) {
                        acc.push({ name, rate });
                    }
                    return acc;
                }, []));
                setFetchState(FetchStates.FETCHED);
            });
    }, [FetchStates, formatDate]);

    return <FormProvider {...form}>
        <TitleHeading>Shipping rate lookup</TitleHeading>
        <ContentWrapper>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFields>
                    <PortInput name="portFrom" placeholder="Type to search" label="From port"/>
                    <PortInput name="portTo" placeholder="Type to search" label="To port"/>
                    <DateInput name="dateFrom" maxDate={toDate} placeholder="Pick a date" label="From date"/>
                    <DateInput name="dateTo" minDate={fromDate} maxDate={nowDate} placeholder="Pick a date" label="To date"/>
                    <Submit disabled={fetchState === FetchStates.FETCHING} type="submit">Go</Submit>
                </FormFields>
            </form>
            {(fetchState !== FetchStates.INIT) && <>
                <InfoBar error={fetchState === FetchStates.ERROR}>{displayInfo(fetchState, rates.length)}</InfoBar>
                {!!rates.length && <RateChart rates={rates}/>}
            </>}
        </ContentWrapper>
    </FormProvider>;
}

export default SearchPage;

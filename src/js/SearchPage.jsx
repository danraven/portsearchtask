import React, { useState, useCallback } from 'react';
import PortInput from 'js/PortInput';
import DateInput from 'js/DateInput';
import Api from 'js/Api';
import RateChart from 'js/RateChart';
import { useForm, FormProvider } from 'react-hook-form';
import { TitleHeading, FormFields, ContentWrapper, Submit, InfoBar } from 'js/UI';

function formatDate(dateObj) {
    return dateObj.toISOString().split('T')[0];
}

function SearchPage() {
    const form = useForm();
    const nowDate = new Date();
    const fromDate = form.watch('dateFrom');
    const toDate = form.watch('dateTo', nowDate);
    const [rates, setRates] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const onSubmit = useCallback(values => {
        setIsFetching(true);
        const { portFrom, portTo, dateFrom, dateTo } = values;
        Api.getRates(portFrom, portTo, formatDate(dateFrom), formatDate(dateTo))
            .then(result => {
                setRates(result.rates.reduce((acc, [name, rate]) => {
                    if (rate) {
                        acc.push({ name, rate });
                    }
                    return acc;
                }, []));
                setIsFetching(false);
            });
    });

    return <FormProvider {...form}>
        <TitleHeading>Shipping rate lookup</TitleHeading>
        <ContentWrapper>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFields>
                    <PortInput name="portFrom" placeholder="Type to search" label="From port"/>
                    <PortInput name="portTo" placeholder="Type to search" label="To port"/>
                    <DateInput name="dateFrom" maxDate={toDate} placeholder="Pick a date" label="From date"/>
                    <DateInput name="dateTo" minDate={fromDate} maxDate={nowDate} placeholder="Pick a date" label="To date"/>
                    <Submit disabled={isFetching} type="submit">Go</Submit>
                </FormFields>
            </form>
            <InfoBar>{isFetching ? 'Fetching data...' : `Found ${rates.length} records`}</InfoBar>
            {!!rates.length && <RateChart rates={rates}/>}
        </ContentWrapper>
    </FormProvider>;
}

export default SearchPage;

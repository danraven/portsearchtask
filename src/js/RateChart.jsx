import React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import { ChartWrapper } from 'js/UI';
import PropTypes from 'prop-types';

function RateChart(props) {
    const { rates } = props;

    return <ChartWrapper>
        <ResponsiveContainer>
            <BarChart width={400} height={300} data={rates.filter(item => !!item.rate)}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="rate" fill="#B9D9EB"/>
            </BarChart>
       </ResponsiveContainer>
    </ChartWrapper>;
}

RateChart.propTypes = {
    rates: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        rate: PropTypes.number
    }))
};

RateChart.defaultProps = {
    rates: []
};

export default React.memo(RateChart);

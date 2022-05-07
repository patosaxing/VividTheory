import React from 'react';
import { Scatter } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

const chart = ({ info, choice }) => {
    return 
    <div>
        <Scatter info = {info} choice = {choice} />
    </div>
}

export default chart;
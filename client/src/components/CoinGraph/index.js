import React, { useEffect, useState } from 'react';
import API from '../../utils/api';
import { Line } from 'react-chartjs-2';
// import { Chart } from 'chart.js';
import 'chartjs-adapter-luxon';
// import { registerables } from 'chart.js';
import "./style.css";

const { DateTime } = require("luxon");

const data = {

    labels: (function() {
        const label = [];
        for(var i = 0; i < 7; i++) {
            // set date to 'today' and pushes 'today' and the 'last 6 days' into the 'labels' array for our x-axis
            let date = new Date();
            label.unshift(DateTime.fromMillis(date.setDate(date.getDate() - i)).toLocaleString({ month: 'short', day: 'numeric' }))
        }
        return label
    })(),
    datasets: [
        {
            label: 'Coin Value',
            data: [12, 19, 3, 5, 2, 3, 7],
            // Need to loop and unshift value of coin into 'data' array for each of the 7 days here!!! -Cheng
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            
        },
    ],
};


const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
}


function CoinGraph() {

    return (
        <>
            <div className='header'>
                <h1 className='title'>History</h1>
            </div>
            <Line data={data} options={options} />
        </>
    )
}

export default CoinGraph;
import React, { useEffect, useState } from 'react';
import { Card } from "react-bootstrap";
import API from '../../utils/api';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import "./style.css";
import { DateTime } from 'luxon';
import { set } from 'mongoose';

function CoinGraph() {
    const [xAxis, setxAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);
    const [totalCoins, setTotalCoins] = useState([]);

    useEffect(() => {
        API.getValueData()
            .then((result) => {
                console.log(result);
                let label = [];
                let dataTemp = [];
                let totalCoins = [];
                for (var i = 0; i < result.data.length; i++) {
                    // looping through results and getting 'date' value and pushing it into 'label' array
                    label.push(DateTime.fromMillis(result.data[i].date).toLocaleString({ month: 'short', day: 'numeric' }))
                    // looping through results and getting 'usd_value' and pushing it into 'dataTemp' array
                    dataTemp.push(result.data[i].usd_value)
                    // totalCoins.push(result.data[i].total_coins)

                }
                // console.log(dataTemp);
                setxAxis(label);
                setYAxis(dataTemp);
                // setTotalCoins(totalCoins);
                setTotalCoins(result.data[result.data.length - 1].total_coins)
            });
    }, []);

    const data = {
        labels: xAxis,
        datasets: [
            {
                label: 'USD $',
                data: yAxis,
                fill: false,
                backgroundColor: 'rgba(60, 110, 113, 1)',
                borderColor: 'rgba(60, 110, 113, 0.3)',
                yAxisID: 'y'
            },
        ],
    };


    const options = {
        scales: {
            y: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    }

    return (
        <>
            <Card className="px-3 coinHeader">
                <div className='header'>
                    <h3>Coins in circulation: {totalCoins}</h3>
                </div>
            </Card>
            <Card className="px-3 chart">
                <h6 className='title'>History</h6>
                <Line data={data} options={options} />
            </Card>
        </>
    )
}

export default CoinGraph;
import React, { useEffect, useState } from 'react';
import API from '../../utils/api';
import { Line } from 'react-chartjs-2';


// API.getValueData()
// .then((res) => {
//     var arr = res.data;
//     arr.forEach(res => {
//         let labels;
//         const newLabels = labels.push(res.date);
//         setLabel(newLabels)
//     });
// })
// .catch((err) => {
//     console.log(err)
// })



const data = {
    labels: [],
    datasets: [
        {
            label: 'Coin Value',
            data: [12, 19, 3, 5, 2, 3],
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
        // const [graphData, setGraphData] = useState({})


        // const graph = () = {
        //     setGraphData({
        //         labels:[],
        //         datasets:[
        //             {
        //                 label: 'Coin Value',
        //                 data: [1,2]
        //             }
        //         ]
        //     })
        // }
        // useEffect(() => {
        //     graph()
        // }, [])
        
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
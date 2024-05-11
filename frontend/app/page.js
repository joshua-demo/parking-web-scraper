"use client"
import React, { useState, useEffect } from 'react';
import "chart.js/auto";
import { Bar } from 'react-chartjs-2';

// Bar Chart Component
function BarChart({ garageData }) {
  // Data for the Bar Chart
  const data = {
    labels: garageData.map(entry => entry["Garage Name"]),
    datasets: [
      {
        label: 'Fullness Percentage',
        data: garageData.map(entry => parseInt(entry["Fullness"])),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the Bar Chart
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          color: 'white',
          callback: function(value) {
            return value + '%';
          }
        }
      },
      x: {
        ticks: {
          color: 'white',
        }
      }
    },
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'white' 
        }
      },

    },
  };

  // Return the Bar Chart
  return (
    <div className="w-full h-full mt-8 ">
      <Bar data={data} options={options} />
    </div>
  );
}


export default function Home() {
  const [parkingData, setParkingData] = useState({});

  // Fetch data every second from the backend
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch data from the backend
  const fetchData = async () => {
    const response = await fetch('http://localhost:8000/parking');
    const data = await response.json();
    setParkingData(data);
  };

  // Fetch data on page load
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className='h-screen bg-slate-700'>

      {/* Header */}
      <div className="pt-6 pb-2 bg-blue-600">
        <h1 className="text-3xl font-bold text-center text-white">
          SPARTAN SPACES
        </h1>
      </div>

      {/* Gradient Bar */}
      <div className="bg-no-repeat bg-cover sjsu-gradientbar bg-gradient-to-r from-blue-500 via-yellow-400 to-blue-500">
        <div className="pt-2" />
      </div>

      {/* Display the last updated time */}
      {parkingData && (
        <h3 className="mt-4 text-center text-white/70">
          Last Updated {new Date(parkingData.time).toLocaleString()}
        </h3>
      )}

      {/* Display the Bar Chart */}
      <div className='flex mx-auto'>
        {parkingData.parking_data && (
          <div className='h-[calc(100vh-200px)] w-[calc(100vw-40px)] m-10'>
            <BarChart garageData={parkingData.parking_data} />
          </div>
        )}
      </div>
    </main>
  );
}

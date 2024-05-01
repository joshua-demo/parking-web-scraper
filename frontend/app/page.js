"use client"
import React, { useState, useEffect } from 'react';
import "chart.js/auto";
import { Bar } from 'react-chartjs-2';

function BarChart({ garageData }) {
  const data = {
    labels: garageData.map(entry => entry["Garage Name"]),
    datasets: [
      {
        label: 'Fullness Percentage',
        data: garageData.map(entry => parseInt(entry["Fullness"])),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
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

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    },
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
  };

  return (
    <div className="h-full w-full mt-8">
      <Bar data={data} options={options} />
    </div>
  );
}

export default function Home() {
  const [parkingData, setParkingData] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    const response = await fetch('http://localhost:8000/parking');
    const data = await response.json();
    setParkingData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className='h-screen'>
      <div className="bg-blue-600 pt-6 pb-2">
        <h1 className="text-center font-bold text-3xl text-white">
          SJSU Parking Data
        </h1>
      </div>
      {/* Gradient Bar */}
      <div className="sjsu-gradientbar bg-gradient-to-r from-blue-500 via-yellow-400 to-blue-500 bg-no-repeat bg-cover">
        <div className="pt-2" />
      </div>
      {parkingData && (
        <h3 className="text-center mt-4">
          Last Updated {new Date(parkingData.time).toLocaleString()}
        </h3>
      )}
      <div className='flex mx-auto p-10'>
        {parkingData.parking_data && (
          <div className='h-[calc(100vh-200px)] w-screen'>
            <BarChart garageData={parkingData.parking_data} />
          </div>
        )}
      </div>
    </main>
  );
}

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CandidateBarChart = ({ candidates }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (candidates && candidates.length > 0) {
      const candidateNames = candidates.map(candidate => candidate.name);
      const voteCounts = candidates.map(candidate => candidate.votes);

      if (chartRef.current) {
        chartRef.current.destroy(); // Destroy previous chart instance
      }

      const ctx = document.getElementById('candidate-chart').getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: candidateNames,
          datasets: [
            {
              label: 'Vote Count',
              data: voteCounts,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
              hoverBorderColor: 'rgba(75, 192, 192, 1)',
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: false, // Set to false to start the y-axis from one
            },
          },
        },
      });
    }
  }, [candidates]);

  return <canvas id="candidate-chart" />;
};

export default CandidateBarChart;

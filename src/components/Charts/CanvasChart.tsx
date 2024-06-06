import React, { useRef, useEffect } from 'react';

 const CanvasChart = ({ data, labels }) => {
    // useRef to reference the canvas element
    const canvasRef = useRef(null);

    useEffect(() => {
        // Get the canvas element and its drawing context
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear the canvas to start fresh each render
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Settings for the bar chart
        const padding = 50; // Space around the chart to not draw on the edge of the canvas
        const barWidth = 40; // The width of each bar
        const gap = 15; // The gap between each bar
        const yAxisLabelPadding = 10; // Space between the Y-axis and the labels
        let x = padding * 1.5; // Initial X position, set to padding times 1.5 to offset the first bar

        // Calculate the maximum value for the Y-axis
        const maxValue = Math.max(...data);

        // Drawing the Y-axis
        ctx.beginPath();
        ctx.moveTo(padding, padding); // Start at the upper-left corner with padding
        ctx.lineTo(padding, canvas.height - padding); // Draw down to the bottom-left corner with padding
        ctx.strokeStyle = '#000'; // Set the color of the axis line
        ctx.stroke(); // Execute the drawing of the line

        // Drawing the X-axis
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding); // Start at the bottom-left corner with padding
        ctx.lineTo(canvas.width - padding, canvas.height - padding); // Draw to the bottom-right corner with padding
        ctx.stroke(); // Execute the drawing of the line

        // Drawing bars and X-axis labels
        data.forEach((value, index) => {
            // Set the fill color for the bar
            ctx.fillStyle = '#3498db';
            // Draw the bar
            const barHeight = (value / maxValue) * (canvas.height - padding * 2); // Calculate bar height based on value
            ctx.fillRect(x, canvas.height - padding - barHeight, barWidth, barHeight); // Draw the bar

            // Set the fill color for the text (X-axis labels)
            ctx.fillStyle = '#000';
            ctx.font = '14px Arial';
            // Draw the X-axis label below the bar
            ctx.fillText(labels[index], x + (barWidth / 2) - (ctx.measureText(labels[index]).width / 2), canvas.height - padding + 20);

            x += barWidth + gap; // Move the x position for the next bar
        });

        // Drawing Y-axis labels
        const numberOfYLabels = 5; // For example, 5 labels on the Y-axis
        for (let i = 0; i <= numberOfYLabels; i++) {
            const yValue = (maxValue / numberOfYLabels) * i; // Calculate the value for the label
            const yPosition = canvas.height - padding - (yValue / maxValue) * (canvas.height - padding * 2); // Calculate the Y position

            // Draw the Y-axis label
            ctx.fillStyle = '#000';
            ctx.font = '14px Arial';
            ctx.fillText(yValue.toFixed(0), padding - yAxisLabelPadding - ctx.measureText(yValue.toFixed(0)).width, yPosition + 4); // Center text vertically
        }

    }, [data, labels]); // Dependencies of useEffect: the component will re-render when data or labels change

    // Return the canvas element with a ref attached
    return <canvas ref={canvasRef} width={500} height={500} />;
    
  };

  export default CanvasChart;
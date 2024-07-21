import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';

const ChartComponent= ({ data, color }) => {
    const chartRef = useRef(null);

    const getOption = (color) => {
        return {
            title: {
                textStyle: {
                    color: '#ffffff' 
                }
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                textStyle: {
                    color: color === 'darkBlue' ? "#ffffff" :'#000' 
                },
                orient: 'horizontal',
                bottom: 0,
                //top: '5%',
               // left: 'center'
            },
            color: ['#227cb4', '#d26e64', '#ffbf65', '#3cba54', '#db3e00', '#8e24aa'],
            series: [   
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            color: color === 'darkBlue' ? "#ffffff" :'#000' ,
                            show: true,
                            fontSize: 30,
                            //fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data
                }
            ]
        };
    };

    useEffect(() => {
        const handleResize = () => {
            if (chartRef.current) {
                (chartRef.current).getEchartsInstance().resize();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        
        <ReactECharts
            ref={chartRef}
            option={getOption(color)}
            style={{ height: '400px', width: '100%' }}
        />
    );
};

export default ChartComponent;

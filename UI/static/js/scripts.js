var dates= JSON.parse(document.getElementById('data_india_active_date').textContent);
var confirm_data = JSON.parse(document.getElementById('data_india_active_data').textContent);
var total_confirm_data = JSON.parse(document.getElementById('data_india_confirm_data').textContent);
var recover_data = JSON.parse(document.getElementById('data_india_recover_data').textContent);
var death_data = JSON.parse(document.getElementById('data_india_death_data').textContent);

window.Apex = {
    chart: {
      foreColor: '#ccc',
      toolbar: {
        show: false
      },
    },
    stroke: {
      width: 3
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      theme: 'dark'
    },
    grid: {
      borderColor: "#535A6C",
      xaxis: {
        lines: {
          show: true
        }
      }
    }
  };
  
  var spark1 = {
    chart: {
      id: 'spark1',
      group: 'sparks',
      type: 'line',
      height: 80,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      }
    },
    series: [{
      data: total_confirm_data.slice((total_confirm_data.length-20),total_confirm_data.length)
    }],
    labels: dates.slice((dates.length-20),dates.length),
    stroke: {
      curve: 'smooth'
    },
    markers: {
      size: 0
    },
    grid: {
      padding: {
        top: 20,
        bottom: 10,
        left: 10
      }
    },
    colors: ['#fff'],
    xaxis: {
      tooltip: {
        enabled: false
      },
      labels: {  
        
        datetimeFormatter: {
              year: 'yyyy',
              month: "MMM 'yy",
              day: 'dd MMM',
              hour: 'HH:mm',
          }
        },
        type: 'datetime',
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        },
        y: {
        title: {
          formatter: function formatter(val) {
            return '';
          }
        }
      }
    }
  }
  
  var spark2 = {
    chart: {
      id: 'spark2',
      group: 'sparks',
      type: 'line',
      height: 80,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      }
    },
    series: [{
      data: confirm_data.slice((confirm_data.length-20),confirm_data.length)
    }],
    labels: dates.slice((dates.length-20),dates.length),
    stroke: {
      curve: 'smooth'
    },    
    grid: {
      padding: {
        top: 20,
        bottom: 10,
        left: 10
      }
    },
    markers: {
      size: 0
    },
    colors: ['#fff'],
    xaxis: {
      tooltip: {
        enabled: false
      },
      labels: {  
        
        datetimeFormatter: {
              year: 'yyyy',
              month: "MMM 'yy",
              day: 'dd MMM',
              hour: 'HH:mm',
          }
        },
        type: 'datetime',
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        },
        y: {
        title: {
          formatter: function formatter(val) {
            return '';
          }
        }
      }
    }
  }
  
  var spark3 = {
    chart: {
      id: 'spark3',
      group: 'sparks',
      type: 'line',
      height: 80,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      }
    },
    series: [{
      data: recover_data.slice((recover_data.length-20),recover_data.length)
    }],
    stroke: {
      curve: 'smooth'
    },
    labels: dates.slice((dates.length-20),dates.length),
    markers: {
      size: 0
    },
    grid: {
      padding: {
        top: 20,
        bottom: 10,
        left: 10
      }
    },
    colors: ['#fff'],
    xaxis: {
      crosshairs: {
        width: 1
      },
    },
    xaxis: {
      tooltip: {
        enabled: false
      },
      labels: {  
        
        datetimeFormatter: {
              year: 'yyyy',
              month: "MMM 'yy",
              day: 'dd MMM',
              hour: 'HH:mm',
          }
        },
        type: 'datetime',
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        },
        y: {
        title: {
          formatter: function formatter(val) {
            return '';
          }
        }
      }
    }
  }
  
  var spark4 = {
    chart: {
      id: 'spark4',
      group: 'sparks',
      type: 'line',
      height: 80,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      }
    },
    series: [{
      data: death_data.slice((death_data.length-20),death_data.length)
    }],
    labels: dates.slice((dates.length-20),dates.length),
    stroke: {
      curve: 'smooth'
    },
    markers: {
      size: 0
    },
    grid: {
      padding: {
        top: 20,
        bottom: 10,
        left: 10
      }
    },
    colors: ['#fff'],
    xaxis: {
      crosshairs: {
        width: 1
      },
    },
    xaxis: {
      tooltip: {
        enabled: false
      },
      labels: {  
        
        datetimeFormatter: {
              year: 'yyyy',
              month: "MMM 'yy",
              day: 'dd MMM',
              hour: 'HH:mm',
          }
        },
        type: 'datetime',
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        },
        y: {
        title: {
          formatter: function formatter(val) {
            return '';
          }
        }
      }
    }
  }
  
  new ApexCharts(document.querySelector("#spark1"), spark1).render();
  new ApexCharts(document.querySelector("#spark2"), spark2).render();
  new ApexCharts(document.querySelector("#spark3"), spark3).render();
  new ApexCharts(document.querySelector("#spark4"), spark4).render();
  
  
  var optionsLine = {
    chart: {
      height: 328,
      type: 'line',
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 40,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true | '<img src="/static/icons/reset.png" width="30">',
          customIcons: []
        },
        export: {
          csv: {
            filename: "Covid_data",
            columnDelimiter: ',',
            headerCategory: 'category',
            headerValue: 'value',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString()
            }
          },
          svg: {
            filename: "Covid_Graph_SVG",
          },
          png: {
            filename: "Covid_Graph_PNG",
          }
        },
        autoSelected: 'zoom' 
      },
      zoom: {
        enabled: true,
        type: 'x',
        resetIcon: {
            offsetX: 310,
            offsetY: 40,
            fillColor: '#f00',
            strokeColor: '#37474F'
        },
        selection: {
            background: '#90CAF9',
            border: '#0D47A1'
        }
      },
      dropShadow: {
        enabled: true,
        top: 3,
        left: 2,
        blur: 4,
        opacity: 1,
      }
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    //colors: ["#3F51B5", '#2196F3'],
    series:[],
    title: {
      text: 'Covid Data',
      align: 'left',
      offsetY: 25,
      offsetX: 20
    },
    grid: {
      show: true,
      padding: {
        bottom: 0
      }     
    },
    labels: dates,
    time: {
      timezone: 'India Standard Time'
  },
    xaxis: {
      tooltip: {
        enabled: false
      },
      labels: {  
        
        datetimeFormatter: {
              year: 'yyyy',
              month: "MMM 'yy",
              day: 'dd MMM',
              hour: 'HH:mm',
          }
    },
    type: 'datetime',
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy'
    }
  },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetY: -20
    }    
  }
  
  var chartLine = new ApexCharts(document.querySelector('#line-adwords'), optionsLine);
  chartLine.render();
  chartLine.updateSeries([{
    name: "Confirmed",
    data: confirm_data,
    color:'#f00'
},
{
    name: "Recovered",
    data: recover_data,
    color:'#0f0'
},
{
    name: "Deceased",
    data: death_data,
    color:'#AA0'
}
])

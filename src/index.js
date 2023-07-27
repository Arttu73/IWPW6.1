import "./styles.css";

import { Chart } from "frappe-charts/dist/frappe-charts.min.esm";

const queryJson = {
  query: [
    {
      code: "Vuosi",
      selection: {
        filter: "item",
        values: [
          "2000",
          "2001",
          "2002",
          "2003",
          "2004",
          "2005",
          "2006",
          "2007",
          "2008",
          "2009",
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021"
        ]
      }
    },
    {
      code: "Alue",
      selection: {
        filter: "item",
        values: ["SSS"]
      }
    },
    {
      code: "Tiedot",
      selection: {
        filter: "item",
        values: ["vaesto"]
      }
    }
  ],
  response: {
    format: "json-stat2"
  }
};

const getData = async () => {
  const url =
    "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";

  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(queryJson)
  });

  if (!res.ok) {
    return;
  }

  const data = await res.json();
  return data;
};

const buildChart = async () => {
  const data = await getData();

  const chart = new Chart("#chart", {
    title: "Finnish parliamentary elections",
    data: data,
    type: "line",
    height: 450,
    colors: [
      "#f54b4b",
      "#ffde55",
      "#006288",
      "#349a2b",
      "#61bf1a",
      "#f00a64",
      "#ffdd93",
      "#0135a5"
    ],
    /*barOptions: {
        stacked: 1
    },*/
    lineOptions: {
      hideDots: 1,
      regionFill: 0
    }
  });

  /*
  const chart = new frappe.Chart("#chart", {
    title: "This is a title",
    data: data,
    type: "line",
    height: 450,
    colors: ["#eb5146"]
  });
*/
};

new Chart("#chart", {
  // or DOM element
  data: {
    labels: [
      "12am-3am",
      "3am-6am",
      "6am-9am",
      "9am-12pm",
      "12pm-3pm",
      "3pm-6pm",
      "6pm-9pm",
      "9pm-12am"
    ],

    datasets: [
      {
        name: "Some Data",
        chartType: "bar",
        values: [25, 40, 30, 35, 8, 52, 17, -4]
      },
      {
        name: "Another Set",
        chartType: "bar",
        values: [25, 50, -10, 15, 18, 32, 27, 14]
      },
      {
        name: "Yet Another",
        chartType: "line",
        values: [15, 20, -3, -15, 58, 12, -17, 37]
      }
    ],

    yMarkers: [{ label: "Marker", value: 70, options: { labelPos: "left" } }],
    yRegions: [
      { label: "Region", start: -10, end: 50, options: { labelPos: "right" } }
    ]
  },

  title: "My Awesome Chart",
  type: "axis-mixed", // or 'bar', 'line', 'pie', 'percentage'
  height: 300,
  colors: ["purple", "#ffa3ef", "light-blue"],
  axisOptions: {
    xAxisMode: "tick",
    xIsSeries: true
  },
  barOptions: {
    stacked: true,
    spaceRatio: 0.5
  },
  tooltipOptions: {
    formatTooltipX: (d) => (d + "").toUpperCase(),
    formatTooltipY: (d) => d + " pts"
  }
});

buildChart();

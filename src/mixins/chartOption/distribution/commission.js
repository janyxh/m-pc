// import { color } from "./utils";

export const getOption = (dataName = [], dataList0 = [], dataList1 = []) => {
  return {
    tooltip: {
      trigger: "axis",
      backgroundColor: "#ffffff",
      padding: 10,
      textStyle: {
        color: "#595757"
      },
      extraCssText: `
        border:1px solid rgba(220,221,221,1);
        box-shadow:0px 5px 10px 0px rgba(0, 0, 0, 0.08);
        font-size:12px;
        line-height: 2.4;
        color: "#595757"
      `
    },
    legend: {
      top: "20",
      data: ["新增客户数", "新增分销员数"]
    },
    grid: {
      show: false
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: "#E7E7E7"
        }
      },
      axisLabel: {
        color: function() {
          return "#9FA0A0";
        }
      },
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    },
    yAxis: {
      type: "value",
      splitLine: {
        lineStyle: {
          color: "#E7E7E7",
          type: "dashed"
        }
      },
      axisLabel: {
        // formatter: "{value} °C"
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        name: "新增客户数",
        type: "line",
        color: "#1F7FB2",
        tooltip: {
          backgroundColor: "rgba(255,255,255,1)"
        },
        data: [11, 11, 15, 13, 12, 13, 10]
      },
      {
        name: "新增分销员数",
        type: "line",
        color: "#12A718",
        data: [1, 2, 2, 5, 3, 2, 0]
      }
    ]
  };
};

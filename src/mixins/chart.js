// 绘制echarts图表
import echarts from "echarts";

export const chartsDraw = (dom, option) => {
  let myChart = echarts.init(dom);
  myChart.setOption(option);
  return myChart;
};

// 根据窗口变化大小
export const getChartWidth = () => {
  let bodywidth =
    document.documentElement.clientWidth || document.body.clientWidth;
  if (bodywidth < 1300) {
    return "300px";
  } else {
    return "400px";
  }
};

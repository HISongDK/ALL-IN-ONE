const getOpts = (title: string, data: any = []) => ({
  title: {
    text: title,
    textStyle: {
      fontWeight: 'normal',
      fontFamily: '宋体',
      lineHeight: 30,
    },
  },
  legend: { top: 15 },
  tooltip: { trigger: 'axis' },
  xAxis: {
    // type: 'time',
    type: 'category',
    interval: 0,
    axisLabel: {
      formatter: (val: string) => {
        return val.slice(5)
      },
    },
  },
  yAxis: {
    type: 'value',
  },
  dataset: {
    dimensions: ['date', '靠墙俯卧撑', '上斜俯卧撑'],
    source: data,
  },
  series: [
    {
      type: 'line',
      smooth: true,
      lineStyle: { width: 1.5 },
    },
    {
      type: 'line',
      smooth: true,
      lineStyle: { width: 1.5 },
    },
  ],
  dataZoom: [
    {
      type: 'inside',
      minSpan: 30,
      // maxSpan: 30,
      start: 100,
    },
    {
      type: 'slider',
      height: 20,
    },
  ],
})

export default getOpts

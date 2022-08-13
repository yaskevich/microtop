<template>
  <div ref="mapRef" id="map">
    <svg ref="svgRef" :width="svgWidth" :height="svgHeight">
      <text x="0" y="15" class="title">{{ unit }}</text>
      <text x="0" y="60" class="quantity">{{ num }}</text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import store from '../store';
import * as d3 from 'd3';

const svgWidth = ref(0);
const svgHeight = ref(0);

let legendOffsetY = 0;
const legendOffsetX = 5;
const legendHeight = 20;
const legendRightMargin = 50;
let legendCellWidth = 5;

const unit = ref('');
const num = ref('');
const svgRef = ref(null);
const mapRef = ref<HTMLElement | null>(null);

onMounted(() => {
  let svg = d3.select(svgRef.value);
  const parentNode = d3.select(mapRef.value).node();

  if (parentNode !== null) {
    svgWidth.value = parentNode.getBoundingClientRect().width;
  }

  svgHeight.value = svgWidth.value * 1;
  // console.log(svgWidth.value, svgHeight.value);
  legendOffsetY = svgHeight.value - 50;

  const projection = d3.geoMercator()
    .center([28, 53.15])
    .scale(svgWidth.value / Math.PI * 16)
    .translate([svgWidth.value >> 1, svgHeight.value >> 1]);

  const ext = d3.extent(store.geofeatures, (d: any) => d.properties.pubs as number);

  if (!ext[0] || !ext[1]) {
    return;
  }

  const colorize = d3.scaleLinear<string>().domain(ext).clamp(true).range(['#f1eef6', '#0570b0']);
  // const colorMap = d3.scaleQuantile<string>().domain(ext).range(['#f1eef6', '#0570b0']);
  const scaleLength = ext[1] - ext[0];

  legendCellWidth = (svgWidth.value - legendRightMargin) / scaleLength;

  svg.append("g")
    .selectAll("path")
    .data(store.geofeatures)
    .join("path")
    .classed('district', true)
    .attr('fill', (d: any) => {
      // const n = d.properties.pubs;
      // if (n > 30) {
      //   return '#0570b0';
      // }
      // if (n > 20) {
      //   return '#74a9cf';
      // }
      // if (n > 10) {
      //   return '#bdc9e1';
      // }
      // return '#f1eef6';
      return colorize(d.properties.pubs);
    })
    .attr("d", d3.geoPath().projection(projection) as any)
    .on("mouseover", (e, d: any) => {
      unit.value = d.properties.name + ' раён';
      num.value = String(d.properties.pubs);
    })
    .on("mouseout", function () {
      unit.value = num.value = '';
    });

  const legend = svg.append('g');

  legend
    .selectAll('.legend')
    .data(d3.range(scaleLength))
    .enter().append('rect')
    .attr('x', d => legendOffsetX + d * legendCellWidth + 'px')
    .attr("y", legendOffsetY)
    .attr("width", legendCellWidth)
    .attr("height", legendHeight)
    .attr('fill', d => colorize(d));

  legend
    .append("g")
    .attr("transform", `translate(${legendOffsetX},${legendOffsetY + legendHeight})`)
    .call(d3.axisBottom(d3.scaleLinear().domain(ext).range([0, scaleLength * legendCellWidth])).ticks(Math.round(ext[1] / 10)));

});

</script>

<style scoped lang="scss">
:deep(.district) {
  stroke: silver;

  &:hover {
    fill: #fbd0da;
  }
}
:deep(.title) {
  /* fill: #2196f3;
  fill: #0570b0; */
  fill: #5f071c;
}
:deep(.quantity) {
  /* fill: #2196f3; 
  fill: #0570b0;*/
  fill: #5f071c;
  font-size: 2em;
}
</style>

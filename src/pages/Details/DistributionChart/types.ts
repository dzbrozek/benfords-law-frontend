export interface DistributionChartProps {
  expectedData: { x: string; y: number }[];
  actualData: { x: string; y: number }[];
  colorScale: string[];
  labels: string[];
}

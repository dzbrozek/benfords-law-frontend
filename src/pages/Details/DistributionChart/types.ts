export interface DistributionChartProps {
  expectedData: { x: string; y: number }[];
  actualData: { x: string; y: number }[];
  colorScale: [string, string];
  labels: [string, string];
}

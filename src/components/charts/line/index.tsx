import { LineChart } from "@mui/x-charts/LineChart";

interface CustomProps {
  keys: string[];
  values: number[];
}

const Linechart = ({ keys, values }: CustomProps) => {
  return (
    <LineChart
      series={[{ type: "line", data: [...values] }]}
      xAxis={[{ scaleType: "point", data: [...keys] }]}
      sx={{
        ".MuiLineElement-root": {
          stroke: "#8884d8",
          strokeWidth: 2,
        },
        ".MuiMarkElement-root": {
          stroke: "#8884d8",
          scale: "0.6",
          fill: "#fff",
          strokeWidth: 2,
        },
      }}
      disableAxisListener
      className="w-full h-full bg-transparent"
    />
  );
};

export default Linechart;

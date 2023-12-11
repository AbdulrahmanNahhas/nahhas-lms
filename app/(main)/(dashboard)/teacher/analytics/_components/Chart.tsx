"use client";

import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  data: {
    name: string;
    total: number;
  }[];
}

const Chart = ({ data }: ChartProps) => {
  return (
    <Card className="w-full max-w-5xl mx-auto">
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" fontSize={12} />
          <YAxis tickFormatter={(value) => `TRY ${value}`} fontSize={12}/>
          {/* <Tooltip />
          <Legend /> */}
          <Bar
            dataKey="total"
            fill="#82ca9d"
            radius={[4,4,0,0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;

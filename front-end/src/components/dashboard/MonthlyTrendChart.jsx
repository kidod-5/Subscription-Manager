import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MonthlyTrendChart = ({ subscriptions }) => {
  // Generate mock monthly data based on subscriptions
  const activeSubscriptions = subscriptions.filter((s) => s.status === "active");
  const totalMonthlySpend = activeSubscriptions.reduce((sum, sub) => {
    let monthlyAmount = sub.price;
    switch (sub.interval) {
      case "daily":
        monthlyAmount = sub.price * 30;
        break;
      case "weekly":
        monthlyAmount = sub.price * 4;
        break;
      case "yearly":
        monthlyAmount = sub.price / 12;
        break;
      default:
        monthlyAmount = sub.price;
    }
    return sum + monthlyAmount;
  }, 0);

  // Generate last 6 months of data (with slight variations for demo)
  const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = months.map((month, index) => ({
    name: month,
    spend: Math.round(totalMonthlySpend * (0.85 + Math.random() * 0.3) * 100) / 100,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="font-bold text-primary">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="font-display">Monthly Spending Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(252, 85%, 60%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(252, 85%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 88%)" opacity={0.3} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="spend"
              stroke="hsl(252, 85%, 60%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSpend)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlyTrendChart;

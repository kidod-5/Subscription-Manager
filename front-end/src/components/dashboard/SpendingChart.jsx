import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = [
  "hsl(252, 85%, 60%)", // primary
  "hsl(172, 66%, 50%)", // accent
  "hsl(38, 92%, 50%)",  // warning
  "hsl(0, 72%, 51%)",   // destructive
  "hsl(280, 65%, 60%)", // chart-5
];

const SpendingChart = ({ subscriptions }) => {
  // Group by category and calculate monthly spend
  const categoryData = subscriptions
    .filter((s) => s.status === "active")
    .reduce((acc, sub) => {
      const category = sub.category || "other";
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

      const existingCategory = acc.find((c) => c.name === category);
      if (existingCategory) {
        existingCategory.value += monthlyAmount;
      } else {
        acc.push({ name: category, value: monthlyAmount });
      }
      return acc;
    }, []);

  const formattedData = categoryData.map((item) => ({
    ...item,
    name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
    value: Math.round(item.value * 100) / 100,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass rounded-lg p-3 shadow-lg">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-primary font-bold">${payload[0].value.toFixed(2)}/mo</p>
        </div>
      );
    }
    return null;
  };

  if (formattedData.length === 0) {
    return (
      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-display">Spending by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">No active subscriptions to display</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="font-display">Spending by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={formattedData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
            >
              {formattedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SpendingChart;

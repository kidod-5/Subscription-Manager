import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, CreditCard, Calendar, DollarSign, Activity } from "lucide-react";

const StatsCards = ({ subscriptions }) => {
  // Calculate statistics
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

  const totalYearlySpend = totalMonthlySpend * 12;

  // Find upcoming renewals (within 7 days)
  const upcomingRenewals = activeSubscriptions.filter((sub) => {
    if (!sub.renewalDate) return false;
    const renewal = new Date(sub.renewalDate);
    const today = new Date();
    const diffDays = Math.ceil((renewal - today) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  }).length;

  const stats = [
    {
      title: "Active Subscriptions",
      value: activeSubscriptions.length,
      icon: CreditCard,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Monthly Spend",
      value: `$${totalMonthlySpend.toFixed(2)}`,
      icon: DollarSign,
      color: "text-accent",
      bgColor: "bg-accent/10",
      trend: "+2.5%",
      trendUp: true,
    },
    {
      title: "Yearly Projection",
      value: `$${totalYearlySpend.toFixed(2)}`,
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Upcoming Renewals",
      value: upcomingRenewals,
      subtext: "Next 7 days",
      icon: Calendar,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className="glass hover:shadow-glow transition-all duration-300 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-display font-bold">{stat.value}</p>
                {stat.subtext && (
                  <p className="text-xs text-muted-foreground">{stat.subtext}</p>
                )}
                {stat.trend && (
                  <div className="flex items-center gap-1 mt-1">
                    {stat.trendUp ? (
                      <TrendingUp className="w-3 h-3 text-success" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-destructive" />
                    )}
                    <span className={`text-xs ${stat.trendUp ? "text-success" : "text-destructive"}`}>
                      {stat.trend} from last month
                    </span>
                  </div>
                )}
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;

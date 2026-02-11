import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { CreditCard, TrendingUp, Bell, Shield, ArrowRight } from "lucide-react";
import { useEffect } from "react";

const features = [
  {
    icon: CreditCard,
    title: "Track All Subscriptions",
    description: "Keep all your subscriptions organized in one place with automatic renewal tracking.",
  },
  {
    icon: TrendingUp,
    title: "Spending Analytics",
    description: "Visualize your monthly and yearly spending with interactive charts and insights.",
  },
  {
    icon: Bell,
    title: "Renewal Alerts",
    description: "Never miss a payment with timely notifications before your subscriptions renew.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your financial data is encrypted and protected with industry-standard security.",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
              <CreditCard className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">SubHub</span>
          </div>
          <Button
            onClick={() => navigate("/auth")}
            variant="outline"
            className="rounded-full"
          >
            Sign In
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 pt-16 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Track your subscriptions effortlessly
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
            Take Control of Your{" "}
            <span className="gradient-text">Subscription</span> Spending
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "200ms" }}>
            Stop losing money on forgotten subscriptions. Track, analyze, and optimize all your recurring expenses in one beautiful dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <Button
              onClick={() => navigate("/auth")}
              size="lg"
              className="gradient-primary text-primary-foreground shadow-lg hover:shadow-glow transition-all text-lg px-8 h-12 rounded-full"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 h-12 rounded-full"
              onClick={() => navigate("/dashboard")}
            >
              View Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass rounded-2xl p-6 hover:shadow-glow transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-24 glass rounded-3xl p-8 sm:p-12 animate-fade-in" style={{ animationDelay: "800ms" }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl sm:text-5xl font-display font-bold gradient-text">$247</p>
              <p className="text-muted-foreground mt-2">Average monthly savings</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-display font-bold gradient-text">12+</p>
              <p className="text-muted-foreground mt-2">Subscriptions tracked</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-display font-bold gradient-text">100%</p>
              <p className="text-muted-foreground mt-2">Free to use</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 SubHub. Built with React & Express.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

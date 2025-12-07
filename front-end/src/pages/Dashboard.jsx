import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import Header from "@/components/dashboard/Header";
import StatsCards from "@/components/dashboard/StatsCards";
import SpendingChart from "@/components/dashboard/SpendingChart";
import MonthlyTrendChart from "@/components/dashboard/MonthlyTrendChart";
import SubscriptionList from "@/components/dashboard/SubscriptionList";
import SubscriptionForm from "@/components/dashboard/SubscriptionForm";
import { useSubscriptions } from "@/hooks/useSubscriptions";

// Mock data for demo when API is not available
const MOCK_SUBSCRIPTIONS = [
  {
    _id: "1",
    name: "Netflix",
    price: 15.99,
    currency: "USD",
    interval: "monthly",
    category: "entertainment",
    paymentMethod: "Credit Card",
    status: "active",
    startDate: "2024-01-15",
    renewalDate: "2025-01-15",
  },
  {
    _id: "2",
    name: "Spotify",
    price: 9.99,
    currency: "USD",
    interval: "monthly",
    category: "entertainment",
    paymentMethod: "PayPal",
    status: "active",
    startDate: "2024-03-01",
    renewalDate: "2025-01-01",
  },
  {
    _id: "3",
    name: "Adobe Creative Cloud",
    price: 54.99,
    currency: "USD",
    interval: "monthly",
    category: "utilities",
    paymentMethod: "Credit Card",
    status: "active",
    startDate: "2024-06-01",
    renewalDate: "2025-01-01",
  },
  {
    _id: "4",
    name: "Coursera Plus",
    price: 399,
    currency: "USD",
    interval: "yearly",
    category: "education",
    paymentMethod: "Credit Card",
    status: "active",
    startDate: "2024-09-01",
    renewalDate: "2025-09-01",
  },
  {
    _id: "5",
    name: "Gym Membership",
    price: 49.99,
    currency: "USD",
    interval: "monthly",
    category: "lifestyle",
    paymentMethod: "Debit Card",
    status: "active",
    startDate: "2024-02-01",
    renewalDate: "2025-01-01",
  },
];

const Dashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);

  const {
    subscriptions,
    isLoading,
    isError,
    createSubscription,
    updateSubscription,
    deleteSubscription,
    cancelSubscription,
    isCreating,
    isUpdating,
    isDeleting,
  } = useSubscriptions();

  // Use mock data if API fails or no subscriptions
  const displaySubscriptions = isError || subscriptions.length === 0 
    ? MOCK_SUBSCRIPTIONS 
    : subscriptions;

  const handleOpenForm = (subscription = null) => {
    setEditingSubscription(subscription);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingSubscription(null);
  };

  const handleSubmit = (data) => {
    if (editingSubscription) {
      updateSubscription(
        { id: editingSubscription._id, data },
        { onSuccess: handleCloseForm }
      );
    } else {
      createSubscription(data, { onSuccess: handleCloseForm });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-display font-bold">Dashboard</h2>
            <p className="text-muted-foreground mt-1">
              Track and manage all your subscriptions in one place
            </p>
          </div>
          <Button
            onClick={() => handleOpenForm()}
            className="gradient-primary text-primary-foreground shadow-lg hover:shadow-glow transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Subscription
          </Button>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Stats cards */}
        {!isLoading && <StatsCards subscriptions={displaySubscriptions} />}

        {/* Charts */}
        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SpendingChart subscriptions={displaySubscriptions} />
            <MonthlyTrendChart subscriptions={displaySubscriptions} />
          </div>
        )}

        {/* Subscription list */}
        {!isLoading && (
          <SubscriptionList
            subscriptions={displaySubscriptions}
            onEdit={handleOpenForm}
            onDelete={deleteSubscription}
            onCancel={cancelSubscription}
            isDeleting={isDeleting}
          />
        )}

        {/* Demo mode notice */}
        {isError && (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              📡 Backend not connected. Showing demo data. 
              <br />
              Update the API_BASE_URL in <code className="bg-muted px-1 rounded">src/lib/api.js</code> when your backend is ready.
            </p>
          </div>
        )}
      </main>

      {/* Subscription form modal */}
      <SubscriptionForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        editingSubscription={editingSubscription}
        isLoading={isCreating || isUpdating}
      />
    </div>
  );
};

export default Dashboard;

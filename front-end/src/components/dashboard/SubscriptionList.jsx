import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreVertical, Pencil, Trash2, XCircle, Calendar, DollarSign } from "lucide-react";
import { format } from "date-fns";

const statusColors = {
  active: "bg-success/10 text-success border-success/20",
  canceled: "bg-muted text-muted-foreground border-muted",
  expired: "bg-destructive/10 text-destructive border-destructive/20",
};

const categoryIcons = {
  entertainment: "🎬",
  education: "📚",
  utilities: "⚡",
  lifestyle: "✨",
  other: "📦",
};

const SubscriptionList = ({
  subscriptions,
  onEdit,
  onDelete,
  onCancel,
  isDeleting,
}) => {
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  const formatCurrency = (amount, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const getIntervalLabel = (interval) => {
    const labels = {
      daily: "/day",
      weekly: "/week",
      monthly: "/mo",
      yearly: "/year",
    };
    return labels[interval] || "";
  };

  if (subscriptions.length === 0) {
    return (
      <Card className="glass">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <DollarSign className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-display font-semibold text-lg mb-2">No subscriptions yet</h3>
          <p className="text-muted-foreground">
            Add your first subscription to start tracking your spending
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="glass">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-display">Your Subscriptions</CardTitle>
          <span className="text-sm text-muted-foreground">
            {subscriptions.length} total
          </span>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {subscriptions.map((subscription, index) => (
              <div
                key={subscription._id || index}
                className="p-4 hover:bg-muted/30 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-lg shrink-0">
                      {categoryIcons[subscription.category] || "📦"}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium truncate">{subscription.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="capitalize">{subscription.category}</span>
                        {subscription.renewalDate && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {format(new Date(subscription.renewalDate), "MMM d, yyyy")}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-semibold">
                        {formatCurrency(subscription.price, subscription.currency)}
                        <span className="text-sm font-normal text-muted-foreground">
                          {getIntervalLabel(subscription.interval)}
                        </span>
                      </p>
                      <Badge
                        variant="outline"
                        className={`text-xs ${statusColors[subscription.status]}`}
                      >
                        {subscription.status}
                      </Badge>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass">
                        <DropdownMenuItem onClick={() => onEdit(subscription)}>
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        {subscription.status === "active" && (
                          <DropdownMenuItem onClick={() => onCancel(subscription._id)}>
                            <XCircle className="w-4 h-4 mr-2" />
                            Cancel
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => setDeleteId(subscription._id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="glass">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this subscription? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SubscriptionList;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

const defaultFormData = {
  name: "",
  price: "",
  currency: "USD",
  interval: "monthly",
  category: "other",
  paymentMethod: "",
  startDate: format(new Date(), "yyyy-MM-dd"),
  renewalDate: "",
};

const SubscriptionForm = ({
  open,
  onClose,
  onSubmit,
  editingSubscription,
  isLoading,
}) => {
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (editingSubscription) {
      setFormData({
        name: editingSubscription.name || "",
        price: editingSubscription.price?.toString() || "",
        currency: editingSubscription.currency || "USD",
        interval: editingSubscription.interval || "monthly",
        category: editingSubscription.category || "other",
        paymentMethod: editingSubscription.paymentMethod || "",
        startDate: editingSubscription.startDate
          ? format(new Date(editingSubscription.startDate), "yyyy-MM-dd")
          : format(new Date(), "yyyy-MM-dd"),
        renewalDate: editingSubscription.renewalDate
          ? format(new Date(editingSubscription.renewalDate), "yyyy-MM-dd")
          : "",
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [editingSubscription, open]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      price: parseFloat(formData.price),
      startDate: new Date(formData.startDate),
      renewalDate: formData.renewalDate ? new Date(formData.renewalDate) : undefined,
    };
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">
            {editingSubscription ? "Edit Subscription" : "Add New Subscription"}
          </DialogTitle>
          <DialogDescription>
            {editingSubscription
              ? "Update your subscription details"
              : "Enter the details of your new subscription"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Subscription Name</Label>
            <Input
              id="name"
              placeholder="Netflix, Spotify, etc."
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              minLength={3}
              maxLength={50}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="9.99"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => handleChange("currency", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="interval">Billing Cycle</Label>
              <Select
                value={formData.interval}
                onValueChange={(value) => handleChange("interval", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Input
              id="paymentMethod"
              placeholder="Credit Card, PayPal, etc."
              value={formData.paymentMethod}
              onChange={(e) => handleChange("paymentMethod", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="renewalDate">Next Renewal</Label>
              <Input
                id="renewalDate"
                type="date"
                value={formData.renewalDate}
                onChange={(e) => handleChange("renewalDate", e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 gradient-primary text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              {editingSubscription ? "Update" : "Add Subscription"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionForm;

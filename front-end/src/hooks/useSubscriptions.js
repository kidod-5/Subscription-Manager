import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionsAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export const useSubscriptions = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const subscriptionsQuery = useQuery({
    queryKey: ["subscriptions"],
    queryFn: subscriptionsAPI.getAll,
    select: (data) => data.subscriptions || data.data || data,
  });

  const createMutation = useMutation({
    mutationFn: subscriptionsAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast({ title: "Subscription created successfully" });
    },
    onError: (error) => {
      toast({
        title: "Failed to create subscription",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => subscriptionsAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast({ title: "Subscription updated successfully" });
    },
    onError: (error) => {
      toast({
        title: "Failed to update subscription",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: subscriptionsAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast({ title: "Subscription deleted successfully" });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete subscription",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: subscriptionsAPI.cancel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast({ title: "Subscription canceled successfully" });
    },
    onError: (error) => {
      toast({
        title: "Failed to cancel subscription",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    subscriptions: subscriptionsQuery.data || [],
    isLoading: subscriptionsQuery.isLoading,
    isError: subscriptionsQuery.isError,
    error: subscriptionsQuery.error,
    createSubscription: createMutation.mutate,
    updateSubscription: updateMutation.mutate,
    deleteSubscription: deleteMutation.mutate,
    cancelSubscription: cancelMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

export default useSubscriptions;

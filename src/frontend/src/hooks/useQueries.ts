import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Carrier, CruiseDeal, Destination } from "../backend.d";
import { MOCK_CARRIERS, MOCK_DEALS, MOCK_DESTINATIONS } from "../data/mockData";
import { useActor } from "./useActor";

export function useAllDeals() {
  const { actor, isFetching } = useActor();
  return useQuery<CruiseDeal[]>({
    queryKey: ["deals"],
    queryFn: async () => {
      if (!actor) return MOCK_DEALS;
      try {
        const result = await actor.getAllDeals();
        return result.length > 0 ? result : MOCK_DEALS;
      } catch {
        return MOCK_DEALS;
      }
    },
    enabled: !isFetching,
    placeholderData: MOCK_DEALS,
  });
}

export function useDeal(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery<CruiseDeal | null>({
    queryKey: ["deal", id],
    queryFn: async () => {
      if (!actor) return MOCK_DEALS.find((d) => d.id === id) ?? null;
      try {
        const result = await actor.getDeal(id);
        return result ?? MOCK_DEALS.find((d) => d.id === id) ?? null;
      } catch {
        return MOCK_DEALS.find((d) => d.id === id) ?? null;
      }
    },
    enabled: !!id && !isFetching,
  });
}

export function useDealsByDestination(destination: string) {
  const { actor, isFetching } = useActor();
  return useQuery<CruiseDeal[]>({
    queryKey: ["deals", "destination", destination],
    queryFn: async () => {
      const mockFiltered = destination
        ? MOCK_DEALS.filter((d) => d.destination === destination)
        : MOCK_DEALS;
      if (!actor) return mockFiltered;
      try {
        const result = await actor.getDealsByDestination(destination);
        return result.length > 0 ? result : mockFiltered;
      } catch {
        return mockFiltered;
      }
    },
    enabled: !isFetching,
    placeholderData: MOCK_DEALS,
  });
}

export function useDestinations() {
  const { actor, isFetching } = useActor();
  return useQuery<Destination[]>({
    queryKey: ["destinations"],
    queryFn: async () => {
      if (!actor) return MOCK_DESTINATIONS;
      try {
        const result = await actor.getDestinations();
        return result.length > 0 ? result : MOCK_DESTINATIONS;
      } catch {
        return MOCK_DESTINATIONS;
      }
    },
    enabled: !isFetching,
    placeholderData: MOCK_DESTINATIONS,
  });
}

export function useCarriers() {
  const { actor, isFetching } = useActor();
  return useQuery<Carrier[]>({
    queryKey: ["carriers"],
    queryFn: async () => {
      if (!actor) return MOCK_CARRIERS;
      try {
        const result = await actor.getCarriers();
        return result.length > 0 ? result : MOCK_CARRIERS;
      } catch {
        return MOCK_CARRIERS;
      }
    },
    enabled: !isFetching,
    placeholderData: MOCK_CARRIERS,
  });
}

export function useSavedDeals() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["savedDeals"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getSavedDeals();
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
  });
}

export function useSaveDeal() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dealId: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveDeal(dealId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedDeals"] });
    },
  });
}

export function useRemoveSavedDeal() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dealId: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.removeSavedDeal(dealId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedDeals"] });
    },
  });
}

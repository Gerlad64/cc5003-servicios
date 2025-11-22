import { create } from "zustand";
import type { ServiceData } from "./model/ServiceData";

type ServiceState = {
  services: Array<ServiceData>;
  addService: (service: ServiceData) => void;
};

export const useServicesStore = create<ServiceState>((set) => ({
  services: [],
  addService: (newService: ServiceData) => set((state) => ({
    services: [...state.services, newService]
  })),
}));
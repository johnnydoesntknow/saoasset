// lib/store/useStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Import types
interface User {
  id: string;
  walletAddress: string;
  email?: string;
  kycStatus: KYCStatus;
  kycProvider?: string;
  kycCompletedAt?: string;
  role: UserRole;
  metadata?: {
    firstName?: string;
    lastName?: string;
    country?: string;
    preferredCurrency?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Asset {
  id: string;
  partnerId: string;
  type: string;
  name: string;
  description: string;
  images: string[];
  price: {
    usd: number;
   
  };
  status: string;
  totalSupply: number;
  available: number;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

interface Transaction {
  id: string;
  userId: string;
  assetId: string;
  partnerId: string;
  paymentMethod: string;
  amount: string;
  transactionHash?: string;
  blockNumber?: number;
  chainId: number;
  status: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

interface VisaApplication {
  id: string;
  userId: string;
  assetId: string;
  status: 'DRAFT' | 'SUBMITTED' | 'PROCESSING' | 'APPROVED' | 'REJECTED';
  personalInfo?: any;
  contactInfo?: any;
  documents?: any;
  declaration?: any;
  submittedAt?: string;
  createdAt: string;
  updatedAt: string;
}

enum KYCStatus {
  NOT_STARTED = 'NOT_STARTED',
  PENDING = 'PENDING',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
}

enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  PARTNER = 'PARTNER',
}

enum PaymentStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  CONFIRMING = 'CONFIRMING',
  CONFIRMED = 'CONFIRMED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

enum StablecoinType {
  USDC = 'USDC',
  USDT = 'USDT',
}

// Store interfaces
interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isConnecting: boolean;
  setUser: (user: User | null) => void;
  updateKYCStatus: (status: KYCStatus) => void;
  logout: () => void;
}

interface CartState {
  items: Asset[];
  addItem: (asset: Asset) => void;
  removeItem: (assetId: string) => void;
  clearCart: () => void;
  getTotalAmount: () => number;
}

interface PaymentState {
  currentTransaction: Transaction | null;
  paymentStatus: PaymentStatus;
  selectedStablecoin: StablecoinType | null;
  setCurrentTransaction: (transaction: Transaction | null) => void;
  setPaymentStatus: (status: PaymentStatus) => void;
  setSelectedStablecoin: (stablecoin: StablecoinType | null) => void;
  resetPayment: () => void;
}

interface VisaApplicationState {
  currentApplication: Partial<VisaApplication> | null;
  currentStep: number;
  setCurrentApplication: (application: Partial<VisaApplication> | null) => void;
  updateApplicationField: (field: keyof VisaApplication, value: any) => void;
  setCurrentStep: (step: number) => void;
  resetApplication: () => void;
}

interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  modalOpen: {
    kyc: boolean;
    payment: boolean;
    wallet: boolean;
  };
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void; // Add this line
  setSidebarOpen: (open: boolean) => void;
  setModalOpen: (modal: keyof UIState['modalOpen'], open: boolean) => void;
}

// User Store
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isConnecting: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      updateKYCStatus: (status) =>
        set((state) => ({
          user: state.user ? { ...state.user, kycStatus: status } : null,
        })),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Cart Store
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (asset) =>
        set((state) => {
          const exists = state.items.find((item) => item.id === asset.id);
          if (exists) return state;
          return { items: [...state.items, asset] };
        }),
      removeItem: (assetId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== assetId),
        })),
      clearCart: () => set({ items: [] }),
      getTotalAmount: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price.usd, 0);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Payment Store
export const usePaymentStore = create<PaymentState>((set) => ({
  currentTransaction: null,
  paymentStatus: PaymentStatus.IDLE,
  selectedStablecoin: null,
  setCurrentTransaction: (transaction) => set({ currentTransaction: transaction }),
  setPaymentStatus: (status) => set({ paymentStatus: status }),
  setSelectedStablecoin: (stablecoin) => set({ selectedStablecoin: stablecoin }),
  resetPayment: () =>
    set({
      currentTransaction: null,
      paymentStatus: PaymentStatus.IDLE,
      selectedStablecoin: null,
    }),
}));

// Visa Application Store
export const useVisaApplicationStore = create<VisaApplicationState>()(
  persist(
    (set) => ({
      currentApplication: null,
      currentStep: 1,
      setCurrentApplication: (application) => set({ currentApplication: application }),
      updateApplicationField: (field, value) =>
        set((state) => ({
          currentApplication: state.currentApplication
            ? { ...state.currentApplication, [field]: value }
            : { [field]: value },
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
      resetApplication: () => set({ currentApplication: null, currentStep: 1 }),
    }),
    {
      name: 'visa-application-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// UI Store
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light', // Changed from 'dark' to 'light'
      sidebarOpen: false,
      modalOpen: {
        kyc: false,
        payment: false,
        wallet: false,
      },
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          if (typeof window !== 'undefined') {
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(newTheme);
          }
          return { theme: newTheme };
        }),
      setTheme: (theme) => // Add this new method
        set(() => {
          if (typeof window !== 'undefined') {
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(theme);
          }
          return { theme };
        }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setModalOpen: (modal, open) =>
        set((state) => ({
          modalOpen: { ...state.modalOpen, [modal]: open },
        })),
    }),
    {
      name: 'ui-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
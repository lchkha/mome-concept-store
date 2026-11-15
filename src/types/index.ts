export type ProductCategory = 'mode' | 'deco' | 'accessoires' | 'cadeaux';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isLastPieces?: boolean;
  tagline: string;
  description: string;
  composition: string;
  care: string;
  deliveryInfo: string;
  images: string[];
  colors: ProductColor[];
  sizes?: string[];
  stock: number;
  crossSellProductIds?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize?: string;
}

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';

export interface FilterState {
  category: string;
  maxPrice: number;
  selectedColors: string[];
  selectedSizes: string[];
  inStockOnly: boolean;
  sortBy: SortOption;
  searchQuery: string;
}

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  deliveryMethod: 'click_collect' | 'domicile' | 'relais';
  address: string;
  city: string;
  postalCode: string;
  pickupSlot?: string;
  notes?: string;
  paymentMethod: 'card' | 'apple_pay' | 'klarna';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

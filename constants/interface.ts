export interface SneakerData {
  age_group: string;
  base_price: number;
  brand: string;
  category: string;
  currency: string;
  description: string | null;
  gender: string;
  gtin: string;
  id: string;
  image: string;
  labels: string[];
  link: string;
  title: string;
  variants: {
    currency: string;
    price: number;
    size: string;
  }[];
}

export interface SneakerProps {
  sneaker: {
    id: string;
    image: any;
    title: string | null;
    base_price: string | number;
    currency: string;
    variants: [];
  };
}

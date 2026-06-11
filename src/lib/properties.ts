export type Property = {
  id: string;
  address: string;
  postcode: string;
  city: string;
  price: number;
  estValue: number;
  beds: number;
  type: string;
  yieldPct: number;
  badge: "direct" | "bmv" | "lease" | "neg" | "knotweed";
  badgeLabel: string;
  note: string;
  image: string;
};

export const PROPERTIES: Property[] = [
  {
    id: "wilmslow-m14",
    address: "Wilmslow Road",
    postcode: "M14 5TQ",
    city: "Manchester",
    price: 185000,
    estValue: 225000,
    beds: 3,
    type: "Terrace",
    yieldPct: 7.2,
    badge: "direct",
    badgeLabel: "Direct from Owner • 0% Fee",
    note: "Verified Data Source",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=70&auto=format&fit=crop",
  },
  {
    id: "moseley-b12",
    address: "Moseley Road",
    postcode: "B12 9AT",
    city: "Birmingham",
    price: 210000,
    estValue: 268000,
    beds: 4,
    type: "Semi-Detached",
    yieldPct: 8.4,
    badge: "bmv",
    badgeLabel: "22% BMV Discount",
    note: "Potential HMO Conversion",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=70&auto=format&fit=crop",
  },
  {
    id: "headingley-ls6",
    address: "Headingley Lane",
    postcode: "LS6 2AA",
    city: "Leeds",
    price: 180000,
    estValue: 220000,
    beds: 3,
    type: "Terrace",
    yieldPct: 7.8,
    badge: "direct",
    badgeLabel: "Direct from Owner • 0% Fee",
    note: "Student Rental Demand",
    image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=900&q=70&auto=format&fit=crop",
  },
  {
    id: "stjames-b1",
    address: "St James Place",
    postcode: "B1 1AA",
    city: "Birmingham",
    price: 420000,
    estValue: 495000,
    beds: 5,
    type: "Detached",
    yieldPct: 6.1,
    badge: "lease",
    badgeLabel: "Short Leasehold • 62 yrs",
    note: "Lease Extension Opportunity",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=900&q=70&auto=format&fit=crop",
  },
  {
    id: "heaton-sk4",
    address: "Heaton Moor Road",
    postcode: "SK4 4NX",
    city: "Stockport",
    price: 265000,
    estValue: 310000,
    beds: 4,
    type: "Semi-Detached",
    yieldPct: 6.8,
    badge: "bmv",
    badgeLabel: "15% BMV • Chain Free",
    note: "Probate Sale",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=70&auto=format&fit=crop",
  },
  {
    id: "rusholme-m13",
    address: "Rusholme Grove",
    postcode: "M13 0PX",
    city: "Manchester",
    price: 142000,
    estValue: 138000,
    beds: 2,
    type: "Flat",
    yieldPct: 5.4,
    badge: "neg",
    badgeLabel: "Negative Equity Alert",
    note: "Distressed Sale",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=70&auto=format&fit=crop",
  },
];

export const getProperty = (id: string) => PROPERTIES.find((p) => p.id === id);

export const badgeStyles: Record<Property["badge"], string> = {
  direct: "bg-teal text-white",
  bmv: "bg-gold text-white",
  lease: "bg-white text-teal border border-teal",
  neg: "bg-navy text-white",
  knotweed: "bg-red-600 text-white",
};

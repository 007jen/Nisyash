export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
  customizable: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    id: 'corporate',
    name: 'Corporate Gifting',
    description: 'Professional gifts for your business needs',
    icon: 'Briefcase'
  },
  {
    id: 'personalized',
    name: 'Personalised Gifting',
    description: 'Custom gifts with your personal touch',
    icon: 'Heart'
  },
  {
    id: 'hampers',
    name: 'Gift Hampers & Kits',
    description: 'Curated gift sets for every occasion',
    icon: 'Gift'
  },
  {
    id: 'apparel',
    name: 'Apparel & Wearables',
    description: 'Quality branded clothing and accessories',
    icon: 'Shirt'
  },
  {
    id: 'drinkware',
    name: 'Drinkware',
    description: 'Premium mugs, bottles and tumblers',
    icon: 'Coffee'
  },
  {
    id: 'office',
    name: 'Office & Utility',
    description: 'Practical gifts for the workplace',
    icon: 'FolderOpen'
  },
  {
    id: 'premium',
    name: 'Premium Gifts',
    description: 'Luxurious corporate gifts',
    icon: 'Award'
  },
  {
    id: 'eco',
    name: 'Eco-Friendly Gifts',
    description: 'Sustainable and environmentally conscious gifts',
    icon: 'Leaf'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Executive Leather Notebook Set',
    description: 'Premium leather-bound notebook with pen, perfect for corporate gifting',
    category: 'corporate',
    image: 'https://images.unsplash.com/photo-1740664651822-3a02ec12c121',
    tags: ['Bulk Order', 'Customizable'],
    customizable: true
  },
  {
    id: '2',
    name: 'Luxury Gift Hamper',
    description: 'Curated selection of premium items in elegant packaging',
    category: 'hampers',
    image: 'https://images.unsplash.com/photo-1617394391227-4cb6cba53b12',
    tags: ['Customizable', 'Premium'],
    customizable: true
  },
  {
    id: '3',
    name: 'Premium Gift Box Collection',
    description: 'Elegant gift box with personalized branding options',
    category: 'premium',
    image: 'https://images.unsplash.com/photo-1760804876166-aae5861ec7c1',
    tags: ['Bulk Order', 'Customizable'],
    customizable: true
  },
  {
    id: '4',
    name: 'Branded Corporate Drinkware Set',
    description: 'High-quality mugs and tumblers with custom branding',
    category: 'drinkware',
    image: 'https://images.unsplash.com/photo-1767023442932-ec95b9a13e71',
    tags: ['Bulk Order', 'Customizable'],
    customizable: true
  },
  {
    id: '5',
    name: 'Eco-Friendly Product Set',
    description: 'Sustainable gifts made from recycled materials',
    category: 'eco',
    image: 'https://images.unsplash.com/photo-1633878353628-5fc8b983325c',
    tags: ['Eco-Friendly', 'Customizable'],
    customizable: true
  },
  {
    id: '6',
    name: 'Office Desk Organizer Kit',
    description: 'Premium desk accessories for the modern workspace',
    category: 'office',
    image: 'https://images.unsplash.com/photo-1713775285581-706ebc919e7b',
    tags: ['Bulk Order'],
    customizable: true
  },
  {
    id: '7',
    name: 'Personalized Welcome Kit',
    description: 'Custom welcome packages for new employees or clients',
    category: 'personalized',
    image: 'https://images.unsplash.com/photo-1759563874745-47e35c0a9572',
    tags: ['Customizable', 'Bulk Order'],
    customizable: true
  },
  {
    id: '8',
    name: 'Corporate Apparel Bundle',
    description: 'Branded t-shirts, polo shirts and accessories',
    category: 'apparel',
    image: 'https://images.unsplash.com/photo-1496180470114-6ef490f3ff22',
    tags: ['Bulk Order', 'Customizable'],
    customizable: true
  },
  {
    id: '9',
    name: 'Premium Desk Set',
    description: 'Complete desk organization set including pen holder, pad, and card holder',
    category: 'corporate',
    image: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9',
    tags: ['Bulk Order', 'Premium'],
    customizable: true
  },
  {
    id: '10',
    name: 'Custom Branded Power Bank',
    description: 'High-capacity power bank with your company logo',
    category: 'corporate',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
    tags: ['Tech', 'Customizable'],
    customizable: true
  },
  {
    id: '11',
    name: 'Corporate Wellness Kit',
    description: 'Health and wellness essentials for employee well-being',
    category: 'hampers',
    image: 'https://images.unsplash.com/photo-1603093503923-d92e597dfc2a',
    tags: ['Wellness', 'Customizable'],
    customizable: true
  },
  {
    id: '12',
    name: 'Stainless Steel Water Bottle',
    description: 'Double-walled insulated bottle, keeps drinks hot/cold for 24h',
    category: 'drinkware',
    image: 'https://images.unsplash.com/photo-1602143407151-0111419500be',
    tags: ['Eco-Friendly', 'Bulk Order'],
    customizable: true
  },
  {
    id: '13',
    name: 'Tech Organizer Pouch',
    description: 'Compact travel pouch for cables and accessories',
    category: 'office',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363',
    tags: ['Travel', 'Utility'],
    customizable: true
  }
];

export const testimonials = [
  {
    id: '1',
    quote: 'Nishyash Corporation delivered exceptional quality gifts for our annual conference. Their attention to detail and custom branding options exceeded our expectations.',
    author: 'Sarah Johnson',
    designation: 'HR Manager, Tech Solutions Inc.'
  },
  {
    id: '2',
    quote: 'The team\'s professionalism and timely delivery made our corporate gifting seamless. Our clients loved the personalized touch on each item.',
    author: 'Michael Chen',
    designation: 'Procurement Head, Global Enterprises'
  },
  {
    id: '3',
    quote: 'Outstanding service from start to finish. The quality of products and custom branding options are unmatched in the industry.',
    author: 'Priya Sharma',
    designation: 'Founder, StartUp Hub'
  }
];

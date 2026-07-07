// Home Decor Mock Data

export type ProductCategory =
  | 'Furniture'
  | 'Lighting'
  | 'Textiles'
  | 'Rugs'
  | 'Wall Art'
  | 'Accessories'
  | 'Plants'
  | 'Mirrors';

export type ProductStatus = 'active' | 'inactive' | 'out_of_stock';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  status: ProductStatus;
  description: string;
  image: string;
  sku: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  orderDate: string;
  deliveryAddress: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  registrationDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

// -----------------------------------------------------------------------
// Products
// -----------------------------------------------------------------------

export const PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Scandinavian Oak Sofa',
    category: 'Furniture',
    price: 1299.99,
    stock: 12,
    status: 'active',
    description: 'Minimalist 3-seater sofa with solid oak legs and premium linen upholstery.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
    sku: 'FUR-SOF-001',
    createdAt: '2024-01-15',
  },
  {
    id: 'prod-002',
    name: 'Bohemian Macramé Wall Hanging',
    category: 'Wall Art',
    price: 89.99,
    stock: 45,
    status: 'active',
    description: 'Handwoven macramé wall art in natural cotton, 60cm x 80cm.',
    image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=400',
    sku: 'WAL-ART-001',
    createdAt: '2024-01-18',
  },
  {
    id: 'prod-003',
    name: 'Moroccan Berber Rug',
    category: 'Rugs',
    price: 449.99,
    stock: 8,
    status: 'active',
    description: 'Authentic hand-knotted Moroccan rug, 160cm x 230cm, wool blend.',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400',
    sku: 'RUG-MOR-001',
    createdAt: '2024-01-22',
  },
  {
    id: 'prod-004',
    name: 'Edison Pendant Light',
    category: 'Lighting',
    price: 129.99,
    stock: 23,
    status: 'active',
    description: 'Industrial-style pendant light with vintage Edison bulb and brass fittings.',
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400',
    sku: 'LIG-PEN-001',
    createdAt: '2024-02-01',
  },
  {
    id: 'prod-005',
    name: 'Velvet Throw Cushions Set',
    category: 'Textiles',
    price: 69.99,
    stock: 35,
    status: 'active',
    description: 'Set of 3 velvet throw cushions in earth tones, 45cm x 45cm.',
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400',
    sku: 'TEX-CUS-001',
    createdAt: '2024-02-05',
  },
  {
    id: 'prod-006',
    name: 'Monstera Deliciosa Plant',
    category: 'Plants',
    price: 49.99,
    stock: 0,
    status: 'out_of_stock',
    description: 'Large Monstera Deliciosa in a decorative terracotta pot. Height: 80cm.',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400',
    sku: 'PLT-MON-001',
    createdAt: '2024-02-10',
  },
  {
    id: 'prod-007',
    name: 'Arch Floor Mirror',
    category: 'Mirrors',
    price: 329.99,
    stock: 6,
    status: 'active',
    description: 'Full-length arch mirror with thin black metal frame. 180cm x 80cm.',
    image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=400',
    sku: 'MIR-ARC-001',
    createdAt: '2024-02-14',
  },
  {
    id: 'prod-008',
    name: 'Ceramic Vase Set',
    category: 'Accessories',
    price: 79.99,
    stock: 18,
    status: 'active',
    description: 'Set of 3 handcrafted ceramic vases in matte terracotta finish.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    sku: 'ACC-VAS-001',
    createdAt: '2024-02-18',
  },
  {
    id: 'prod-009',
    name: 'Rattan Coffee Table',
    category: 'Furniture',
    price: 399.99,
    stock: 4,
    status: 'active',
    description: 'Natural rattan and glass top coffee table. 110cm x 60cm x 45cm.',
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400',
    sku: 'FUR-COF-001',
    createdAt: '2024-02-20',
  },
  {
    id: 'prod-010',
    name: 'Linen Duvet Cover Set',
    category: 'Textiles',
    price: 159.99,
    stock: 27,
    status: 'active',
    description: 'Stone-washed linen duvet cover set. Available in King/Queen sizes.',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400',
    sku: 'TEX-DUV-001',
    createdAt: '2024-02-25',
  },
  {
    id: 'prod-011',
    name: 'Geometric Pendant Lamp',
    category: 'Lighting',
    price: 189.99,
    stock: 2,
    status: 'active',
    description: 'Black geometric wire pendant lamp, modern industrial design.',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a58c1a90e?w=400',
    sku: 'LIG-GEO-001',
    createdAt: '2024-03-01',
  },
  {
    id: 'prod-012',
    name: 'Woven Jute Area Rug',
    category: 'Rugs',
    price: 199.99,
    stock: 14,
    status: 'inactive',
    description: 'Natural jute rug with hand-braided border. 200cm x 140cm.',
    image: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=400',
    sku: 'RUG-JUT-001',
    createdAt: '2024-03-05',
  },
];

// -----------------------------------------------------------------------
// Customers
// -----------------------------------------------------------------------

export const CUSTOMERS: Customer[] = [
  {
    id: 'cust-001',
    name: 'Sophie Williams',
    email: 'sophie.w@email.com',
    mobile: '+44 7700 900001',
    address: '14 Kensington High St, London, W8 4PT, UK',
    registrationDate: '2023-06-10',
    totalOrders: 8,
    totalSpent: 3240.50,
    lastOrderDate: '2024-03-15',
    status: 'active',
  },
  {
    id: 'cust-002',
    name: 'James Richardson',
    email: 'james.r@email.com',
    mobile: '+44 7700 900002',
    address: '28 Bristol Road, Manchester, M14 5RG, UK',
    registrationDate: '2023-07-22',
    totalOrders: 5,
    totalSpent: 1876.00,
    lastOrderDate: '2024-02-28',
    status: 'active',
  },
  {
    id: 'cust-003',
    name: 'Emma Thompson',
    email: 'emma.t@email.com',
    mobile: '+44 7700 900003',
    address: '7 Royal Mile, Edinburgh, EH1 1TF, UK',
    registrationDate: '2023-09-05',
    totalOrders: 12,
    totalSpent: 5412.75,
    lastOrderDate: '2024-03-10',
    status: 'active',
  },
  {
    id: 'cust-004',
    name: 'Oliver Davies',
    email: 'oliver.d@email.com',
    mobile: '+44 7700 900004',
    address: '55 Cathedral Road, Cardiff, CF11 9HB, UK',
    registrationDate: '2023-11-12',
    totalOrders: 2,
    totalSpent: 519.98,
    lastOrderDate: '2024-01-20',
    status: 'active',
  },
  {
    id: 'cust-005',
    name: 'Isabella Martinez',
    email: 'isabella.m@email.com',
    mobile: '+44 7700 900005',
    address: '22 Queen Street, Belfast, BT1 6JQ, UK',
    registrationDate: '2023-12-01',
    totalOrders: 3,
    totalSpent: 789.97,
    lastOrderDate: '2024-03-02',
    status: 'inactive',
  },
  {
    id: 'cust-006',
    name: 'Harry Johnson',
    email: 'harry.j@email.com',
    mobile: '+44 7700 900006',
    address: '10 Downing Street, Birmingham, B1 1BB, UK',
    registrationDate: '2024-01-08',
    totalOrders: 4,
    totalSpent: 1124.96,
    lastOrderDate: '2024-03-18',
    status: 'active',
  },
  {
    id: 'cust-007',
    name: 'Charlotte Brown',
    email: 'charlotte.b@email.com',
    mobile: '+44 7700 900007',
    address: '33 Broad Street, Oxford, OX1 3AP, UK',
    registrationDate: '2024-01-25',
    totalOrders: 6,
    totalSpent: 2198.94,
    lastOrderDate: '2024-03-20',
    status: 'active',
  },
  {
    id: 'cust-008',
    name: 'Liam Walker',
    email: 'liam.w@email.com',
    mobile: '+44 7700 900008',
    address: '8 Princes Street, Glasgow, G1 2EL, UK',
    registrationDate: '2024-02-14',
    totalOrders: 1,
    totalSpent: 449.99,
    lastOrderDate: '2024-02-14',
    status: 'active',
  },
];

// -----------------------------------------------------------------------
// Orders
// -----------------------------------------------------------------------

export const ORDERS: Order[] = [
  {
    id: 'ORD-2024-001',
    customerId: 'cust-001',
    customerName: 'Sophie Williams',
    customerEmail: 'sophie.w@email.com',
    items: [
      { productId: 'prod-001', productName: 'Scandinavian Oak Sofa', quantity: 1, price: 1299.99, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100' },
      { productId: 'prod-005', productName: 'Velvet Throw Cushions Set', quantity: 2, price: 69.99, image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=100' },
    ],
    totalAmount: 1439.97,
    orderStatus: 'delivered',
    paymentStatus: 'paid',
    orderDate: '2024-03-15',
    deliveryAddress: '14 Kensington High St, London, W8 4PT, UK',
  },
  {
    id: 'ORD-2024-002',
    customerId: 'cust-003',
    customerName: 'Emma Thompson',
    customerEmail: 'emma.t@email.com',
    items: [
      { productId: 'prod-003', productName: 'Moroccan Berber Rug', quantity: 1, price: 449.99, image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=100' },
      { productId: 'prod-007', productName: 'Arch Floor Mirror', quantity: 1, price: 329.99, image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=100' },
    ],
    totalAmount: 779.98,
    orderStatus: 'shipped',
    paymentStatus: 'paid',
    orderDate: '2024-03-10',
    deliveryAddress: '7 Royal Mile, Edinburgh, EH1 1TF, UK',
  },
  {
    id: 'ORD-2024-003',
    customerId: 'cust-007',
    customerName: 'Charlotte Brown',
    customerEmail: 'charlotte.b@email.com',
    items: [
      { productId: 'prod-004', productName: 'Edison Pendant Light', quantity: 2, price: 129.99, image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=100' },
      { productId: 'prod-008', productName: 'Ceramic Vase Set', quantity: 1, price: 79.99, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100' },
    ],
    totalAmount: 339.97,
    orderStatus: 'processing',
    paymentStatus: 'paid',
    orderDate: '2024-03-20',
    deliveryAddress: '33 Broad Street, Oxford, OX1 3AP, UK',
  },
  {
    id: 'ORD-2024-004',
    customerId: 'cust-002',
    customerName: 'James Richardson',
    customerEmail: 'james.r@email.com',
    items: [
      { productId: 'prod-009', productName: 'Rattan Coffee Table', quantity: 1, price: 399.99, image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=100' },
    ],
    totalAmount: 399.99,
    orderStatus: 'pending',
    paymentStatus: 'pending',
    orderDate: '2024-03-22',
    deliveryAddress: '28 Bristol Road, Manchester, M14 5RG, UK',
  },
  {
    id: 'ORD-2024-005',
    customerId: 'cust-006',
    customerName: 'Harry Johnson',
    customerEmail: 'harry.j@email.com',
    items: [
      { productId: 'prod-002', productName: 'Bohemian Macramé Wall Hanging', quantity: 2, price: 89.99, image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=100' },
      { productId: 'prod-010', productName: 'Linen Duvet Cover Set', quantity: 1, price: 159.99, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=100' },
    ],
    totalAmount: 339.97,
    orderStatus: 'delivered',
    paymentStatus: 'paid',
    orderDate: '2024-03-18',
    deliveryAddress: '10 Downing Street, Birmingham, B1 1BB, UK',
  },
  {
    id: 'ORD-2024-006',
    customerId: 'cust-005',
    customerName: 'Isabella Martinez',
    customerEmail: 'isabella.m@email.com',
    items: [
      { productId: 'prod-011', productName: 'Geometric Pendant Lamp', quantity: 1, price: 189.99, image: 'https://images.unsplash.com/photo-1513506003901-1e6a58c1a90e?w=100' },
    ],
    totalAmount: 189.99,
    orderStatus: 'cancelled',
    paymentStatus: 'refunded',
    orderDate: '2024-03-02',
    deliveryAddress: '22 Queen Street, Belfast, BT1 6JQ, UK',
    notes: 'Customer requested cancellation',
  },
  {
    id: 'ORD-2024-007',
    customerId: 'cust-003',
    customerName: 'Emma Thompson',
    customerEmail: 'emma.t@email.com',
    items: [
      { productId: 'prod-005', productName: 'Velvet Throw Cushions Set', quantity: 3, price: 69.99, image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=100' },
      { productId: 'prod-008', productName: 'Ceramic Vase Set', quantity: 2, price: 79.99, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100' },
    ],
    totalAmount: 369.95,
    orderStatus: 'delivered',
    paymentStatus: 'paid',
    orderDate: '2024-02-28',
    deliveryAddress: '7 Royal Mile, Edinburgh, EH1 1TF, UK',
  },
  {
    id: 'ORD-2024-008',
    customerId: 'cust-001',
    customerName: 'Sophie Williams',
    customerEmail: 'sophie.w@email.com',
    items: [
      { productId: 'prod-003', productName: 'Moroccan Berber Rug', quantity: 1, price: 449.99, image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=100' },
    ],
    totalAmount: 449.99,
    orderStatus: 'delivered',
    paymentStatus: 'paid',
    orderDate: '2024-02-20',
    deliveryAddress: '14 Kensington High St, London, W8 4PT, UK',
  },
  {
    id: 'ORD-2024-009',
    customerId: 'cust-004',
    customerName: 'Oliver Davies',
    customerEmail: 'oliver.d@email.com',
    items: [
      { productId: 'prod-007', productName: 'Arch Floor Mirror', quantity: 1, price: 329.99, image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=100' },
    ],
    totalAmount: 329.99,
    orderStatus: 'delivered',
    paymentStatus: 'paid',
    orderDate: '2024-01-20',
    deliveryAddress: '55 Cathedral Road, Cardiff, CF11 9HB, UK',
  },
  {
    id: 'ORD-2024-010',
    customerId: 'cust-008',
    customerName: 'Liam Walker',
    customerEmail: 'liam.w@email.com',
    items: [
      { productId: 'prod-003', productName: 'Moroccan Berber Rug', quantity: 1, price: 449.99, image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=100' },
    ],
    totalAmount: 449.99,
    orderStatus: 'shipped',
    paymentStatus: 'paid',
    orderDate: '2024-02-14',
    deliveryAddress: '8 Princes Street, Glasgow, G1 2EL, UK',
  },
  {
    id: 'ORD-2024-011',
    customerId: 'cust-003',
    customerName: 'Emma Thompson',
    customerEmail: 'emma.t@email.com',
    items: [
      { productId: 'prod-001', productName: 'Scandinavian Oak Sofa', quantity: 1, price: 1299.99, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100' },
    ],
    totalAmount: 1299.99,
    orderStatus: 'delivered',
    paymentStatus: 'paid',
    orderDate: '2024-03-05',
    deliveryAddress: '7 Royal Mile, Edinburgh, EH1 1TF, UK',
  },
  {
    id: 'ORD-2024-012',
    customerId: 'cust-002',
    customerName: 'James Richardson',
    customerEmail: 'james.r@email.com',
    items: [
      { productId: 'prod-010', productName: 'Linen Duvet Cover Set', quantity: 2, price: 159.99, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=100' },
    ],
    totalAmount: 319.98,
    orderStatus: 'delivered',
    paymentStatus: 'paid',
    orderDate: '2024-02-14',
    deliveryAddress: '28 Bristol Road, Manchester, M14 5RG, UK',
  },
];

// -----------------------------------------------------------------------
// Dashboard Stats
// -----------------------------------------------------------------------

export const DASHBOARD_STATS = {
  totalOrders: ORDERS.length,
  totalCustomers: CUSTOMERS.length,
  totalProducts: PRODUCTS.length,
  totalRevenue: ORDERS.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + o.totalAmount, 0),
  pendingOrders: ORDERS.filter(o => o.orderStatus === 'pending').length,
  deliveredOrders: ORDERS.filter(o => o.orderStatus === 'delivered').length,
  activeProducts: PRODUCTS.filter(p => p.status === 'active').length,
  outOfStockProducts: PRODUCTS.filter(p => p.status === 'out_of_stock').length,
};

export const SALES_DATA = [
  { month: 'Jan', revenue: 4200, orders: 14 },
  { month: 'Feb', revenue: 5800, orders: 18 },
  { month: 'Mar', revenue: 7200, orders: 24 },
  { month: 'Apr', revenue: 6400, orders: 21 },
  { month: 'May', revenue: 8900, orders: 30 },
  { month: 'Jun', revenue: 7600, orders: 26 },
  { month: 'Jul', revenue: 9200, orders: 31 },
  { month: 'Aug', revenue: 8100, orders: 28 },
  { month: 'Sep', revenue: 10200, orders: 35 },
  { month: 'Oct', revenue: 11400, orders: 38 },
  { month: 'Nov', revenue: 13800, orders: 46 },
  { month: 'Dec', revenue: 15200, orders: 52 },
];

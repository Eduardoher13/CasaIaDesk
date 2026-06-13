import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';
export declare class OrderItem {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
    order: Order;
    product: Product;
}

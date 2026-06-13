import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..', 'src');

const modules = [
  {
    folder: 'users',
    entity: 'User',
    table: 'users',
    route: 'users',
    softDelete: true,
    fields: [
      { name: 'email', type: 'string', dto: 'IsEmail', required: true },
      { name: 'password_hash', type: 'string', dto: 'IsString', required: true },
      { name: 'role', type: 'string', dto: 'IsString', required: true },
      { name: 'first_name', type: 'string', dto: 'IsString', required: true },
      { name: 'last_name', type: 'string', dto: 'IsString', required: true },
      { name: 'phone', type: 'string | null', dto: 'IsString', required: false },
      { name: 'avatar_url', type: 'string | null', dto: 'IsString', required: false },
      { name: 'is_active', type: 'boolean', dto: 'IsBoolean', required: false, default: true },
      { name: 'lat', type: 'number | null', dto: 'IsNumber', required: false },
      { name: 'lng', type: 'number | null', dto: 'IsNumber', required: false },
      { name: 'city', type: 'string | null', dto: 'IsString', required: false },
    ],
    entityExtra: `
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deleted_at: Date | null;`,
  },
  {
    folder: 'clients',
    entity: 'Client',
    table: 'clients',
    route: 'clients',
    fields: [
      { name: 'user_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'address', type: 'string | null', dto: 'IsString', required: false },
      { name: 'points_balance', type: 'number', dto: 'IsInt', required: false, default: 0 },
    ],
    relations: `  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;`,
    relationImports: [`import { User } from '../../users/entities/user.entity';`],
  },
  {
    folder: 'professionals',
    entity: 'Professional',
    table: 'professionals',
    route: 'professionals',
    fields: [
      { name: 'user_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'bio', type: 'string | null', dto: 'IsString', required: false },
      { name: 'years_experience', type: 'number', dto: 'IsInt', required: false, default: 0 },
      { name: 'base_price', type: 'number | null', dto: 'IsNumber', required: false },
      { name: 'avg_rating', type: 'number', dto: 'IsNumber', required: false, default: 0 },
      { name: 'total_reviews', type: 'number', dto: 'IsInt', required: false, default: 0 },
      { name: 'is_available', type: 'boolean', dto: 'IsBoolean', required: false, default: true },
      { name: 'service_radius_km', type: 'number', dto: 'IsNumber', required: false, default: 20 },
    ],
    relations: `  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;`,
    relationImports: [`import { User } from '../../users/entities/user.entity';`],
  },
  {
    folder: 'companies',
    entity: 'Company',
    table: 'companies',
    route: 'companies',
    fields: [
      { name: 'user_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'commercial_name', type: 'string', dto: 'IsString', required: true },
      { name: 'ruc', type: 'string | null', dto: 'IsString', required: false },
      { name: 'logo_url', type: 'string | null', dto: 'IsString', required: false },
    ],
    relations: `  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;`,
    relationImports: [`import { User } from '../../users/entities/user.entity';`],
  },
  {
    folder: 'admins',
    entity: 'Admin',
    table: 'admins',
    route: 'admins',
    fields: [
      { name: 'user_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'permission_level', type: 'number', dto: 'IsInt', required: false, default: 1 },
    ],
    relations: `  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;`,
    relationImports: [`import { User } from '../../users/entities/user.entity';`],
  },
  {
    folder: 'specialties',
    entity: 'Specialty',
    table: 'specialties',
    route: 'specialties',
    idType: 'number',
    fields: [
      { name: 'name', type: 'string', dto: 'IsString', required: true },
      { name: 'slug', type: 'string', dto: 'IsString', required: true },
      { name: 'description', type: 'string | null', dto: 'IsString', required: false },
    ],
  },
  {
    folder: 'professional_specialties',
    entity: 'ProfessionalSpecialty',
    table: 'professional_specialties',
    route: 'professional-specialties',
    compositeKey: true,
    fields: [
      { name: 'professional_id', type: 'string', dto: 'IsUUID', required: true, primary: true },
      { name: 'specialty_id', type: 'number', dto: 'IsInt', required: true, primary: true },
      { name: 'is_primary', type: 'boolean', dto: 'IsBoolean', required: false, default: false },
    ],
    relations: `  @ManyToOne(() => Professional, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'professional_id' })
  professional: Professional;

  @ManyToOne(() => Specialty, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'specialty_id' })
  specialty: Specialty;`,
    relationImports: [
      `import { Professional } from '../../professionals/entities/professional.entity';`,
      `import { Specialty } from '../../specialties/entities/specialty.entity';`,
    ],
  },
  {
    folder: 'products',
    entity: 'Product',
    table: 'products',
    route: 'products',
    fields: [
      { name: 'company_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'name', type: 'string', dto: 'IsString', required: true },
      { name: 'description', type: 'string | null', dto: 'IsString', required: false },
      { name: 'price', type: 'number', dto: 'IsNumber', required: true },
      { name: 'stock', type: 'number', dto: 'IsInt', required: false, default: 0 },
      { name: 'avg_rating', type: 'number', dto: 'IsNumber', required: false, default: 0 },
      { name: 'is_active', type: 'boolean', dto: 'IsBoolean', required: false, default: true },
    ],
    relations: `  @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: Company;`,
    relationImports: [`import { Company } from '../../companies/entities/company.entity';`],
  },
  {
    folder: 'orders',
    entity: 'Order',
    table: 'orders',
    route: 'orders',
    fields: [
      { name: 'client_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'status', type: 'string', dto: 'IsString', required: false, default: 'carrito' },
      { name: 'total', type: 'number', dto: 'IsNumber', required: false, default: 0 },
      { name: 'paid_at', type: 'Date | null', dto: 'IsDateString', required: false },
    ],
    entityExtra: `
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;`,
    relations: `  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;`,
    relationImports: [`import { Client } from '../../clients/entities/client.entity';`],
  },
  {
    folder: 'order_items',
    entity: 'OrderItem',
    table: 'order_items',
    route: 'order-items',
    fields: [
      { name: 'order_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'product_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'quantity', type: 'number', dto: 'IsInt', required: true },
      { name: 'unit_price', type: 'number', dto: 'IsNumber', required: true },
      { name: 'subtotal', type: 'number', dto: 'IsNumber', required: true },
    ],
    relations: `  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;`,
    relationImports: [
      `import { Order } from '../../orders/entities/order.entity';`,
      `import { Product } from '../../products/entities/product.entity';`,
    ],
  },
  {
    folder: 'service_requests',
    entity: 'ServiceRequest',
    table: 'service_requests',
    route: 'service-requests',
    fields: [
      { name: 'client_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'specialty_id', type: 'number', dto: 'IsInt', required: true },
      { name: 'title', type: 'string', dto: 'IsString', required: true },
      { name: 'description', type: 'string', dto: 'IsString', required: true },
      { name: 'address', type: 'string', dto: 'IsString', required: true },
      { name: 'status', type: 'string', dto: 'IsString', required: false, default: 'pendiente' },
      { name: 'is_emergency', type: 'boolean', dto: 'IsBoolean', required: false, default: false },
      { name: 'preferred_date', type: 'Date | null', dto: 'IsDateString', required: false },
    ],
    entityExtra: `
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;`,
    relations: `  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => Specialty)
  @JoinColumn({ name: 'specialty_id' })
  specialty: Specialty;`,
    relationImports: [
      `import { Client } from '../../clients/entities/client.entity';`,
      `import { Specialty } from '../../specialties/entities/specialty.entity';`,
    ],
  },
  {
    folder: 'service_offers',
    entity: 'ServiceOffer',
    table: 'service_offers',
    route: 'service-offers',
    fields: [
      { name: 'service_request_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'professional_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'price', type: 'number', dto: 'IsNumber', required: true },
      { name: 'message', type: 'string | null', dto: 'IsString', required: false },
      { name: 'is_accepted', type: 'boolean', dto: 'IsBoolean', required: false, default: false },
    ],
    entityExtra: `
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;`,
    relations: `  @ManyToOne(() => ServiceRequest, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_request_id' })
  service_request: ServiceRequest;

  @ManyToOne(() => Professional)
  @JoinColumn({ name: 'professional_id' })
  professional: Professional;`,
    relationImports: [
      `import { ServiceRequest } from '../../service_requests/entities/service-request.entity';`,
      `import { Professional } from '../../professionals/entities/professional.entity';`,
    ],
  },
  {
    folder: 'service_assignments',
    entity: 'ServiceAssignment',
    table: 'service_assignments',
    route: 'service-assignments',
    fields: [
      { name: 'service_request_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'service_offer_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'professional_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'client_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'final_price', type: 'number', dto: 'IsNumber', required: true },
      { name: 'started_at', type: 'Date | null', dto: 'IsDateString', required: false },
      { name: 'completed_at', type: 'Date | null', dto: 'IsDateString', required: false },
    ],
    relations: `  @ManyToOne(() => ServiceRequest)
  @JoinColumn({ name: 'service_request_id' })
  service_request: ServiceRequest;

  @ManyToOne(() => ServiceOffer)
  @JoinColumn({ name: 'service_offer_id' })
  service_offer: ServiceOffer;

  @ManyToOne(() => Professional)
  @JoinColumn({ name: 'professional_id' })
  professional: Professional;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;`,
    relationImports: [
      `import { ServiceRequest } from '../../service_requests/entities/service-request.entity';`,
      `import { ServiceOffer } from '../../service_offers/entities/service-offer.entity';`,
      `import { Professional } from '../../professionals/entities/professional.entity';`,
      `import { Client } from '../../clients/entities/client.entity';`,
    ],
  },
  {
    folder: 'reviews',
    entity: 'Review',
    table: 'reviews',
    route: 'reviews',
    fields: [
      { name: 'reviewer_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'service_assignment_id', type: 'string | null', dto: 'IsUUID', required: false },
      { name: 'product_id', type: 'string | null', dto: 'IsUUID', required: false },
      { name: 'rating', type: 'number', dto: 'IsInt', required: true },
      { name: 'comment', type: 'string | null', dto: 'IsString', required: false },
    ],
    entityExtra: `
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;`,
    relations: `  @ManyToOne(() => User)
  @JoinColumn({ name: 'reviewer_id' })
  reviewer: User;

  @ManyToOne(() => ServiceAssignment, { nullable: true })
  @JoinColumn({ name: 'service_assignment_id' })
  service_assignment: ServiceAssignment | null;

  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product: Product | null;`,
    relationImports: [
      `import { User } from '../../users/entities/user.entity';`,
      `import { ServiceAssignment } from '../../service_assignments/entities/service-assignment.entity';`,
      `import { Product } from '../../products/entities/product.entity';`,
    ],
  },
  {
    folder: 'memberships',
    entity: 'Membership',
    table: 'memberships',
    route: 'memberships',
    idType: 'number',
    fields: [
      { name: 'plan', type: 'string', dto: 'IsString', required: true },
      { name: 'name', type: 'string', dto: 'IsString', required: true },
      { name: 'price', type: 'number', dto: 'IsNumber', required: true },
      { name: 'duration_days', type: 'number', dto: 'IsInt', required: false, default: 30 },
      { name: 'description', type: 'string | null', dto: 'IsString', required: false },
    ],
  },
  {
    folder: 'user_memberships',
    entity: 'UserMembership',
    table: 'user_memberships',
    route: 'user-memberships',
    fields: [
      { name: 'user_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'membership_id', type: 'number', dto: 'IsInt', required: true },
      { name: 'expires_at', type: 'Date', dto: 'IsDateString', required: true },
      { name: 'auto_renew', type: 'boolean', dto: 'IsBoolean', required: false, default: true },
    ],
    relations: `  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Membership)
  @JoinColumn({ name: 'membership_id' })
  membership: Membership;`,
    relationImports: [
      `import { User } from '../../users/entities/user.entity';`,
      `import { Membership } from '../../memberships/entities/membership.entity';`,
    ],
  },
  {
    folder: 'community_posts',
    entity: 'CommunityPost',
    table: 'community_posts',
    route: 'community-posts',
    fields: [
      { name: 'user_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'title', type: 'string | null', dto: 'IsString', required: false },
      { name: 'content', type: 'string', dto: 'IsString', required: true },
      { name: 'photos', type: 'string[] | null', dto: 'IsArray', required: false },
    ],
    entityExtra: `
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;`,
    relations: `  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;`,
    relationImports: [`import { User } from '../../users/entities/user.entity';`],
  },
  {
    folder: 'post_comments',
    entity: 'PostComment',
    table: 'post_comments',
    route: 'post-comments',
    fields: [
      { name: 'post_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'user_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'content', type: 'string', dto: 'IsString', required: true },
    ],
    entityExtra: `
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;`,
    relations: `  @ManyToOne(() => CommunityPost, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: CommunityPost;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;`,
    relationImports: [
      `import { CommunityPost } from '../../community_posts/entities/community-post.entity';`,
      `import { User } from '../../users/entities/user.entity';`,
    ],
  },
  {
    folder: 'conversations',
    entity: 'Conversation',
    table: 'conversations',
    route: 'conversations',
    fields: [],
    entityExtra: `
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;`,
  },
  {
    folder: 'conversation_participants',
    entity: 'ConversationParticipant',
    table: 'conversation_participants',
    route: 'conversation-participants',
    compositeKey: true,
    fields: [
      { name: 'conversation_id', type: 'string', dto: 'IsUUID', required: true, primary: true },
      { name: 'user_id', type: 'string', dto: 'IsUUID', required: true, primary: true },
    ],
    relations: `  @ManyToOne(() => Conversation, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;`,
    relationImports: [
      `import { Conversation } from '../../conversations/entities/conversation.entity';`,
      `import { User } from '../../users/entities/user.entity';`,
    ],
  },
  {
    folder: 'messages',
    entity: 'Message',
    table: 'messages',
    route: 'messages',
    fields: [
      { name: 'conversation_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'sender_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'type', type: 'string', dto: 'IsString', required: false, default: 'texto' },
      { name: 'content', type: 'string | null', dto: 'IsString', required: false },
      { name: 'file_url', type: 'string | null', dto: 'IsString', required: false },
      { name: 'is_read', type: 'boolean', dto: 'IsBoolean', required: false, default: false },
    ],
    entityExtra: `
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;`,
    relations: `  @ManyToOne(() => Conversation, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  sender: User;`,
    relationImports: [
      `import { Conversation } from '../../conversations/entities/conversation.entity';`,
      `import { User } from '../../users/entities/user.entity';`,
    ],
  },
  {
    folder: 'transactions',
    entity: 'Transaction',
    table: 'transactions',
    route: 'transactions',
    fields: [
      { name: 'user_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'order_id', type: 'string | null', dto: 'IsUUID', required: false },
      { name: 'service_assignment_id', type: 'string | null', dto: 'IsUUID', required: false },
      { name: 'amount', type: 'number', dto: 'IsNumber', required: true },
      { name: 'status', type: 'string', dto: 'IsString', required: false, default: 'pendiente' },
      { name: 'gateway', type: 'string | null', dto: 'IsString', required: false },
    ],
    entityExtra: `
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;`,
    relations: `  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Order, { nullable: true })
  @JoinColumn({ name: 'order_id' })
  order: Order | null;

  @ManyToOne(() => ServiceAssignment, { nullable: true })
  @JoinColumn({ name: 'service_assignment_id' })
  service_assignment: ServiceAssignment | null;`,
    relationImports: [
      `import { User } from '../../users/entities/user.entity';`,
      `import { Order } from '../../orders/entities/order.entity';`,
      `import { ServiceAssignment } from '../../service_assignments/entities/service-assignment.entity';`,
    ],
  },
  {
    folder: 'vehicles',
    entity: 'Vehicle',
    table: 'vehicles',
    route: 'vehicles',
    fields: [
      { name: 'driver_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'plate', type: 'string', dto: 'IsString', required: true },
      { name: 'brand', type: 'string | null', dto: 'IsString', required: false },
      { name: 'model', type: 'string | null', dto: 'IsString', required: false },
      { name: 'type', type: 'string', dto: 'IsString', required: false, default: 'camioneta' },
      { name: 'capacity_kg', type: 'number | null', dto: 'IsNumber', required: false },
      { name: 'is_active', type: 'boolean', dto: 'IsBoolean', required: false, default: true },
    ],
    relations: `  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'driver_id' })
  driver: User;`,
    relationImports: [`import { User } from '../../users/entities/user.entity';`],
  },
  {
    folder: 'deliveries',
    entity: 'Delivery',
    table: 'deliveries',
    route: 'deliveries',
    fields: [
      { name: 'order_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'driver_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'vehicle_id', type: 'string | null', dto: 'IsUUID', required: false },
      { name: 'status', type: 'string', dto: 'IsString', required: false, default: 'pendiente' },
      { name: 'pickup_address', type: 'string', dto: 'IsString', required: true },
      { name: 'pickup_lat', type: 'number | null', dto: 'IsNumber', required: false },
      { name: 'pickup_lng', type: 'number | null', dto: 'IsNumber', required: false },
      { name: 'delivery_address', type: 'string', dto: 'IsString', required: true },
      { name: 'delivery_lat', type: 'number | null', dto: 'IsNumber', required: false },
      { name: 'delivery_lng', type: 'number | null', dto: 'IsNumber', required: false },
      { name: 'distance_meters', type: 'number | null', dto: 'IsInt', required: false },
      { name: 'duration_seconds', type: 'number | null', dto: 'IsInt', required: false },
      { name: 'polyline_encoded', type: 'string | null', dto: 'IsString', required: false },
      { name: 'started_at', type: 'Date | null', dto: 'IsDateString', required: false },
      { name: 'completed_at', type: 'Date | null', dto: 'IsDateString', required: false },
    ],
    entityExtra: `
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated_at: Date;`,
    relations: `  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'driver_id' })
  driver: User;

  @ManyToOne(() => Vehicle, { nullable: true })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle | null;`,
    relationImports: [
      `import { Order } from '../../orders/entities/order.entity';`,
      `import { User } from '../../users/entities/user.entity';`,
      `import { Vehicle } from '../../vehicles/entities/vehicle.entity';`,
    ],
  },
  {
    folder: 'route_waypoints',
    entity: 'RouteWaypoint',
    table: 'route_waypoints',
    route: 'route-waypoints',
    fields: [
      { name: 'delivery_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'stop_order', type: 'number', dto: 'IsInt', required: true },
      { name: 'address', type: 'string', dto: 'IsString', required: true },
      { name: 'lat', type: 'number | null', dto: 'IsNumber', required: false },
      { name: 'lng', type: 'number | null', dto: 'IsNumber', required: false },
      { name: 'is_pickup', type: 'boolean', dto: 'IsBoolean', required: false, default: false },
      { name: 'arrived_at', type: 'Date | null', dto: 'IsDateString', required: false },
      { name: 'left_at', type: 'Date | null', dto: 'IsDateString', required: false },
    ],
    relations: `  @ManyToOne(() => Delivery, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'delivery_id' })
  delivery: Delivery;`,
    relationImports: [`import { Delivery } from '../../deliveries/entities/delivery.entity';`],
  },
  {
    folder: 'delivery_tracking',
    entity: 'DeliveryTracking',
    table: 'delivery_tracking',
    route: 'delivery-tracking',
    idType: 'bigint',
    fields: [
      { name: 'delivery_id', type: 'string', dto: 'IsUUID', required: true },
      { name: 'lat', type: 'number', dto: 'IsNumber', required: true },
      { name: 'lng', type: 'number', dto: 'IsNumber', required: true },
      { name: 'recorded_at', type: 'Date', dto: 'IsDateString', required: false },
    ],
    relations: `  @ManyToOne(() => Delivery, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'delivery_id' })
  delivery: Delivery;`,
    relationImports: [`import { Delivery } from '../../deliveries/entities/delivery.entity';`],
  },
];

function toKebab(name) {
  return name.replace(/_/g, '-').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function entityFileName(entity) {
  return `${toKebab(entity)}.entity.ts`;
}

function columnDecorator(field) {
  const opts = [];
  if (field.name.includes('_')) opts.push(`name: '${field.name}'`);
  if (field.dto === 'IsEmail') return `@Column({ type: 'varchar', length: 255, unique: true })`;
  if (field.dto === 'IsUUID') return `@Column({ ${opts.length ? opts.join(', ') + ', ' : ''}type: 'uuid'${field.primary ? '' : ''}${field.name === 'user_id' || field.name === 'service_request_id' || field.name === 'service_offer_id' ? ', unique: true' : ''} })`;
  if (field.dto === 'IsString' && field.name.includes('address')) return `@Column({ ${opts.length ? opts.join(', ') + ', ' : ''}type: 'text'${field.required === false ? ', nullable: true' : ''} })`;
  if (field.dto === 'IsString' && (field.name === 'description' || field.name === 'comment' || field.name === 'content' || field.name === 'message' || field.name === 'bio' || field.name === 'logo_url' || field.name === 'avatar_url' || field.name === 'file_url' || field.name === 'polyline_encoded')) {
    return `@Column({ ${opts.length ? opts.join(', ') + ', ' : ''}type: 'text'${field.required === false ? ', nullable: true' : ''} })`;
  }
  if (field.name === 'photos') return `@Column({ type: 'text', array: true, nullable: true })`;
  if (field.dto === 'IsString') {
    const lengths = { role: 50, first_name: 100, last_name: 100, phone: 30, city: 100, commercial_name: 200, ruc: 30, name: 200, title: 200, status: 50, type: 20, gateway: 50, plate: 20, brand: 100, model: 100, plan: 50, slug: 100 };
    const len = lengths[field.name] || 255;
    let col = `@Column({ ${opts.length ? opts.join(', ') + ', ' : ''}type: 'varchar', length: ${len}`;
    if (field.required === false) col += ', nullable: true';
    if (field.name === 'ruc' || field.name === 'plate' || field.name === 'plan' || field.name === 'slug' || field.name === 'name' && field.name !== 'first_name') {
      if (['ruc', 'plate', 'plan', 'slug'].includes(field.name)) col += ', unique: true';
    }
    if (field.default !== undefined) col += `, default: ${typeof field.default === 'string' ? `'${field.default}'` : field.default}`;
    return col + ' })';
  }
  if (field.dto === 'IsInt' || field.dto === 'IsNumber') {
    if (['lat', 'lng', 'pickup_lat', 'pickup_lng', 'delivery_lat', 'delivery_lng'].includes(field.name)) {
      return `@Column({ ${opts.length ? opts.join(', ') + ', ' : ''}type: 'decimal', precision: 10, scale: 7, nullable: true })`;
    }
    if (field.name === 'capacity_kg') return `@Column({ name: 'capacity_kg', type: 'decimal', precision: 8, scale: 2, nullable: true })`;
    if (['base_price', 'price', 'total', 'unit_price', 'subtotal', 'final_price', 'amount'].includes(field.name)) {
      return `@Column({ ${opts.length ? opts.join(', ') + ', ' : ''}type: 'decimal', precision: 10, scale: 2${field.required === false ? '' : ''}${field.default !== undefined ? `, default: ${field.default}` : ''} })`;
    }
    if (field.name === 'avg_rating') return `@Column({ name: 'avg_rating', type: 'decimal', precision: 3, scale: 2, default: 0 })`;
    if (field.name === 'service_radius_km') return `@Column({ name: 'service_radius_km', type: 'decimal', precision: 6, scale: 2, default: 20 })`;
    if (field.name === 'years_experience' || field.name === 'permission_level' || field.name === 'rating' || field.name === 'stop_order' || field.name === 'duration_days') {
      return `@Column({ ${opts.length ? opts.join(', ') + ', ' : ''}type: 'smallint'${field.default !== undefined ? `, default: ${field.default}` : ''} })`;
    }
    return `@Column({ ${opts.length ? opts.join(', ') + ', ' : ''}type: 'int'${field.default !== undefined ? `, default: ${field.default}` : ''} })`;
  }
  if (field.dto === 'IsBoolean') return `@Column({ ${opts.length ? opts.join(', ') + ', ' : ''}type: 'boolean'${field.default !== undefined ? `, default: ${field.default}` : ''} })`;
  if (field.dto === 'IsDateString') return `@Column({ ${opts.length ? opts.join(', ') + ', ' : ''}type: 'timestamptz'${field.required === false ? ', nullable: true' : ''} })`;
  return `@Column()`;
}

function generateEntity(mod) {
  const entityFile = entityFileName(mod.entity);
  const typeormImports = new Set(['Entity', 'Column']);
  if (!mod.compositeKey) {
    if (mod.idType === 'number') typeormImports.add('PrimaryGeneratedColumn');
    else if (mod.idType === 'bigint') typeormImports.add('PrimaryGeneratedColumn');
    else typeormImports.add('PrimaryGeneratedColumn');
  } else {
    typeormImports.add('PrimaryColumn');
  }
  if (mod.relations) {
    typeormImports.add('ManyToOne');
    typeormImports.add('JoinColumn');
  }
  if (mod.entityExtra?.includes('CreateDateColumn')) typeormImports.add('CreateDateColumn');
  if (mod.entityExtra?.includes('UpdateDateColumn')) typeormImports.add('UpdateDateColumn');
  if (mod.entityExtra?.includes('DeleteDateColumn')) typeormImports.add('DeleteDateColumn');
  if (mod.softDelete) typeormImports.add('DeleteDateColumn');

  let idCol = '';
  if (mod.compositeKey) {
    idCol = mod.fields.filter(f => f.primary).map(f =>
      `  @PrimaryColumn({ name: '${f.name}', type: '${f.dto === 'IsInt' ? 'int' : 'uuid'}' })\n  ${f.name}: ${f.type};`
    ).join('\n\n');
  } else if (mod.idType === 'number') {
    idCol = `  @PrimaryGeneratedColumn()\n  id: number;`;
  } else if (mod.idType === 'bigint') {
    idCol = `  @PrimaryGeneratedColumn({ type: 'bigint' })\n  id: string;`;
  } else {
    idCol = `  @PrimaryGeneratedColumn('uuid')\n  id: string;`;
  }

  const fieldCols = mod.fields.filter(f => !f.primary).map(f =>
    `  ${columnDecorator(f)}\n  ${f.name}: ${f.type};`
  ).join('\n\n');

  const relationImports = (mod.relationImports || []).join('\n');
  const relations = mod.relations ? `\n${mod.relations}` : '';
  const extra = mod.entityExtra || (mod.softDelete ? `
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deleted_at: Date | null;` : '');

  return `import {
  ${[...typeormImports].sort().join(',\n  ')},
} from 'typeorm';
${relationImports ? relationImports + '\n' : ''}
@Entity({ name: '${mod.table}' })
export class ${mod.entity} {
${idCol}
${fieldCols ? '\n' + fieldCols : ''}${extra}${relations}
}
`;
}

function dtoValidators(field) {
  const validators = [];
  if (!field.required) validators.push('IsOptional()');
  if (field.dto === 'IsEmail') validators.push('IsEmail()');
  else if (field.dto === 'IsUUID') validators.push('IsUUID()');
  else if (field.dto === 'IsString') validators.push('IsString()');
  else if (field.dto === 'IsInt') validators.push('IsInt()');
  else if (field.dto === 'IsNumber') validators.push('IsNumber()');
  else if (field.dto === 'IsBoolean') validators.push('IsBoolean()');
  else if (field.dto === 'IsDateString') validators.push('IsDateString()');
  else if (field.dto === 'IsArray') validators.push('IsArray()', 'IsString({ each: true })');
  if (field.required) validators.unshift('IsNotEmpty()');
  return validators;
}

function generateCreateDto(mod) {
  const imports = new Set(['IsNotEmpty', 'IsOptional']);
  mod.fields.forEach(f => {
    if (f.dto === 'IsEmail') imports.add('IsEmail');
    if (f.dto === 'IsUUID') imports.add('IsUUID');
    if (f.dto === 'IsString') imports.add('IsString');
    if (f.dto === 'IsInt') imports.add('IsInt');
    if (f.dto === 'IsNumber') imports.add('IsNumber');
    if (f.dto === 'IsBoolean') imports.add('IsBoolean');
    if (f.dto === 'IsDateString') imports.add('IsDateString');
    if (f.dto === 'IsArray') { imports.add('IsArray'); imports.add('IsString'); }
  });

  const props = mod.fields.map(f => {
    const val = dtoValidators(f).map(v => `@${v}`).join('\n  ');
    return `  ${val}\n  ${f.name}${f.required ? '' : '?'}: ${f.type.replace(' | null', '').replace('[] | null', '[]')};`;
  }).join('\n\n');

  return `import { ${[...imports].sort().join(', ')} } from 'class-validator';

export class Create${mod.entity}Dto {
${props || '  // no fields'}
}
`;
}

function generateUpdateDto(mod) {
  const imports = new Set(['IsOptional']);
  mod.fields.forEach(f => {
    if (f.dto === 'IsEmail') imports.add('IsEmail');
    if (f.dto === 'IsUUID') imports.add('IsUUID');
    if (f.dto === 'IsString') imports.add('IsString');
    if (f.dto === 'IsInt') imports.add('IsInt');
    if (f.dto === 'IsNumber') imports.add('IsNumber');
    if (f.dto === 'IsBoolean') imports.add('IsBoolean');
    if (f.dto === 'IsDateString') imports.add('IsDateString');
    if (f.dto === 'IsArray') { imports.add('IsArray'); imports.add('IsString'); }
  });

  const props = mod.fields.map(f => {
    const validators = ['IsOptional()'];
    if (f.dto === 'IsEmail') validators.push('IsEmail()');
    else if (f.dto === 'IsUUID') validators.push('IsUUID()');
    else if (f.dto === 'IsString') validators.push('IsString()');
    else if (f.dto === 'IsInt') validators.push('IsInt()');
    else if (f.dto === 'IsNumber') validators.push('IsNumber()');
    else if (f.dto === 'IsBoolean') validators.push('IsBoolean()');
    else if (f.dto === 'IsDateString') validators.push('IsDateString()');
    else if (f.dto === 'IsArray') validators.push('IsArray()', 'IsString({ each: true })');
    return `  ${validators.map(v => `@${v}`).join('\n  ')}\n  ${f.name}?: ${f.type.replace(' | null', '').replace('[] | null', '[]')};`;
  }).join('\n\n');

  return `import { ${[...imports].sort().join(', ')} } from 'class-validator';

export class Update${mod.entity}Dto {
${props || '  // no fields'}
}
`;
}

function generateService(mod) {
  const removeMethod = mod.softDelete
    ? `await this.repository.softRemove(entity);`
    : `await this.repository.remove(entity);`;

  if (mod.compositeKey) {
    const keys = mod.fields.filter(f => f.primary);
    const params = keys.map(k => `${k.name}: ${k.type === 'number' ? 'number' : 'string'}`).join(', ');
    const where = keys.map(k => k.name).join(', ');
    return `import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ${mod.entity} } from './entities/${entityFileName(mod.entity).replace('.ts', '')}';
import { Create${mod.entity}Dto } from './dto/create-${toKebab(mod.entity)}.dto';
import { Update${mod.entity}Dto } from './dto/update-${toKebab(mod.entity)}.dto';

@Injectable()
export class ${mod.entity}Service {
  constructor(
    @InjectRepository(${mod.entity})
    private readonly repository: Repository<${mod.entity}>,
  ) {}

  create(createDto: Create${mod.entity}Dto) {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  findAll(skip = 0, take = 10) {
    return this.repository.findAndCount({ skip, take });
  }

  async findOne(${params}) {
    const entity = await this.repository.findOne({ where: { ${where} } });
    if (!entity) throw new NotFoundException('${mod.entity} not found');
    return entity;
  }

  async update(${params}, updateDto: Update${mod.entity}Dto) {
    const entity = await this.findOne(${keys.map(k => k.name).join(', ')});
    Object.assign(entity, updateDto);
    return this.repository.save(entity);
  }

  async remove(${params}) {
    const entity = await this.findOne(${keys.map(k => k.name).join(', ')});
    await this.repository.remove(entity);
  }
}
`;
  }

  const idType = mod.idType === 'number' ? 'number' : mod.idType === 'bigint' ? 'string' : 'string';
  const findWhere = mod.softDelete ? `{ skip, take, withDeleted: false }` : `{ skip, take }`;

  return `import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ${mod.entity} } from './entities/${entityFileName(mod.entity).replace('.ts', '')}';
import { Create${mod.entity}Dto } from './dto/create-${toKebab(mod.entity)}.dto';
import { Update${mod.entity}Dto } from './dto/update-${toKebab(mod.entity)}.dto';

@Injectable()
export class ${mod.entity}Service {
  constructor(
    @InjectRepository(${mod.entity})
    private readonly repository: Repository<${mod.entity}>,
  ) {}

  create(createDto: Create${mod.entity}Dto) {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  findAll(skip = 0, take = 10) {
    return this.repository.findAndCount(${findWhere});
  }

  async findOne(id: ${idType}) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('${mod.entity} #' + id + ' not found');
    return entity;
  }

  async update(id: ${idType}, updateDto: Update${mod.entity}Dto) {
    const entity = await this.findOne(id);
    Object.assign(entity, updateDto);
    return this.repository.save(entity);
  }

  async remove(id: ${idType}) {
    const entity = await this.findOne(id);
    ${removeMethod}
  }
}
`;
}

function generateController(mod) {
  if (mod.compositeKey) {
    const keys = mod.fields.filter(f => f.primary);
    const route = keys.map(k => `:${k.name}`).join('/');
    const params = keys.map(k => `@Param('${k.name}') ${k.name}: ${k.type === 'number' ? 'number' : 'string'}`).join(', ');
    const paramTypes = keys.map(k => k.type === 'number' ? 'Number' : 'String').join(', ');
    return `import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ${mod.entity}Service } from './${mod.folder}.service';
import { Create${mod.entity}Dto } from './dto/create-${toKebab(mod.entity)}.dto';
import { Update${mod.entity}Dto } from './dto/update-${toKebab(mod.entity)}.dto';

@Controller('${mod.route}')
export class ${mod.entity}Controller {
  constructor(private readonly service: ${mod.entity}Service) {}

  @Post()
  create(@Body() createDto: Create${mod.entity}Dto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll(@Query('skip') skip = '0', @Query('take') take = '10') {
    return this.service.findAll(parseInt(skip), parseInt(take));
  }

  @Get('${route}')
  findOne(${params}) {
    return this.service.findOne(${keys.map(k => k.name).join(', ')});
  }

  @Patch('${route}')
  update(${params}, @Body() updateDto: Update${mod.entity}Dto) {
    return this.service.update(${keys.map(k => k.name).join(', ')}, updateDto);
  }

  @Delete('${route}')
  remove(${params}) {
    return this.service.remove(${keys.map(k => k.name).join(', ')});
  }
}
`;
  }

  const idPipe = mod.idType === 'number' ? 'ParseIntPipe' : undefined;
  const paramImport = idPipe ? `, ${idPipe}` : '';
  const idParam = mod.idType === 'number'
    ? `@Param('id', ParseIntPipe) id: number`
    : `@Param('id') id: string`;

  return `import { Body, Controller, Delete, Get, Param, Patch, Post, Query${paramImport} } from '@nestjs/common';
import { ${mod.entity}Service } from './${mod.folder}.service';
import { Create${mod.entity}Dto } from './dto/create-${toKebab(mod.entity)}.dto';
import { Update${mod.entity}Dto } from './dto/update-${toKebab(mod.entity)}.dto';

@Controller('${mod.route}')
export class ${mod.entity}Controller {
  constructor(private readonly service: ${mod.entity}Service) {}

  @Post()
  create(@Body() createDto: Create${mod.entity}Dto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll(@Query('skip') skip = '0', @Query('take') take = '10') {
    return this.service.findAll(parseInt(skip), parseInt(take));
  }

  @Get(':id')
  findOne(${idParam}) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(${idParam}, @Body() updateDto: Update${mod.entity}Dto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(${idParam}) {
    return this.service.remove(id);
  }
}
`;
}

function generateModule(mod) {
  const entityImport = entityFileName(mod.entity).replace('.ts', '');
  return `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${mod.entity} } from './entities/${entityImport}';
import { ${mod.entity}Service } from './${mod.folder}.service';
import { ${mod.entity}Controller } from './${mod.folder}.controller';

@Module({
  imports: [TypeOrmModule.forFeature([${mod.entity}])],
  controllers: [${mod.entity}Controller],
  providers: [${mod.entity}Service],
  exports: [${mod.entity}Service],
})
export class ${mod.entity}Module {}
`;
}

for (const mod of modules) {
  const dir = join(ROOT, mod.folder);
  mkdirSync(join(dir, 'dto'), { recursive: true });
  mkdirSync(join(dir, 'entities'), { recursive: true });

  writeFileSync(join(dir, 'entities', entityFileName(mod.entity)), generateEntity(mod));
  writeFileSync(join(dir, 'dto', `create-${toKebab(mod.entity)}.dto.ts`), generateCreateDto(mod));
  writeFileSync(join(dir, 'dto', `update-${toKebab(mod.entity)}.dto.ts`), generateUpdateDto(mod));
  writeFileSync(join(dir, `${mod.folder}.service.ts`), generateService(mod));
  writeFileSync(join(dir, `${mod.folder}.controller.ts`), generateController(mod));
  writeFileSync(join(dir, `${mod.folder}.module.ts`), generateModule(mod));
}

const appImports = modules.map(m => `import { ${m.entity}Module } from './${m.folder}/${m.folder}.module';`).join('\n');
const appModuleList = modules.map(m => `    ${m.entity}Module,`).join('\n');

writeFileSync(join(ROOT, 'app.module.ts'), `import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
${appImports}

@Module({
  imports: [
${appModuleList}
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
`);

console.log(`Generated ${modules.length} modules in src/`);

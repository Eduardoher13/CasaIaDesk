import { User } from '../users/entities/user.entity';
import { Client } from '../clients/entities/client.entity';
import { Professional } from '../professionals/entities/professional.entity';
import { Company } from '../companies/entities/company.entity';
import { Admin } from '../admins/entities/admin.entity';
import { Specialty } from '../specialties/entities/specialty.entity';
import { ProfessionalSpecialty } from '../professional_specialties/entities/professional-specialty.entity';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../order_items/entities/order-item.entity';
import { ServiceRequest } from '../service_requests/entities/service-request.entity';
import { ServiceOffer } from '../service_offers/entities/service-offer.entity';
import { ServiceAssignment } from '../service_assignments/entities/service-assignment.entity';
import { Review } from '../reviews/entities/review.entity';
import { Membership } from '../memberships/entities/membership.entity';
import { UserMembership } from '../user_memberships/entities/user-membership.entity';
import { CommunityPost } from '../community_posts/entities/community-post.entity';
import { PostComment } from '../post_comments/entities/post-comment.entity';
import { Conversation } from '../conversations/entities/conversation.entity';
import { ConversationParticipant } from '../conversation_participants/entities/conversation-participant.entity';
import { Message } from '../messages/entities/message.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Delivery } from '../deliveries/entities/delivery.entity';
import { RouteWaypoint } from '../route_waypoints/entities/route-waypoint.entity';
import { DeliveryTracking } from '../delivery_tracking/entities/delivery-tracking.entity';

export const entities = [
  User,
  Client,
  Professional,
  Company,
  Admin,
  Specialty,
  ProfessionalSpecialty,
  Product,
  Order,
  OrderItem,
  ServiceRequest,
  ServiceOffer,
  ServiceAssignment,
  Review,
  Membership,
  UserMembership,
  CommunityPost,
  PostComment,
  Conversation,
  ConversationParticipant,
  Message,
  Transaction,
  Vehicle,
  Delivery,
  RouteWaypoint,
  DeliveryTracking,
];

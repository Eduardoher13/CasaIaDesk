import { config } from 'dotenv';
import { DataSource, In, ObjectLiteral, Repository } from 'typeorm';
import { createDataSource, runSeed } from './seed';
import { DEMO_USER_EMAILS, LEGACY_SPECIALTY_SLUGS } from './seed-data';
import { User } from '../users/entities/user.entity';
import { Client } from '../clients/entities/client.entity';
import { Professional } from '../professionals/entities/professional.entity';
import { Company } from '../companies/entities/company.entity';
import { Product } from '../products/entities/product.entity';
import { ProfessionalSpecialty } from '../professional_specialties/entities/professional-specialty.entity';
import { Specialty } from '../specialties/entities/specialty.entity';
import { ServiceRequest } from '../service_requests/entities/service-request.entity';
import { ServiceOffer } from '../service_offers/entities/service-offer.entity';
import { ServiceAssignment } from '../service_assignments/entities/service-assignment.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../order_items/entities/order-item.entity';
import { Review } from '../reviews/entities/review.entity';
import { Delivery } from '../deliveries/entities/delivery.entity';
import { DeliveryTracking } from '../delivery_tracking/entities/delivery-tracking.entity';

config();

/** Emails del seed anterior que ya no se usan. */
const LEGACY_PROFESSIONAL_EMAILS = [
  'carlos.plomero@demo.com',
  'rosa.limpieza@demo.com',
  'miguel.multiservicio@demo.com',
];

/** Borra filas donde `column IN ids`, solo si hay ids. Devuelve los registros borrados por su id. */
async function deleteByColumn<T extends ObjectLiteral>(
  repo: Repository<T>,
  column: keyof T & string,
  ids: (string | number)[],
): Promise<void> {
  if (ids.length === 0) return;
  await repo
    .createQueryBuilder()
    .delete()
    .where(`${column} IN (:...ids)`, { ids })
    .execute();
}

async function findIds<T extends ObjectLiteral>(
  repo: Repository<T>,
  column: keyof T & string,
  ids: (string | number)[],
): Promise<string[]> {
  if (ids.length === 0) return [];
  const rows = await repo
    .createQueryBuilder('e')
    .where(`e.${column} IN (:...ids)`, { ids })
    .getMany();
  return rows.map((r) => (r as ObjectLiteral).id as string);
}

export async function deleteDemoData(dataSource: DataSource): Promise<void> {
  const userRepo = dataSource.getRepository(User);
  const allDemoEmails = [...DEMO_USER_EMAILS, ...LEGACY_PROFESSIONAL_EMAILS];

  const demoUsers = await userRepo.find({
    where: { email: In([...allDemoEmails]) },
    withDeleted: true,
  });

  if (demoUsers.length === 0) {
    console.log('No hay usuarios demo para borrar.');
  }

  const demoUserIds = demoUsers.map((u) => u.id);

  const professionalRepo = dataSource.getRepository(Professional);
  const companyRepo = dataSource.getRepository(Company);
  const clientRepo = dataSource.getRepository(Client);
  const productRepo = dataSource.getRepository(Product);
  const professionalSpecialtyRepo =
    dataSource.getRepository(ProfessionalSpecialty);
  const specialtyRepo = dataSource.getRepository(Specialty);
  const serviceRequestRepo = dataSource.getRepository(ServiceRequest);
  const serviceOfferRepo = dataSource.getRepository(ServiceOffer);
  const serviceAssignmentRepo = dataSource.getRepository(ServiceAssignment);
  const orderRepo = dataSource.getRepository(Order);
  const orderItemRepo = dataSource.getRepository(OrderItem);
  const reviewRepo = dataSource.getRepository(Review);
  const deliveryRepo = dataSource.getRepository(Delivery);
  const deliveryTrackingRepo = dataSource.getRepository(DeliveryTracking);

  const companyIds = await findIds(companyRepo, 'user_id', demoUserIds);
  const productIds = await findIds(productRepo, 'company_id', companyIds);
  const clientIds = await findIds(clientRepo, 'user_id', demoUserIds);
  const professionalIds = await findIds(
    professionalRepo,
    'user_id',
    demoUserIds,
  );
  const serviceRequestIds = await findIds(
    serviceRequestRepo,
    'client_id',
    clientIds,
  );
  const orderIds = await findIds(orderRepo, 'client_id', clientIds);

  // Assignments demo (por solicitud, cliente o profesional demo).
  const assignmentIdSet = new Set<string>([
    ...(await findIds(
      serviceAssignmentRepo,
      'service_request_id',
      serviceRequestIds,
    )),
    ...(await findIds(serviceAssignmentRepo, 'client_id', clientIds)),
    ...(await findIds(
      serviceAssignmentRepo,
      'professional_id',
      professionalIds,
    )),
  ]);
  const assignmentIds = [...assignmentIdSet];

  // 1. Reviews (referencian usuarios, assignments y productos demo).
  await deleteByColumn(reviewRepo, 'reviewer_id', demoUserIds);
  await deleteByColumn(reviewRepo, 'service_assignment_id', assignmentIds);
  await deleteByColumn(reviewRepo, 'product_id', productIds);

  // 2. Service assignments → offers → requests.
  await deleteByColumn(serviceAssignmentRepo, 'id', assignmentIds);
  await deleteByColumn(
    serviceOfferRepo,
    'service_request_id',
    serviceRequestIds,
  );
  await deleteByColumn(serviceOfferRepo, 'professional_id', professionalIds);
  await deleteByColumn(serviceRequestRepo, 'id', serviceRequestIds);

  // 3. Entregas (por orden demo o repartidor demo) y su tracking.
  const deliveryIdSet = new Set<string>([
    ...(await findIds(deliveryRepo, 'order_id', orderIds)),
    ...(await findIds(deliveryRepo, 'driver_id', demoUserIds)),
  ]);
  const deliveryIds = [...deliveryIdSet];
  await deleteByColumn(deliveryTrackingRepo, 'delivery_id', deliveryIds);
  await deleteByColumn(deliveryRepo, 'id', deliveryIds);

  // 4. Órdenes y sus items.
  await deleteByColumn(orderItemRepo, 'order_id', orderIds);
  await deleteByColumn(orderItemRepo, 'product_id', productIds);
  await deleteByColumn(orderRepo, 'id', orderIds);

  // 5. Productos demo.
  if (productIds.length > 0) {
    await deleteByColumn(productRepo, 'id', productIds);
    console.log(`  Productos demo eliminados (${companyIds.length} empresa(s)).`);
  }

  // 6. Profesionales y sus especialidades.
  if (professionalIds.length > 0) {
    await deleteByColumn(
      professionalSpecialtyRepo,
      'professional_id',
      professionalIds,
    );
    await deleteByColumn(professionalRepo, 'id', professionalIds);
    console.log(`  Profesionales demo eliminados: ${professionalIds.length}`);
  }

  // 7. Empresas, clientes y usuarios demo.
  if (demoUserIds.length > 0) {
    await deleteByColumn(companyRepo, 'user_id', demoUserIds);
    await deleteByColumn(clientRepo, 'user_id', demoUserIds);
    await deleteByColumn(userRepo, 'id', demoUserIds);
    console.log(`  Usuarios demo eliminados: ${demoUserIds.length}`);
  }

  // 8. Especialidades (Home + legacy).
  const slugsToRemove = [
    ...LEGACY_SPECIALTY_SLUGS,
    'electricidad',
    'fontaneria',
    'jardineria',
    'pintura',
    'remodelacion',
    'emergencia',
  ];

  const specialtiesToRemove = await specialtyRepo.find({
    where: { slug: In(slugsToRemove) },
  });

  if (specialtiesToRemove.length > 0) {
    const specialtyIds = specialtiesToRemove.map((s) => s.id);
    await deleteByColumn(professionalSpecialtyRepo, 'specialty_id', specialtyIds);
    await deleteByColumn(serviceRequestRepo, 'specialty_id', specialtyIds);
    await deleteByColumn(specialtyRepo, 'id', specialtyIds);
    console.log(`  Especialidades eliminadas: ${specialtiesToRemove.length}`);
  }
}

async function seedReset() {
  const dataSource = createDataSource();
  await dataSource.initialize();

  console.log('Borrando datos demo...');
  await deleteDemoData(dataSource);

  console.log('Re-insertando seed...');
  await runSeed(dataSource, { force: true });

  await dataSource.destroy();
}

if (require.main === module) {
  seedReset().catch((err) => {
    console.error('Error en seed:reset:', err);
    process.exit(1);
  });
}

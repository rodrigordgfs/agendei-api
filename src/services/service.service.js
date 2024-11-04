import serviceRepository from "../repositories/services.repository.js";
import AppError from '../utils/error.js';

const postService = async (description) => {
  const service = await serviceRepository.postService(description);
  return service;
};

const patchService = async (id, description) => {
  const serviceExists = await serviceRepository.getServiceById(id);
  if (!serviceExists) {
    throw new AppError('Service not found', 404);
  }
  const service = await serviceRepository.patchService(id, description);
  return service;
}

const getServices = async () => {
  const services = await serviceRepository.getServices();
  return services;
}

const getServiceById = async (id) => {
  const service = await serviceRepository.getServiceById(id);
  if (!service) {
    throw new AppError('Service not found', 404);
  }
  return service;
}

const deleteService = async (id) => {
  const serviceExists = await serviceRepository.getServiceById(id);
  if (!serviceExists) {
    throw new AppError('Service not found', 404);
  }

  const serviceDoctors = await serviceRepository.getServiceDoctors(id);
  if (serviceDoctors.length > 0) {
    throw new AppError('Service has doctors', 400);
  }

  await serviceRepository.deleteService(id);
}

export default {
  postService,
  patchService,
  getServices,
  getServiceById,
  deleteService
};

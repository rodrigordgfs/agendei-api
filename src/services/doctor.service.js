import doctorRepository from "../repositories/doctor.repository.js";
import serviceRepository from "../repositories/services.repository.js";
import AppError from "../utils/error.js";

const patchDoctor = async (id, name, specialty, icon) => {
  const doctorExists = doctorRepository.getDoctorById(id);
  if (!doctorExists) {
    throw new AppError("Doctor not found", 404);
  }
  const doctor = await doctorRepository.patchDoctor(id, name, specialty, icon);
  return doctor;
};

const postDoctor = async (name, specialty, icon) => {
  const doctor = await doctorRepository.postDoctor(name, specialty, icon);
  return doctor;
};

const getDoctor = async (name) => {
  const doctors = await doctorRepository.getDoctor(name);
  return doctors;
};

const getDoctorById = async (id) => {
  const doctor = await doctorRepository.getDoctorById(id);
  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }
  return doctor;
};

const deleteDoctor = async (id) => {
  const doctorExists = await doctorRepository.getDoctorById(id);
  if (!doctorExists) {
    throw new AppError("Doctor not found", 404);
  }
  const doctor = await doctorRepository.deleteDoctor(id);
  return doctor;
};

const getDoctorServices = async (id) => {
  const doctorExists = await doctorRepository.getDoctorById(id);
  if (!doctorExists) {
    throw new AppError("Doctor not found", 404);
  }
  const services = await doctorRepository.getDoctorServices(id);
  return services;
};

const getDoctorService = async (idDoctor, idService) => {
  const doctorExists = await doctorRepository.getDoctorById(idDoctor);
  if (!doctorExists) {
    throw new AppError("Doctor not found", 404);
  }

  const serviceExists = await serviceRepository.getServiceById(idService);
  if (!serviceExists) {
    throw new AppError("Service not found", 404);
  }

  const service = await doctorRepository.getDoctorService(idDoctor, idService);
  return service;
};

const patchDoctorServices = async (idDoctor, idService, price) => {
  const doctorExists = await doctorRepository.getDoctorById(idDoctor);
  if (!doctorExists) {
    throw new AppError("Doctor not found", 404);
  }

  const serviceExists = await serviceRepository.getServiceById(idService);
  if (!serviceExists) {
    throw new AppError("Service not found", 404);
  }

  const services = await doctorRepository.patchDoctorServices(idDoctor, idService, price);
  return services;
}

const deleteDoctorService = async (idDoctor, idService) => {
  const doctorServiceExists = await doctorRepository.getDoctorService(idDoctor, idService);
  
  if (!doctorServiceExists) {
    throw new AppError("Doctor service not found", 404);
  }

  const doctorExists = await doctorRepository.getDoctorById(idDoctor);
  if (!doctorExists) {
    throw new AppError("Doctor not found", 404);
  }

  const serviceExists = await serviceRepository.getServiceById(idService);
  if (!serviceExists) {
    throw new AppError("Service not found", 404);
  }

  const service = doctorRepository.deleteDoctorService(idDoctor, idService);
  return service;
}

export default {
  getDoctor,
  getDoctorById,
  postDoctor,
  patchDoctor,
  deleteDoctor,
  getDoctorServices,
  patchDoctorServices,
  getDoctorService,
  deleteDoctorService
};

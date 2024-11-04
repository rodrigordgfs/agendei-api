import { Router } from "express";
import doctors from "./controllers/doctor.controller.js";
import users from "./controllers/users.controller.js";
import services from "./controllers/services.controller.js";
import appointments from "./controllers/appointments.controller.js";
import token from "./utils/jwt.js";

const router = Router();

// Doctors
router.post("/doctors", token.validateToken, doctors.postDoctor);
router.patch("/doctors/:id", token.validateToken, doctors.patchDoctor);
router.get("/doctors", token.validateToken, doctors.getDoctor);
router.get("/doctors/:id", token.validateToken, doctors.getDoctorById);
router.delete("/doctors/:id", token.validateToken, doctors.deleteDoctor);
router.get("/doctors/:id/services", token.validateToken, doctors.getDoctorServices);
router.get("/doctors/:idDoctor/services/:idService", token.validateToken, doctors.getDoctorService);
router.patch("/doctors/:idDoctor/services/:idService", token.validateToken, doctors.patchDoctorServices);
router.get("/doctors/:id/services/:idService", token.validateToken, doctors.getDoctorService);
router.delete("/doctors/:idDoctor/services/:idService", token.validateToken, doctors.deleteDoctorService);

// Users
router.post("/users/register", users.registertUser);
router.post("/users/login", users.loginUser);
router.get("/users", token.validateToken, users.getUsers);
router.get("/users/:id", token.validateToken, users.getUserById);
router.patch("/users/:id", token.validateToken, users.patchUser);
router.delete("/users/:id", token.validateToken, users.deleteUser);

// Services
router.post("/services", token.validateToken, services.postService);
router.patch("/services/:id", token.validateToken, services.patchService);
router.get("/services", token.validateToken, services.getServices);
router.get("/services/:id", token.validateToken, services.getServiceById);
router.delete("/services/:id", token.validateToken, services.deleteService);

// Appointments
router.get('/appointments', token.validateToken, appointments.getAppointments)
router.post('/appointments', token.validateToken, appointments.postAppointment)
router.delete('/appointments/:id', token.validateToken, appointments.deleteAppointment)

export default router;

import doctorService from "../services/doctor.service.js";

const postDoctor = async (req, res) => {
  const { name, specialty, icon } = req.body;
  const doctor = await doctorService.postDoctor(name, specialty, icon);
  res.status(201).json(doctor);
};

const patchDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, specialty, icon } = req.body;
    const doctor = await doctorService.patchDoctor(id, name, specialty, icon);
    res.status(200).json(doctor);
  } catch (error) {
    if (error.message === "Doctor not found") {
      return res.status(404).json({ message: "Doutor não encontrado." });
    }
    console.log(error);
    res.status(500).json({ message: "Erro ao atualizar o doutor." });
  }
};

const getDoctor = async (req, res) => {
  const name = req.query?.name;
  const doctors = await doctorService.getDoctor(name);
  res.status(200).json(doctors);
};

const getDoctorById = async (req, res) => {
  try {
    const id = String(req.params.id);
    const doctor = await doctorService.getDoctorById(id);
    res.status(200).json(doctor);
  } catch (error) {
    if (error.message === "Doctor not found") {
      return res.status(404).json({ message: "Doutor não encontrado." });
    }
    console.log(error);
    res.status(500).json({ message: "Erro ao buscar o doutor." });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const id = String(req.params.id);
    await doctorService.deleteDoctor(id);
    res.status(200).json({ message: "Doctor deleted succesfully" });
  } catch (error) {
    if (error.message === "Doctor not found") {
      return res.status(404).json({ message: "Doutor não encontrado." });
    }
    console.log(error);
    res.status(500).json({ message: "Erro ao deletar o doutor." });
  }
};

const getDoctorServices = async (req, res) => {
  try {
    const id = String(req.params.id);
    const services = await doctorService.getDoctorServices(id);
    if (!services) {
      res.status(404).json({ message: "Doctor not found" });
      return;
    }
    res.status(200).json(services);
  } catch (error) {
    if (error.message === "Doctor not found") {
      return res.status(404).json({ message: "Doutor não encontrado." });
    }
    console.log(error);
    res.status(500).json({ message: "Erro ao buscar o doutor." });
  }
};

const getDoctorService = async (req, res) => {
  try {
    const { idDoctor, idService } = req.params;
    const service = await doctorService.getDoctorService(idDoctor, idService);
    if (!service) {
      res.status(404).json({ message: "Doctor or service not found" });
      return;
    }
    res.status(200).json(service);
  } catch (error) {
    if (error.message === "Doctor not found") {
      return res.status(404).json({ message: "Doutor não encontrado." });
    } else if (error.message === "Service not found") {
      return res.status(404).json({ message: "Serviço não encontrado." });
    }
    console.log(error);
    res.status(500).json({ message: "Erro ao buscar o serviço do doutor." });
  }
}

const patchDoctorServices = async (req, res) => {
  try {
    const { idDoctor, idService} = req.params;
    const { price } = req.body;
    const service = await doctorService.patchDoctorServices(idDoctor, idService, price);
    res.status(200).json(service);
  } catch (error) {
    if (error.message === "Doctor not found") {
      return res.status(404).json({ message: "Doutor não encontrado." });
    } else if (error.message === "Service not found") {
      return res.status(404).json({ message: "Serviço não encontrado." });
    }
    console.log(error);
    res.status(500).json({ message: "Erro ao atualizar os serviços do doutor." });
  }
}

const deleteDoctorService = async (req, res) => {
  try {
    const { idDoctor, idService } = req.params;
    await doctorService.deleteDoctorService(idDoctor, idService);
    res.status(200).json({ message: "Doctor service deleted succesfully" });
  } catch (error) {
    if (error.message === "Doctor service not found") {
      return res.status(404).json({ message: "Serviço do doutor não encontrado'" });
    } else if (error.message === "Doctor not found") {
      return res.status(404).json({ message: "Doutor não encontrado." });
    } else if (error.message === "Service not found") {
      return res.status(404).json({ message: "Serviço não encontrado." });
    }
    console.log(error);
    res.status(500).json({ message: "Erro ao deletar o serviço do doutor." });
  }
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

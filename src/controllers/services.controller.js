import serviceService from "../services/service.service.js";

const postService = async (req, res) => {
  const { description } = req.body;
  const service = await serviceService.postService(description);
  res.status(201).json(service);
};

const patchService = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const service = await serviceService.patchService(id, description);
    res.status(200).json(service);
  } catch (error) {
    if (error.message === "Service not found") {
      return res.status(404).json({ message: "Serviço não encontrado." });
    }
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar serviço" });
  }
}

const getServices = async (req, res) => {
  const services = await serviceService.getServices();
  res.status(200).json(services);
}

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await serviceService.getServiceById(id);
    res.status(200).json(service);
  } catch (error) {
    if (error.message === "Service not found") {
      return res.status(404).json({ message: "Serviço não encontrado." });
    }
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar serviço" });
  }
}

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await serviceService.deleteService(id);
    res.status(204).end();
  } catch (error) {
    if (error.message === "Service not found") {
      return res.status(404).json({ message: "Serviço não encontrado." });
    } else if (error.message === "Service has doctors") {
      return res.status(400).json({ message: "Serviço possui médicos vinculados." });
    }
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar serviço" });
  }
}

export default {
  postService,
  patchService,
  getServices,
  getServiceById,
  deleteService
};

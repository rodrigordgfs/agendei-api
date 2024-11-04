import appointmentsService from "../services/appointments.service.js";

const getAppointments = async (req, res) => {
  const { id_user } = req.query;
  const appointments = await appointmentsService.getAppointments(id_user);
  res.status(200).json(appointments);
};

const postAppointment = async (req, res) => {
  try {
    const { id_doctor, id_service, id_user, booking_date, booking_hour } =
      req.body;
    const newAppointment = await appointmentsService.postAppointment(
      id_doctor,
      id_service,
      id_user,
      booking_date,
      booking_hour
    );
    res.status(201).json(newAppointment);
  } catch (error) {
    if (error.message === "Doctor not found") {
      return res.status(404).json({ message: "Doutor não encontrado." });
    } else if (error.message === "Service not found") {
      return res.status(404).json({ message: "Serviço não encontrado." });
    } else if (error.message === "User not found") {
      return res.status(404).json({ message: "Usuário não encontrado." });
    } else if (error.message === "Doctor not available") {
      return res
        .status(400)
        .json({ message: "Doutor não disponível neste dia e hora." });
    }
    console.log(error);
    res.status(500).json({ message: "Erro ao atualizar o doutor." });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointmentExists = await appointmentsService.getAppointmentById(id);
    if (!appointmentExists) {
      return res.status(404).json({ message: "Consulta não encontrada." });
    }
    const deletedAppointment = await appointmentsService.deleteAppointment(id);
    if (deletedAppointment) {
      return res
        .status(200)
        .json({ message: "Consulta deletada com sucesso." });
    }
    res.status(404).json({ message: "Consulta não encontrada." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao deletar a consulta." });
  }
};

export default {
  getAppointments,
  postAppointment,
  deleteAppointment,
};

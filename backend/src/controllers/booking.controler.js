const BookingModel = require("../models/booking.model")


class BookingController{
    // Controlador utiliado para visualizar as informações da API
    async index(req,res){
        const data = await BookingModel.find();

        res.send({ data })
    }

    // Controlador utilizado para guardar as informações da API
    async store(req,res) {
        const data = req.body
        const booking = await BookingModel.findOne({bookday: data.bookday})
        const bookHour = await BookingModel.findOne({
            hours: {
                $elemMatch: {hour: data.hours[0].hour}
            }
        }) 
        // Testando se o dia selecionado já está na base de dados.
        if(booking) {
            // Caso já exista, então verifica a disponibilidade das horas de agendamento
            if(bookHour){
                // resposta provisória, mudar para adicionar um novo usuário caso a hora já exista
                return res.status(400).send({message: "Hour Already Taken"})
            }
                // Cria uma nova hora no dia, sem necessidade de criar outro dia.
            const newHour = await BookingModel.updateOne({bookday: data.bookday},
                { $push: { hours: [{hour: data.hours[0].hour}]}}) 
            res.send({newHour})
        }else{
            // Caso o dia não tenha sido criado, cria um novo
            const newBooking = await BookingModel.create(data)
            res.send({newBooking}) 
        }
    }
    // Controlador utilizado para remover um agendamento baseado em seu ID.
    async remove(req,res) {
        const { id } = req.params;
        try{
            const booking = await BookingModel.findByIdAndDelete(id);
            if(!booking){
                throw new Error("Booking does not exists")
            }
            res.send({message:'Booking Removed'})
        } catch(error){
            res.status(400).send({message: error})
        }
    }

    // Função mais importante do momento, update baseado no id da requisição
    async update(req,res){
        const {
            params: {id},
            body,
        } = req;

        const booking = await BookingModel.findOneAndUpdate(id, body).lean();
        }
}

module.exports = new BookingController();
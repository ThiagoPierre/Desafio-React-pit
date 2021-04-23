const UsersModel = require ('../models/users.model')
var firstBy = require('thenby');

class UsersController{
    async index(req,res) {
        const data = await UsersModel.find();

        const sorted = data.sort(
            firstBy('bookday')
            .thenBy('hour')
        )
        res.send(sorted) // Organiza os dados por dia/hora para melhor apresentação no frontend
    }
    async store (req,res){
        const birthDate = new Date(req.body.birthday) // Transforma a string em uma data
        const data = {...req.body, birthday : birthDate}
        try{
            const countDia = await UsersModel.countDocuments({bookday:data.bookday}); // Quantas vezes o dia da requisição aparece
            const countHour = await UsersModel.countDocuments({bookday: data.bookday, hour:data.hour}); // Quantas vezes a hora da requisição, baseada no dia, aparece
            const isOld = 60 // Mudar essa variável caso queira que seja considerado idoso em uma idade diferente
            const schedulePerDay = 20;// Variável que representa o número máximo de agendamentos em um dia específico
            const schedulePerHour = 2;// Variável que representa o número máximo de agendamentos em uma hora específica
            
            // Calcula a data do limite estipulado para ser considerado idoso
            const sixtyDate = new Date();
            sixtyDate.setFullYear(sixtyDate.getFullYear() - isOld) ;
            
            if(countDia < schedulePerDay){ // Verifica se existem menos de 20 agendamentos no dia
                if(countHour < schedulePerHour){ // Verifica se existem menos de 2 agendamentos na hora estipulada
                    // Caso sim, cria um novo agendamento
                    const newUsers = await UsersModel.create( data );
                    res.send({newUsers});
                }else{ // Caso hajam 2 agendamentos no dia, passará por mais verificações
                    // Verifica, nos agendamentos realizados, se existem jovens, e quantos são.
                    var isYoung = await UsersModel.find({ bookday:data.bookday, hour:data.hour, birthday: {$gt: sixtyDate} });
                    if(isYoung.length === 2 && sixtyDate > data.birthday) { 
                        if(isYoung[0].birthday > isYoung[1].birthday) { // Caso hajam 2 jovens, e o primeiro seja o mais novo, será o substituído.
                            const replaced = await UsersModel.findOneAndReplace({ bookday:data.bookday, hour:data.hour, birthday: isYoung[0].birthday },
                                data)
                                res.send(replaced);
                        }else{ // Caso o segundo seja o mais novo, ou o aniversário de ambos sejam iguais, o segundo será substituído.
                            const replaced2 = await UsersModel.findOneAndReplace({ bookday:data.bookday, hour:data.hour, birthday: isYoung[1].birthday },
                                data)
                                res.send(replaced2);
                            }
                    }else if(isYoung.length === 1  && sixtyDate > data.birthday) { // Se houver apenas 1 jovem, esse será substituído
                        const newBooking = await UsersModel.findOneAndReplace({ bookday:data.bookday, hour:data.hour, birthday: isYoung[0].birthday },
                            data)
                            res.send(newBooking);
                    }else{ // Caso não hajam jovens e um idoso tente escolher a hora, a hora se encontrará lotada.
                        res.status(400).send({ message: 'A hora escolhida não possui mais vagas.' });
                        }
                    }
            } else {
                res.status(400).send({ message:"O dia escolhido não possui mais vagas." });
                }
        } catch(e){
            res.status(400).send({ message: e.message })
            }
        }
    async remove(req,res){
        const { id } = req.params;
        try{
            const schedule = await UsersModel.findByIdAndDelete(id); // Procura um objeto pelo seu ID, então o remove.
            if (!schedule){
                throw new Error("Booking does not exist"); // Caso não ache um objeto, retorna um erro.
            }
            res.send({ message: "User booking removed!" });
        }catch(e){
            res.status(400).send({ message: e.message });
        }
    }
    async update(req, res) {
        const { 
            params: { id },
            body,
        } = req;
        try {
            const user = await UsersModel.findByIdAndUpdate(id, body).lean(); // Em um método PUT, procura um agendamento pelo ID e dá update no mesmo.
            res.send({
                user: {
                    ...user,
                    ...body,
                },
            });
        } catch (e){
            res.status(400).send({ message: e.message })
        }
    }
}
module.exports = new UsersController();
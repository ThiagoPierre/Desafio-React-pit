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
        const data = req.body
        const countDia = await UsersModel.countDocuments({bookday:data.bookday}); // Quantas vezes o dia da requisição aparece
        const countHour = await UsersModel.countDocuments({bookday: data.bookday, hour:data.hour}); // Quantas vezes a hora da requisição, baseada no dia, aparece
        const isOld = 60 // Mudar essa variável caso queira que seja considerado idoso em uma idade diferente
        const schedulePerDay = 3;// Variável que representa o número máximo de agendamentos em um dia específico
        const schedulePerHour = 2;// Variável que representa o número máximo de agendamentos em uma hora específica

        // Calcula a data do limite estipulado para ser considerado idoso
        const sixtyDate = new Date();
        sixtyDate.setFullYear(sixtyDate.getFullYear() - isOld) ;


        // Corrige o formato da data escolhida para o aniversário(antes yyyy-dd-MM, agora yyyy-MM-dd) para fins de calculos
        data.birthday = data.birthday.split("/");
        var birthdayFx = new Date(data.birthday[2], parseInt(data.birthday[1], 10)-1, data.birthday[0]); 
        
        if(countDia < schedulePerDay){ // Verifica se existem menos de 20 agendamentos no dia
            if(countHour < schedulePerHour){ // Verifica se existem menos de 2 agendamentos na hora estipulada
                const newUsers = await UsersModel.create({ // Caso sim, cria um novo agendamento
                    bookday: data.bookday,
                    hour: data.hour,
                    name: data.name,
                    birthday: birthdayFx
                });
                res.send({newUsers});
            }else{ // Caso hajam 2 agendamentos no dia, passará por mais verificações
                // Verifica, nos agendamentos realizados, se existem jovens, e quantos são.
                var isYoung = await UsersModel.find({bookday:data.bookday, hour:data.hour, birthday: {$gt: sixtyDate} });

                if(isYoung.length === 2 && sixtyDate > birthdayFx){ 
                    if(isYoung[0].birthday > isYoung[1].birthday) { // Caso hajam 2 jovens, e o primeiro seja o mais novo, será o substituído.
                        const replaced = await UsersModel.findOneAndReplace({bookday:data.bookday, hour:data.hour, birthday: isYoung[0].birthday},
                            {
                                bookday: data.bookday,
                                hour: data.hour,
                                name: data.name,
                                birthday:birthdayFx
                            })
                            res.send(replaced);
                    }else{ // Caso o segundo seja o mais novo, ou o aniversário de ambos sejam iguais, o segundo será substituído.
                        const replaced2 = await UsersModel.findOneAndReplace({bookday:data.bookday, hour:data.hour, birthday: isYoung[1].birthday},
                            {
                                bookday: data.bookday,
                                hour: data.hour,
                                name: data.name,
                                birthday:birthdayFx
                            })
                            res.send(replaced2);
                    }
                }else if(isYoung.length === 1  && sixtyDate > birthdayFx) { // Se houver apenas 1 jovem, esse será substituído
                    const newBooking = await UsersModel.findOneAndReplace({bookday:data.bookday, hour:data.hour, birthday: isYoung[0].birthday},
                        {
                            bookday: data.bookday,
                            hour: data.hour,
                            name: data.name,
                            birthday:birthdayFx
                        }
                        )
                     res.send(newBooking);
                }else{ // Caso não hajam jovens e um idoso tente escolher a hora, a hora se encontrará lotada.
                res.status(400).send({message: 'A hora escolhida não possui mais vagas.'});
                }
            }
        }else{
            res.status(400).send({message:"O dia escolhido não possui mais vagas."});
        }
    }
    async remove(req,res){
        const { id } = req.params;
        try{
            const schedule = await UsersModel.findByIdAndDelete(id); // Procura um objeto pelo seu ID, então o remove.
            if (!schedule){
                throw new Error("Booking does not exist"); // Caso não ache um objeto, retorna um erro.
            }
            res.send({message: "User booking removed!"});
        }catch(e){
            res.status(400).send({ message: e.message});
        }
    }
    async update(req, res) {
        const { 
            params: { id },
            body,
        } = req;

        const user = await UsersModel.findByIdAndUpdate(id, body).lean(); // Em um método PUT, procura um agendamento pelo ID e dá update no mesmo.

        res.send({
        user: {
            ...user,
            ...body,
        },
        });
    }
}
module.exports = new UsersController();
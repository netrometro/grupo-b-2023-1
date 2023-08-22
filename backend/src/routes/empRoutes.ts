import { FastifyInstance } from "fastify";
import empController from "../controller/empController";

async function empRoutes(server: FastifyInstance) {

    server.post('/createEmp', empController.createEmp);
    server.get('/getEmp', empController.getEmp);
    server.delete('/deleteEmp/:id', empController.deleteEmp);
    server.put('/editEmp/:id', empController.editEmp);
    server.get('/singleEmp/:id', empController.getSingleEmp);

}

export default empRoutes;


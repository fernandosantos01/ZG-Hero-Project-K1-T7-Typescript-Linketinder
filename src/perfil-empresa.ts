import { ServiceFactory          } from './factories/ServiceFactory.js'
import { CandidatoListView       } from './views/CandidatoListView.js'
import { PerfilEmpresaController } from './controllers/PerfilEmpresaController.js'

const controller = new PerfilEmpresaController(
    ServiceFactory.criarCandidatoService(),
    new CandidatoListView()
)
controller.init()

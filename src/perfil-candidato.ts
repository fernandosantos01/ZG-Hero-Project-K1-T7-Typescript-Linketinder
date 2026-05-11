import { ServiceFactory            } from './factories/ServiceFactory.js'
import { VagaListView              } from './views/VagaListView.js'
import { PerfilCandidatoController } from './controllers/PerfilCandidatoController.js'

const controller = new PerfilCandidatoController(
    ServiceFactory.criarVagaService(),
    ServiceFactory.criarEmpresaService(),
    new VagaListView()
)
controller.init()

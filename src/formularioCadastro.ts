import { ServiceFactory         } from './factories/ServiceFactory.js'
import { FormularioCadastroView } from './views/FormularioCadastroView.js'
import { CadastroController     } from './controllers/CadastroController.js'

const controller = new CadastroController(
    ServiceFactory.criarCandidatoService(),
    ServiceFactory.criarEmpresaService(),
    ServiceFactory.criarVagaService(),
    new FormularioCadastroView()
)
controller.init()

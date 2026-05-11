import { CandidatoRepository } from '../repositories/CandidatoRepository.js'
import { EmpresaRepository   } from '../repositories/EmpresaRepository.js'
import { VagaRepository      } from '../repositories/VagaRepository.js'

import { CandidatoValidator } from '../validators/CandidatoValidator.js'
import { EmpresaValidator   } from '../validators/EmpresaValidators.js'
import { VagaValidator      } from '../validators/VagaValidator.js'

import { CandidatoService } from '../services/CandidatoService.js'
import { EmpresaService   } from '../services/EmpresaService.js'
import { VagaService      } from '../services/VagaService.js'

export class ServiceFactory {
    private static candidatoService: CandidatoService
    private static empresaService:   EmpresaService
    private static vagaService:      VagaService

    static criarCandidatoService(): CandidatoService {
        if (!ServiceFactory.candidatoService) {
            ServiceFactory.candidatoService = new CandidatoService(
                CandidatoRepository.getInstance(),
                new CandidatoValidator()
            )
        }
        return ServiceFactory.candidatoService
    }

    static criarEmpresaService(): EmpresaService {
        if (!ServiceFactory.empresaService) {
            ServiceFactory.empresaService = new EmpresaService(
                EmpresaRepository.getInstance(),
                new EmpresaValidator()
            )
        }
        return ServiceFactory.empresaService
    }

    static criarVagaService(): VagaService {
        if (!ServiceFactory.vagaService) {
            ServiceFactory.vagaService = new VagaService(
                VagaRepository.getInstance(),
                new VagaValidator()
            )
        }
        return ServiceFactory.vagaService
    }
}

import { Container } from 'inversify';
import { IDatabaseService } from './interface/IDatabase.service';
import { DatabaseService } from './service/database.service';
import { Logger } from '../shared/services/logger.service';
import { TYPES } from './type.core';
import { IAuthRepository } from '../modules/auth/interfaces/IAuth.repository';
import { AuthRepository } from '../modules/auth/repository/auth.repository';
import { IAuthService } from '../modules/auth/interfaces/IAuth.service';
import { AuthService } from '../modules/auth/service/auth.service';

const container = new Container();

container.bind<IDatabaseService>(TYPES.IDatabaseService).to(DatabaseService);
container.bind(TYPES.Logger).to(Logger);

container.bind<IAuthRepository>(TYPES.IAuthRepository).to(AuthRepository);
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);

export default container;
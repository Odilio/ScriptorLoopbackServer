import {DefaultCrudRepository} from '@loopback/repository';
import {User, UserRelations} from '../models';
import {PostgresDataSource} from '../datasources';
import {inject} from '@loopback/core';

export type Credentials = {
  email:string,
  password:string
}

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(User, dataSource);
  }

  public findByEmail(email: string) {
    return this.findOne({where: {email}});
  }
}

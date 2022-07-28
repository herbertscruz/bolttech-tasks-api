import IFindOneParameters from '../common/find-one-parameters.interface';
import IFindParameters from '../common/find-parameters.interface';
import Project from './project.entity';

export default interface IProjectRepository {
  findOne(params: IFindOneParameters): Promise<Project | null>;

  find(params: IFindParameters): Promise<Project[]>;

  save(project: Project): Promise<Project>;

  delete(projectId: number): Promise<void>;
}

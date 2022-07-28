import { Repository } from 'typeorm';
import IDatabaseAdapter from '../../application/common/database-adapter.interface';
import IFindOneParameters from '../../domain/common/find-one-parameters.interface';
import IFindParameters from '../../domain/common/find-parameters.interface';
import IProjectRepository from '../../domain/project/project-repository.interface';
import Project from '../../domain/project/project.entity';
import ProjectModel from '../database/typeorm/entities/project.model';

export default class ProjectRepository implements IProjectRepository {
  private projectRepository: Repository<ProjectModel>;

  constructor(database: IDatabaseAdapter) {
    this.projectRepository = database.getRepository(ProjectModel);
  }

  async findOne(params: IFindOneParameters): Promise<Project | null> {
    const result = await this.projectRepository.findOne({ ...params });
    if (result === null) return null;
    return result.toEntity();
  }

  async save(project: Project): Promise<Project> {
    const model = new ProjectModel().toModel(project);
    const result = await this.projectRepository.save(model);
    return result.toEntity();
  }

  async find(params: IFindParameters): Promise<Project[]> {
    const result = await this.projectRepository.find({ ...params });

    return result.map((project) => project.toEntity());
  }

  async delete(projectId: number): Promise<void> {
    await this.projectRepository.delete(projectId);
  }
}

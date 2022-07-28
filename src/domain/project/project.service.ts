import Project from './project.entity';
import IProjectRepository from './project-repository.interface';
import ValidationError from '../common/validation-error.exception';
import env from '../../configurations';
import { omit } from 'lodash';

export default class ProjectService {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async getAllByUser(userId: number): Promise<Project[]> {
    return this.projectRepository.find({
      where: { userId },
      take: 100,
      skip: 0,
    });
  }

  async save(project: Project): Promise<Project> {
    project = omit(project, 'createdAt');
    if (project.id) {
      const result = await this.projectRepository.findOne({
        where: { id: project.id },
      });

      if (result) {
        return this.projectRepository.save(Object.assign({}, result, project));
      }
    }
    project = omit(project, 'id');
    return this.projectRepository.save(project);
  }

  async delete(project: Project): Promise<void> {
    const result = await this.projectRepository.findOne({
      where: { id: project.id },
    });
    if (result === null) throw new ValidationError(env.ERROR.E008);
    await this.projectRepository.delete(project);
  }
}

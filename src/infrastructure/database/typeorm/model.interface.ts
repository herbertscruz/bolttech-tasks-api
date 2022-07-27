export default interface IModel<Entity> {
  toModel(entity: Entity): this;

  toEntity(): Entity;
}

interface ObjectWithId {
  _id: string
}

export async function mapObject<T extends ObjectWithId>(object: T) {
  const { _id: id, ...rest } = object
  return { id, ...rest }
}

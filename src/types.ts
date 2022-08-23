export type Serializable<Type> = {
  [Property in keyof Type]: Type[Property] extends Date
    ? string
    : Type[Property];
};

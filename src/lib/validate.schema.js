export default class ValidateSchema {
  constructor(schema) {}
}

export class ValidateField {
  isRequired = false;
  type = "string" | "number" | "boolean";
  isError = false;
  value = undefined;

  onValidateField(value) {}
  onCheckError() {}
}

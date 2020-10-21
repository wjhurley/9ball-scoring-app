import {
  buildMessage,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsBooleanString(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isBooleanString',
      options: validationOptions,
      propertyName: propertyName,
      target: object.constructor,
      validator: {
        defaultMessage: buildMessage(
          eachPrefix => eachPrefix + '$property must be a boolean string',
          validationOptions,
        ),
        validate: (value: any, args: ValidationArguments) => {
          const val = value.toLowerCase();
          let convertedBoolean;

          if (!Number.isNaN(Number(value))) {
            convertedBoolean = Boolean(Number(value));
          } else if (['true', 'false'].includes(val)) {
            convertedBoolean = JSON.parse(val);
          } else {
            return false;
          }

          return typeof convertedBoolean === 'boolean';
        },
      },
    });
  };
}

export function NumberLength(min: number, max?: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      constraints: [min, max],
      name: 'numberLength',
      options: validationOptions,
      propertyName: propertyName,
      target: object.constructor,
      validator: {
        defaultMessage: buildMessage((eachPrefix, args) => {
          const isMaxLength = args?.constraints[1] !== null && args?.constraints[1] !== undefined;
          const isMinLength = args?.constraints[0] !== null && args?.constraints[0] !== undefined;
          const maxLength = args?.constraints[1] || args?.constraints[0];

          if (isMinLength && (!args?.value || args.value.toString().length < args.constraints[0])) {
            return eachPrefix + '$property must be longer than or equal to $constraint1 digits';
          } else if (isMaxLength && args?.value.toString().length > args?.constraints[1]) {
            return eachPrefix + '$property must be shorter than or equal to $constraint2 digits';
          }

          return (
            eachPrefix +
            `$property must be longer than or equal to $constraint1 and shorter than or equal to ${maxLength} digits`
          );
        }, validationOptions),
        validate: (value: any, args: ValidationArguments) => {
          const maxLength = args.constraints[1] || args.constraints[0];
          const minLength = args.constraints[0];
          const numberLength = value.toString().length;

          return minLength <= numberLength && numberLength <= maxLength;
        },
      },
    });
  };
}

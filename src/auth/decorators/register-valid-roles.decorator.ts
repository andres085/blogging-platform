import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ValidRoles } from '../../common/enums/valid-roles.enum';

@ValidatorConstraint({ async: false })
export class AreValidRolesConstraint implements ValidatorConstraintInterface {
  validate(roles: ValidRoles, _: ValidationArguments) {
    const validRoles = [ValidRoles.author, ValidRoles.reader];
    return (
      Array.isArray(roles) && roles.every((role) => validRoles.includes(role))
    );
  }

  defaultMessage(args: ValidationArguments) {
    return 'Roles must be an array containing only "author" or "reader"';
  }
}

export function AreValidRoles(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: AreValidRolesConstraint,
    });
  };
}

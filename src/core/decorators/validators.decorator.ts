import { PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { badRequestExceptionParamMessage } from '../exceptions/exception.message';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

export class IsNumberOrThrowParam implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { data } = metadata;
    if (isNaN(Number(value))) {
      throw new BadRequestException(badRequestExceptionParamMessage(data,'number'));
    }
    return Number(value);
  }
}

@ValidatorConstraint({ name: 'isDateGreaterThanCurrent', async: false })
export class IsDateGreaterThanCurrentConstraint implements ValidatorConstraintInterface {
  validate(date: Date) {
    const isGreater = (new Date(date) > new Date()) ? false : true;
    return isGreater;
  }
}

export function IsDateGreaterThanCurrent(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateGreaterThanCurrentConstraint,
    });
  };
}
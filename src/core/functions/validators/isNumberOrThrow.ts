import { HttpException, HttpStatus } from "@nestjs/common";

export default function isNumberOrThrow(numberToValidate: number, item: string){
    if (isNaN(Number(numberToValidate))) {
        throw new HttpException(`${item} are not a number`, HttpStatus.NOT_ACCEPTABLE);
    }

    return Number(numberToValidate); 
}
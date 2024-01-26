export function notFoundExceptionMessage(item: string){
    return `${item} was not found`;
}

export function notAcceptableTypeParamMessage(item: string, type: string){
    return `${item} are not a ${type}`;
}

export function badRequestExceptionParamMessage(item: string, type: string){
    return `${item} are not a ${type}`;
}
export function notFoundExceptionMessage(item: string, plural = false){
    const verbToBe = !plural ? 'was' : 'were'
    return `${item} ${verbToBe} not found`;
}

export function notAcceptableTypeParamMessage(item: string, type: string){
    return `${item} is not a ${type}`;
}

export function badRequestExceptionParamMessage(item: string, type: string){
    return `${item} is not a ${type}`;
}
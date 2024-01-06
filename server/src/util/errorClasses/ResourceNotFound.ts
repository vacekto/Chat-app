interface IResource {
    resourceName: string,
    propKey?: string | number,
    propValue?: string | number
}

class ResourceNotFoundError extends Error {
    constructor({ resourceName, propKey, propValue }: IResource) {
        const keyValueInfo = propKey && propValue ? `with key: value pair: '${propKey}: ${propValue}' ` : ``
        const message = `Resource '${resourceName}' ${keyValueInfo}not found.`
        super(message)
    }
}

export default ResourceNotFoundError
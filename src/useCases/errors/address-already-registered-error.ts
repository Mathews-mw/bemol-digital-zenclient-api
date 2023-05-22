export class AddressAlreadyRegisteredError extends Error {
	constructor() {
		super('Esse endereço já foi cadastrado');
	}
}

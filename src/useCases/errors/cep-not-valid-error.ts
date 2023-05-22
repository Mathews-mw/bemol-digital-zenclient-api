export class CepIsNotValidError extends Error {
	constructor() {
		super('O CEP não é do estado do Amazonas, portanto, o endereço não pode ser cadastrado');
	}
}

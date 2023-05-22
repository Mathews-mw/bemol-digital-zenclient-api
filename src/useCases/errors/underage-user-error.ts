export class UnderageUserError extends Error {
	constructor() {
		super('Não é permitido cadastro de menores de 18 anos');
	}
}

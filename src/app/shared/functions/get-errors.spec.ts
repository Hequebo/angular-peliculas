import { getErrors } from "./get-errors";

describe('getErrors', () => {
    it('should return empty array if object has no errors', () => {
        // Preparación
        const input = { error: { errors: {}}};

        // Prueba
        const result = getErrors(input);

        // Verificación
        expect(result).toEqual([]);
    });

    it('should get the errors messages corrrectly with their fields', () => {
        // Preparación
        const input = { 
            error: { 
                errors: {
                    name: ['es obligatorio', 'primera letra debe de ser mayúscula'],
                    email: ['no es un email válida']
                }
            }
        };

        // Prueba
        const result = getErrors(input);

        // Verificación
        expect(result).toEqual([
            'name: es obligatorio',
            'name: primera letra debe de ser mayúscula',
            'email: no es un email válida'
        ]);
    });
});
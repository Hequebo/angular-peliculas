export function translateToSpanish(word: string): string {
    let translation = traductions.get(word);

    if (translation === undefined)
        return word;

    return translation;
}

const traductions = new Map<string, string> ([
    ['name', 'nombre'],
    ['title', 'titulo']
])
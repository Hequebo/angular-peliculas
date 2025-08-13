export interface ActorDTO {
    id: number;
    name: string;
    birthDate: Date;
    photo?: string;
}

export interface ActorCreationDTO {
    name: string;
    birthDate: Date;
    photo?: File;
}

export interface ActorAutoCompleteDTO {
    id: number;
    name: string;
    character: string;
    photo: string;
}

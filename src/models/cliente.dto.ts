export interface ClienteDTO  {
    id: string;
    nome: string;
    email: string;
    imageUrl? : string; // ' ? ' -> significa que o atributo é opcional 
}
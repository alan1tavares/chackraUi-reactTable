
export interface Character {
    id: number;
    name: string;
    gender: string;
    status: string;
    species: string;

}

const api = {
    get: get
}

async function get(): Promise<Character[]> {
    const req = await fetch('https://rickandmortyapi.com/api/character')
    const data = await req.json();
    console.log(data);
    return data.results.map((item: any) => {
        return {
            id: item.id,
            name: item.name,
            gender: item.gender,
            status: item.status,
            species: item.species
        } as Character
    })
}

export default api;
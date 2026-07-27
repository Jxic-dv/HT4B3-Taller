import fs from 'fs/promises';

const consumirApi = async () => {
    console.log("Iniciando");
    console.time("tiempo total");
    console.time("tiempo peticion");

    try {
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
        console.timeEnd("tiempo peticion");

        if (!respuesta.ok) {
            throw new Error(`fayo la conexion: ${respuesta.status}`);
        }

        const data = await respuesta.json();
        
        // sacamos las info que importa y la mostramos
        const procesados = data.map((user: any) => ({
            id: user.id,
            nombre: user.name,
            correo: user.email
        }));

        console.time("tiempo de guardado");
        await fs.writeFile('api_data.json', JSON.stringify(procesados, null, 2), 'utf-8');
        console.timeEnd("tiempo de guardado");

        console.log("todo listo, json guardado");

    } catch (error) {
        console.error("salio error:", error);
    } finally {
        console.timeEnd("tiempo total");
    }
};

consumirApi();
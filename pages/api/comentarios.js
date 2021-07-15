import { SiteClient } from "datocms-client";

export default async function recebedorDeRequest(request, response) {
    
    if(request.method === 'POST') {
        
        const TOKEN = 'ad72a4819fa07bc1f725785aaccbd6';
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: '971903',
            ...request.body
        })
        
        response.json({
            dados: "Algum dado",
            registroCriado: registroCriado
        })
        return;
    }

    response.status(404).json({
        message: "Nada no POST."
    })
}
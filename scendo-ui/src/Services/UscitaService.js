import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = "http://18.212.181.68:8080/api/";

class UscitaService{

    async creaUscita(uscita){
        const response = await axios
            .post(API_URL + "crea-uscita", uscita, { headers: authHeader() });
        return response.data;
    }

    async calendarioUscite(){
        const response = await axios.get(API_URL + "calendario-uscite", { headers: authHeader() });
        return response.data;
    }

    async infoUscita(idUscita, part){
        const response = await axios.get(API_URL + "uscita/" + idUscita, { headers: authHeader(), params: { partecipanti: part } });
        return response.data;
    }

    async promuoviUtente(idUscita, email){
        const response = await axios.post(API_URL + "uscita/" + idUscita + "/promuovi-partecipante", {email_partecipante: email} ,{ headers: authHeader() });
        return response.data;
    }

    async invitaUtente(idUscita, email){
        const response = await axios.post(API_URL + "uscita/" + idUscita + "/invita-partecipante", {email_invitato: email}, { headers: authHeader() });
        return response.data;
    }

    async listaInviti(){
        const response = await axios.get(API_URL + "leggi-inviti", { headers: authHeader() });
        return response.data;
    }

    async accettaInvito(idUscita){
        const response = await axios.post(API_URL + "accetta-invito", null, { headers: authHeader(), params: { uscita: idUscita} });
        return response.data;
    }

    async rifiutaInvito(idUscita){
        const response = await axios.post(API_URL + "rifiuta-invito", null, { headers: authHeader(), params: { uscita: idUscita} });
        return response.data;
    }

}
export default new UscitaService();
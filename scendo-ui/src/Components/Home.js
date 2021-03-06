import React, { useState, useEffect } from 'react'
import UscitaService from '../Services/UscitaService';
import ContainerUscita from './ContainerUscita';
import { Container, Row, Col} from 'react-bootstrap'
import ContainerInviti from './ContainerInviti';
import { useNavigate } from "react-router-dom";
import AuthService from '../Services/AuthService';

const Home = () => {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true);
  const [uscite, setUscite] = useState([]);
  const [inviti, setInviti] = useState([]);

  useEffect(() => {
    const fetchUsciteId = async () => {
      setLoading(true);
      try {
        //SEZIONE USCITE
        const response = await UscitaService.calendarioUscite();
        const listaUscite = [];
        if (response.message){
            for (let i = 0; i < response.message.length; i++) {
                const element = await UscitaService.infoUscita(response.message[i], true);
                listaUscite.push(element);  
            }
        }
        setUscite(listaUscite); 

        //SEZIONE INVITI
        const risposta = await UscitaService.listaInviti();
        const listaInviti = [];
        if (risposta.message){
          for (let i = 0; i < risposta.message.length; i++){
            const invitante = risposta.message[i].emailInvitante;
            const element = await UscitaService.infoUscita(risposta.message[i].idUscita, false);
            element.message.emailInvitante = invitante;
            listaInviti.push(element);
            //console.log(element);
          }
        }
        setInviti(listaInviti);

      } catch (error) {
        console.log(error);
        if(error.response.status === 401){
          AuthService.logout();
          navigate("/login");
          navigate(0);
      }
      }
      setLoading(false);
    };
    fetchUsciteId();
  }, []);

  const rifiutaInvito = (e, idUscita) => {
    e.preventDefault();
    UscitaService.rifiutaInvito(idUscita).then((response) => {
        console.log(response);
        setInviti((element) =>{
          return element.filter((invito) => invito.message.idUscita !== idUscita);
        })
    }).catch((error) => {
        console.log(error);
        if(error.response.status === 401){
            AuthService.logout();
            navigate("/login");
            navigate(0);
        }

    });
  }

  const accettaInvito = async (e, idUscita) => {
    e.preventDefault();
    try{
        const response = await UscitaService.accettaInvito(idUscita)
        console.log(response);
        const element = await UscitaService.infoUscita(idUscita, true);
        setUscite(usc => [...usc, element]);

        setInviti((element) =>{
          return element.filter((invito) => invito.message.idUscita !== idUscita);
        });

    }catch(error){
      console.log(error);
        if(error.response.status === 401){
            AuthService.logout();
            navigate("/login");
            navigate(0);
        }
   }
  }

  const promuoviUtente = async (e, email, idUscita) => {
    e.preventDefault();
    try{
    await UscitaService.promuoviUtente(idUscita, email);
    const response = await UscitaService.calendarioUscite();
    const listaUscite = [];
    if (response.message){
        for (let i = 0; i < response.message.length; i++) {
            const element = await UscitaService.infoUscita(response.message[i], true);
            listaUscite.push(element);  
        }
    }
    setUscite(listaUscite); 
    
  } catch (error){
    console.log(error);
  }

  }

  return (
    <Container>
      {!loading &&(
      <Row>
        <Col sm={7}>   
          <div>
          {uscite.map((uscita) => (
              <ContainerUscita 
              uscita={uscita} 
              promuoviUtente={promuoviUtente}
              key={uscita.message.idUscita}>            
              </ContainerUscita>               
          ))}
          </div>     
        </Col>
        <Col sm={1}>
        </Col>
        <Col sm={4}>
          {inviti.map((invito) => (
            <ContainerInviti
              invito={invito}
              rifiutaInvito={rifiutaInvito}
              accettaInvito={accettaInvito}
              key={invito.message.idUscita}>
            </ContainerInviti>
          ))}
        </Col>
      </Row>
      )}
    </Container>
  )
}

export default Home
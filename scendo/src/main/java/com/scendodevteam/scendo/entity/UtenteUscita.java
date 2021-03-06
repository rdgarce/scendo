package com.scendodevteam.scendo.entity;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "utenti_uscite")
public class UtenteUscita {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long idUtenteUscita;
    
    @ManyToOne
    @JoinColumn(name = "id_utente",
    nullable = false,
    foreignKey = @ForeignKey(name="FK_UTENTIUSCITE_UTENTE"))
    private Utente utente;

    @ManyToOne
    @JoinColumn(name = "id_uscita",
    nullable = false,
    foreignKey = @ForeignKey(name="FK_UTENTIUSCITE_USCITA"))
    private Uscita uscita;

    private boolean utenteCreatore;

    private boolean utenteOrganizzatore;

    public UtenteUscita(Utente utente, Uscita uscita, boolean utenteCreatore, boolean utenteOrganizzatore) {
        this.utente = utente;
        this.uscita = uscita;
        this.utenteCreatore = utenteCreatore;
        this.utenteOrganizzatore = utenteOrganizzatore;
    }
}

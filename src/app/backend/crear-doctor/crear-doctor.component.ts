import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/entidades/Doctor';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { InteractionService } from 'src/app/servicios/interaction.service';

@Component({
  selector: 'app-crear-doctor',
  templateUrl: './crear-doctor.component.html',
  styleUrls: ['./crear-doctor.component.scss'],
})
export class AjustesComponent implements OnInit {

  data: Doctor = {
    id: '',
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: '',
    direccion: '',
    password: '',
  }

  constructor(
    private database: FirestoreService,
    private interaction: InteractionService,
    private router: Router
  ) { }

  ngOnInit() { }

  crearDoctor() {
    this.interaction.presentLoading('Guardando...')
    const path = 'Doctores'
    const id = this.database.getId()
    this.data.id = id
    this.database.createDoc(this.data, path, id).then(res => {
      this.interaction.closeLoading()
      this.interaction.presentToast('Guardado con éxito')
    })
    this.router.navigate(['/listar'])
  }

}

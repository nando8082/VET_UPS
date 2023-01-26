import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';
import { Doctor } from '../entidades/Doctor';
import { FirestoreService } from '../servicios/firestore.service';
import { InteractionService } from '../servicios/interaction.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  path: string = 'Doctores'
  id: any
  empresa: any
  email: any
  password: any

  data: Doctor = {
    id: '',
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: '',
    direccion: '',
    password: ''
  }

  constructor(
    private database: FirestoreService,
    private interaction: InteractionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getDoctor()
  }

  getDoctor() {
    this.id = localStorage.getItem('idDoc')
    this.empresa = localStorage.getItem('empresa')
    this.email = localStorage.getItem('email')
    this.password = localStorage.getItem('password')
    localStorage.clear()
    this.database.getDoc<Doctor>(this.path, this.id).subscribe(res => {
      this.data.id = this.id
      this.data.nombre = res?.nombre
      this.data.apellido = res?.apellido
      this.data.empresa = this.empresa
      this.data.email = this.email
      this.data.telefono = res?.telefono
      this.data.direccion = res?.direccion
      this.data.password = this.password
    })
  }

  updateDoctor() {
    this.database.updateDoc(this.data, this.path, this.data.id)
    this.router.navigate(['/listar']);
    this.interaction.presentToast('Guardado con éxito')
  }
}


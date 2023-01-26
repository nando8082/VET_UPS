import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AjustesComponent } from './backend/crear-doctor/crear-doctor.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { canActivate } from '@angular/fire/compat/auth-guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./listar/listar.module').then( m => m.ListarPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'listar',
    loadChildren: () => import('./listar/listar.module').then( m => m.ListarPageModule)
  },
  {
    path: 'crear-cita',
    loadChildren: () => import('./crear-cita/crear-cita.module').then( m => m.CrearCitaPageModule)
  },
  {
    path: 'editar-cita/:id',
    loadChildren: () => import('./editar-cita/editar-cita.module').then( m => m.EditarCitaPageModule)
  },
  {
    path: 'crear-doctor',
    component: AjustesComponent
  },
  {
    path: 'editar',
    loadChildren: () => import('./editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'listar-citas',
    loadChildren: () => import('./listar-citas/listar-citas.module').then( m => m.ListarCitasPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

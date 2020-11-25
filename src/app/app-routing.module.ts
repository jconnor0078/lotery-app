import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'pages/:id',
    loadChildren: () => import('./pages/ventas/ventas.module').then( m => m.VentasPageModule)
  },
  {
    path: 'jugadas',
    loadChildren: () => import('./pages/jugadas/jugadas.module').then( m => m.JugadasPageModule)
  },
  {
    path: 'loterias-disponibles',
    loadChildren: () => import('./pages/loterias-disponibles/loterias-disponibles.module').then( m => m.LoteriasDisponiblesPageModule)
  },
  {
    path: 'loterias-disp-para-super-pale',
    loadChildren: () => import('./pages/loterias-disp-para-super-pale/loterias-disp-para-super-pale.module').then( m => m.LoteriasDispParaSuperPalePageModule)
  },
  {
    path: 'copiar-ticket',
    loadChildren: () => import('./pages/copiar-ticket/copiar-ticket.module').then( m => m.CopiarTicketPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

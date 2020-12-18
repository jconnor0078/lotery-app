import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/Venta',
    pathMatch: 'full'
  },
  {
    path: 'pages/Venta',
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
  },
  {
    path: 'pages/reporte-resumen-venta',
    loadChildren: () => import('./pages/reporte-resumen-venta/reporte-resumen-venta.module').then( m => m.ReporteResumenVentaPageModule)
  },
  {
    path: 'pages/anular-ticket',
    loadChildren: () => import('./pages/anular-ticket/anular-ticket.module').then( m => m.AnularTicketPageModule)
  },
  {
    path: 'pages/pagar-ticket',
    loadChildren: () => import('./pages/pagar-ticket/pagar-ticket.module').then( m => m.PagarTicketPageModule)
  },
  {
    path: 'pages/cuadre-ventas',
    loadChildren: () => import('./pages/cuadre/cuadre.module').then( m => m.CuadrePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

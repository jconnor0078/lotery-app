import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Ventas',
      url: '/pages/Venta',
      icon: 'ticket'
    },
    {
      title: 'Pagar Ticket',
      url: '/pages/pagar-ticket',
      icon: 'cash'
    },
    {
      title: 'Anular Ticket',
      url: '/pages/anular-ticket',
      icon: 'close-circle'
    },
    {
      title: 'Resumen Ventas',
      url: '/pages/reporte-resumen-venta',
      icon: 'bar-chart'
    },
    {
      title: 'Cuadre Ventas',
      url: '/pages/cuadre-ventas',
      icon: 'cube'
    },
    {
      title: 'Salir',
      url: '/',
      icon: 'log-out'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }else{
      let pathl= window.location.pathname.split('pages/')[1];
      if(pathl){
        this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === pathl.toLowerCase());
      }
    }
  }
}

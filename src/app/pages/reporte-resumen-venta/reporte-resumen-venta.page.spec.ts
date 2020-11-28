import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReporteResumenVentaPage } from './reporte-resumen-venta.page';

describe('ReporteResumenVentaPage', () => {
  let component: ReporteResumenVentaPage;
  let fixture: ComponentFixture<ReporteResumenVentaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteResumenVentaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReporteResumenVentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JugadasPage } from './jugadas.page';

describe('JugadasPage', () => {
  let component: JugadasPage;
  let fixture: ComponentFixture<JugadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JugadasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JugadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CuadrePage } from './cuadre.page';

describe('CuadrePage', () => {
  let component: CuadrePage;
  let fixture: ComponentFixture<CuadrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuadrePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CuadrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

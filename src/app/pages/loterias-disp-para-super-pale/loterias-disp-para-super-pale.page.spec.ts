import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoteriasDispParaSuperPalePage } from './loterias-disp-para-super-pale.page';

describe('LoteriasDispParaSuperPalePage', () => {
  let component: LoteriasDispParaSuperPalePage;
  let fixture: ComponentFixture<LoteriasDispParaSuperPalePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoteriasDispParaSuperPalePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoteriasDispParaSuperPalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

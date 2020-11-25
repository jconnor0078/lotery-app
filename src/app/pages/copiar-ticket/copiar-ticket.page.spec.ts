import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CopiarTicketPage } from './copiar-ticket.page';

describe('CopiarTicketPage', () => {
  let component: CopiarTicketPage;
  let fixture: ComponentFixture<CopiarTicketPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopiarTicketPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CopiarTicketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

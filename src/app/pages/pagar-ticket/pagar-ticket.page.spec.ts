import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PagarTicketPage } from './pagar-ticket.page';

describe('PagarTicketPage', () => {
  let component: PagarTicketPage;
  let fixture: ComponentFixture<PagarTicketPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarTicketPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PagarTicketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

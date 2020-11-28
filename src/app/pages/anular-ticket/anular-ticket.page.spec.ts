import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnularTicketPage } from './anular-ticket.page';

describe('AnularTicketPage', () => {
  let component: AnularTicketPage;
  let fixture: ComponentFixture<AnularTicketPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnularTicketPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnularTicketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

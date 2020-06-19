import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PartiePage } from './partie.page';

describe('PartiePage', () => {
  let component: PartiePage;
  let fixture: ComponentFixture<PartiePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartiePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PartiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

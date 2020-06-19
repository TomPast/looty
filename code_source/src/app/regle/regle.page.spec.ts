import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReglePage } from './regle.page';

describe('ReglePage', () => {
  let component: ReglePage;
  let fixture: ComponentFixture<ReglePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReglePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

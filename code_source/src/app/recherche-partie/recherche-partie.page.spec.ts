import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecherchePartiePage } from './recherche-partie.page';

describe('RecherchePartiePage', () => {
  let component: RecherchePartiePage;
  let fixture: ComponentFixture<RecherchePartiePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecherchePartiePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecherchePartiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

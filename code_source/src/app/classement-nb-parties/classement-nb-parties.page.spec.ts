import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClassementNbPartiesPage } from './classement-nb-parties.page';

describe('ClassementNbPartiesPage', () => {
  let component: ClassementNbPartiesPage;
  let fixture: ComponentFixture<ClassementNbPartiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassementNbPartiesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassementNbPartiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

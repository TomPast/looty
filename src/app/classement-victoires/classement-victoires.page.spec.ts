import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClassementVictoiresPage } from './classement-victoires.page';

describe('ClassementVictoiresPage', () => {
  let component: ClassementVictoiresPage;
  let fixture: ComponentFixture<ClassementVictoiresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassementVictoiresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassementVictoiresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

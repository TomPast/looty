import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClassementDefaitesPage } from './classement-defaites.page';

describe('ClassementDefaitesPage', () => {
  let component: ClassementDefaitesPage;
  let fixture: ComponentFixture<ClassementDefaitesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassementDefaitesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassementDefaitesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

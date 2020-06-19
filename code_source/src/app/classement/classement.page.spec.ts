import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClassementPage } from './classement.page';

describe('ClassementPage', () => {
  let component: ClassementPage;
  let fixture: ComponentFixture<ClassementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

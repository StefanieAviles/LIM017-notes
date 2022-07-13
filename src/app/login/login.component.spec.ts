import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../user.service';
import { Observable, of } from 'rxjs';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let UserServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    UserServiceSpy = jasmine.createSpyObj<UserService>('UserService',['logIn']);
    
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [ 
        { provide: UserService, useValue:UserServiceSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* it('should logIn', () => {
    UserServiceSpy.logIn.and.returnValue(Promise.resolve('Loh=ggedIn'));
    expect(component).toBeTruthy();
  }); */
});
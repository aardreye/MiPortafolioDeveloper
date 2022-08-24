import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvidasteTuPasswordComponent } from './olvidaste-tu-password.component';

describe('OlvidasteTuPasswordComponent', () => {
  let component: OlvidasteTuPasswordComponent;
  let fixture: ComponentFixture<OlvidasteTuPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlvidasteTuPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlvidasteTuPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

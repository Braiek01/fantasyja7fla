import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationPitchComponent } from './formation-pitch.component';

describe('FormationPitchComponent', () => {
  let component: FormationPitchComponent;
  let fixture: ComponentFixture<FormationPitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationPitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationPitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

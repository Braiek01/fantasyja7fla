import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSlotComponent } from './player-slot.component';

describe('PlayerSlotComponent', () => {
  let component: PlayerSlotComponent;
  let fixture: ComponentFixture<PlayerSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerSlotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

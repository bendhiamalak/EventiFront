import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipateModalComponent } from './participate-modal.component';

describe('ParticipateModalComponent', () => {
  let component: ParticipateModalComponent;
  let fixture: ComponentFixture<ParticipateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParticipateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

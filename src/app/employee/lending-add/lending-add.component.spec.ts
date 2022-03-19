import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendingAddComponent } from './lending-add.component';

describe('LendingAddComponent', () => {
  let component: LendingAddComponent;
  let fixture: ComponentFixture<LendingAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LendingAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LendingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

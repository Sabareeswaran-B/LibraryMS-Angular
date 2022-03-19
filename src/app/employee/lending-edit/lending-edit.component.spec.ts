import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendingEditComponent } from './lending-edit.component';

describe('LendingEditComponent', () => {
  let component: LendingEditComponent;
  let fixture: ComponentFixture<LendingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LendingEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LendingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

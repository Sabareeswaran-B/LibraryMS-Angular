import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendingIndexComponent } from './lending-index.component';

describe('LendingIndexComponent', () => {
  let component: LendingIndexComponent;
  let fixture: ComponentFixture<LendingIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LendingIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LendingIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

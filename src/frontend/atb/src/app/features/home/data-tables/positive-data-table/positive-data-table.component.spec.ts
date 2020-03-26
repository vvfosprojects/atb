import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositiveDataTableComponent } from './positive-data-table.component';

describe('PositiveDataTableComponent', () => {
  let component: PositiveDataTableComponent;
  let fixture: ComponentFixture<PositiveDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositiveDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositiveDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

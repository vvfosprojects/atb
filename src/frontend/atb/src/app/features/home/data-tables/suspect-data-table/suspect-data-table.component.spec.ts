import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspectDataTableComponent } from './suspect-data-table.component';

describe('SuspectDataTableComponent', () => {
  let component: SuspectDataTableComponent;
  let fixture: ComponentFixture<SuspectDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspectDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspectDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

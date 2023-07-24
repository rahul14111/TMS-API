import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetalluserComponent } from './getalluser.component';

describe('GetalluserComponent', () => {
  let component: GetalluserComponent;
  let fixture: ComponentFixture<GetalluserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetalluserComponent]
    });
    fixture = TestBed.createComponent(GetalluserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

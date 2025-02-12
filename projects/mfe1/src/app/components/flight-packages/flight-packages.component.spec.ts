import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightPackagesComponent } from './flight-packages.component';

describe('FlightPackagesComponent', () => {
  let component: FlightPackagesComponent;
  let fixture: ComponentFixture<FlightPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightPackagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

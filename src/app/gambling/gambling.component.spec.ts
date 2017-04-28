/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GamblingComponent } from './gambling.component';

describe('GamblingComponent', () => {
  let component: GamblingComponent;
  let fixture: ComponentFixture<GamblingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamblingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamblingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SmurfsComponent } from './smurfs.component';

describe('SmurfsComponent', () => {
  let component: SmurfsComponent;
  let fixture: ComponentFixture<SmurfsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmurfsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmurfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApeluriComponent } from './apeluri.component';

describe('ApeluriComponent', () => {
  let component: ApeluriComponent;
  let fixture: ComponentFixture<ApeluriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApeluriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApeluriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

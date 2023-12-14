import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusGithubComponent } from './status-github.component';

describe('StatusGithubComponent', () => {
  let component: StatusGithubComponent;
  let fixture: ComponentFixture<StatusGithubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusGithubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusGithubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

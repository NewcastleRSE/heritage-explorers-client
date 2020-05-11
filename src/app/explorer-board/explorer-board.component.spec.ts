import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerBoardComponent } from './explorer-board.component';

describe('ExplorerBoardComponent', () => {
  let component: ExplorerBoardComponent;
  let fixture: ComponentFixture<ExplorerBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplorerBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

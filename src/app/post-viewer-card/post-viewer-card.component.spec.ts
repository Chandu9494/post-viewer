import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostViewerCardComponent } from './post-viewer-card.component';

describe('PostViewerCardComponent', () => {
  let component: PostViewerCardComponent;
  let fixture: ComponentFixture<PostViewerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostViewerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostViewerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

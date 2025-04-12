import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostViewerGridWrapperComponent } from './post-viewer-grid-wrapper.component';

describe('PostViewerGridWrapperComponent', () => {
  let component: PostViewerGridWrapperComponent;
  let fixture: ComponentFixture<PostViewerGridWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostViewerGridWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostViewerGridWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

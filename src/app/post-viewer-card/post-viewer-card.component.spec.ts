import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostViewerCardComponent } from './post-viewer-card.component';
import { IPost } from '../shared/post-viewer.interface';

describe('PostViewerCardComponent', () => {
  let component: PostViewerCardComponent;
  let fixture: ComponentFixture<PostViewerCardComponent>;

  const mockPost: IPost = {
    id: 1,
    title: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui',
    body: 'similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio',
    userId: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostViewerCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostViewerCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set displayText when displayValue is valid', () => {
    component.post = mockPost;
    component.displayValue = 'title';

    component.ngOnChanges({
      displayValue: {
        previousValue: null,
        currentValue: 'title',
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.displayText).toBe(
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui'
    );
  });

  it('should set displayText to undefined if displayValue key is not in post', () => {
    component.post = mockPost;
    component.displayValue = 'someKey';
    component.ngOnChanges({
      displayValue: {
        previousValue: null,
        currentValue: 'someKey',
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(component.displayText).toBeUndefined();
  });

  it('should not update displayText if post is undefined', () => {
    component.post = undefined;
    component.displayValue = 'title';
    component.displayText = 'Previous Value';
    component.ngOnChanges({
      displayValue: {
        previousValue: null,
        currentValue: 'title',
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(component.displayText).toBe('Previous Value');
  });

  it('should update displayText when displayValue changes on click', () => {
    component.post = mockPost;
    component.displayValue = 'title';
    component.ngOnChanges({
      displayValue: {
        previousValue: null,
        currentValue: 'title',
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(component.displayText).toBe(
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui'
    );

    component.displayValue = 'body';
    component.ngOnChanges({
      displayValue: {
        previousValue: 'title',
        currentValue: 'body',
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component.displayText).toBe(
      'similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio'
    );
  });
});

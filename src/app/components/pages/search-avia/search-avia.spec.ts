import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAvia } from './search-avia';

describe('SearchAvia', () => {
  let component: SearchAvia;
  let fixture: ComponentFixture<SearchAvia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAvia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAvia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

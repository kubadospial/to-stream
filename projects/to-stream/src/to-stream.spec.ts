import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ToStream } from './to-stream';

@Component({
  selector: 'lib-child',
  template: ` <div class="async">{{ index$ | async }}</div>
    <div class="input">{{ index }}</div>`,
})
class ChildComponent {
  @Input()
  @ToStream()
  index: number;

  index$: Observable<number>;
}

@Component({
  selector: 'lib-parent',
  template: ` <lib-child [index]="index"> </lib-child> `,
})
class ParentComponent {
  index = 0;
  constructor() {
    setTimeout(() => {
      this.index++;
    }, 1000);
  }
}

describe('ToStream', () => {
  let parentFixt: ComponentFixture<ParentComponent>;
  let parentComponent: ParentComponent;
  let childFixt: ComponentFixture<ChildComponent>;
  let childComponent: ChildComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParentComponent, ChildComponent],
    })
      .compileComponents()
      .then(() => {
        parentFixt = TestBed.createComponent(ParentComponent);
        parentComponent = parentFixt.componentInstance;

        childFixt = TestBed.createComponent(ChildComponent);
        childComponent = childFixt.componentInstance;
      });
  }));

  it('should create components', () => {
    parentFixt.detectChanges();
    childFixt.detectChanges();
    expect(parentComponent).toBeTruthy();
    expect(childComponent).toBeTruthy();
  });

  it('should input and async have value 1', () => {
    parentFixt.detectChanges();
    childFixt.detectChanges();
    const asyncVal = childFixt.debugElement.query(By.css('.async'))
      .nativeElement.innerText;
    const inputVal = childFixt.debugElement.query(By.css('.input'))
      .nativeElement.innerText;
    expect(asyncVal).toBe('1');
    expect(inputVal).toBe('1');
  });
});

@Component({
  selector: 'lib-child',
  template: ` <div class="async">{{ index$ | async }}</div>
    <div class="input">{{ index }}</div>`,
})
class ChildSetterComponent {
  @Input()
  @ToStream()
  set index(index: number) {
    this._index = index;
  }
  get index() {
    return this._index;
  }

  private _index: number;

  index$: Observable<number>;
}

describe('ToStream - setter', () => {
  let parentFixt: ComponentFixture<ParentComponent>;
  let parentComponent: ParentComponent;
  let childFixt: ComponentFixture<ChildSetterComponent>;
  let childComponent: ChildSetterComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParentComponent, ChildSetterComponent],
    })
      .compileComponents()
      .then(() => {
        parentFixt = TestBed.createComponent(ParentComponent);
        parentComponent = parentFixt.componentInstance;

        childFixt = TestBed.createComponent(ChildSetterComponent);
        childComponent = childFixt.componentInstance;
      });
  }));

  it('should create components', () => {
    parentFixt.detectChanges();
    childFixt.detectChanges();
    expect(parentComponent).toBeTruthy();
    expect(childComponent).toBeTruthy();
  });

  it('should input and async have value 1', () => {
    parentFixt.detectChanges();
    childFixt.detectChanges();
    const asyncVal = childFixt.debugElement.query(By.css('.async'))
      .nativeElement.innerText;
    const inputVal = childFixt.debugElement.query(By.css('.input'))
      .nativeElement.innerText;
    expect(asyncVal).toBe('1');
    expect(inputVal).toBe('1');
  });
});

@Component({
  selector: 'lib-child',
  template: ` <div class="async">{{ someVariable$ | async }}</div>
    <div class="input">{{ index }}</div>`,
})
class ChildCustomVariableComponent {
  @Input()
  @ToStream('someVariable$')
  index: number;

  someVariable$: Observable<number>;
}

describe('ToStream - custom variable', () => {
  let parentFixt: ComponentFixture<ParentComponent>;
  let parentComponent: ParentComponent;
  let childFixt: ComponentFixture<ChildCustomVariableComponent>;
  let childComponent: ChildCustomVariableComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParentComponent, ChildCustomVariableComponent],
    })
      .compileComponents()
      .then(() => {
        parentFixt = TestBed.createComponent(ParentComponent);
        parentComponent = parentFixt.componentInstance;

        childFixt = TestBed.createComponent(ChildCustomVariableComponent);
        childComponent = childFixt.componentInstance;
      });
  }));

  it('should create components', () => {
    parentFixt.detectChanges();
    childFixt.detectChanges();
    expect(parentComponent).toBeTruthy();
    expect(childComponent).toBeTruthy();
  });

  it('should input and async have value 1', () => {
    parentFixt.detectChanges();
    childFixt.detectChanges();
    const asyncVal = childFixt.debugElement.query(By.css('.async'))
      .nativeElement.innerText;
    const inputVal = childFixt.debugElement.query(By.css('.input'))
      .nativeElement.innerText;
    expect(asyncVal).toBe('1');
    expect(inputVal).toBe('1');
  });
});

@Component({
  selector: 'lib-child',
  template: ` <div class="async">{{ someVariable$ | async }}</div>
    <div class="input">{{ index }}</div>`,
})
class ChildSetterCustomVariableComponent {
  @Input()
  @ToStream('someVariable$')
  set index(index: number) {
    this._index = index;
  }
  get index() {
    return this._index;
  }

  private _index: number;

  someVariable$: Observable<number>;
}

describe('ToStream - custom variable / setter', () => {
  let parentFixt: ComponentFixture<ParentComponent>;
  let parentComponent: ParentComponent;
  let childFixt: ComponentFixture<ChildSetterCustomVariableComponent>;
  let childComponent: ChildSetterCustomVariableComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParentComponent, ChildSetterCustomVariableComponent],
    })
      .compileComponents()
      .then(() => {
        parentFixt = TestBed.createComponent(ParentComponent);
        parentComponent = parentFixt.componentInstance;

        childFixt = TestBed.createComponent(ChildSetterCustomVariableComponent);
        childComponent = childFixt.componentInstance;
      });
  }));

  it('should create components', () => {
    parentFixt.detectChanges();
    childFixt.detectChanges();
    expect(parentComponent).toBeTruthy();
    expect(childComponent).toBeTruthy();
  });

  it('should input and async have value 1', () => {
    parentFixt.detectChanges();
    childFixt.detectChanges();
    const asyncVal = childFixt.debugElement.query(By.css('.async'))
      .nativeElement.innerText;
    const inputVal = childFixt.debugElement.query(By.css('.input'))
      .nativeElement.innerText;
    expect(asyncVal).toBe('1');
    expect(inputVal).toBe('1');
  });
});

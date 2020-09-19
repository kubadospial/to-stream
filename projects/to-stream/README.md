# @ToStream()

@ToStream() is an Angular 9+ decorator which intercepts value of an @Input and assigns it to a variable as a rxjs stream.

## How to use it

You just declare decorator @toStream() after an @Input() decorator. Then you need to create a variable with the same name as the @Input()'s variable name with '\$' at the end and you're ready to go.

## Examples:

```typescript
@Component({
    template: `
    {{ index }}
    {{ index$ | async }}
    `
})
export class ChildComponent {

  @Input()
  @toStream()
  index: number;

  index$: Observable<number>;

  constructor {
      this.index$ = this.index$.pipe(map((val:number) => val * val));
  }

}
```

Also you can pass a string parameter to the @toStream(...) with a name of other variable to which you want to assign stream to.

```typescript
@Component({
    template: `{{ someVar$ | async }}`
})
export class ChildComponent {

  @Input()
  @toStream('someVar$')
  index: number;

  someVar$: Observable<number>;

  constructor {
      this.someVar$ = this.someVar$.pipe(map((val:number) => val * val));
  }

}

```

and you can still use setter assigned to an @Input()

```typescript
@Component({
    template: `
    {{ index }}
    {{ someVar$ | async }}
    `
})
export class ChildComponent {

  @Input()
  @toStream('someVar$')
  set index(index: number) {
    this._index = index;
  }
  get index(): number {
    return this._index;
  }
  private _index: number;

  someVar$: Observable<number>;

  constructor {
      this.someVar$ = this.someVar$.pipe(map((val:number) => val * val));
  }

}

```

## Demo

Check the [link]()

## Contributing

1. Fork repo.
2. `npm install / yarn`.
3. Make your changes.
4. Add your tests.
5. `npm run test / yarn test`.
6. `npm run build / yarn build`.
7. After all tests are passing.
8. Commit, push, PR.

## License

Released under the terms of MIT License.

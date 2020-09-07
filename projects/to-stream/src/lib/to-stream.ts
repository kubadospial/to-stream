import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, shareReplay } from 'rxjs/operators';

export function toStream<T>() {
  const setter$ = new Subject<T>();
  const state$ = setter$
    .asObservable()
    .pipe(distinctUntilChanged(), shareReplay(1));

  return (target: T, propName: string): void => {
    Object.defineProperty(target, propName, {
      set(value: T): void {
        console.log(value);
        setter$.next(value);
      },
      get(): Observable<T> {
        console.log('asd');
        return state$;
      },
    });
  };
}

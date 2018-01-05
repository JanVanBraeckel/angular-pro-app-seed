import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { map, tap, filter } from 'rxjs/operators';

import { Store } from 'store';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

export interface Meal {
  name: string;
  ingredients: string[];
  timestamp: number;
  key: string;
  $exists: () => boolean;
}

@Injectable()
export class MealsService {
  meals$: Observable<Meal[]> = this.db
    .list<Meal[]>(`meals/${this.uid}`)
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(action => ({ key: action.key, ...action.payload.val() }))
      ),
      tap(next => this.store.set('meals', next))
    );

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  removeMeal(key: string) {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }

  getMeal(key: string) {
    if (!key) {
      return Observable.of({});
    }
    return this.store
      .select<Meal[]>('meals')
      .pipe(
        filter(Boolean),
        map(meals => meals.find((meal: Meal) => meal.key === key))
      );
  }
}

import { makeAutoObservable } from 'mobx';

export default class UserStore {
  ng = 'angularjs';

  constructor() {
    makeAutoObservable(this);
  }
}

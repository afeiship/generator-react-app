import { makeAutoObservable } from 'mobx';

export default class AuthStore {
  static storeKey = 'special';
  special = 'special var';

  constructor() {
    makeAutoObservable(this);
  }
}

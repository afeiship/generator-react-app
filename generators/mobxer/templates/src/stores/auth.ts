import { makeAutoObservable } from 'mobx';

export default class AuthStore {
  token = 'init_token';

  constructor() {
    makeAutoObservable(this);
  }
}

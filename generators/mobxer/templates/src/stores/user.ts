import { makeAutoObservable } from 'mobx';

export default class UserStore {
  username = 'aric';

  constructor() {
    makeAutoObservable(this);
  }
}

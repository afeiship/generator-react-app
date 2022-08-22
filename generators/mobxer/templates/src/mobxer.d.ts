interface IGlobalStore {
  user: import('./stores/user');
  auth: import('./stores/auth');
}

interface NxStatic {
  $root: IGlobalStore;
}

import { createContext, useContext } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { makeAutoObservable } from 'mobx';
import { createAppStore } from './Store';
import { AppStoreType } from './store-type';

// Use the interface when creating the context
const Context = createContext<AppStoreType | null>(null);

export const AppStoreProvider = observer(({ children, ...props }) => {

  const store = useLocalObservable(() => createAppStore(props));

  return <Context.Provider value={store}>{children}</Context.Provider>;
});

export const useAppStore = () => {
  const store = useContext(Context);
  if (!store) throw new Error('Use App store within provider!');
  return store;
};



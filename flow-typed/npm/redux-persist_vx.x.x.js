// flow-typed signature: 21a3e526cf41e58b66ff45c6b9dc2a16
// flow-typed version: <<STUB>>/redux-persist_v6.0.0/flow_v0.125.1

declare module 'redux-persist' {
  declare module.exports: {
    persistStore(Store, ?Config, ?Callback): Persistor;
    persistReducer(Config, Reducer): EnhancedReducer;
  };
}

declare module 'redux-persist/integration/react' {
  declare module.exports: any;
}

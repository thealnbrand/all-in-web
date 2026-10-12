import React from 'react';

// Polyfill React 19 internal properties for @react-three/fiber & react-reconciler
const ReactAny = React as any;

if (ReactAny) {
  if (!ReactAny.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
    ReactAny.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {};
  }

  const secret = ReactAny.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  const client =
    ReactAny.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE ||
    ReactAny.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE ||
    {};

  // Persistent fallback objects ensuring .current is never accessed on undefined
  const fallbackOwner = client.ReactCurrentOwner || { current: null };
  const fallbackDispatcher = client.ReactCurrentDispatcher || { current: null };
  const fallbackBatchConfig = client.ReactCurrentBatchConfig || { transition: null };
  const fallbackActQueue = client.ReactCurrentActQueue || { current: null };

  if (!secret.ReactCurrentOwner) {
    Object.defineProperty(secret, 'ReactCurrentOwner', {
      get() {
        return client.ReactCurrentOwner || fallbackOwner;
      },
      set(v) {
        if (client.ReactCurrentOwner) client.ReactCurrentOwner = v;
        else fallbackOwner.current = v?.current ?? v;
      },
      configurable: true,
      enumerable: true,
    });
  }

  if (!secret.ReactCurrentDispatcher) {
    Object.defineProperty(secret, 'ReactCurrentDispatcher', {
      get() {
        return client.ReactCurrentDispatcher || fallbackDispatcher;
      },
      set(v) {
        if (client.ReactCurrentDispatcher) client.ReactCurrentDispatcher = v;
        else fallbackDispatcher.current = v?.current ?? v;
      },
      configurable: true,
      enumerable: true,
    });
  }

  if (!secret.ReactCurrentBatchConfig) {
    Object.defineProperty(secret, 'ReactCurrentBatchConfig', {
      get() {
        return client.ReactCurrentBatchConfig || fallbackBatchConfig;
      },
      set(v) {
        if (client.ReactCurrentBatchConfig) client.ReactCurrentBatchConfig = v;
      },
      configurable: true,
      enumerable: true,
    });
  }

  if (!secret.ReactCurrentActQueue) {
    Object.defineProperty(secret, 'ReactCurrentActQueue', {
      get() {
        return client.ReactCurrentActQueue || fallbackActQueue;
      },
      configurable: true,
      enumerable: true,
    });
  }
}

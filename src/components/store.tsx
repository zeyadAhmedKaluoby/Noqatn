"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";
import { initialStore } from "@/lib/seed";
import { readStore, STORAGE_KEY } from "@/lib/storage";
import type { Gift, GuestMessage, InvitationEvent, MessageStatus, Rsvp, Store } from "@/lib/types";

const serverStore = initialStore();
let currentStore: Store = serverStore;
let currentRaw: string | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      currentRaw = "__invalidate__";
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === currentRaw) return currentStore;
  currentStore = readStore();
  currentRaw = localStorage.getItem(STORAGE_KEY);
  return currentStore;
}

function getServerSnapshot() {
  return serverStore;
}

function clientReady() {
  return true;
}

function serverReady() {
  return false;
}

function persist(next: Store) {
  const raw = JSON.stringify(next);
  localStorage.setItem(STORAGE_KEY, raw);
  currentRaw = raw;
  currentStore = next;
  emit();
}

type StoreApi = {
  ready: boolean;
  store: Store;
  saveEvent: (event: InvitationEvent) => void;
  addRsvp: (rsvp: Rsvp) => void;
  addMessage: (message: GuestMessage) => void;
  addGift: (gift: Gift) => void;
  setMessageStatus: (id: string, status: MessageStatus) => void;
  bumpVisit: (slug: string, newSession: boolean) => void;
};

const StoreContext = createContext<StoreApi | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);

  const commit = useCallback((update: (current: Store) => Store) => {
    persist(update(getSnapshot()));
  }, []);

  const saveEvent = useCallback(
    (event: InvitationEvent) => {
      commit((current) => {
        const exists = current.events.some((item) => item.slug === event.slug);
        return {
          ...current,
          events: exists
            ? current.events.map((item) => (item.slug === event.slug ? event : item))
            : [event, ...current.events],
        };
      });
    },
    [commit],
  );

  const addRsvp = useCallback(
    (rsvp: Rsvp) => {
      commit((current) => ({ ...current, rsvps: [rsvp, ...current.rsvps] }));
    },
    [commit],
  );

  const addMessage = useCallback(
    (message: GuestMessage) => {
      commit((current) => ({ ...current, messages: [message, ...current.messages] }));
    },
    [commit],
  );

  const addGift = useCallback(
    (gift: Gift) => {
      commit((current) => ({ ...current, gifts: [gift, ...current.gifts] }));
    },
    [commit],
  );

  const setMessageStatus = useCallback(
    (id: string, status: MessageStatus) => {
      commit((current) => ({
        ...current,
        messages: current.messages.map((message) =>
          message.id === id ? { ...message, status } : message,
        ),
      }));
    },
    [commit],
  );

  const bumpVisit = useCallback(
    (slug: string, newSession: boolean) => {
      commit((current) => {
        const previous = current.visits[slug] ?? { views: 0, sessions: 0 };
        return {
          ...current,
          visits: {
            ...current.visits,
            [slug]: {
              views: previous.views + 1,
              sessions: previous.sessions + (newSession ? 1 : 0),
            },
          },
        };
      });
    },
    [commit],
  );

  return (
    <StoreContext.Provider
      value={{ ready, store, saveEvent, addRsvp, addMessage, addGift, setMessageStatus, bumpVisit }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore must be used within StoreProvider");
  return value;
}

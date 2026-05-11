import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts";
import { useGameStore } from "./gameStore.ts";

Deno.test("useGameStore withdraw action", () => {
  // Set up initial state for the test
  const initialState = useGameStore.getState();
  useGameStore.setState({
    ...initialState,
    account: {
      ...initialState.account,
      balance: 1000,
    },
  });

  let store = useGameStore.getState();
  const initialBalance = store.account.balance;

  // Edge Case: Try withdrawing more than balance
  store.withdraw(initialBalance + 100);
  assertEquals(useGameStore.getState().account.balance, initialBalance);

  // Edge Case: Try withdrawing negative amount
  store.withdraw(-50);
  assertEquals(useGameStore.getState().account.balance, initialBalance);

  // Edge Case: Try withdrawing 0
  store.withdraw(0);
  assertEquals(useGameStore.getState().account.balance, initialBalance);

  // Happy Path: Normal withdraw
  store.withdraw(100);
  assertEquals(useGameStore.getState().account.balance, initialBalance - 100);

  // Reset state to avoid test pollution
  useGameStore.setState(initialState);
});

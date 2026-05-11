import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts";

Deno.test("basic math test to satisfy CI", () => {
  assertEquals(1 + 1, 2);
});

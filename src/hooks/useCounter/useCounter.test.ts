import { expect, it } from "vitest";
import { describe } from "vitest";

import "@testing-library/jest-dom/vitest";
import { act, renderHook } from "@testing-library/react";
import useCounter from "./useCounter";

describe("useCounter", () => {
    it("initial value is 5", () => {
        const { result} = renderHook(() => useCounter(5))

        expect(result.current.count).toEqual(5)
    })

    it("increments the counter", () => {
        const { result} = renderHook(() => useCounter(5))

        act(() => {
            result.current.increment()
        })

        expect(result.current.count).toEqual(6)
    })
})
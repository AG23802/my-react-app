


import { render, screen, waitFor } from "@testing-library/react";
import Greeting from "./Greeting";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

describe("Greeting", () => {
    // it("renders a default greeting", () => {
    //     render(<Greeting />)
    //     expect(screen.getByText("Hello World!, welcome to our app!")).toBeInTheDocument()
    // })

    // it("renders a greeting with a name", () => {
    //     render(<Greeting name="Alice" />)
    //     expect(screen.getByText("Hello Alice!, welcome to our app!")).toBeInTheDocument()
    // })

    // it("increments the counter when the button is clicked", async () => {
    //     render(<Greeting />)

    //     const button = screen.getByRole("button", { name: "Click me" })
    //     const counter = screen.getByTestId("counter")

    //     expect(counter.textContent).toEqual("Counter: 0")
    //     await userEvent.click(button)
    //     await userEvent.click(button)
    //     expect(counter.textContent).toEqual("Counter: 2")
    // })

    beforeEach(() => {
        // replacing the global fetch with a mock function
        // Better than globalThis.fetch = vi.fn() because it can be "unstubbed"
        globalThis.fetch = vi.fn()
    })

    afterEach(() => {
        vi.resetAllMocks()
    })

    it("fetches and displays user data", async () => {
        const mockedFetch = vi.mocked(globalThis.fetch)

        mockedFetch.mockResolvedValue({
            json: async () => ({
                id: 4,
                name: "Patricia Lebsack",
                email: "Julianne.OConner@kory.org"
            })
        } as Response)
        render(<Greeting userID={4} />)

        expect(screen.getByText("Loading...")).toBeInTheDocument()

        await waitFor(() => {
            expect(screen.getByText("Patricia Lebsack")).toBeInTheDocument()
            expect(screen.getByText(/Julianne.OConner@kory.org/i)).toBeInTheDocument()
        })
    })
})
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import Greeting from "./Greeting";
import userEvent from "@testing-library/user-event";

describe("Greeting", () => {
    beforeEach(() => {
        // Better than globalThis.fetch = vi.fn() because it can be "unstubbed"
        // Initialize fetch as a mock that returns a valid (but empty) response
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
            new Response(JSON.stringify({}), { 
                status: 200,
                headers: { "Content-Type": "application/json" }
            })
        ));
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals(); // Cleans up the global fetch stub
    });

    it("increments the counter when the button is clicked", async () => {
        render(<Greeting />)

        // const button = screen.getByRole("button", { name: /click me/i })

        // 1. Wait for the button to appear (this handles the Loading state)
    const button = await screen.findByRole("button", { name: /click me/i })
        const counter = screen.getByTestId("counter")

        expect(counter.textContent).toEqual("Counter: 0")
        await userEvent.click(button)
        await userEvent.click(button)
        expect(counter.textContent).toEqual("Counter: 2")
    })

    it("fetches and displays user data", async () => {
        const mockUser = {
            id: 4,
            name: "Patricia Lebsack",
            email: "Julianne.OConner@kory.org",
        };

        // Use the real Response object for a more realistic mock
        vi.mocked(fetch).mockResolvedValue(
            new Response(JSON.stringify(mockUser), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            })
        );

        render(<Greeting userID={4} />);

        // 1. Check for immediate loading state
        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        // 2. Use findByText: it's cleaner than waitFor + getBy
        // findBy queries wait up to 1000ms by default
        const userName = await screen.findByText("Patricia Lebsack");

        expect(userName).toBeInTheDocument();
        expect(screen.getByText(/Julianne.OConner@kory.org/i)).toBeInTheDocument();

        // 3. Optional: Verify fetch was called correctly
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/4"));
    });
});
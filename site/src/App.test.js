import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

test("that math works", async () => {
  expect(5 + 5).toBe(10);
});

afterEach(() => {
  window.history.pushState(null, document.title, "/");
});

beforeEach(() => {
  fetch.resetMocks();
});

test("full app rendering/navigating", async () => {
  const user = userEvent.setup();
  render(<App />, { wrapper: BrowserRouter });

  // verify page content for default route
  expect(screen.getByText(/Home Page/)).toBeInTheDocument();

  // verify page content for expected route after navigating
  await waitFor(() => user.click(screen.getByText(/click to go to other page/i)));
  expect(screen.getByText(/Other Page/)).toBeInTheDocument();
  expect(screen.getByText(/current state counter/i)).toBeInTheDocument();

  await waitFor(() => user.click(screen.getByText(/click to go to home page/i)));
  expect(screen.getByText(/Home Page/)).toBeInTheDocument();
});

test("fetching works on the home page", async () => {
  fetch.mockResponseOnce(JSON.stringify({ data: "Pong Frontend. Received at 2023-02-25T20:49:00.813447Z." }));

  const user = userEvent.setup();
  render(<App />, { wrapper: BrowserRouter });

  // verify page content for default route
  expect(screen.getByText(/Home Page/)).toBeInTheDocument();
  await waitFor(() => user.click(screen.getByText(/fetch backend/i)));
  expect(screen.getByText(/pong frontend./i)).toBeInTheDocument();

  expect(fetch).toHaveBeenCalledTimes(1);
});

test("fetching fails on the home page with no connection", async () => {
fetch.mockRejectOnce(new Error("API is down"));

const user = userEvent.setup();
render(<App />, { wrapper: BrowserRouter });

expect(screen.getByText(/Home Page/)).toBeInTheDocument();
await waitFor(() => user.click(screen.getByText(/fetch backend/i)));
expect(screen.getByText(/An API error occured/i)).toBeInTheDocument();

expect(fetch).toHaveBeenCalledTimes(1);
});

test("fetching fails on the home page with malformed API response", async () => {
  fetch.mockResponseOnce(JSON.stringify({ data: null }));

  const user = userEvent.setup();
  render(<App />, { wrapper: BrowserRouter });

  expect(screen.getByText(/Home Page/)).toBeInTheDocument();
  await waitFor(() => user.click(screen.getByText(/fetch backend/i)));

  expect(fetch).toHaveBeenCalledTimes(1);
});
# In Class Activity - Jest

The goal of this in-class activity is to gain familiarity with using Jest to test front end JavaScript code.

## Basic Tutorial Information

1. Tests for `App.js` will go in `App.test.js`  -- the suffix `test.js` identifies tests to be run using Jest.
2. The test format is very similar to the JUnit tests you have already seen. A test follows the following basic format:
```
test("Title of test", async () => {
 expect().toBe();
});
```

```
test("that math works", async () => {
  expect(5 + 5).toBe(10);
});
```
3. Here the ‘async’ keyword denotes that the test is asynchronous and the ‘expect’ statement is the assertion which the test is testing for. 
4.  Useful JUnit constructs also exist in Jest.  The example below shows the afterEach method, which is run after each test respectively. Others, such as beforeEach(), are also available.

```
// Reset the browser history after each test
afterEach(() => {
  window.history.pushState(null, document.title, "/");
});

beforeEach(() => {
  fetch.resetMocks();
});

```

5. These basic principles can be used to test our javascript files. Some common   things you want to test for include but are not limited to specific text being on the screen, pages rendering, and actions like clicking which lead to pages changing. The example below includes a lot of these tests.

```
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
```
6. Testing more complicated react components: Another important part of your javascript code to test is the code that is utilized when data gets sent from frontend to backend and backend to frontend. The example below displays this.    Here the test mocks a fetch call with a stringified version of the json object. Then when it clicks something that interacts with the backend the data you put in fetch is returned, allowing you to test whether the expected change to the screen is present (note this is a simple response object being returned. Sometimes your response objects may be more complicated so you will have to have more data variables present in the mockResponseOnce() argument).

```
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
```

7. Testing error parts of your javascript code: Now oftentimes is it important to test your catch statements and error checks parts of your javascript code. (This is also important if you want to get full coverage points). The test below shows this. By using fetch.mockRejectOnce() you can have the fetch throw an error which is (hopefully) caught by your javascript code. Then, you can test for your anticipated response based on that particular error.

```
test("fetching fails on the home page with no connection", async () => {
  fetch.mockRejectOnce(new Error("API is down"));

  const user = userEvent.setup();
  render(<App />, { wrapper: BrowserRouter });

  expect(screen.getByText(/Home Page/)).toBeInTheDocument();
  await waitFor(() => user.click(screen.getByText(/fetch backend/i)));
  expect(screen.getByText(/An API error occured/i)).toBeInTheDocument();

  expect(fetch).toHaveBeenCalledTimes(1);
});
```

8. The next example displays what happens when data returned may be of a different format. More    specifically, it tests when the returned data is null. This may be important for accessing specific if statements in your code.

```
test("fetching fails on the home page with malformed API response", async () => {
  fetch.mockResponseOnce(JSON.stringify({ data: null }));

  const user = userEvent.setup();
  render(<App />, { wrapper: BrowserRouter });

  expect(screen.getByText(/Home Page/)).toBeInTheDocument();
  await waitFor(() => user.click(screen.getByText(/fetch backend/i)));

  expect(fetch).toHaveBeenCalledTimes(1);
});
```

9. This final example shows variants on the prior examples and with more advanced test logic.
```
test("counting works on the other page", async () => {
  const user = userEvent.setup();
  render(<App />, { wrapper: BrowserRouter });

  // verify page content for default route
  expect(screen.getByText(/Home Page/)).toBeInTheDocument();

  // verify page content for expected route after navigating
  await waitFor(() => user.click(screen.getByText(/click to go to other page/i)));
  expect(screen.getByText(/current state counter/i)).toBeInTheDocument();

  await waitFor(() => user.click(screen.getByText(/increment counter/i)));
  await waitFor(() => user.click(screen.getByText(/increment counter/i)));
  expect(screen.getByText(/current state counter: 2/i)).toBeInTheDocument();
  await waitFor(() => user.click(screen.getByText(/clear counter/i)));
  expect(screen.getByText(/current state counter: 0/i)).toBeInTheDocument();
  let counter = 12;
  for (let i = 0; i < counter; i++) {
    await waitFor(() => user.click(screen.getByText(/increment counter/i)));
  }
  expect(screen.getByText(/current state counter: 12/i)).toBeInTheDocument();
  expect(screen.getByText(/Counter is greater than 10./i)).toBeInTheDocument();
});
```

## Running Tests and Checking Coverage for JavaScript

All unit tests will run with `mvn test`  and the coverage output directory will be `site/coverage` for your JavaScript code.

### Frontend
To run just your frontend tests (installing node is required):
- First, navigate in your terminal/command prompt to `/site`.
- Run `npm run test` to run Jest tests
  - This will ask you to select an option: `a` will run all tests, `f` will run failed tests, etc
- Run `npm run test -- --coverage --watchAll=false` to run Jest coverage tests. Note the extra `--` is required.

#### Running Your App Locally During Development

To run the app in the development environment, first run `mvn compile` and then `mvn spring-boot:run` The app will now be available on `http://localhost:8080`


## Useful Links & Resources
- https://jestjs.io/docs/getting-started
- https://jestjs.io/docs/tutorial-react
- https://www.codecademy.com/learn/learn-react-testing

## Credits
- Original Jest code tests written by Daniel Budziwojski, Jordan Bettencourt, and Stephanie Yoshimoto, Spring 2023
- Tutorial text and set up by Jose Maria Villas-Boas and Toan Huynh, Spring 2024
- Unintentional mistakes introduced by William Halfond, 2023-2024


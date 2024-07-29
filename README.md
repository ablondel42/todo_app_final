1. Install dependencies

    ```bash
    npm install
    ```

2. Run the tests

    ```bash
    npm test
    ```

3. Start the app

    ```bash
    npx expo start
    ```

-   If you get an error about file descriptors you might have to update or install watchman 'brew install watchman'
-   Download the 'Expo Go' app and scan the QRcode in the terminal to run the app on a physical device. (it worked well on an old Iphone I use for development).
-   Press 'w' to run it in a web browser (tested on Chrome with no issues).
-   unfortunately I could only test on Mac, I don't have a Windows machine, but i'm guessing/hoping that expo works the same way on Windows.

4. My approach:

-   I tried to keep things as simple as possible and I started by breaking down the UI into separate sections. (Header / Form / List)
-   Then I listed all the variables and states I would need to make it work.
-   I created the Stylesheet early on to keep things consistent.
-   The styling I made is kinda cheap but CSS is not my strong suit (yet :P).
-   Overall, the logic and state handling is almost identical to ReactJS so coming from ReactJS into React Native feels cool.
-   If I have had more time I would have set some nicer components like modals, sliding elements, and maybe some subtle animations but here I just went with the very basic building blocs.

5. The challenges I faced:

-   The VSCode refactorings don't work well (idk why) and it was infuriating to move components and blocks manually.
-   useEffect always gets me, I spent a good 2h trying to prevent it from going rogue after updating the state on load (infinite loop).
-   switching from useState (nasty props drilling) to redux was a complicated refactoring but the result is a lot cleaner.
-   In a real setup I would spend much more time on optimisations for data retrieval or filtering and such.
-   I could not write a single component test without getting 'SyntaxError: Cannot use import statement outside a module'... I found many articles on the subject but none of the solutions worked, however, unit testing the redux actions was a straightforward process.

6. Final words:

-   React Native & Expo are great tools and the docs are really neat!

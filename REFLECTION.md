# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
=Imperative code tells the browser step-by-step how to update the DOM, while declarative code (React) just describes what the UI should look like based on the current state, and React handles the updates automatically.

2. Why must a component name start with a capital letter?
=React uses capital letters to distinguish custom components from regular HTML tags. If a tag starts with a lowercase letter, React treats it as a built-in HTML element like <div>.

3. What does a fragment <>...</> do, and why not just use a <div>?
=A fragment groups elements together without adding an extra wrapper node to the actual HTML DOM. Using a <div> would add unnecessary nesting, which can break CSS layouts and make the DOM harder to read.

4. Name one benefit of splitting the UI into small components.
=It makes your code reusable, so you can use the same component in multiple places without rewriting it. It also makes the app much easier to read, debug, and maintain since each component only handles one small part of the UI.

# Week 3 reflection

1. Rename vendors.json to break the URL: does the error message and Try again button appear?
=Yes. The fetch fails, triggering the .catch() block. This sets the error state, which renders the <ErrorMessage> component containing the error text and the "Try again" button.

2. Submit an empty form: do all three errors show?
=Yes. The validate function checks all rules. Since the name is < 3 characters, no mahallah is selected, and no pickup time is chosen, it returns an error for all three, which are then displayed below their respective inputs.

3. Add the same item twice: one line with qty 2?
=Yes. The handleAddToCart function uses .find() to check if the item already exists in the cart. If it does, it uses .map() to increase the qty of that existing line by 1, rather than adding a duplicate row.
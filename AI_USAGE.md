# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s): none 
- What I asked for: none
- What I kept, changed or rejected, and why: none
- One thing the AI got wrong and how I fixed it: none

## Week 2
- Tool(s): none 
- What I asked for: none
- What I kept, changed or rejected, and why: none
- One thing the AI got wrong and how I fixed it: none

## Week 3
- Tool(s): QWEN AI 

- What I asked for: 
I asked the AI to help me understand the Week 3 lab sheet and how to upgrade my Week 2 code. Specifically, I asked how to convert my vendors.js file to vendors.json without breaking it, and how to fill in the // TODO sections in the new components (CartItem, CartPage, CheckoutForm) and App.jsx while keeping my original code structure intact.

- What I kept, changed or rejected, and why: 
I kept the overall layout and state structure of my App.jsx because the AI explained it was the correct way to "lift state up". I kept my original vendor data. I changed the syntax of my data (single quotes to double quotes, removed export) because the AI explained that JSON is strictly for data and doesn't allow JavaScript syntax.

- One thing the AI got wrong and how I fixed it: none

## Week 4
- Tool(s): QWEN AI

- What I asked for: 
.How to structure the useLocalStorage custom hook with a try/catch block around JSON.parse as required
.How to extract the Week 3 fetch logic (loading, error, reload) out of App.jsx and into a custom useVendors.js hook.
.How to set up the CartContext and CartProvider so that both the cart and orders arrays are saved using useLocalStorage to survive page refreshes.

- What I kept, changed or rejected, and why:
.I kept the basic structure of the useLocalStorage hook, but I added the try/catch block as specified in the lab sheet to prevent crashes on bad JSON.
.I completely removed the Week 3 view state ('menu' | 'cart' | 'done') from App.jsx and replaced it with React Router <Routes> and <Route> elements.

- One thing the AI got wrong and how I fixed it:
.The AI suggested importing routing components (like BrowserRouter and Link) from react-router-dom. However, the lab sheet explicitly states that in React Router 8, everything is imported from react-router and the old react-router-dom package no longer exists.


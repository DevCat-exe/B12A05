### 1. Difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll
- **getElementById** → Finds 1 element by its **id**.  
- **getElementsByClassName** → Finds all elements with a **class** (gives a list).  
- **querySelector** → Finds the **first** element that matches (id, class, tag).  
- **querySelectorAll** → Finds **all** matching elements (gives a list).

---

### 2. How to create and insert a new element into the DOM?
Make an element → `document.createElement("div")`  
and Put it on page → `document.body.appendChild(element)`

---

### 3. What is Event Bubbling?
When you click a child element, the event also goes **up** to its parent, then to the top.  

---

### 4. What is Event Delegation? Why useful?
Put **one event** on a parent and handle all child clicks with it.  
Useful because it’s faster and works for new elements added later.  

---

### 5. Difference between preventDefault() and stopPropagation()
- **preventDefault()** → Stops the element’s normal action (like stopping a link or form).  
- **stopPropagation()** → Stops the event from going to parent elements.  

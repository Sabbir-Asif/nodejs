# Errors vs. Exceptions in Node.js

### **Error** → *A problem object*  
- Just a **description** of something wrong (e.g., invalid input, file missing).  
- Doesn’t crash the app unless **thrown**.  

### **Exception** → *A thrown error*  
- When an **Error is thrown**, it becomes an **Exception**.  
- **Crashes Node.js** if not caught.  

---  

### **Example**  

#### 1. **Error (Just an object, harmless)**  
```javascript
const error = new Error("Oops!");  
console.log(error.message); // "Oops!" (No crash)  
```  

#### 2. **Exception (Thrown → Crashes if uncaught)**  
```javascript
throw new Error("Boom!"); // 💥 Uncaught Exception → Crash!  
```  

#### 3. **Handled Exception (Safe)**  
```javascript
try {  
  throw new Error("Controlled boom!");  
} catch (e) {  
  console.log("Caught:", e.message); // No crash  
}  
```  

---  

### **Why the Difference?**  
- **Errors** let you **describe** problems.  
- **Exceptions** force you to **handle** them (or crash).  

👉 **Rule:**  
- Use `Error` for expected issues (e.g., validation).  
- Use `try-catch` for risky operations (e.g., file reading).  


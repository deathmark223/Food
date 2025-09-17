@@ .. @@
   useEffect(() => {
     // Load cart from localStorage on mount
-    const savedCart = localStorage.getItem('cart')
-    if (savedCart) {
-      try {
-        setItems(JSON.parse(savedCart))
-      } catch (error) {
-        console.error('Error loading cart from localStorage:', error)
+    if (typeof window !== 'undefined') {
+      const savedCart = localStorage.getItem('cart')
+      if (savedCart) {
+        try {
+          setItems(JSON.parse(savedCart))
+        } catch (error) {
+          console.error('Error loading cart from localStorage:', error)
+        }
       }
     }
   }, [])

   useEffect(() => {
     // Save cart to localStorage whenever items change
-    localStorage.setItem('cart', JSON.stringify(items))
+    if (typeof window !== 'undefined') {
+      localStorage.setItem('cart', JSON.stringify(items))
+    }
   }, [items])
To add confetti to a website, you can use a JavaScript library like `confetti-js`. Here are the steps to add confetti to your website using this library:

1. Download the `confetti.min.js` file from the `confetti-js` GitHub repository: https://github.com/mathusummut/confetti.js

2. Add the `confetti.min.js` file to your website's HTML file by including the following code in the `<head>` section:

```html
<script src="path/to/confetti.min.js"></script>
```

Replace `path/to/confetti.min.js` with the actual path to the `confetti.min.js` file on your server.

3. Add a button or event listener to trigger the confetti effect. For example, you can add a button with the following code:

```html
<button onclick="startConfetti()">Start Confetti</button>
```

4. Add a JavaScript function to start the confetti effect when the button is clicked. For example:

```javascript
function startConfetti() {
  confetti.start();
}
```

This function calls the `start()` method of the `confetti` object, which starts the confetti effect.

5. Customize the confetti effect by modifying the options passed to the `start()` method. For example:

```javascript
function startConfetti() {
  confetti.start({
    angle: 90,
    spread: 45,
    startVelocity: 45,
    elementCount: 50,
    decay: 0.9
  });
}
```

In this example, the confetti will be launched at a 90 degree angle, spread out over 45 degrees, with a starting velocity of 45 pixels per second. There will be 50 confetti elements, and each element will decay at a rate of 0.9 per second.

That's it! With these steps, you should be able to add confetti to your website using the `confetti-js` library.
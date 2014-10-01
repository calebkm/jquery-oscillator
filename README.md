# jQuery Oscillator

A small jQuery extension that oscillates integer values incrementally between a min and max.


## $.oscillator([ options ],[ function ]) ##

* **options** Optional hash of defaults: min, max, speed, start & dir

* **function** Optional function to be called.

## Installation ##

Include script *after* the jQuery library (unless you are packaging scripts somehow else):
```html
<script src="/path/to/jquery.oscillator.js"></script>
```

## Usage ##

Let's say you want to continuously oscillate the opacity of the body of a webpage, let's create a new oscillator and pass a function to update our body CSS:

```javascript
var myOscillator = new $.oscillator({ min: 0, max: 100, speed: 50 }, function() {
  $('body').css({ opacity: myOscillator.value/100 });
});
```

By default, the oscillator will begin oscillating. To pause:

```javascript
myOscillator.pause();
```

To restart:

```javascript
myOscillator.start();
```

Or you can toggle between starting and pausing:

```javascript
myOscillator.toggle();
```

To stop the oscillator and reset the options to the initial state:
```javascript
myOscillator.stop();
```

At any point you can grab the current value of the oscillator:
```javascript
myOscillator.value;
```

## Options ##

You can pass a hash of options, with the defaults set to:

```javascript
options = {
  start:     true, // begin oscillations on init
  min:       0,    // minimum value
  max:       100,  // maximum value
  speed:     1000, // increment speed
  start:     null, // initial value
  increment: 1,    // value to increment by
  direction: 'up'  // initial increment direction: 'up' or 'down'
}
```
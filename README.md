# jQuery Oscillator

A small jQuery extension that oscillates integer values incrementally between a min and max.

## $.oscillator() ##

#### $.oscillator([ options ],[ function ])

* **options** Optional hash of defaults: min, max, speed, start & dir

* **function** Optional function to be called.

## Installation ##

Include script *after* the jQuery library (unless you are packaging scripts somehow else):
```javascript
  <script src="/path/to/jquery.oscillator.js"></script>
```

## Usage ##

Let's say you want to continuously oscillate the body opacity of your webpage:

```javascript
// create a new oscillator
var myOscillator = new $.oscillator({ min: 0, max: 100, speed: 50 }, function(){
  $('body').css({ opacity: myOscillator.value/100 });
});
```

By default the oscillator will start on init. To pause:

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

To stop the oscillator and reset the value and direction to the initial state:
```javascript
myOscillator.stop();
```

## Options ##

You can pass an optional hash of options, with the defaults set to:

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
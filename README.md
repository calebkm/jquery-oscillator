# jQuery Oscillator

A super simple jQuery extension that oscillates integer values between a max and min.

---

## $.oscillator()

#### $.oscillator([ options ],[ function ])

* **options** Optional hash of defaults: min, max, speed, start & dir

* **function** Optional function to be called.

---

## Example - Oscillating body opacity

```
// create new oscillator
var myOscillator = new $.oscillator({ min: 0, max: 100, speed: 50 }, function(){
  $('body').css({ opacity: myOscillator.value/100 });
});
 
// stop 
myOscillator.stop();

// re-start
myOscillator.start();

// or toggle start/stop
myOscillator.toggle();
```
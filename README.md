# jQuery Oscillator

A super simple jQuery extension that oscillates integer values between a max and min.

---

## $.oscillator()

#### $.oscillator([ options ],[ function ])

* **options** A hash of oscillator options.

* **function** A Function to be called by the timer.

---

## Usage

```
// Oscillate body opacity

var myOscillator = new $.oscillator({ min: 0, max: 100, speed: 50 }, function(){
  $('body').css({ opacity: myOscillator.value/100 });
});
```
/**
 * jQuery Oscillator 1.5 - http://www.github.com/calebkm/jquery-oscillator
 * A super simple jQuery extension that oscillates integer values between a min and max.
 * This plugin requires jQuery!
 *
 * Copyright (c) 2014 Caleb K Matthiesen <c@calebkm.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * http://opensource.org/licenses/MIT
 *
 *
 * Example usage - oscillating body opacity:
 *  
 * // create new oscillator
 * var myOscillator = new $.oscillator({ min: 0, max: 100, speed: 50 }, function(){
 *   $('body').css({ opacity: myOscillator.value/100 });
 * })
 #
 * myOscillator.pause();  // pause
 * myOscillator.start();  // re-start
 * myOscillator.toggle(); // or toggle pause/start
 * myOscillator.stop();   // stop and reset value, direction
 *
 * See below for default options.
 *
 */

;(function($) {

  $.oscillator = function(options, func) {
    
    // Option defaults
    var options = $.extend({
      start:     true, // start the oscillation on init
      min:       0,    // minimum value
      max:       100,  // maximum value
      speed:     1000, // increment speed (ms)
      value:     null, // initial value
      increment: 1,    // integer value to increment by
      direction: 'up'  // initial increment direction: 'up' or 'down'
    }, options);

    var osc = this;
    
    // Public methods
    //----------------------------------------

    // Oscillator value
    osc.value = options.value || options.min; 
    
    // Oscillator direction
    osc.direction = options.direction;

    // Begin oscillations
    osc.start = function() {
      if (!osc.interval) newInterval();
    };

    // Stop oscillations and reset values
    osc.stop = function() {
      clearTimeout(osc.interval);
      osc.interal = null;
      osc.value = options.value || options.min;
      osc.direction = options.direction;
    };
    
    // Pause oscillations
    osc.pause = function() {
      clearTimeout(osc.interval);
      osc.interval = null;
    };
    
    // Toggle start/pause
    osc.toggle = function() {
      if (!osc.interval) osc.start();
      else               osc.pause();
    };
    
    // begin oscillation on init
    //----------------------------------------
    if (options.start) osc.start();
    
    // helper functions
    //----------------------------------------

    // Set new interval
    function newInterval() { 
      osc.interval = setTimeout(timeOut, options.speed);
    };
     
    // Called after each interval
    // --> call optional function
    // --> update the oscillator value
    // --> reset the interval
    function timeOut() {
      callFunc();
      updateValue();
      newInterval();
    };
    
    // Increment or decrement the oscillator value
    function updateValue() {
      if (osc.direction == 'up') {
        osc.value += options.increment;
        // if at max value, flip direction
        if (osc.value >= options.max) {
          osc.value = options.max;
          osc.direction = 'down';
        }
      } else {
        osc.value -= options.increment; 
        // if at min value, flip direction
        if (osc.value <= options.min) {
          osc.value = options.min;
          osc.direction = 'up';
        }
      } 
    };
    
    // Call optional function
    function callFunc() {
      if (typeof func == 'function') func();
    };
    
  };
  
})(jQuery);
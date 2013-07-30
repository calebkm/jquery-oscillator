/**
 * jquery.oscillator.1.0.js
 * A super simple jQuery extension that oscillates integer values between a max and min.
 * This plugin requires jQuery!
 *
 * Copyright (c) 2013 Caleb K Matthiesen <c@calebkm.com>
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
 *
 * Example usage - oscillating body opacity:
 *  
 * // create new oscillator
 * var myOscillator = new $.oscillator({ min: 0, max: 100, speed: 50 }, function(){
 *   $('body').css({ opacity: myOscillator.value/100 });
 * })
 *
 * // stop 
 * myOscillator.stop();
 *
 * // re-start
 * myOscillator.start();
 * 
 *
 * See below for default options.
 *
 */

;(function($){
  $.oscillator = function(options, func){
  
    // oscillator
    var oscillator = this;
    
    // defaults
    this.defaults = {
      min:   1,    // minimum value & starting value
      max:   100,  // maximum value
      speed: 1000, // increment speed
      start: null, // initial value
      dir:   'up'  // initial increment direction: 'up' or 'down'
    };
    
    // merge options
    this.options = $.extend({}, this.defaults, options);
    
    // initial value and direction
    this.value = this.options.start || this.options.min;
    this.dir   = this.options.dir;
    
    // start/stop or toggle
    this.start = function(){
      if (!oscillator.interval){
        oscillator.interval = setTimeout(timeOut, oscillator.options.speed);
      }
    };
    this.stop = function(){
      clearTimeout(oscillator.interval);
      oscillator.interval = null;
    };
    this.toggle = function(){
      if (!oscillator.interval){
        oscillator.start();
      } else {
        oscillator.stop();
      }
    };
    
    // start oscillator
    oscillator.start();
    
    
    /*-----------------------------------------------------------------
     *  helper functions
     *----------------------------------------------------------------*/
     
    function timeOut(){
      oscillateValue();
      oscillator.interval = setTimeout(timeOut, oscillator.options.speed);
    };
    
    function oscillateValue(){
      if (oscillator.dir == 'up'){
        // increment value
        oscillator.value++;
        // if at max value, flip direction
        if (oscillator.value >= oscillator.options.max){
          oscillator.value = oscillator.options.max;
          oscillator.dir   = 'down';
        }
      } else {
        // decrement value
        oscillator.value--; 
        // if at min value, flip direction
        if (oscillator.value <= oscillator.options.min){
          oscillator.value = oscillator.options.min;
          oscillator.dir   = 'up';
        }
      } 
      // call function, if given
      if (typeof func == 'function') func();
    };
  };
})(jQuery);
/**
 * jQuery Oscillator 1.0 - http://www.calebkm.com/github/jquery-oscillator
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
 * http://opensource.org/licenses/MIT
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
    
    // defaults
    var options = $.extend({
      min:   1,    // minimum value & starting value
      max:   100,  // maximum value
      speed: 1000, // increment speed
      start: null, // initial value
      dir:   'up'  // initial increment direction: 'up' or 'down'
    }, options);
    
    // public methods
    //----------------------------------------
    var osc = this;
 
    osc.value = options.start || options.min; 
    
    osc.dir = options.dir;

    osc.start = function(){
      if (!osc.interval) newInterval();
    };
    
    osc.stop = function(){
      clearTimeout(osc.interval);
      osc.interval = null;
    };
    
    osc.toggle = function(){
      if (!osc.interval) osc.start();
      else               osc.stop();
    };
    
    // begin oscillation
    //----------------------------------------
    osc.start();
    
    // helper functions
    //----------------------------------------
    function newInterval(){
      osc.interval = setTimeout(timeOut, options.speed);
    };
     
    function timeOut(){
      callFunc();
      updateValue();
      newInterval();
    };
    
    function updateValue(){
      if (osc.dir == 'up'){
        osc.value++;
        // if at max value, flip direction
        if (osc.value >= options.max){
          osc.value = options.max;
          osc.dir = 'down';
        }
      } else {
        osc.value--; 
        // if at min value, flip direction
        if (osc.value <= options.min){
          osc.value = options.min;
          osc.dir = 'up';
        }
      } 
    };
    
    function callFunc(){
      if (typeof func == 'function') func();
    };
    
  };
  
})(jQuery);
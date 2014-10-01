asyncTest( 'test oscillator;', function() {
  // test start()
  var oscillator = new $.oscillator({start: false, speed: 100});
  var val1 = oscillator.value;
  var val2 = null;
  var val3 = null;
  equal( val1, 0, 'Starting value should be 0.' );
  oscillator.start(); // oscillator is started
  setTimeout(function() {
    val2 = oscillator.value;
    ok( val2 > 0, 'Value should be greater than 0.' );
  }, 400);
  setTimeout(function() {
    val3 = oscillator.value;
    ok( val3 > val2, 'New Value should be greater then first value.' );
  }, 600);

  // test pause()
  var val4 = null;
  var val5 = null;
  setTimeout(function() {
    oscillator.pause(); // oscillator is paused
    val4 = oscillator.value;
    ok( val4 > 0, 'Value should be greater than 0.' );
  }, 800);
  setTimeout(function() {
    val5 = oscillator.value;
    equal( val4, val5, 'Values should be equal.' );
  }, 1200);

  // test toggle()
  var val6 = null;
  var val7 = null;
  setTimeout(function() {
    oscillator.toggle(); // oscillator is restarted
  }, 1400);
  setTimeout(function() {
    oscillator.toggle(); // oscillator should be repaused
    val6 = oscillator.value;
    ok( val6 > val5, 'Value should be greater than previous value.' );
  }, 1600);
  setTimeout(function() {
    val7 = oscillator.value;
    equal( val7, val6, 'Values should be equal.' );
  }, 1800);

  // test stop()
  setTimeout(function() {
    oscillator.stop(); // oscillator is stopped
    val8 = oscillator.value;
    equal( val8, 0, 'Value should be reset to zero')
  }, 2000);
});
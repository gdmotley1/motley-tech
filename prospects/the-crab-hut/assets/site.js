// Phone menu toggle
document.querySelectorAll('.burger').forEach(function (b) {
  b.addEventListener('click', function () {
    var d = document.querySelector('.drawer');
    var open = d.classList.toggle('open');
    b.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
});

// Open now / closed, from the hours on thecrabhutga.com (Milledgeville time)
// Sun & Mon closed. Tue to Thu noon to 9pm. Fri & Sat noon to 10pm.
(function () {
  var HOURS = { 0: null, 1: null, 2: [12, 21], 3: [12, 21], 4: [12, 21], 5: [12, 22], 6: [12, 22] };
  var parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
  var get = function (t) { return (parts.find(function (p) { return p.type === t; }) || {}).value; };
  var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  var now = (parseInt(get('hour'), 10) % 24) + parseInt(get('minute'), 10) / 60;
  var h = HOURS[day];
  var open = !!h && now >= h[0] && now < h[1];
  var clock = function (hr) { return hr === 12 ? 'noon' : (hr > 12 ? hr - 12 : hr) + (hr >= 12 ? 'pm' : 'am'); };
  var msg;
  if (open) {
    msg = 'Open until ' + clock(h[1]);
  } else if (h && now < h[0]) {
    msg = 'Opens today at ' + clock(h[0]);
  } else {
    var names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (var i = 1; i <= 7; i++) {
      var d = (day + i) % 7;
      if (HOURS[d]) { msg = 'Opens ' + (i === 1 ? 'tomorrow' : names[d]) + ' at ' + clock(HOURS[d][0]); break; }
    }
  }
  document.querySelectorAll('[data-open]').forEach(function (el) {
    el.textContent = msg;
    el.classList.toggle('closed', !open);
  });
  document.querySelectorAll('tr[data-day]').forEach(function (tr) {
    if (tr.getAttribute('data-day').split(',').indexOf(String(day)) > -1) tr.classList.add('today');
  });
})();

// Phone order bar: stays out of the way while the hero's own buttons are on screen
(function () {
  var bar = document.querySelector('.sticky');
  var ctas = document.querySelector('.hero .ctas');
  if (!bar || !ctas) return;
  var update = function () {
    var r = ctas.getBoundingClientRect();
    var visible = r.bottom > 0 && r.top < window.innerHeight;
    bar.classList.toggle('hide', visible);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
})();

// Menu tabs follow the section you're reading
(function () {
  var tabs = document.querySelectorAll('.tabs a');
  if (!tabs.length || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      tabs.forEach(function (t) {
        var on = t.getAttribute('href') === '#' + e.target.id;
        t.classList.toggle('on', on);
        if (on) t.parentNode.scrollLeft = t.offsetLeft - 16;
      });
    });
  }, { rootMargin: '-140px 0px -60% 0px' });
  document.querySelectorAll('.cat[id]').forEach(function (s) { io.observe(s); });
})();

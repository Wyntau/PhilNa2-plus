(function(b) {
  var a = b.scrollTo = function(d, e, g) {
      b(window).scrollTo(d, e, g)
    };
  a.defaults = {
    axis: "xy",
    duration: parseFloat(b.fn.jquery) >= 1.3 ? 0 : 1
  };
  a.window = function(d) {
    return b(window).scrollable()
  };
  b.fn.scrollable = function() {
    return this.map(function() {
      var d = this,
        e = !d.nodeName || b.inArray(d.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
      if (!e) {
        return d
      }
      var g = (d.contentWindow || d).document || d.ownerDocument || d;
      return b.browser.safari || g.compatMode == "BackCompat" ? g.body : g.documentElement
    })
  };
  b.fn.scrollTo = function(e, f, d) {
    if (typeof f == "object") {
      d = f;
      f = 0
    }
    if (typeof d == "function") {
      d = {
        onAfter: d
      }
    }
    if (e == "max") {
      e = 9000000000
    }
    d = b.extend({}, a.defaults, d);
    f = f || d.speed || d.duration;
    d.queue = d.queue && d.axis.length > 1;
    if (d.queue) {
      f /= 2
    }
    d.offset = c(d.offset);
    d.over = c(d.over);
    return this.scrollable().each(function() {
      var h = this,
        s = b(h),
        r = e,
        n, l = {},
        m = s.is("html,body");
      switch (typeof r) {
      case "number":
      case "string":
        if (/^([+-]=)?\d+(\.\d+)?(px)?$/.test(r)) {
          r = c(r);
          break
        }
        r = b(r, this);
      case "object":
        if (r.is || r.style) {
          n = (r = b(r)).offset()
        }
      }
      b.each(d.axis.split(""), function(g, p) {
        var t = p == "x" ? "Left" : "Top",
          k = t.toLowerCase(),
          u = "scroll" + t,
          q = h[u],
          o = p == "x" ? "Width" : "Height";
        if (n) {
          l[u] = n[k] + (m ? 0 : q - s.offset()[k]);
          if (d.margin) {
            l[u] -= parseInt(r.css("margin" + t)) || 0;
            l[u] -= parseInt(r.css("border" + t + "Width")) || 0
          }
          l[u] += d.offset[k] || 0;
          if (d.over[k]) {
            l[u] += r[o.toLowerCase()]() * d.over[k]
          }
        } else {
          l[u] = r[k]
        }
        if (/^\d+$/.test(l[u])) {
          l[u] = l[u] <= 0 ? 0 : Math.min(l[u], i(o))
        }
        if (!g && d.queue) {
          if (q != l[u]) {
            j(d.onAfterFirst)
          }
          delete l[u]
        }
      });
      j(d.onAfter);

      function j(g) {
        s.animate(l, f, d.easing, g &&
        function() {
          g.call(this, e, d)
        })
      }
      function i(g) {
        var o = "scroll" + g;
        if (!m) {
          return h[o]
        }
        var p = "client" + g,
          k = h.ownerDocument.documentElement,
          q = h.ownerDocument.body;
        return Math.max(k[o], q[o]) - Math.min(k[p], q[p])
      }
    }).end()
  };

  function c(d) {
    return typeof d == "object" ? d : {
      top: d,
      left: d
    }
  }
})(jQuery);

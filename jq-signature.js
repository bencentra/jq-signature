(function(window, document, $) {
	'use strict';

  // Get a regular interval for drawing to the screen
  window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame || 
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimaitonFrame ||
      function (callback) {
        window.setTimeout(callback, 1000/60);
      };
  })();

  /*
  * Plugin Constructor
  */

  var pluginName = 'jqSignature',
      defaults = {
        lineColor: "#222222",
        lineWidth: 2,
        width: 300,
        height: 100
      },
      canvas = '<canvas></canvas>';

  function Signature(element, options) {
    // DOM elements/objects
    this.element = element;
    this.$element = $(this.element);
    this.canvas = false;
    this.$canvas = false;
    this.ctx = false;
    // Drawing state
    this.drawing = false;
    this.mousePos = {
      x: 0,
      y: 0
    };
    this.lastPos = this.mousePos;
    // Determine plugin settings
    this._data = this.$element.data();
    this.settings = $.extend({}, defaults, options, this._data);
    // Initialize the plugin
    this.init();
  }

  Signature.prototype = {
    init: function() {
      var that = this;
      // Set up the canvas
      this.$canvas = $(canvas).appendTo(this.$element);
      this.$canvas.attr({
        width: this.settings.width,
        height: this.settings.height
      });
      this.$canvas.css({
        boxSizing: 'border-box',
        width: this.settings.width,
        height: this.settings.height,
        border: '1px solid gray',
        cursor: 'crosshair'
      });
      this.canvas = this.$canvas[0];
      this.ctx = this.canvas.getContext("2d");
      this.ctx.strokeStyle = this.settings.lineColor;
      this.ctx.lineWidth = this.settings.lineWidth;
      // Set up mouse events
      this.$canvas.on('mousedown', $.proxy(function(e) {
        this.drawing = true;
        this.lastPos = this._getMousePosition(e);
      }, this));
      this.$canvas.on('mousemove', $.proxy(function(e) {
        this.mousePos = this._getMousePosition(e);
      }, this));
      this.$canvas.on('mouseup', $.proxy(function(e) {
        this.drawing = false;
      }, this));
      // Set up touch events

      // Prevent document scrolling when touching canvas

      // Start drawing
      (function drawLoop() {
        window.requestAnimFrame(drawLoop);
        that._renderCanvas();
      })();
    },
    clearCanvas: function() {
      this.canvas.width = this.canvas.width;
    },
    getDataURL: function() {
      return canvas.toDataURL();
    },
    _getMousePosition: function(mouseEvent) {
      var rect = this.canvas.getBoundingClientRect();
      return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top
      };
    },
    _getTouchPosition: function(touchEvent) {
      var rect = canvasDom.getBoundingClientRect();
      return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
      };
    },
    _renderCanvas: function() {
      if (this.drawing) {
        this.ctx.moveTo(this.lastPos.x, this.lastPos.y);
        this.ctx.lineTo(this.mousePos.x, this.mousePos.y);
        this.ctx.stroke();
        this.lastPos = this.mousePos;
      }
    }
  };

  /*
  * Plugin wrapper and initialization
  */

  $.fn[pluginName] = function ( options ) {
    var args = arguments;
    if (options === undefined || typeof options === 'object') {
      return this.each(function () {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new Signature( this, options ));
        }
      });
    } 
    else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      var returns;
      this.each(function () {
        var instance = $.data(this, 'plugin_' + pluginName);
        if (instance instanceof Signature && typeof instance[options] === 'function') {
          returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
        }
        if (options === 'destroy') {
          $.data(this, 'plugin_' + pluginName, null);
        }
      });
      return returns !== undefined ? returns : this;
    }
  };

})(window, document, jQuery);

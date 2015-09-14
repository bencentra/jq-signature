# jQuery Signature

[![Bower version](https://badge.fury.io/bo/jq-signature.svg)](http://badge.fury.io/bo/jq-signature)

jQuery plugin for creating touch-friendly signature fields using the HTML5 canvas. 

Check out [the demo][demo]!

## Usage

Include `jq-signature.js` (development) or `jq-signature.min.js` (production) on your webpage. 

You can also install it via Bower: `bower install jq-signature`.

For complete usage instructions, check out the [demo page][demo].

## Development

### Setup

First and foremost, make sure you have Node.js and npm installed.

Next, install Grunt and other dependencies:

```bash
npm install -g grunt grunt-cli bower
npm install
bower install
```

You can develop locally using the following commands:

```bash
grunt build # Create the minified JavaScript file
grunt serve # Run the demo page in a local webserver
```

### Contributing

1. Fork/clone the repository
2. Make your changes. Be sure to run `grunt build` to create the minified JavaScript!
3. Open a pull request, and I'll review it.

## License

MIT.

[demo]: http://bencentra.github.io/jq-signature/

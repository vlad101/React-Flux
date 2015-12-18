$ = jQuery = require('../node_modules/jquery/dist/jquery.min.js');
var React = require('react');
var Header = require('./components/common/header');
var Home = require('./components/homePage');
var About = require('./components/about/aboutPage');
var Authors = require('./components/authors/authorPage');

(function(win) {
	"use strict";
	var App = React.createClass({
		render: function() {
			var Child;

			switch(this.props.route) {
				case 'about': 
					Child = About;
					break;
				case 'authors': 
					Child = Authors;
					break;
				default:
					Child = Home;
			}

			return (
					<div>
						<Header />
						<Child />
					</div>
			);
		}
	});

	function render() {
		var route = window.location.hash.substr(1);
		React.render(<App route={route} />, document.getElementById('app'));
	}

	// URL event listens for a hash change in the URL
	win.addEventListener('hashchange', render);
	render();
})(window);
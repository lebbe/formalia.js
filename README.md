formalia.js
===========

formalia.js remembers what your users wrote into the forms of your web-pages, in case they get lost and come back again. For instance, if a user starts typing into the form, the browser crash, and he have to start fill in the form again, the fields will be populated with his previous intended input.



This is a jQuery plugin, use it like this:

> $(selector).formalia();

The plugin uses the form NAME and ID attributes to identify them. It caches form content on onchange events within localStorage.

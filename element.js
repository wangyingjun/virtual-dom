function Element (tagName, props, children){
	if(!(this instanceof Element)){
		return new Element(tagName, props, children);
	}
	this.tagName = tagName;
	this.props = props;
	this.children = children;

	var count = 0;

	foreach(children, function(child, i){
		if(child instanceof Element){
			count += child.count
		} else {
			children[i] = '' + child
		}
		count++;
	})
	this.count = count;
	console.log(tagName + ':' +count)
}
Element.prototype.render = function(){
	var el = document.createElement(this.tagName);
	var props = this.props;
	for(var propName in props){
		var propValue = props[propName];
		el.setAttribute(propName, propValue)
	}

	var children = this.children || [];
	foreach(children, function(child, i){
		var childEl = (child instanceof Element)
			? child.render()
			: document.createTextNode(child)
		el.appendChild(childEl)
	})
	return el;
}
function foreach(arr, cb){
	var i, l = arr.length;
	for(i=0; i<l; i++){
		cb && cb(arr[i], i)
	}
}
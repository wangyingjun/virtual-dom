var tokenType = {
	'TAG_START': 1

}

function Token(input){
	this.input = input;
	this.index = 0;
	this.content = null;
}

var prototype = Token.prototype;

prototype.nextToken = function(){
	this.clearSpaces();
	return (
		this.checkTagStart() ||
		{}
	)
}
prototype.checkToken = function(){

}
prototype.checkTagStart = function(){
	if(this.getCurrentChar() === '<'){
		this.index++;
		this.clearSpaces();
		var startIndex = this.index;

		var tagNameReg = /[\w\d]/;
		while(tagNameReg.test(this.getCurrentChar())){
			this.index++;
		}

		var tagName = this.input.slice(startIndex, this.index);
		this.content = tokenType['TAG_START'];

		return {
			type: tokenType['TAG_START'],
			name: tagName
		}
	}
}
prototype.checkTagAttrName = function(){
	if(this.checkCurrentContent('TAG_START') && this.getCurrentChar()){
		this.clearSpaces();
		var startIndex = this.index;

		var attrReg = /[\w\d\-]/;
		//while(attrReg.test())
	}
}
prototype.clearSpaces = function(){
	var spaceReg = /\s/;
	while(spaceReg.test(this.getCurrentChar())){
		this.index++;
	}
}
prototype.getCurrentChar = function(){
	return this.input[this.index]
}
prototype.checkCurrentContent = function(content){
	return this.content === content;
}
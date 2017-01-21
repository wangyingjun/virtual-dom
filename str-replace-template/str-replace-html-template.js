/*
**	简单html模板引擎
**	通过匹配字符串的方式替换功能代码
**	导出html字符串
 */
class HtmlTamplate{
	constructor(tamplate){
		this.tpl = tamplate;
		this.init();
	}
	init(){
		// str = '';
		// str.push(xxx)
		// 
		this.tplStr = 'var str = [];';

		var reg = /<%([^%>]*)%>/g;

		var index = 0;
		var exec;

		while(exec = reg.exec(this.tpl)){
			this.addPush(this.tpl.slice(index, exec.index));
			this.addState(exec[1]);
			index = exec.index+exec[0].length;
		}
		this.addPush(this.tpl.slice(index, this.tpl.length));
		this.tplStr += 'return str.join("");'
		console.log(this.tplStr)
		this.fn = new Function(this.tplStr);
	}
	addPush(str){
		this.tplStr += 'str.push("'+ str.replace(/"/g, '\\"')+'");';
	}
	addState(str){
		var regJs = /(if|else|switch|break|for|continue|case|\{|\})/g;
		console.log('addState:'+str)
		this.tplStr += regJs.exec(str) ? str + '\n' : 'str.push('+ str+');';
		// this.tplStr += str.replace(/"/g, '\\"')+';';
	}
	render(data){
		console.log(this.fn)
		return this.fn.apply(data);
	}
}

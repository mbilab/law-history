$(document).ready(function(){
	$.getJSON("law_history.json", function(law_history){ 
		revision = law_history.revision; 
		diffString(revision);
	});
	function diffString(revision){
		for(var k=0; k<revision.length-1; k++){
			var obj_n = revision[k+1].content;
			for(var key in obj_n){
				num_n =	obj_n[key];
				article_n = revision[k+1].content[num_n.num].article.split("");
				var date = revision[k+1].date;
				if(revision[0].content[num_n.num] == null){
					article_o = "";
					var out = diff(article_o,article_n);
					var str = "";
					for(var m=0; m < out[1].length; m++){
						if(m==0)
							str += '<ins>';
						str += out[1][m];
						if(m==out[1].length-1)
							str += "</ins>";
					}
					console.log(num_n.num);
					console.log(date);
					console.log(str);
					continue;
				}
				else {
					article_o = revision[0].content[num_n.num].article.split("");
				}
				var out = diff(article_o,article_n);
				var str = "";
				var i = 0;
				if(out[0].length > out[1].length){
					for(var i=0; i < out[0].length; i++){
						if(i < out[1].length){
							if(out[1][i].text == null){
								var tmp = i;
								for(var j = tmp; j < out[1].length; j++){
									if(tmp == j)
										str += '<del>';
									str += out[0][j];
									if(out[0][j+1].text != null || j==out[1].length-1){
										str += "</del>";
										i=j;
										break;
									}
								}
								for(var j = tmp; j < out[1].length; j++){
									if(tmp==j)
										str += '<ins>';
									str += out[1][j];
									if(out[0][j+1].text != null || j==out[1].length-1){
										str += "</ins>";
										i=j;
										break;
									}
								}
							}
							else {
								for(var j = i ;j < out[1].length; j++){
									str += out[0][j].text;
									if(out[0][j+1].text == null || j==out[1].length-1){
										i=j;
										break;
									}
								}
							}
						}
						else{
							for(var j =i; j < out[0].length; j++){
								if(j==i)
									str += '<del>';
								str += out[0][j];
								if(j==out[0].length-1){
									str += "</del>";
									i=j;
									break;
								}
							}
						}
					}
				}	
				else{
					for(var i=0; i < out[1].length; i++){
						if(i < out[0].length){
							if(out[0][i].text == null){
								var tmp = i;
								for(var j = tmp; j < out[0].length; j++){
									if(tmp == j)
										str += '<del>';
									str += out[0][j];
									if(out[1][j+1].text != null || j==out[0].length-1){
										str += "</del>";
										i=j;
										break;
									}
								}
								for(var j = tmp; j < out[0].length; j++){
									if(tmp==j)
										str += '<ins>';
									str += out[1][j];
									if(out[1][j+1].text != null || j==out[0].length-1){
										str += "</ins>";
										i=j;
										break;
									}
								}
							}
							else{
								for(var j = i ;j < out[0].length; j++){
									str += out[0][j].text;
									if(out[1][j+1].text == null || j==out[0].length){
										i=j;
										break;
									}
								}
							}
						}
						else{
							for(var j =i; j < out[1].length; j++){
								if(j==i)
									str += '<ins>';
								str += out[1][j];
								if(j==out[1].length-1){
									str += "</ins>";
									i=j;
									break;
								}
							}
						}
					} 
				}
				console.log(num_n.num);
				console.log(date);
				console.log(str);
			}
		}
	}

	function diff(o,n){
		for(var i=0; i < o.length; i++){
			if(o[i] == n[i])
				o[i] = {text: o[i], rows: i};	
			else
				o[i] = o[i];
		}
		for(var i=0; i < n.length; i++){
			if(i < o.length){
				if(o[i].text != null && o[i].rows == i)
					n[i] = {text: n[i], rows: i};
				else
					n[i] = n[i];
			}
			else 
				n[i] = n[i];
		}
		console.log(o);
		console.log(n);
		return [o,n] ;
	}
})


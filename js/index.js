$(document).ready(function(){
	$.getJSON("law_history.json", function(law_history){ 
		revision = law_history.revision; 
		diffString(revision);
	});
	/*	function randomColor() {
		return "rgb(" + (Math.random() * 100) + "%, " + 
		(Math.random() * 100) + "%, " + 
		(Math.random() * 100) + "%)";
		}*/
		function diffString2(o,n){
			var out = diff(o,n);
			var str = "";
			if(out.n.length == 0){
				for (var i = 0; i < out.o.length; i++){
					str += '<del>' + out.o[i] + "</del>";
				}
			}
			else {
				if (out.n[0].text == null){
					for (n = 0; n < out.o.length && out.o[n].text == null; n++){
						str += '<del>' + out.o[n] + "</del>";
					}
				}
				for(var i = 0; i < out.n.length; i++){
					if(out.n[i].text == null){
						str += '<ins>'+ out.n[i] + "</ins>";
					}
					else {
						var pre = "";
						for (n = out.n[i].row + 1; n < out.o.length && out.o[n].text == null; n++){
							pre += '<del>' + out.o[n] + "</del>";
						}
						str += out.n[i].text + pre;
					}
				}
			} 
			// return str;
		}
		function diffString(revision){
			for(var k=0; k<revision.length-1; k++){
				var obj_n = revision[k+1].content;
				for(var key in obj_n){
					num_n =	obj_n[key];
					article_n = revision[k+1].content[num_n.num].article.split("");
					var date = revision[k+1].date;		
					if(revision[0].content[num_n.num] == null){
						article_o = "";
						console.log(num_n.num);
						diffString2(article_o, article_n);
						continue;
					}
					else
						article_o = revision[0].content[num_n.num].article.split("");
					console.log(num_n.num);
					diffString2(article_o, article_n);	
				}
			}
		}
		function diff( o, n ) {
			var ns = new Object();
			var os = new Object();
			console.log(o);
			for ( var i = 0; i < n.length; i++ ) {
				if ( ns[ n[i] ] == null )
					ns[ n[i] ] = { rows: new Array(), o: null };
				ns[ n[i] ].rows.push( i );
			}
			for ( var i = 0; i < o.length; i++ ) {
				if ( os[ o[i] ] == null )
					os[ o[i] ] = { rows: new Array(), n: null };
				os[ o[i] ].rows.push( i );
			}
			for ( var i in ns ) {
				if ( ns[i].rows.length == 1 && typeof(os[i]) != "undefined" && os[i].rows.length == 1 ) {
					n[ ns[i].rows[0] ] = { text: n[ ns[i].rows[0] ], row: os[i].rows[0] };
					o[ os[i].rows[0] ] = { text: o[ os[i].rows[0] ], row: ns[i].rows[0] };
				}
			}
			for ( var i = 0; i < n.length - 1; i++ ) {
				if ( n[i].text != null && n[i+1].text == null && n[i].row + 1 < o.length && o[ n[i].row + 1 ].text == null && 
				n[i+1] == o[ n[i].row + 1 ] ) {
					n[i+1] = { text: n[i+1], row: n[i].row + 1 };
					o[n[i].row+1] = { text: o[n[i].row+1], row: i + 1 };
				}
			}
			for ( var i = n.length - 1; i > 0; i-- ) {
				if ( n[i].text != null && n[i-1].text == null && n[i].row > 0 && o[ n[i].row - 1 ].text == null && 
				n[i-1] == o[ n[i].row - 1 ] ) {
					n[i-1] = { text: n[i-1], row: n[i].row - 1 };
					o[n[i].row-1] = { text: o[n[i].row-1], row: i - 1 };
				}
			}
			return { o: o, n: n };
		}
})



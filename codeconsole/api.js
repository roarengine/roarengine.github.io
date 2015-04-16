
var APIDOC = 
{

	splitURL: function()
	{
		var s = window.location.href;

		var core = s.split('#');
		
		if ((core[1]!='')&&(core[1]!=undefined))
		{
			var bits = core[1].split('/');

			// Check for serverchunk
			if (core[1].indexOf('server:') >= 0)
			{
				var scc = core[1].split(':');
				if (APIDOC.findServerChunk( scc[1] ))
				{
					$('#docs-overview').hide(); $('#docs-block').show();
					APIDOC.showServerDocs( scc[1] );
				}
				else reloadr();
			}
			else if (APIDOC.findActionInfo(bits[0], bits[1]) != null)
			{
				$('#docs-overview').hide(); $('#docs-block').show();
				APIDOC.showDocs( bits[0], bits[1]);
			} 
			else reloadr();
		}
		
		function reloadr() 
		{ 
			window.location = '/developers/api/current/'; 
		}

	},
	
	showDocs : function(ct, nm)
	{
		var obj = APIDOC.findActionInfo( ct, nm );
		//log(obj);
		$('#docs-block')
			// .empty()
			.append('<a name="'+ct+nm+'"></a><div id="api_'+ct+'_'+nm+'" class="apicall"><h2>/'+ct+'/<strong>'+nm+'</strong></h2><p></p></div>');

		$('#api_'+ct+'_'+nm+ ' p')
			.append( obj.brief + '<br/>')
			.append( obj.docs );
			
		if ('p' in obj)
		{
			$('#api_'+ct+'_'+nm).append( '<strong>Parameters:</strong><br>' );
			for (pi in obj.p)
			{
				$('#api_'+ct+'_'+nm).append( '<strong>'+obj.p[pi].id+'</strong>: '+obj.p[pi].docs+'<br>' );
			}
			$('#api_'+ct+'_'+nm).append('<br>');
		}
		
		// Draw 'return' values
		if ('returns' in obj) 
		{ 
			$('#docs-block').append('<div>Returns:'+obj.returns+'</div><br/>' ); 
		}
		
		
		// Draw examples
		if( 'examples' in obj )
		{
			var examples_str = "";
			for( ei in obj.examples )
			{
				var e = obj.examples[ei];
				var n = $('<div class="example"></div>');
				n.append( $("<h5>Example: "+e.title+"</h5>") );
				var n_body = $('<div class="example_body"></div>');
				var npre = $('<pre class="prettyprint lang-xml"></pre>');
				npre.text( e.code ).html();
				n_body.append( npre );
				n.append(n_body);
				$('#docs-block').append(n);
			}
			// prettyPrint();
		}
	}, // end showDocs
	
	
	showServerDocs : function( sv )
	{
		var obj = APIDOC.findServerChunk( sv );

		$('#docs-block')
			// .empty()
			.append('<a name="server:'+obj.name+'"></a>')
			.append('<div><h2>'+obj.name+'</h2></div>')
			.append('<div class="server-maintext">'+obj.docs+'</div>');
			
		if( 'examples' in obj )
		{
			var examples_str = "";
			for( ei in obj.examples )
			{
				var e = obj.examples[ei];
				var n = $('<div class="example"></div>');
				n.append( $("<h5>Example: "+e.title+"</h5>") );
				var n_body = $('<div class="example_body"></div>');
				var npre = $('<pre class="prettyprint lang-xml"></pre>');
				npre.text( e.code ).html();
				n_body.append( npre );
				n.append(n_body);
				$('#docs-block').append(n);
			}
			prettyPrint();
		}
	},
	
	
	findActionInfo : function( curclass, action )
	{
		var ax;
		for (ax in controllers[curclass]) 
		{ 
			if (controllers[curclass][ax].name == action)
			{
				return controllers[curclass][ax];
			}
		}
		return null;
	},
	
	findServerChunk : function( svname )
	{
		var ax;
		for (ax in chunks) 
		{ 
			if (chunks[ax].name == svname)
			{
				return chunks[ax];
			}
		}
		return null;
	},
	
	
	load : function()
	{
		try
		{
			$('.api-controller-block strong').live('click', function(){
				$(this).next().slideToggle()
			})
			// Check our gear is present
			if (typeof controllers == 'undefined') throw 'No controllers documentation loaded. Aborting.';
			if (typeof chunks == 'undefined') throw 'No server documentation loaded. Aborting.';


			// Controller API calls
			for( var ct in controllers)
			{
				$('#docs-block').append('<hr><h1>'+ct+'</h1>')
				var blstr = '<div class="api-controller-block"><strong>'+ct+'</strong><ul>';
				for(var ax in controllers[ct]) 
				{ 
					var obj = controllers[ct][ax];
					var nm = obj.name;
					this.showDocs( ct, nm )


					blstr += '<li><a href="#'+ct+nm+'" class="api-link" id="link-'+ct+'-'+nm+'">'+nm+'</a></li>';
				}
				blstr += '</ul></div>';
				$('#api-callindex').append(blstr);
			}

			// Server responses
			$('#docs-block').append('<hr><h1><b>Server blocks</b></h1>')
			for( var sv in chunks)
			{
				$('#api-serverindex')
					.append('<div><a href="#server:'+chunks[sv].name+'" class="server-link" id="sv-'+chunks[sv].name+'">'+chunks[sv].name+'</a></div>');
				this.showServerDocs( chunks[sv].name )
			}
			$('#api-serverindex').append('<br/><br/>');

			// APIDOC.splitURL();
			
		}
		catch(e)
		{
		
		}
	}
}






$(document).ready( function(){ APIDOC.load();  });

var console_curclass = 'game';
var console_curactionIndex = 0;
var console_baseURL = '';
var console_auth = '';

$(document).ready( function(){

  // Watch the BaseURL reference
  $('.cc-config input').val( console_baseURL ).change(function(){
    console_baseURL = $(this).val();
  });


  //Fill the combo box.
  for( var ct in controllers)
  {
    $("<option value=\""+ct+"\">"+ct+"</option>").appendTo('#cc-controller');
  }


  $('#cc-fetchscriptlog').click( function(e){
    e.preventDefault();

    url = RoarCore.api_path+'/log/scriptlog/'+RoarCore.active_game;

    if (!RoarCore.auth_token) return alert('No auth_token. Please relogin.');

    $.ajax({
      data: {auth_token:RoarCore.auth_token},
      url:url,
      type:'POST',
      success: function(data){

        var parsed = typeof data === "string"
          ? JSON.parse( data )
          : data

        if (!parsed.data) return alert('Failed to load scriptlog');

        var html = '<ul class="cc-scriptlog">';
        for( var i = 0; i < parsed['data'].length; i++ )
        {
          html += '<li>' + parsed['data'][i] + '</li>';
        }
        html += '</ul>';

        $('#codeblock').show();
        $('#codeblock').html('<h2>Last 250 entries from scripting log</h2>');
        $('#codeblock').append(html);
        prettyPrint();
      },

      error: function(data) { alert('Failed AJAX call to scriptlog'); }
    });
  });



  $('#cc-submit').click( function(e){
    e.preventDefault();

    $('#cc-urltag').text( console_baseURL );

    var controller = $('#cc-controller').val();
    var action = $('#cc-action').val();

    var apicall = console_baseURL+'/'+controller+'/'+action+'/';

    var poster = {}
    poster['auth_token'] = $('#cc-authtoken').val();

    for (var ax in controllers[console_curclass])
    {
      if (controllers[console_curclass][ax].name == $('#cc-action').val())
      {
        var str = '';
        for (var param in controllers[console_curclass][ax].p)
        {
          var p = controllers[console_curclass][ax].p[param];
          poster[p.id] = $('#form-param-'+p.id).val();
        }
      }
    }

    // UI display for path being called
    setPath();

    $.ajax({
      url: apicall,
      type: 'POST',
      data: poster,
      dataType: 'text',
      success: function(data){
        checkForconsole_authToken(data);
        $('#cc-loc').show();
        $('#codeblock').show();
        $('#codeblock').text( data ).html();
        prettyPrint();
      },
      error: function(data) { alert('Failed AJAX call to game server.'); }
    });
  });

  function checkForconsole_authToken( xml )
  {
    // Ensure the returning data is in a 'string' format
    if (typeof xml !== 'string') return
    // Ensure it's XML from the server
    if (xml.charAt(0) !== '<') return

    // Then look for an `auth_token` in the XML
    if ( $(xml).find('auth_token').length!=0 )
    {
      $('#cc-authtoken').val( $(xml).find('auth_token').text() );
    }
  }

  function drawOptions()
  {
    var options = '';
    var stepped = false;
    for(var ax in controllers[console_curclass])
    {
      var nm = controllers[console_curclass][ax].name;
      if (!stepped) { $('.actn').text( nm ); drawDocs( nm ); }
      stepped = true;
      options += '<option value="'+nm+'">'+nm+'</option>';
    }
    $('#cc-action').html(options);
    drawParams( $('#cc-action').val() );
  }

  function findActionInfo( action )
  {
    var ax;
    for (ax in controllers[console_curclass])
    {
      if (controllers[console_curclass][ax].name == action)
      {
        return controllers[console_curclass][ax];
      }
    }
    return null;
  }

  function drawParams( action )
  {
    info = findActionInfo( action );
    str="";
    if( info!=null )
    {
      for (var param in info.p)
      {
        var p = info.p[param];
        str += '<h5>'+p.id+'</h5>'+p.docs+'<br/>'
        if( info.codeconsole != 'nouse' )
        {
          str += '<input type="text" id="form-param-'+p.id+'" name="'+p.id+'" /><br/>';
        }
        else { str+='<div style="color:#f00;">Can not call from codeconsole</div><br/>'; }
        str += '<br/>';
      }
    }
    else if( info.codeconsole == 'nouse' )
    {
      str+='<div style="color:#f00;">Can not call from codeconsole</div><br/>';
    }
    $('.cc-paramsbox').html( str );
  }

  function drawDocs( action )
  {
    info = findActionInfo( action );
    if( info==null ) { return; }
    docs = '<b>'+info.brief+'</b><br/>';
    docs += info.docs;
    if( 'returns' in info )
    {
      docs += '<div class="returns"><h3>Returns</h3>' + info.returns + '</div>';
    }

    $('#cc-docbox').html( docs );

    $('#cc-examples').empty();
    if( 'examples' in info )
    {
      var examples_str = "";
      for( ei in info.examples )
      {
        var e = info.examples[ei];
        var n = $('<div class="example"></div>');
        n.append( $("<h5>Example: "+e.title+"</h5>") );
        var n_body = $('<div class="example_body"></div>');
        var npre = $('<pre class="prettyprint lang-xml"></pre>');
        npre.text( e.code ).html();
        n_body.append( npre );
        n.append(n_body);
        $('#cc-examples').append(n);
      }
      prettyPrint();
    }
  }

  function setPath()
  {
    $('.context').text( console_curclass );
    $('.acttext').text( $('#cc-action').val() );
  }

  $('#cc-controller').change( function(e){
    e.preventDefault();
    console_curclass= $(this).val();
    drawOptions();
    $('.cntrlr').text( $(this).val() );
    //setPath();
  });

  $('#cc-action').change( function(e){
    e.preventDefault();
    drawParams( $(this).val() );
    drawDocs( $(this).val() );
    $('.actn').text( $(this).val() );
    //setPath();
  });

  $('#cc-controller').val('user').change();
  $('#cc-action').val('login').change();


  for( var sci in chunks )
  {
    var sc = chunks[sci];
    $('#serverchunks').append( $('<h2>'+sc.name+'</h2>' ) );
    $('#serverchunks').append( $( sc.docs ) );
    for( ei in sc.examples )
    {
      var e = sc.examples[ei];
      var n = $('<div class="example"></div>');
      n.append( $("<h5>Example: "+e.title+"</h5>") );
      var n_body = $('<div class="example_body"></div>');
      var npre = $('<pre class="prettyprint lang-xml"></pre>');
      npre.text( e.code ).html();
      n_body.append( npre );
      n.append(n_body);
      $('#serverchunks').append(n);
    }
  }
  prettyPrint();

});

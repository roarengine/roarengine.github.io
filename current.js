var controllers = new Object;


controllers['info'] = [];
controllers['info'].push( {
  name:'ping',
  p:[

  ],
  brief:'Check if the game is responsive.',
  docs:'<p>This method should just return a dummy "Hello" message if the server is operational.</p><para/>',
  examples:[ { title:'expected response', code:'<roar tick="128455529480">\n  <info>\n    <ping status="ok">\n      <text>hello</text>\n    </ping>\n  </info>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['info'].push( {
  name:'user',
  p:[
    { id:'id', docs:'The id of the player to get information about.' }
  ],
  brief:'Get publicly available info on the specified user.',
  docs:'<p>Returns a subset of the information known publicly about a given user.</p><p>This is designed to be used to augment leaderboards, friends lists and other similar public constructs.</p><p>n.b. the call only returns an item if it is currently equipped.</p><para/>',
  examples:[ { title:'success', code:'<roar tick="125555539430">\n  <info>\n    <user status="ok">\n      <attribute ikey="id" value="2059428086" type="special"/>\n      <attribute ikey="xp" value="0" type="special"/>\n      <attribute ikey="level" value="1" type="special"/>\n      <attribute ikey="facebook_uid" value="0" type="special"/>\n      <attribute ikey="name" value="foo" type="special"/>\n      <attribute ikey="attack" value="10" type="core"/>\n      <attribute ikey="defence" value="10" type="core"/>\n      <attribute ikey="hit" value="10" type="core"/>\n      <attribute ikey="avoid" value="10" type="core"/>\n      <attribute ikey="hp_regen_rate" value="1" type="core"/>\n      <attribute ikey="health_max" value="100" type="core"/>\n      <attribute ikey="energy_max" value="20" type="core"/>\n      <attribute ikey="stamina_max" value="5" type="core"/>\n      <attribute ikey="health" value="100" type="resource"/>\n      <attribute ikey="energy" value="20" type="resource"/>\n      <attribute ikey="stamina" value="5" type="resource"/>\n      <attribute ikey="profile_points" value="0" type="currency"/>\n      <attribute ikey="cash" value="100" type="currency"/>\n      <attribute ikey="premium_currency" value="5" type="currency"/>\n    </user>\n  </info>\n</roar>\n' }, { title:'invalid player', code:'<roar tick="128455548872">\n  <info>\n    <user status="error">\n      <error type="0">Player does not exist</error>\n    </user>\n  </info>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['info'].push( {
  name:'poll',
  p:[

  ],
  brief:'Periodic check for user updates.',
  docs:'<p>A light function that can be called periodically to obtain changes to the logged in user, checking for server block updates.</p>',
  examples:[ { title:'success', code:'<roar tick="125555756627">\n  <info>\n    <poll status="ok"/>\n  </info>\n  <!--Updates for poll (if any) return in the server block-->\n  <server>\n    <update type="resource" ikey="mojo" value="78"/>\n  </server>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['info'].push( {
  name:'get_bulk_player_info',
  p:[
    { id:'admin_token', docs:'Token identifying the call as coming from an admin (set in dashboard)' },
    { id:'player_ids', docs:'ids of the target users' },
    { id:'stats', docs:'The ikeys of the stats to return' },
    { id:'properties', docs:'The ikeys of the properties to return' }
  ],
  brief:'Get info about multiple players at once.',
  docs:'<p>UNDOCUMENTED</p>',
  examples:[ { title:'success', code:'<roar tick="130081353655">\n  <info>\n    <get_bulk_player_info status="ok">\n      <player_info id="748994158">\n        <stats>\n          <stat ikey="health" value="100"/>\n          <stat ikey="cash" value="10"/>\n        </stats>\n        <properties>\n          <property ikey="player_bio" value="Scary hobo dude"/>\n        </properties>\n      </player_info>\n      <player_info id="1706065893">\n        <stats>\n          <stat ikey="health" value="80"/>\n          <stat ikey="cash" value="100"/>\n        </stats>\n        <properties>\n          <property ikey="player_bio" value="Some punk"/>\n        </properties>\n      </player_info>\n    </get_bulk_player_info>\n  </info>\n</roar>\n' } ],
  codeconsole:'yes'
  } );


controllers['leaderboards'] = [];
controllers['leaderboards'].push( {
  name:'list',
  p:[

  ],
  brief:'Lists all current leaderboards.',
  docs:'<p>Returns a list of all the leaderboards associated with the game.</p><para/>',
  examples:[ { title:'Success', code:'<roar tick="0">\n  <leaderboards>\n    <list status="ok">\n      <board board_id="4001" ikey="premium_currency" label="Super Coins"/>\n      <board board_id="4002" ikey="mojo" label="Mojo"/>\n      <board board_id="4003" ikey="notoriety" label="Notoriety"/>\n    </list>\n  </leaderboards>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['leaderboards'].push( {
  name:'view',
  p:[
    { id:'board_id', docs:'The unique key for the leaderboard you wish to show' },
    { id:'num_results', docs:'(optional - Default 100) How many results to return (length of the board, eg. Top 5, 25, 100, etc)' },
    { id:'offset', docs:'(optional - Default 0) Which rank to start the leaderboard from' },
    { id:'page', docs:'(optional - Default 1) Which page of results to return' },
    { id:'low_is_high', docs:'true or false, true returns low score as higher rank' },
    { id:'player_id', docs:'optionally include this players ranking in the result' },
    { id:'ids', docs:'(optional - Default null) Array of player_ids (comma separated with NO spaces) to build the leaderboard from (can be a list of friends, enemies, guild, etc)' }
  ],
  brief:'View the leaderboard details.',
  docs:'<p>Shows the top 100 users with their associated leaderboard ranking and value for the given leaderboard. Leaderboard calls do not require authentication, and so can be called from any device/platform/website.</p><para/>',
  examples:[ { title:'Success', code:'<roar tick="0">\n  <leaderboards>\n    <view status="ok">\n      <ranking ikey="mojo" offset="0" num_results="100" page="1" low_is_high="false">\n        <entry rank="1" player_id="612421456098" value="560"/>\n        <custom>\n          <property ikey="player_name" value="Monkey"/>\n        </custom>\n        <entry rank="2" player_id="195104156933" value="514"/>\n        <custom>\n          <property ikey="player_name" value="Dragon"/>\n        </custom>\n        <entry rank="3" player_id="440312985759" value="490"/>\n        <custom>\n          <property ikey="player_name" value="Fun and Awesome DUUUUUDE"/>\n        </custom>\n      </ranking>\n    </view>\n  </leaderboards>\n</roar>\n' }, { title:'Leaderboard does not exist', code:'<roar tick="0">\n  <leaderboards>\n    <view status="error">\n      <error type="0">Invalid board_id</error>\n    </view>\n  </leaderboards>\n</roar>\n' } ],
  codeconsole:'yes'
  } );


controllers['google'] = [];
controllers['google'].push( {
  name:'friends',
  p:[

  ],
  brief:'Pulls a list of the users google+ contacts.',
  docs:'<p>This function returns a list of the user\'s G+ contacts, and adds additional information about those users who are already playing the game and returns the whole lot.</p>',
  examples:[ { title:'Success', code:'<roar tick="128455369786">\n  <google>\n    <friends status="ok">\n      <!--"Mashton" is already playing this game and has an \'id\' we can use-->\n      <friend gplus_name="Mashton Groober" gplus_id="51151277315" name="Mashton" id="7877788777"/>\n      <!--These other two friends are not playing this game (no \'id\' or \'name\')-->\n      <friend gplus_name="Jumpy Maxton" gplus_id="529465555"/>\n      <friend gplus_name="Ami Jones" gplus_id="523055555"/>\n    </friends>\n  </google>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['google'].push( {
  name:'bind_user',
  p:[
    { id:'code', docs:'Google oauth2 code for the user' },
    { id:'google_client_id', docs:'Oprional google client id to be used with this code.' }
  ],
  brief:'Binds an existing user account to a google account.',
  docs:'<p>Binds an existing user account to a google account.</p>',
  examples:[ { title:'Success', code:'<roar tick="128455369786">\n  <google>\n    <bind_user status="ok"/>\n  </google>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['google'].push( {
  name:'bind_user_token',
  p:[
    { id:'token', docs:'Google oauth2 code for the user' }
  ],
  brief:'Binds an existing user account to a google account.',
  docs:'<p>Binds an existing user account to a google account.</p>',
  examples:[ { title:'Success', code:'<roar tick="128455369786">\n  <google>\n    <bind_user status="ok"/>\n  </google>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['google'].push( {
  name:'create_user',
  p:[
    { id:'code', docs:'Google oauth2 code for the user' },
    { id:'name', docs:'Playes name' },
    { id:'google_client_id', docs:'Oprional google client id to be used with this code.' }
  ],
  brief:'Creates a new user account using a Google oauth2 code.',
  docs:'<p>Creates a new user based upon the name and the Google oauth2 code. User gets their own inventory, stats, achievements, etc.</p>',
  examples:[ { title:'Success', code:'<roar tick="128455369786">\n  <google>\n    <create_user status="ok">\n      <auth_token>ABCDEF</auth_token>\n      <player_id>1231231</player_id>\n    </create_user>\n  </google>\n</roar>\n' }, { title:'player already exists', code:'<roar tick="128455436426">\n  <google>\n    <create_user status="error">\n      <error type="0">Player already exists</error>\n    </create_user>\n  </google>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['google'].push( {
  name:'create_user_token',
  p:[
    { id:'token', docs:'Google oauth2 token for the user' },
    { id:'name', docs:'Playes name' }
  ],
  brief:'Creates a new user account using a Google oauth2 code.',
  docs:'<p>Creates a new user based upon the name and the Google oauth2 code. User gets their own inventory, stats, achievements, etc.</p>',
  examples:[ { title:'Success', code:'<roar tick="128455369786">\n  <google>\n    <create_user status="ok">\n      <auth_token>ABCDEF</auth_token>\n      <player_id>1231231</player_id>\n    </create_user>\n  </google>\n</roar>\n' }, { title:'player already exists', code:'<roar tick="128455436426">\n  <google>\n    <create_user status="error">\n      <error type="0">Player already exists</error>\n    </create_user>\n  </google>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['google'].push( {
  name:'login_or_create_user',
  p:[
    { id:'code', docs:'Google oauth2 code for the user' },
    { id:'google_client_id', docs:'Oprional google client id to be used with this code.' }
  ],
  brief:'Logs in or creates a new user account using a Google oauth2 code.',
  docs:'<p>If a player exists for the given code, they are logged in. Otherwise a new player is created based on the Google oauth2 code. A new player gets a random string as their name, which can be changed later.</p>',
  examples:[ { title:'Success', code:'<roar tick="128455369786">\n  <google>\n    <login_or_create_user status="ok">\n      <auth_token>ABCDEF</auth_token>\n      <player_id>1231231</player_id>\n      <mode>create</mode>\n    </login_or_create_user>\n  </google>\n</roar>\n' }, { title:'An error', code:'<roar tick="128455436426">\n  <google>\n    <login_or_create_user status="error">\n      <error type="0">Some Error</error>\n    </login_or_create_user>\n  </google>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['google'].push( {
  name:'login_user',
  p:[
    { id:'code', docs:'Google oauth2 code for the user' },
    { id:'google_client_id', docs:'Oprional google client id to be used with this code.' }
  ],
  brief:'Creates a new user account using a Google oauth2 code.',
  docs:'<p>Creates a new user based upon the name and the Google oauth2 code. User gets their own inventory, stats, achievements, etc.</p>',
  examples:[ { title:'Success', code:'<roar tick="128455369786">\n  <google>\n    <login_user status="ok">\n      <auth_token>ABCDEF</auth_token>\n      <player_id>1231231</player_id>\n    </login_user>\n  </google>\n</roar>\n' }, { title:'An error', code:'<roar tick="128455436426">\n  <google>\n    <login_user status="error">\n      <error type="0">Some Error</error>\n    </login_user>\n  </google>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['google'].push( {
  name:'login_user_token',
  p:[
    { id:'token', docs:'Google oauth2 token for the user' }
  ],
  brief:'Creates a new user account using a Google oauth2 code.',
  docs:'<p>Creates a new user based upon the name and the Google oauth2 code. User gets their own inventory, stats, achievements, etc.</p>',
  examples:[ { title:'Success', code:'<roar tick="128455369786">\n  <google>\n    <login_user status="ok">\n      <auth_token>ABCDEF</auth_token>\n      <player_id>1231231</player_id>\n    </login_user>\n  </google>\n</roar>\n' }, { title:'An error', code:'<roar tick="128455436426">\n  <google>\n    <login_user status="error">\n      <error type="0">Some Error</error>\n    </login_user>\n  </google>\n</roar>\n' } ],
  codeconsole:'yes'
  } );


controllers['shop'] = [];
controllers['shop'].push( {
  name:'list',
  p:[

  ],
  brief:'Lists all items available for purchase.',
  docs:'<p>Shop contains all the things available for purchase. A shopitem has 3 core blocks costs, requirements and modifiers. It will also have an ikey, label, description and optional tags.</p>',
  returns:'<p>array of shop items</p>',
  examples:[ { title:'success', code:'<roar tick="130695522924">\n  <shop>\n    <list status="ok">\n      <shopitem ikey="shop_item_ikey_1" label="Shop item 1" description="Lorem Ipsum">\n        <costs>\n          <stat_cost type="currency" ikey="cash" value="100" ok="false" reason="Insufficient Coins"/>\n          <stat_cost type="currency" ikey="premium_currency" value="0" ok="true"/>\n        </costs>\n        <modifiers>\n          <grant_item ikey="item_ikey_1"/>\n        </modifiers>\n        <tags/>\n      </shopitem>\n      <shopitem ikey="shop_item_ikey_2"/>\n      <shopitem label="Shop item 2"/>\n      <shopitem description="Blah Blah">\n        <costs>\n          <stat_cost type="currency" ikey="cash" value="0"/>\n          <stat_cost type="currency" ikey="premium_currency" value="50"/>\n        </costs>\n        <modifiers>\n          <grant_item ikey="item_ikey_2"/>\n        </modifiers>\n        <tags>\n          <tag value="a_tag"/>\n          <tag value="another_tag"/>\n        </tags>\n      </shopitem>\n    </list>\n  </shop>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['shop'].push( {
  name:'buy',
  p:[
    { id:'shop_item_ikey', docs:'The ikey of the item to be purchased, as displayed by shop/list' }
  ],
  brief:'Buy an item from the shop.',
  docs:'<p>Checks that requirements are met and, if they are, purchases an item, adding it to the user\'s inventory and deducting the cost from the appropriate user model statistic.</p>',
  examples:[ { title:'success', code:'<roar tick="125555445657">\n  <shop>\n    <buy status="ok">\n      <costs>\n        <cost type="stat_change" ikey="coins" value="-5"/>\n        <cost type="stat_change" ikey="cool_resource"/>\n      </costs>\n      <modifiers>\n        <modifier type="add_xp" value="100"/>\n        <modifier type="add_item" ikey="item_key" item_id="16268470388190951200"/>\n      </modifiers>\n      <tags>\n        <tag value="special"/>\n        <tag value="magic"/>\n      </tags>\n    </buy>\n  </shop>\n  <!--Server block shows server updates below-->\n  <server>\n    <update type="currency" ikey="coins" value="203"/>\n    <inventory_changed/>\n  </server>\n</roar>\n' } ],
  codeconsole:'yes'
  } );


controllers['admin'] = [];
controllers['admin'].push( {
  name:'login_user',
  p:[
    { id:'admin_token', docs:'The admin token for this game' },
    { id:'name', docs:'The players name (optional)' },
    { id:'id', docs:'The players id (optional)' }
  ],
  brief:'Login a player.',
  docs:'<p>Requests an authentication token from the server for the player, which is used to validate subsequent requests. This call is designed to be used as a server-to-server call, where another server requests a login from roar and then hands the auth-token back to the client</p><para/>',
  examples:[ { title:'success', code:'<roar tick="128455461333">\n  <admin>\n    <login_user status="ok">\n      <!--Used to identify this session in subsequent calls-->\n      <auth_token>2034623793</auth_token>\n      <player_id>12312312312</player_id>\n    </login_user>\n  </admin>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['admin'].push( {
  name:'delete_player',
  p:[
    { id:'admin_token', docs:'Token identifying the call as coming from an admin (set in dashboard)<emphasis>NEVER use this from a public game client</emphasis>' },
    { id:'player_id', docs:'id of the target user' }
  ],
  brief:'Delete a player.',
  docs:'<p>Delete a player using their player_id</p>',
  examples:[  ],
  codeconsole:'yes'
  } );
controllers['admin'].push( {
  name:'view_player',
  p:[
    { id:'admin_token', docs:'Token identifying the call as coming from an admin (set in dashboard)' },
    { id:'id', docs:'id of the target user' }
  ],
  brief:'Admin call to get all stats and items for a user.',
  docs:'<p>Returns all attributes, resources and currencies and items for a given user, along with other core user information.</p>',
  examples:[ { title:'success', code:'<roar tick="125555206993">\n  <admin>\n    <view_player status="ok">\n      <attribute ikey="id" value="2059428086" type="special"/>\n      <attribute ikey="xp" value="0" type="special"/>\n      <attribute ikey="level" value="1" type="special"/>\n      <attribute ikey="facebook_uid" value="0" type="special"/>\n      <attribute ikey="name" value="foo" type="special"/>\n      <attribute ikey="attack" value="10" type="core" label="Attack"/>\n      <attribute ikey="defence" value="10" type="core" label="Core Defence"/>\n      <attribute ikey="hit" value="10" type="core" lable="Hit Power"/>\n      <attribute ikey="avoid" value="10" type="core" label="avoid"/>\n      <attribute ikey="health" value="100" type="resource" max="123" min="0" regen_every="1000" label="Health"/>\n      <attribute ikey="energy" value="20" type="resource" max="123" min="0" regen_every="1000" label="Energy"/>\n      <attribute ikey="stamina" value="5" type="resource" max="123" min="0" regen_every="1000" label="Stamina"/>\n      <attribute ikey="profile_points" value="0" type="currency" label="Monkey Power Points"/>\n      <attribute ikey="cash" value="100" type="currency" lable="cash"/>\n      <attribute ikey="premium_currency" value="5" type="currency" label="Bear Dollars"/>\n      <items>\n        <item id="1001" ikey="item_ikey" count="1" label="A Label" type="thing" description="A thing" consumable="false" sellable="true" equipped="false">\n          <stats>\n            <equip_attribute ikey="health_max" value="100"/>\n            <grant_stat ikey="cash" value="100"/>\n            <grant_stat ikey="energy" value="-5"/>\n          </stats>\n          <properties>\n            <property ikey="size" value="3"/>\n          </properties>\n          <tags>\n            <tag value="weapon"/>\n          </tags>\n        </item>\n      </items>\n    </view_player>\n  </admin>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['admin'].push( {
  name:'increment_stat',
  p:[
    { id:'admin_token', docs:'Token identifying the call as coming from an admin (set in dashboard)' },
    { id:'id', docs:'id of the target user' },
    { id:'stat', docs:'The name (ikey) of the stat to set' },
    { id:'amount', docs:'The amount to change the stat by' }
  ],
  brief:'Admin sets a user stat.',
  docs:'<p>This administrator call enables you to manually increment (or decrement) any user stat. This is highly powerful, and should only be called from a secure server and not from a game client. Note that this obeys the min and max for that attribute if the exist. If you dont want to be limited by these values you must use admin_setStat.</p>',
  examples:[ { title:'success', code:'<roar tick="125555206993">\n  <admin>\n    <increment_stat status="ok"/>\n  </admin>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['admin'].push( {
  name:'set',
  p:[
    { id:'admin_token', docs:'Token identifying the call as coming from an admin (set in dashboard)' },
    { id:'id', docs:'id of the target user' },
    { id:'stat', docs:'The name (ikey) of the stat to set' },
    { id:'amount', docs:'The new value for the stat' }
  ],
  brief:'Admin sets a user stat.',
  docs:'<p>This administrator call enables you to manually set any user stat to any value. This is highly powerful, and should only be called from a secure server and not from a game client.</p>',
  examples:[ { title:'success', code:'<roar tick="125555206993">\n  <admin>\n    <set status="ok"/>\n  </admin>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['admin'].push( {
  name:'set_custom',
  p:[
    { id:'admin_token', docs:'Token identifying the call as coming from an admin (set in dashboard)' },
    { id:'id', docs:'id of the target user' },
    { id:'property_ikey', docs:'The ikey of the property to set.' },
    { id:'value', docs:'the value to set the property to.' }
  ],
  brief:'Admin sets a user custom property.',
  docs:'<p>This administrator call enables you to manually set any user custom property to any value. This is highly powerful, and should only be called from a secure server and not from a game client.</p>',
  examples:[ { title:'success', code:'<roar tick="125555206993">\n  <admin>\n    <set_custom status="ok"/>\n  </admin>\n</roar>\n' } ],
  codeconsole:'yes'
  } );


controllers['items'] = [];
controllers['items'].push( {
  name:'list',
  p:[

  ],
  brief:'List a user\'s items.',
  docs:'<p>Returns a list of all the items that are associated with a user account, along with specific flags to indicate status such as equipped, consumable and collect tick/window.</p>',
  returns:'<p>InventoryItem array<ul><li>id [int]</li><li>item info<ul><li>id [uint]</li><li>ikey [string]</li><li>label [string]</li><li>description [string]</li><li>count [int]</li><li>stats [array]<ul><li>ikey [string]</li><li>value [int]</li></ul></li><li>custom_attributes [array]<ul><li>attribute_ikey [string]</li><li>value [int]</li></ul></li><li>tags [array of strings]</li><li>type [string]</li><li>consumable [bool]</li><li>equipped [bool]</li><li>sellable [bool]</li></ul></li></ul></p>',
  examples:[ { title:'success', code:'<roar tick="128555590828">\n  <items>\n    <list status="ok">\n      <item id="125533344705937461" ikey="first_item" count="1" label="Item label" type="item" description="Long description" consumable="false" equipped="true" sellable="true"/>\n      <item id="163726727623176884" ikey="second_item" count="1" label="Another label" type="custom_type" description="Long description" consumable="true" equipped="false" sellable="true"/>\n      <item id="178894346538484085" ikey="item_regenerates_collectable" count="1" label="Label for item that regenerates a collectable" type="item" description="" consumable="false" sellable="true" equipped="true">\n        <stats>\n          <collect_stat ikey="collectable" value="1" every="1" window="3000" collect_at="130928572327"/>\n        </stats>\n      </item>\n    </list>\n  </items>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['items'].push( {
  name:'view',
  p:[
    { id:'item_ikey', docs:'The item prototype to get information about.' },
    { id:'item_ikeys', docs:'The item prototypes to get information about. This should be a json encoded array of ikeys.' }
  ],
  brief:'View details on a given item.',
  docs:'<p>Get detailed information about a given item(s).</p>',
  examples:[ { title:'success', code:'<roar tick="128555570628">\n  <items>\n    <view status="ok">\n      <item id="1" ikey="your_item_ikey" count="1" label="your_item_label" type="item" description="your_item_description" consumable="false" sellable="true"/>\n      <item ikey="your_item_key2">\n        <label>Your item label2</label>\n        <description>Long form description</description>\n        <stats>\n          <stat ikey="your_attribute" value="25"/>\n        </stats>\n      </item>\n    </view>\n  </items>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['items'].push( {
  name:'view_all',
  p:[
    { id:'tags', docs:'Items with all the tags set get returnedi. tags should be a json encoded array of strings.' }
  ],
  brief:'View details on a given item.',
  docs:'<p>Get detailed information about a given item(s).</p>',
  examples:[ { title:'success', code:'<roar tick="128555570628">\n  <items>\n    <view_all status="ok">\n      <item id="1" ikey="your_item_ikey" count="1" label="your_item_label" type="item" description="your_item_description" consumable="false" sellable="true"/>\n      <item ikey="your_item_key2">\n        <label>Your item label2</label>\n        <description>Long form description</description>\n        <stats>\n          <stat ikey="your_attribute" value="25"/>\n        </stats>\n      </item>\n    </view_all>\n  </items>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['items'].push( {
  name:'sell',
  p:[
    { id:'item_id', docs:'The unique id of the item that belongs to the player' }
  ],
  brief:'Sell an item.',
  docs:'<p>Attempts to sell an item belonging to a user. If the item can be sold, the call returns successfully and credits the player with any benefits. Note that items must be sold by reference to their unique id, rather than archetype key.</p>',
  examples:[ { title:'success', code:'<roar tick="128555562713">\n  <items>\n    <sell status="ok">\n      <effect>\n        <costs/>\n        <modifiers>\n          <modifier type="stat_change" ikey="coins" value="100"/>\n        </modifiers>\n      </effect>\n      <item id="1831235495090" ikey="your_item_ikey" count="1" label="your item label" type="item" description="" consumable="false" sellable="true">\n        <stats>\n          <equip_attribute ikey="your_attribute" value="33"/>\n        </stats>\n      </item>\n    </sell>\n  </items>\n  <!--Note the server block of updates as a result of this task-->\n  <server>\n    <update type="currency" ikey="coins" value="500"/>\n    <inventory_changed/>\n  </server>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['items'].push( {
  name:'equip',
  p:[
    { id:'item_id', docs:'Unique id of the item to be equipped' }
  ],
  brief:'Equip the item and activate bonuses.',
  docs:'<p>Sets an item\'s state to being equipped, which activates any bonuses attached to the item archetype. Note that items are equipped by reference to specific unique id, rather than general archetype key.</p>',
  returns:'<p>Success or fail if the player is unable to equip the item.</p>',
  examples:[ { title:'success', code:'<roar tick="128779477951">\n  <items>\n    <equip status="ok"/>\n  </items>\n  <!--The server flags that the user inventory status has changed-->\n  <server>\n    <inventory_changed/>\n  </server>\n</roar>\n' }, { title:'unable to equip', code:'<roar tick="128779534960">\n  <items>\n    <equip status="error">\n      <error type="0">Unable to equip item</error>\n    </equip>\n  </items>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['items'].push( {
  name:'unequip',
  p:[
    { id:'item_id', docs:'The unique id of the item to be unequipped' }
  ],
  brief:'Unequips an item.',
  docs:'<p>Sets an item\'s state to being unequipped (which removes any equip bonuses).</p>',
  examples:[ { title:'success', code:'<roar tick="125555505238">\n  <items>\n    <unequip status="ok"/>\n  </items>\n  <!--Server flags that user inventory has been changed on unequip-->\n  <server>\n    <inventory_changed/>\n  </server>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['items'].push( {
  name:'use',
  p:[
    { id:'item_id', docs:'Item id from the inventory element to be used.' }
  ],
  brief:'Uses a consumable item or collects a collectable resource/currency regenerated by an item.',
  docs:'<p>For consumable items in the player\'s inventory, uses the item, which applies the consumable item bonuses, and removes the item from the user\'s inventory (effectively destroying the item).</p><p>For items that have regenerated a collectable resource or currency, if the call is made within the allowable window, collects the resource or currency, which updates the player\'s stats, and restarts the regeneration counter.</p>',
  examples:[ { title:'success', code:'<roar tick="125555521889">\n  <items>\n    <use status="ok"/>\n  </items>\n  <!--Server shows the applied bonuses, and flags that inventory has updated-->\n  <server>\n    <update type="resource" ikey="mojo" value="45"/>\n    <inventory_changed/>\n  </server>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['items'].push( {
  name:'set',
  p:[
    { id:'item_id', docs:'The item instance to set the property of.' },
    { id:'property_ikey', docs:'The ikey of the property to set.' },
    { id:'value', docs:'the value to set the property to.' }
  ],
  brief:'Set a custom property on an item.',
  docs:'<p>Sets a custom property on a specific item instance. Custom properties are defined in the item configuration setup in Roar. Note that item custom properties differ from item variables which can only be set via scripting. See<ulink url="http://support.roarengine.com/kb/development/roar-scripting">http://support.roarengine.com/kb/development/roar-scripting</ulink>.</p>',
  examples:[ { title:'success', code:'<roar tick="128555540202">\n  <items>\n    <set status="ok"/>\n  </items>\n</roar>\n' }, { title:'error', code:'<roar tick="128555525752">\n  <items>\n    <set status="error">\n      <error type="0">Invalid custom property</error>\n    </set>\n  </items>\n</roar>\n' } ],
  codeconsole:'yes'
  } );


controllers['chrome_web_store'] = [];
controllers['chrome_web_store'].push( {
  name:'list',
  p:[

  ],
  brief:'Lists all items available for purchase through google chrome web store.',
  docs:'<p>Returns all the items available for purchase through google chrome web store. Uses the standard modifier blocks to describe the effect.</p>',
  returns:'<p>array of purchasable effects</p>',
  examples:[ { title:'success', code:'<roar tick="130695522924">\n  <chrome_web_store>\n    <list>\n      <cws_item blah="???">\n        <modifiers>\n          <grant_item ikey="item_ikey_1"/>\n        </modifiers>\n        <tags>\n          <tag value="a_tag"/>\n          <tag value="another_tag"/>\n        </tags>\n      </cws_item>\n    </list>\n  </chrome_web_store>\n</roar>\n' } ],
  codeconsole:'yes'
  } );


controllers['tasks'] = [];
controllers['tasks'].push( {
  name:'list',
  p:[

  ],
  brief:'List all available tasks.',
  docs:'<p>Lists the tasks publicly available for calling from your client. Tasks typically have three main blocks: requirements, costs and rewards. Requirements must be met in order for task to be able to complete. Costs are deducted from a user (and must be met to successfully complete the task). Rewards describes the rewards that are given to a user for completing the task.</p><p>A task can have requirements, these are found in the &lt;requires&gt; element. Each requirement will come back with an "ok" tag and some extra information. Requirement types are:</p><p><ul><li><p><code>level_requirement</code>A minimum level for the player to attempt the task.</p></li><li><p>-<code>level</code></p></li><li><p><code>item_requirement</code>An item that the player must have to attempt the task</p></li><li><p>-<code>ikey</code>The ikey of the item required</p></li><li><p>-<code>label</code>A human readable description of the requirement. This is needed since it is not easy/possible to have "2 keen blades of fright" pluralise automatically.</p></li><li><p>-<code>number_required</code>This will often be 1, but need not be</p></li><li><p>-<code>consumed</code>Boolean that determines whether this requirement should be treated as a cost, rather than just a requirement.</p></li><li><p><code>currency_requirement</code></p></li><li><p>-<code>ikey</code>the required currency type</p></li><li><p>-<code>value</code>how much is needed</p></li><li><p><code>attribute_requirement</code></p></li><li><p>-<code>ikey</code>the required attribute type</p></li><li><p>-<code>value</code>how much is needed</p></li><li><p><code>resource_requirement</code></p></li><li><p>-<code>ikey</code>the required resource type</p></li><li><p>-<code>value</code>how much is needed</p></li></ul></p>',
  examples:[ { title:'success', code:'<roar tick="128555560387">\n  <tasks>\n    <list status="ok">\n      <task ikey="your_task_key">\n        <label>Task label</label>\n        <description>Longer format description</description>\n        <location/>\n        <tags>\n          <tag value="a tag"/>\n          <tag value="another tag"/>\n        </tags>\n        <costs>\n          <resource ikey="energy" value="10"/>\n        </costs>\n        <rewards>\n          <special ikey="xp" value="10"/>\n          <currency ikey="coins" value="500"/>\n          <currency ikey="premium_currency" value="20"/>\n        </rewards>\n        <mastery level="3" progress="100"/>\n      </task>\n    </list>\n  </tasks>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['tasks'].push( {
  name:'start',
  p:[
    { id:'task_ikey', docs:'The ikey of the task to start' }
  ],
  brief:'start a task',
  docs:'<p>Initiates a task on the server, which evaluates the requirements and conditions for the task. Task completion is returned as part of the Server block.</p>',
  examples:[ { title:'success', code:'<roar tick="128555552127">\n  <tasks>\n    <start status="ok"/>\n  </tasks>\n  <!--Server block follows with task completion information-->\n  <server>\n    <task_complete>\n      <ikey>task_ikey</ikey>\n      <label>Task label</label>\n      <description>Task description</description>\n      <location/>\n      <tags>comma,separated,tags</tags>\n      <costs>\n        <stat_change ikey="energy" value="10"/>\n      </costs>\n      <modifiers>\n        <stat_change ikey="xp" value="20"/>\n      </modifiers>\n      <mastery level="3" progress="100"/>\n    </task_complete>\n    <!--Notice the stat update as a separate server event-->\n    <update type="resource" ikey="energy" value="20"/>\n    <update type="xp" ikey="xp" value="20"/>\n  </server>\n</roar>\n' } ],
  codeconsole:'yes'
  } );


controllers['facebook'] = [];
controllers['facebook'].push( {
  name:'fetch_oauth_token',
  p:[
    { id:'code', docs:'Facebook code generated from the authorisation page' }
  ],
  brief:'Retrieves a Facebook OAuth token.',
  docs:'<p>Once a player\'s authentication code has been retrieved</p>',
  examples:[ { title:'Success', code:'<roar tick="127455369786">\n  <facebook>\n    <fetch_oauth_token status="ok">\n      <oauth_token>104271466587092|1.mYu275YylcGHf6vC ... hxrk63ouytUiBdBc</oauth_token>\n    </fetch_oauth_token>\n  </facebook>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['facebook'].push( {
  name:'friends',
  p:[

  ],
  brief:'Lists the user\'s Facebook friends.',
  docs:'<p>This function returns a list of the user\'s Facebook friends, and adds additional information about those friends who are already playing the game and returns the whole lot.</p>',
  examples:[ { title:'Success', code:'<roar tick="128888053531">\n  <facebook>\n    <friends status="ok">\n      <!--"Mashton" is already playing this game and has an \'id\' we can use-->\n      <friend fb_name="Mashton Groober" fb_id="51151277315" name="Mashton" id="7877788777"/>\n      <!--These other two friends are not playing this game (no \'id\')-->\n      <friend fb_name="Jumpy Maxton" fb_id="529465555"/>\n      <friend fb_name="Ami Jones" fb_id="523055555"/>\n    </friends>\n  </facebook>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['facebook'].push( {
  name:'bind_signed',
  p:[
    { id:'signed_request', docs:'Facebook signed request for the user' }
  ],
  brief:'Binds an existing user account to a facebook id using a Facebook signed request.',
  docs:'<p>Binds an existing user account to a facebook id using a Facebook signed request.</p>',
  examples:[ { title:'Success', code:'<roar tick="128455369786">\n  <facebook>\n    <bind_signed status="ok"/>\n  </facebook>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['facebook'].push( {
  name:'create_oauth',
  p:[
    { id:'oauth_token', docs:'Facebook oauth token for the user' },
    { id:'name', docs:'(optional - Default null) a unique login string or username' }
  ],
  brief:'Creates a new user account using Facebook OAuth token.',
  docs:'<p>Creates a new user based upon the name and the Facebook OAuth token. User gets their own inventory, stats, achievements, etc.</p>',
  examples:[ { title:'Success', code:'<roar tick="128455369786">\n  <facebook>\n    <create_oauth status="ok">\n      <auth_token>ABCDEF</auth_token>\n      <player_id>1231231</player_id>\n    </create_oauth>\n  </facebook>\n</roar>\n' }, { title:'player already exists', code:'<roar tick="128455436426">\n  <facebook>\n    <create_oauth status="error">\n      <error type="0">Player already exists</error>\n    </create_oauth>\n  </facebook>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['facebook'].push( {
  name:'create_signed',
  p:[
    { id:'signed_request', docs:'Facebook oauth token for the user' }
  ],
  brief:'Creates a new user account using Facebook signed request.',
  docs:'<p>Creates a new user based upon the name and the Facebook signed request. User gets their own inventory, stats, achievements, etc.</p>',
  examples:[ { title:'Success', code:'<roar tick="128455369786">\n  <facebook>\n    <create_signed status="ok">\n      <auth_token>ABCDEF</auth_token>\n      <player_id>1231231</player_id>\n    </create_signed>\n  </facebook>\n</roar>\n' }, { title:'player already exists', code:'<roar tick="128455436426">\n  <facebook>\n    <create_signed status="error">\n      <error type="0">Player already exists</error>\n    </create_signed>\n  </facebook>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['facebook'].push( {
  name:'shop_list',
  p:[

  ],
  brief:'Lists all items available for purchase with facebook credits.',
  docs:'<p>Returns all the items available for purchase with facebook credits. Uses the standard modifier blocks to describe the effect.</p>',
  returns:'<p>array of purchasable effects</p>',
  examples:[ { title:'success', code:'<roar tick="130695522924">\n  <facebook>\<shop_list><fbshopitem ikey="shop_item_ikey1" description="Blah Blah" label="label" price="2" product_url="..." image_url="..."><modifiers><grant_item ikey="item_ikey_1"/></modifiers></fbshopitem><fbshopitem ikey="shop_item_ikey2" description="Blah Blah" label="label" price="2" product_url="..." image_url="..."><modifiers><grant_item ikey="item_ikey_2"/></modifiers></fbshopitem></shop_list></facebook>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['facebook'].push( {
  name:'login_oauth',
  p:[
    { id:'oauth_token', docs:'Facebook OAuth token' }
  ],
  brief:'Login using a Facebook OAuth token.',
  docs:'<p>This function will log a user in using their Facebook OAuth token. To return successfully requires that their account has been created using /facebook/create_oauth/</p>',
  examples:[ { title:'Success', code:'<roar tick="127055503865">\n  <facebook>\n    <login_oauth status="ok">\n      <auth_token>2144869762</auth_token>\n      <player_id>1231231</player_id>\n    </login_oauth>\n  </facebook>\n</roar>\n' }, { title:'Missing fields', code:'<roar tick="0">\n  <facebook>\n    <login_oauth status="error">\n      <error type="0">no oauth_token field in parameters</error>\n    </login_oauth>\n  </facebook>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['facebook'].push( {
  name:'login_signed',
  p:[
    { id:'signed_request', docs:'Facebook Signed Request' }
  ],
  brief:'Login using a Facebook Signed Request.',
  docs:'<p>This function will log a user in using their Facebook Signed Request. To return successfully requires that their account has been created using /facebook/create_oauth/</p>',
  examples:[ { title:'Success', code:'<roar tick="127055503865">\n  <facebook>\n    <login_signed status="ok">\n      <auth_token>2144869762</auth_token>\n      <player_id>1231231</player_id>\n    </login_signed>\n  </facebook>\n</roar>\n' }, { title:'Missing fields', code:'<roar tick="0">\n  <facebook>\n    <login_signed status="error">\n      <error type="0">no signed_request field in parameters</error>\n    </login_signed>\n  </facebook>\n</roar>\n' } ],
  codeconsole:'nouse'
  } );


controllers['user'] = [];
controllers['user'].push( {
  name:'create',
  p:[
    { id:'name', docs:'The user\'s unique username' },
    { id:'hash', docs:'The password associated with the account' }
  ],
  brief:'Create a new user.',
  docs:'<p>Manually creates a new user based upon the login and password values. Each new user gets their own managed inventory, stats, achievements, etc.</p><para/>',
  examples:[ { title:'success', code:'<roar tick="128455369786">\n  <user>\n    <create status="ok">\n      <auth_token>ABCDEF</auth_token>\n      <player_id>12312312312</player_id>\n    </create>\n  </user>\n</roar>\n' }, { title:'player already exists', code:'<roar tick="128455436426">\n  <user>\n    <create status="error">\n      <error type="0">Player already exists</error>\n    </create>\n  </user>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['user'].push( {
  name:'change_name',
  p:[
    { id:'name', docs:'The players username' },
    { id:'old_password', docs:'The players current password' },
    { id:'new_password', docs:'The players new password' }
  ],
  brief:'Changes a players password.',
  docs:'<p>Changes a players login password.</p><para/>',
  examples:[ { title:'success', code:'<roar tick="128455461333">\n  <user>\n    <change_password status="ok"/>\n  </user>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['user'].push( {
  name:'change_password',
  p:[
    { id:'name', docs:'The players username' },
    { id:'old_password', docs:'The players current password' },
    { id:'new_password', docs:'The players new password' }
  ],
  brief:'Changes a players password.',
  docs:'<p>Changes a players login password.</p><para/>',
  examples:[ { title:'success', code:'<roar tick="128455461333">\n  <user>\n    <change_password status="ok"/>\n  </user>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['user'].push( {
  name:'login',
  p:[
    { id:'name', docs:'The players username' },
    { id:'hash', docs:'The players password' }
  ],
  brief:'Login a player.',
  docs:'<p>Requests an authentication token from the server for the player, which is used to validate subsequent requests.</p><para/>',
  examples:[ { title:'success', code:'<roar tick="128455461333">\n  <user>\n    <login status="ok">\n      <!--Used to identify this session in subsequent calls-->\n      <auth_token>2034623793</auth_token>\n      <player_id>12312312312</player_id>\n    </login>\n  </user>\n</roar>\n' }, { title:'invalid data', code:'<roar tick="128455449871">\n  <user>\n    <login status="error">\n      <error type="0">Invalid name or password</error>\n    </login>\n  </user>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['user'].push( {
  name:'netdrive_get',
  p:[
    { id:'ikey', docs:'the ikey of the netdrive field.' }
  ],
  brief:'Returns specified netdrive field for the logged in player.',
  docs:'<p>Returns the specified netdrive field for the currently logged in player.</p><para/>',
  examples:[ { title:'success', code:'<roar tick="128455475133">\n  <user>\n    <netdrive_get status="ok">\n      <netdrive_field ikey="netdrive_field_ikey" data="content of the netdrive field"/>\n    </netdrive_get>\n  </user>\n</roar>\n' }, { title:'Not logged in', code:'<roar tick="0">\n  <user>\n    <netdrive_get status="error">\n      <error type="0">Must be logged in</error>\n    </netdrive_get>\n  </user>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['user'].push( {
  name:'netdrive_set',
  p:[
    { id:'ikey', docs:'Unique key for the data' },
    { id:'data', docs:'String of data to save' }
  ],
  brief:'Sets netdrive field.',
  docs:'<p>Sets specified netdrive field for the logged in player.</p><para/>',
  examples:[ { title:'success', code:'<roar tick="128455475133">\n  <user>\n    <netdrive_set status="ok"/>\n  </user>\n</roar>\n' }, { title:'Not logged in', code:'<roar tick="0">\n  <user>\n    <netdrive_set status="error">\n      <error type="0">Must be logged in</error>\n    </netdrive_set>\n  </user>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['user'].push( {
  name:'private_get',
  p:[
    { id:'ikey', docs:'the ikey of the private field.' }
  ],
  brief:'Returns specified private field for the logged in player.',
  docs:'<p>Returns the specified private field for the currently logged in player.</p><para/>',
  examples:[ { title:'success', code:'<roar tick="128455475133">\n  <user>\n    <private_get status="ok">\n      <private_field ikey="private_field_ikey" data="content of the private field"/>\n    </private_get>\n  </user>\n</roar>\n' }, { title:'Not logged in', code:'<roar tick="0">\n  <user>\n    <private_get status="error">\n      <error type="0">Must be logged in</error>\n    </private_get>\n  </user>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['user'].push( {
  name:'private_set',
  p:[
    { id:'ikey', docs:'Unique key for the data' },
    { id:'data', docs:'String of data to save' }
  ],
  brief:'Sets private field.',
  docs:'<p>Sets the specified private field for the currently logged in player.</p><para/>',
  examples:[ { title:'success', code:'<roar tick="128455475133">\n  <user>\n    <private_set status="ok"/>\n  </user>\n</roar>\n' }, { title:'Not logged in', code:'<roar tick="0">\n  <user>\n    <private_set status="error">\n      <error type="0">Must be logged in</error>\n    </private_set>\n  </user>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['user'].push( {
  name:'logout',
  p:[

  ],
  brief:'Logs out a user.',
  docs:'<p>Clears the authentication token for a user. Must re-login to authenticate.</p><para/>',
  examples:[ { title:'success', code:'<roar tick="128455492875">\n  <user>\n    <logout status="ok"/>\n  </user>\n</roar>\n' }, { title:'not logged in', code:'<roar tick="128455501181">\n  <user>\n    <logout status="error">\n      <error type="0">Invalid auth_token</error>\n    </logout>\n  </user>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['user'].push( {
  name:'set',
  p:[
    { id:'property_ikey', docs:'The ikey of the property to set.' },
    { id:'value', docs:'the value to set the property to.' }
  ],
  brief:'Sets a custom property on a user.',
  docs:'<p>This call can be used to store meta data with the user.</p><p><div class="note"><b>NOTE:</b><p>This data is accessible to the user to change relatively easily as the changes are sent from the game client. This means this data should not be relied upon for game critical features.</p></div></p>',
  examples:[ { title:'success', code:'<roar tick="125554966267">\n  <user>\n    <set status="ok"/>\n  </user>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['user'].push( {
  name:'view',
  p:[

  ],
  brief:'Returns all stats for a user.',
  docs:'<p>Returns all attributes, resources and currencies for a given user, along with other core user information.</p>',
  examples:[ { title:'success', code:'<roar tick="128455475133">\n  <user>\n    <view status="ok">\n      <attribute ikey="id" value="2059428086" type="special"/>\n      <attribute ikey="xp" value="0" type="special"/>\n      <attribute ikey="level" value="1" type="special"/>\n      <attribute ikey="facebook_uid" value="0" type="special"/>\n      <attribute ikey="name" value="foo" type="special"/>\n      <attribute ikey="attack" value="10" type="core" label="Attack"/>\n      <attribute ikey="defence" value="10" type="core" label="Core Defence"/>\n      <attribute ikey="hit" value="10" type="core" lable="Hit Power"/>\n      <attribute ikey="avoid" value="10" type="core" label="avoid"/>\n      <attribute ikey="health" value="100" type="resource" max="123" min="0" regen_every="1000" label="Health"/>\n      <attribute ikey="energy" value="20" type="resource" max="123" min="0" regen_every="1000" label="Energy"/>\n      <attribute ikey="stamina" value="5" type="resource" max="123" min="0" regen_every="1000" label="Stamina"/>\n      <attribute ikey="profile_points" value="0" type="currency" label="Monkey Power Points"/>\n      <attribute ikey="cash" value="100" type="currency" lable="cash"/>\n      <attribute ikey="premium_currency" value="5" type="currency" label="Bear Dollars"/>\n      <regen_script>\n        <entry function="hello" next="1234"/>\n      </regen_script>\n    </view>\n  </user>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['user'].push( {
  name:'achievements',
  p:[

  ],
  brief:'List all achievements and show user progress.',
  docs:'<p>Achievements are created in Roar by setting a task and defining a number of completion events. Once a user has completed the tasks the prescribed number of times, the achievement is rewarded.</p>',
  examples:[ { title:'success', code:'<roar tick="128755501434">\n  <user>\n    <achievements status="ok">\n      <achievement>\n        <ikey>the_big_one</ikey>\n        <status>active</status>\n        <label>The Big One</label>\n        <progress>0/3</progress>\n        <description>Find the dragon three times!</description>\n        <task_ikey>an_ikey</task_ikey>\n        <task_label>A task label</task_label>\n      </achievement>\n    </achievements>\n  </user>\n</roar>\n' } ],
  codeconsole:'yes'
  } );


controllers['scripts'] = [];
controllers['scripts'].push( {
  name:'run',
  p:[
    { id:'script', docs:'The script name' },
    { id:'args[x]', docs:'The arguments to the script' }
  ],
  brief:'Executes a server side script.',
  docs:'<p>At the moment only lua scripts are supported.</p>',
  examples:[  ],
  codeconsole:'yes'
  } );
controllers['scripts'].push( {
  name:'run_admin',
  p:[
    { id:'admin_token', docs:'<parameterdescription><para/></parameterdescription>' },
    { id:'script', docs:'The script name' },
    { id:'args[x]', docs:'The arguments to the script' }
  ],
  brief:'Executes an admin server side script.',
  docs:'<p>At the moment only lua scripts are supported.</p>',
  examples:[  ],
  codeconsole:'yes'
  } );


controllers['mail'] = [];
controllers['mail'].push( {
  name:'accept',
  p:[
    { id:'mail_id', docs:'the piece of mail to accept' }
  ],
  brief:'accepts mail from another user',
  docs:'<p>The mail_id needs to be an id returned by /mail/what_can_i_accept</p>',
  examples:[ { title:'success', code:'<roar tick="128555559022">\n  <mail>\n    <accept status="ok"/>\n  </mail>\n  <!--Inventory has changed upon receiving this mail-->\n  <server>\n    <inventory_changed/>\n  </server>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['mail'].push( {
  name:'send',
  p:[
    { id:'recipient_id', docs:'Who to send the mail to' },
    { id:'mailable_id', docs:'What to send the recipient' },
    { id:'message', docs:'A message to go with the mail.' }
  ],
  brief:'sends an item with a message to another user',
  docs:'<p>Mails an item and an optional message to another user. The mailable_id must be one returned by /mail/what_can_i_send</p>',
  examples:[ { title:'success', code:'<roar tick="12855555840">\n  <mail>\n    <send status="ok"/>\n  </mail>\n  <!--Note any server updates (in this case from gift "cost")-->\n  <server>\n    <update type="currency" ikey="in_game" value="49990"/>\n  </server>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['mail'].push( {
  name:'what_can_i_accept',
  p:[

  ],
  brief:'Lists any mailed elements available to receive.',
  docs:'<p>Any mail that has been sent to a user will be listed as part of this call. To accept the mail, see /mail/accept/</p>',
  examples:[ { title:'success', code:'<roar tick="128555554651">\n  <mail>\n    <what_can_i_accept status="ok">\n      <package type="item" id="15850999291750564699" message="Enjoy the beans!" sender_id="123123" sender_name="John">\n        <item id="15850999291750564699" ikey="magic_beans" count="1" label="Magic Beans" type="custom_type" description="Grow a beanstalk!" consumable="true"/>\n      </package>\n    </what_can_i_accept>\n  </mail>\n</roar>\n' }, { title:'success2', code:'<roar tick="128555554651">\n  <mail>\n    <what_can_i_accept status="ok">\n      <package type="gift" id="6760640600796911244" message="Have a happy day" sender_id="123123" sender_name="John">\n        <tag value="test_tag"/>\n        <modifiers>\n          <grant_item ikey="item_ikey_1"/>\n        </modifiers>\n      </package>\n    </what_can_i_accept>\n  </mail>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['mail'].push( {
  name:'what_can_i_send',
  p:[

  ],
  brief:'lists items (inc. any gift items) available to be mailed',
  docs:'<p>Returns a list of all items that are available to be mailed to other users. Most inventory items that belong to a user will be available in this capacity. In addition to these, any gift items will also show up in this list.</p>',
  examples:[ { title:'success', code:'<roar tick="12835555872">\n  <mail>\n    <what_can_i_send status="ok">\n      <mailable id="3467" type="gift" label="a label">\n        <requirements/>\n        <costs/>\n        <on_accept>\n          <grant_item ikey="your_gift_item_ikey"/>\n        </on_accept>\n        <on_give>\n          <grant_xp value="500"/>\n        </on_give>\n        <tags>\n          <tag value="a_tag"/>\n        </tags>\n      </mailable>\n    </what_can_i_send>\n  </mail>\n</roar>\n' } ],
  codeconsole:'yes'
  } );


controllers['appstore'] = [];
controllers['appstore'].push( {
  name:'shop_list',
  p:[

  ],
  brief:'Lists all items available for purchase from the apple appstore.',
  docs:'<p>Returns all the items available for purchase. Uses the standard modifier blocks to describe the effect.</p>',
  returns:'<p>array of purchasable effects</p>',
  examples:[ { title:'success', code:'<roar tick="130695522924">\n  <appstore>\<shop_list><shopitem product_identifier="someidentifier" label="A label"><modifiers><grant_item ikey="item_ikey_1"/></modifiers></shopitem><shopitem product_identifier="someotheridentifier" label="Another label"><modifiers><grant_item ikey="item_ikey_2"/></modifiers></shopitem></shop_list></appstore>\n</roar>\n' } ],
  codeconsole:'yes'
  } );


controllers['friends'] = [];
controllers['friends'].push( {
  name:'accept',
  p:[
    { id:'friend_id', docs:'id of the recipient to the invite' },
    { id:'invite_id', docs:'invite id from the invite notification' }
  ],
  brief:'accepts a friend invite',
  docs:'<p>This has the following effects<ul><li><p>Removes the friend invite from the database</p></li><li><p>Creates a friendship between the two players in the database</p></li><li><p>Notifies the player who sent the invite that their request was accepted</p></li><li><p>Adds the player info of the player who accepted the invite into the notifications of the inviting player</p></li></ul></p><p><div class="note"><b>NOTE:</b><p>The auth token is used to validate that the player accepting the invite is the recipient of the invite.</p></div></p>',
  returns:'<p>success or fail</p>',
  examples:[  ],
  codeconsole:'yes'
  } );
controllers['friends'].push( {
  name:'decline',
  p:[
    { id:'invite_id', docs:'invite id from the invite notification' }
  ],
  brief:'declines a friend invite',
  docs:'<p>This removes the friend invite from the database</p><p><div class="note"><b>NOTE:</b><p>This does not notify the player who sent the invite.</p></div><div class="note"><b>NOTE:</b><p>The auth token is used to validate that the player declining the invite is the recipient of the invite.</p></div></p>',
  returns:'<p>success or fail</p>',
  examples:[  ],
  codeconsole:'yes'
  } );
controllers['friends'].push( {
  name:'info',
  p:[
    { id:'invite_id', docs:'invite id from the invite notification' }
  ],
  brief:'returns the information regarding a friend invite',
  docs:'<p>Returns: the following information about a friend invite.<div class="note"><b>NOTE:</b><p>This call does not require the player to be logged in, so that invite information can be displayed to unregistered players.</p></div></p>',
  returns:'<p>Sending Players:<ul><li>id</li><li>name</li><li>level</li><li>database row that contains the friend invite</li></ul></p>',
  examples:[  ],
  codeconsole:'yes'
  } );
controllers['friends'].push( {
  name:'invite',
  p:[
    { id:'friend_id', docs:'id of the player to befriend.' },
    { id:'player_id', docs:'id of the player sending the invite' }
  ],
  brief:'sends a friend request to another player',
  docs:'<p>Sends an invite from a player to another player requesting to be an in game friend. This will create an invite_id which will be placed into the player notifications of the requested friend.</p>',
  returns:'<p>success or fail</p>',
  examples:[ { title:'success', code:'<roar tick="130868381316">\n  <friends>\n    <invite status="ok">\n      <invite_id id="1138654978"/>\n    </invite>\n  </friends>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['friends'].push( {
  name:'list',
  p:[

  ],
  brief:'returns a players friend list',
  docs:'<p>Displays a players friend list based on their auth_token.</p>',
  returns:'<p>an array of friend info, each array element contains<ul><li>id</li><li>name</li><li>level</li><li>database row that contains the friendship</li></ul></p>',
  examples:[ { title:'success', code:'<roar tick="130868353269">\n  <friends>\n    <list status="ok">\n      <friend>\n        <row_id/>\n        <player_id>19000494933</player_id>\n        <name>player_username</name>\n        <level>5</level>\n      </friend>\n    </list>\n  </friends>\n</roar>\n' } ],
  codeconsole:'yes'
  } );
controllers['friends'].push( {
  name:'remove',
  p:[
    { id:'friend_id', docs:'id of the friend to be removed' },
    { id:'player_id', docs:'id of the player removing the friend' }
  ],
  brief:'remove a friend from your friend list',
  docs:'<p>remove a friend from your friend list</p><p><div class="note"><b>NOTE:</b><p>that the friend_id can be found by calling social/friend_show</p></div></p>',
  examples:[ { title:'success', code:'<roar tick="130868370872">\n  <friends>\n    <remove status="ok"/>\n  </friends>\n</roar>\n' } ],
  codeconsole:'yes'
  } );

var chunks = [];
chunks.push( {
  name:'task_complete',
  docs:'<p>When a task is completed on the server, this event is generated.</p><para/>',
  examples:[ { title:'', code:'<task_complete>\n  <ikey>task_unique_ikey</ikey>\n  <label>Label for the task, set by the developer</label>\n  <description>Description of the task, as set by the developer.</description>\n  <location>Location set by the developer.</location>\n  <tags>\n    <tag value="blah"/>\n  </tags>\n  <costs>\n    <stat_change ikey="premium_currency" value="10"/>\n  </costs>\n  <modifiers>\n    <add_xp value="3"/>\n    <stat_change ikey="coins" value="1500"/>\n  </modifiers>\n  <mastery level="3" progress="100"/>\n</task_complete>\n' } ]
 } );
chunks.push( {
  name:'update',
  docs:'<p>Message sent when one of the player\'s stats has changed.</p><para/>',
  examples:[ { title:'', code:'<update type="core" ikey="health" value="120"/>\n' } ]
 } );
chunks.push( {
  name:'achievement_complete',
  docs:'<p>Message sent when an achievement has been completed, or an achievement\'s status has changed.</p><para/>',
  examples:[ { title:'', code:'<achievement_complete ikey="some_achievement" progress_count="2" steps="10" description="An achievement you need to do 10 times to complete" label="An example achievement"/>\n' } ]
 } );
chunks.push( {
  name:'level_up',
  docs:'<p>Message sent when the player\'s level increases.</p><para/>',
  examples:[ { title:'', code:'<level_up value="5"/>\n' } ]
 } );
chunks.push( {
  name:'inventory_changed',
  docs:'<p>Message sent when the player\'s inventory changes.</p><p>This is usually a sign that the client will need to request an inventory update, as the message does not contain information about what has changed.</p><para/>',
  examples:[ { title:'', code:'<inventory_changed/>\n' } ]
 } );
chunks.push( {
  name:'regen',
  docs:'<p>Message sent when a player stat has a regeneration event (usually a resource).</p><p>The "next" value is the tick when the next regen from the same source is scheduled to occur.</p><para/>',
  examples:[ { title:'', code:'<regen name="health" next="12313231"/>\n' } ]
 } );
chunks.push( {
  name:'collect_changed',
  docs:'<p>Message sent when a player stat has a change in collection time for an item.</p><p>The "next" value is the tick when the next collect from the same source is scheduled to occur.</p><para/>',
  examples:[ { title:'', code:'<collect_changed ikey="health" next="12313231"/>\n' } ]
 } );
chunks.push( {
  name:'invite_accepted',
  docs:'<p>Message sent when a player accepts an invite or has an invite accepted.</p><para/>',
  examples:[ { title:'', code:'<invite_accepted name="Lex Luthor" player_id="12313231" level="123"/>\n' } ]
 } );
chunks.push( {
  name:'friend_request',
  docs:'<p>Message sent when a player is sent an invite.</p><para/>',
  examples:[ { title:'', code:'<friend_request name="Lex Luthor" from_player_id="12313231" level="123" friend_invite_row_id="12341345"/>\n' } ]
 } );
chunks.push( {
  name:'transaction',
  docs:'<p>Message sent when player completes a currency transaction</p><para/>',
  examples:[ { title:'', code:'<transaction ikey="diamonds" value="120"/>\n' } ]
 } );
chunks.push( {
  name:'mail_in',
  docs:'<p>Message sent when player recieves mail</p><para/>',
  examples:[ { title:'', code:'<mail_in/>\n' } ]
 } );
chunks.push( {
  name:'equip',
  docs:'<p>Message sent when players item is equipped</p><para/>',
  examples:[ { title:'', code:'<equip item_id="1234"/>\n' } ]
 } );
chunks.push( {
  name:'unequip',
  docs:'<p>Message sent when players item is unequipped</p><para/>',
  examples:[ { title:'', code:'<unequip item_id="1234"/>\n' } ]
 } );
chunks.push( {
  name:'item_use',
  docs:'<p>Message sent when players item is used</p><para/>',
  examples:[ { title:'', code:'<item_use item_id="1234"/>\n' } ]
 } );

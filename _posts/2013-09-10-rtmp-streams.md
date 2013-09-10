---
published: true
layout: default
---

## Watching RTMP streams in VLC

There is a site http://www.castto.me/ where you can watch streams using jwPlayer. Since we don't like flash, let's try to use vlc to play it.

First thing to know is how it is played. Let's see: http://www.castto.me/channel/13141

    <embed type="application/x-shockwave-flash" src="http://www.castto.me/_.swf" width="627" height="390" id="ply" name="ply" quality="high" allowfullscreen="true" allowscriptaccess="always" wmode="opaque" flashvars="skin=http://static.castto.me/player/skins/newtubedark.zip&amp;backcolor=000000&amp;frontcolor=FFFFFF&amp;lightcolor=FFFFFF&amp;file=KfvGmBHIqT97oyWDFmle&amp;streamer=rtmp://cdn.castto.me:80/lb&amp;provider=rtmp&amp;stretching=uniform&amp;controlbar=bottom&amp;autostart=true">
    
RTMP stream, interesting. Let's use rtmpdump:

    rtmpdump -r rtmp://cdn.castto.me:80/lb --playpath KfvGmBHIqT97oyWDFmle
    Connecting ...
    INFO: Connected...
    ERROR: rtmp server sent error
    ERROR: rtmp server requested close

Let's see why we failed, turn on verbose mode:

    rtmpdump -r rtmp://cdn.castto.me:80/lb --playpath KfvGmBHIqT97oyWDFmle -V
    DEBUG: Property: <Name:              level, STRING:	error>
    DEBUG: Property: <Name:               code, STRING:	NetConnection.Connect.Rejected>
    DEBUG: Property: <Name:        description, STRING:	Connection failed: Application rejected connection.>
    DEBUG: Property: <Name:                 ex, OBJECT>
    DEBUG: (object begin)
    DEBUG: Property: <Name:           redirect, STRING:	rtmp://37.72.171.92:80/pub>
    DEBUG: Property: <Name:               code, NUMBER:	302.00>

We've been redirected, but rtmpdump doesn't understand redirection. Let's use the new url from redirect property:

    rtmpdump -r rtmp://37.72.171.92:80/pub --playpath KfvGmBHIqT97oyWDFmle -V
   
    DEBUG: Property: <Name:              level, STRING:	error>
    DEBUG: Property: <Name:               code, STRING:	NetConnection.Connect.Rejected>
    DEBUG: Property: <Name:        description, STRING:	Connection failed: Application rejected connection.>

Still erroring. After some googling, we figured out that we need to specify the URL:

    rtmpdump -r rtmp://37.72.171.92:80/pub --playpath KfvGmBHIqT97oyWDFmle -p http://www.castto.me/channel/13593 -V
    DEBUG: Property: <Name:              level, STRING:	status>
    DEBUG: Property: <Name:               code, STRING:	NetConnection.Connect.Success>
    DEBUG: Property: <Name:        description, STRING:	Connection succeeded.>
    ...
    DEBUG: Invoking deleteStream
    ERROR: RTMP_ReadPacket, failed to read RTMP packet header
    DEBUG: Closing connection.

Better, but still, no play. Here we figured out that there is a so called "secure" token. Why "so called"? Because we can easily extract from our flash (http://www.showmycode.com/). Since it is jwPlayer, let's see where this token is stored: http://www.wowza.com/forums/content.php?51.

Quoting the tutorial:

Edit `[jw-source-code]/src/com/longtailvideo/jwplayer/media/RTMPMediaProvider.as` to change the secure token value (around line 266):

From:

    _connection.call("secureTokenResponse", null, TEA.decrypt(evt.info.secureToken, config.token));
    
To:

    _connection.call("secureTokenResponse", null, TEA.decrypt(evt.info.secureToken, "#ed%h0#w@1"));

Let's grep our decompiled code for the string "secureTokenResponse" and voilà:

    this._connection.call("secureTokenResponse", null, TEA.decrypt(evt.info.secureToken, "#ed%h0#w@1"));

Authors didn't even bother to change it from the suggested by tutorial. Let's use it:

    rtmpdump -r rtmp://37.72.171.92:80/pub --playpath KfvGmBHIqT97oyWDFmle -p http://www.castto.me/channel/13593 -T "#ed%h0#w@1" -V

Still no play? Let's append `--live`:

    rtmpdump -r rtmp://37.72.171.92:80/pub --playpath KfvGmBHIqT97oyWDFmle -p http://www.castto.me/channel/13593 -T "#ed%h0#w@1" -V
    "��`��,4YA@�P$		������e�J��Ԩ�d�~G�_�z�Bq]s�?�I��[x��#|O������DG}�]�z�p�f���JZ$�ք����Ui�W�/�;���}��w��.�J�a�O9E,����s��`����/�.����S�4�9����+b�!(���g`��*�� �H*"@���`�H.:�ɓ+<�%iD��^�ا��W�N�Gk�O�������|�f�<�k���9)��n�;=�^�ò�=���yQD)�2։�K���7�B

Snap! Binary stream in our stdout. Let's append `--quiet` and pipe it to vlc:

    rtmpdump -r rtmp://149.255.37.20:80/pub -W http://www.castto.me/_.swf -p http://www.castto.me/channel/13593 --live -y KfvGmBHIqT97oyWDFmle -T "#ed%h0#w@1" --quiet | vlc -

And we're done!
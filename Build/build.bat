@ECHO OFF

SET CurrentDir=%CD%
SET OutPutFile=%CurrentDir%\..\Release\entityspaces.jqAjax.debug.js
SET OutMinFile=%CurrentDir%\..\Release\entityspaces.jqAjax.js
SET BuildOrder=%CurrentDir%\jqAjax-build-order.txt

ECHO JSBuild Starting...
FOR /F "tokens=*" %%A in (%BuildOrder%) DO (  
@REM Wrap each file output in a new line
@ECHO. >>%OutPutFile%.temp
ECHO Building... %%A
@ECHO. >>%OutPutFile%.temp
@ECHO /*********************************************** >> %OutPutFile%.temp
@ECHO * FILE: %%A >> %OutPutFile%.temp
@ECHO ***********************************************/ >> %OutPutFile%.temp
@TYPE %CurrentDir%\%%A >> %OutPutFile%.temp
@ECHO. >>%OutPutFile%.temp
)

@REM Remove the OutputFile if it exists
DEL %OutPutFile%

@REM Wrap the final output in an IIFE
@ECHO //-------------------------------------------------------------------- >> %OutPutFile%
@ECHO // The entityspaces.js JavaScript library v1.0.1pre >> %OutPutFile%
@ECHO // Built on %Date% at %Time%  >> %OutPutFile%  
@ECHO // https://github.com/EntitySpaces/entityspaces.js >> %OutPutFile%
@ECHO // >> %OutPutFile%
@ECHO // License: MIT (http://www.opensource.org/licenses/mit-license.php) >> %OutPutFile%
@ECHO //-------------------------------------------------------------------- >> %OutPutFile%
@ECHO. >>%OutPutFile%
@ECHO (function(window, undefined) { >> %OutPutFile%
@TYPE %OutPutFile%.temp >> %OutPutFile%
@ECHO }(window)); >> %OutPutFile%
ECHO JSBuild Succeeded
ENDLOCAL

@rem Now call Google Closure Compiler to produce a minified version
tools\curl -d output_info=compiled_code -d output_format=text -d compilation_level=SIMPLE_OPTIMIZATIONS  --data-urlencode js_code@%OutPutFile%.temp "http://closure-compiler.appspot.com/compile" > %OutMinFile%

DEL %OutPutFile%.temp

SET OutPutFile=%CurrentDir%\..\Release\entityspaces.XHR.debug.js
SET OutMinFile=%CurrentDir%\..\Release\entityspaces.XHR.js
SET BuildOrder=%CurrentDir%\XHR-build-order.txt

ECHO JSBuild Starting...
FOR /F "tokens=*" %%A in (%BuildOrder%) DO (  
@REM Wrap each file output in a new line
@ECHO. >>%OutPutFile%.temp
ECHO Building... %%A
@ECHO. >>%OutPutFile%.temp
@ECHO /*********************************************** >> %OutPutFile%.temp
@ECHO * FILE: %%A >> %OutPutFile%.temp
@ECHO ***********************************************/ >> %OutPutFile%.temp
@TYPE %CurrentDir%\%%A >> %OutPutFile%.temp
@ECHO. >>%OutPutFile%.temp
)

@REM Remove the OutputFile if it exists
DEL %OutPutFile%

@REM Wrap the final output in an IIFE
@ECHO //-------------------------------------------------------------------- >> %OutPutFile%
@ECHO // The entityspaces.js JavaScript library v1.0.1pre >> %OutPutFile%
@ECHO // Built on %Date% at %Time%  >> %OutPutFile%  
@ECHO // https://github.com/EntitySpaces/entityspaces.js >> %OutPutFile%
@ECHO // >> %OutPutFile%
@ECHO // License: MIT (http://www.opensource.org/licenses/mit-license.php) >> %OutPutFile%
@ECHO //-------------------------------------------------------------------- >> %OutPutFile%
@ECHO. >>%OutPutFile%
@ECHO (function(window, undefined) { >> %OutPutFile%
@TYPE %OutPutFile%.temp >> %OutPutFile%
@ECHO }(window)); >> %OutPutFile%
ECHO JSBuild Succeeded
ENDLOCAL

@rem Now call Google Closure Compiler to produce a minified version
tools\curl -d output_info=compiled_code -d output_format=text -d compilation_level=SIMPLE_OPTIMIZATIONS  --data-urlencode js_code@%OutPutFile%.temp "http://closure-compiler.appspot.com/compile" > %OutMinFile%

DEL %OutPutFile%.temp


GOTO :eof
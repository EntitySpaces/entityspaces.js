@ECHO OFF

SET CurrentDir=%CD%
SET OutPutFile=%CurrentDir%\..\Release\entityspaces.debug.js
SET BuildOrder=%CurrentDir%\build-order.txt

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

@ECHO Copying Providers
COPY %CurrentDir%\..\Src\Providers\AjaxProvider.js %CurrentDir%\..\Release\AjaxProvider.js
COPY %CurrentDir%\..\Src\Providers\XMLHttpRequestProvider.js %CurrentDir%\..\Release\XMLHttpRequestProvider.js

@REM Wrap the final output in an IIFE
@ECHO /*********************************************** >> %OutPutFile%
@ECHO * Built on %Date% at %Time%      * >> %OutPutFile% 
@ECHO ***********************************************/ >> %OutPutFile%
@ECHO (function(window, undefined){ >> %OutPutFile%
@TYPE %OutPutFile%.temp >> %OutPutFile%
@ECHO }(window)); >> %OutPutFile%
DEL %OutPutFile%.temp
ECHO JSBuild Succeeded
ENDLOCAL
GOTO :eof
node %~dp0\compile.js %1

IF ERRORLEVEL 1 GOTO koniec

@echo off

set FILENAME=%~n1

del %~dp0\out\%FILENAME%.exe

mkdir out

set include=C:\fasmg\packages\x86\include
C:\fasmg\core\fasmg %~dp0\cache\%FILENAME%.asm out\%FILENAME%.exe
IF ERRORLEVEL 1 GOTO koniec


cd out
@echo on
%FILENAME%.exe
cd ..

:koniec
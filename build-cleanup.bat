set targetdir=.\public
del /q %targetdir%\*
for /d %%x in (%targetdir%\*) do @rd /s /q ^"%%x^"
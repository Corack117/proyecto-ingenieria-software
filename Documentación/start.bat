@echo off
pushd %~dp0

start http://127.0.0.1:8002

::pip install mkdocs
mkdocs serve

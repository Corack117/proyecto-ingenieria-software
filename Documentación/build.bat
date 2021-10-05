@echo off
pushd %~dp0

::pip install mkdocs
mkdocs gh-deploy

#!/bin/bash

LIBS=bin
for f in `ls libs`; do LIBS=$LIBS:libs/$f; done

SRCS=
for f in `ls src`; do SRCS="$SRCS src/$f"; done

echo "Compiling$SRCS"
javac -cp $LIBS -d bin $SRCS

MAIN=Main
ls --color projects

echo "Executing $MAIN.class"
java -cp $LIBS $MAIN

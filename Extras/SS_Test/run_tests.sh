#!/bin/bash

export BUILDKIT_PROGRESS=plain
docker compose up --build --abort-on-container-exit --exit-code-from tester

if [[ $? -ne 0 ]]; then
	echo "Testing failed."
else
	echo "Testing succeeded."
fi


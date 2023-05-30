#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

main() {
	local file_path="${1:-}"
	if [ -z "${file_path}" ]; then
		(>&2 echo "USAGE: ${0} <file path>")
		exit 1
	fi
	env | grep '^VITE_' > "${file_path}"
}

main "$@"